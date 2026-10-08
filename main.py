"""Main entry point to showcase AIA quote and directory functionalities.

This file adheres strictly to the PEP 8 style guide.
The main() method contains no inline business logic; it solely delegates
to distinct showcase functions to demonstrate the services.
"""

import json
from homeowners_quote_service import (
    ConstructionDetails,
    ContactAndCoverage,
    HomeownersQuoteService,
    PropertyLocation,
    SafetyAndRisks,
)
from office_employee_directory_service import OfficeEmployeeDirectoryService


def example_homeowners_quote() -> None:
    """Showcase validation, underwriting processing, and payload generation.

    This example simulates a prospective Connecticut client completing
    the 4-step homeowners quote wizard and formats the resulting
    rating payload for carrier rating engines.
    """
    # Step 1: Property Location & Basics
    location = PropertyLocation(
        street_address="50 Newtown Road",
        unit="Suite 100",
        city="Danbury",
        state="CT",
        zip_code="06810",
        property_type="single_family",
        primary_usage="primary",
        year_built=1998,
    )

    # Step 2: Construction & Structural Details
    construction = ConstructionDetails(
        square_footage=2450,
        stories="2",
        roof_material="asphalt_shingle",
        roof_age="6-10",
        foundation_type="basement_finished",
        exterior_wall_type="vinyl_siding",
    )

    # Step 3: Safety, Features & Risk Factors
    safety = SafetyAndRisks(
        distance_to_hydrant="under_1000",
        protective_devices=["smoke_detectors", "deadbolts", "burglar_alarm"],
        has_pool=True,
        pool_fence_status="fenced",
        has_trampoline_or_ramp=False,
        has_dog=True,
        dog_breed="Golden Retriever",
        prior_claims="0",
    )

    # Step 4: Contact & Coverage Preferences
    coverage = ContactAndCoverage(
        coverage_start_date="2026-11-01",
        estimated_home_value=525000,
        replacement_cost_preference="extended_125",
        deductible="1000",
        first_name="Jane",
        last_name="Doe",
        email="jane.doe@example.com",
        phone="(203) 748-9272",
        insurance_status="currently_insured",
    )

    # Initialize quote service
    service = HomeownersQuoteService(
        location=location,
        construction=construction,
        safety=safety,
        coverage=coverage,
    )

    # Validate all steps
    is_valid, validation_errors = service.validate_all()
    print("=" * 60)
    print("AIA CONNECTICUT HOMEOWNERS QUOTE ENGINE - VERIFICATION")
    print("=" * 60)
    print(f"Validation Status: {'PASS' if is_valid else 'FAIL'}")

    if not is_valid:
        print("Errors encountered:")
        for err in validation_errors:
            print(f"  - {err}")
        return

    # Generate and display formatted rating API payload
    rating_payload = service.generate_rating_api_payload()
    print(f"Quote Reference ID: {rating_payload['meta']['quoteReferenceId']}")
    print(
        f"Dwelling Coverage Limit A: "
        f"${rating_payload['coveragePreferences']['dwellingCoverageLimitA']:,}"
    )
    print(f"Deductible: ${rating_payload['coveragePreferences']['deductible']:,}")
    print("\nStructured Insurance Rating API Payload (Formatted JSON):")
    print("-" * 60)
    print(json.dumps(rating_payload, indent=2))
    print("-" * 60)
    print("Successfully formatted and verified homeowners quote payload.\n")


def example_office_employee_directory() -> None:
    """Showcase office locations, multilingual agent search, and staff profiles.

    Demonstrates querying AIA's three Connecticut branches (Danbury HQ,
    Watertown, Bridgeport), filtering multilingual licensed producers,
    and retrieving structured employee cards mirroring the WebMCP toolkit.
    """
    directory_service = OfficeEmployeeDirectoryService()

    print("=" * 60)
    print("AIA WEBMCP OFFICE & EMPLOYEE DIRECTORY SERVICE")
    print("=" * 60)

    # 1. Query all Connecticut branches
    offices_result = directory_service.get_office_locations()
    print(f"Total Physical Branches: {offices_result['total']}")
    for office in offices_result["locations"]:
        print(
            f"  * {office['name']} ({office['tag']}): {office['fullAddress']} "
            f"| Phone: {office['phone']} | Hours: {office['hours']}"
        )

    # 2. Filter licensed producers fluent in Portuguese
    print("\nQuery: Licensed Producers Fluent in Portuguese:")
    print("-" * 60)
    portuguese_producers = directory_service.get_team_members(
        language="Portuguese", producers_only=True
    )
    for producer in portuguese_producers["members"]:
        print(
            f"  * {producer['name']} ({producer['role']}) - NPN #{producer['npn']} "
            f"| {producer['officeName']} | Direct: {producer['officeContact']['phone']}"
        )

    # 3. Filter specialists in Commercial Lines or Trucking
    print("\nQuery: Specialists in Commercial Coverage or Trucking:")
    print("-" * 60)
    commercial_specialists = directory_service.get_team_members(
        specialty="Commercial"
    )
    for specialist in commercial_specialists["members"]:
        print(
            f"  * {specialist['name']} ({specialist['officeName']}): "
            f"Specialties: {', '.join(specialist['specialties'])}"
        )

    # 4. Detailed Employee Profile (Ronald T. Boucher)
    print("\nDetailed Profile Lookup: Ronald T. Boucher:")
    print("-" * 60)
    ron_profile = directory_service.get_employee_profile("ronald-boucher")
    if ron_profile.get("found"):
        prof = ron_profile["profile"]
        print(f"Name: {prof['name']} | Role: {prof['role']}")
        print(f"License: Producer NPN #{prof['npn']} ({prof['experienceBadge']})")
        print(f"Branch: {prof['officeName']} ({prof['officeContact']['fullAddress']})")
        print(f"Short Bio: {prof['shortBio']}")
        print(f"Specialties: {', '.join(prof['specialties'])}")
        print(f"Consultation: {prof['consultation']['bookingNote']}")

    # 5. Multilingual Agent Consultation Match (Spanish in Bridgeport)
    print("\nMultilingual Agent Match: Spanish in Bridgeport:")
    print("-" * 60)
    match_result = directory_service.find_agent_by_language(
        language="Spanish", preferred_city="Bridgeport"
    )
    print(f"Matching Agents: {match_result['matchingAgentsCount']}")
    if match_result.get("recommendedAgent"):
        rec = match_result["recommendedAgent"]
        print(
            f"Recommended Agent: {rec['name']} ({rec['role']}, {rec['officeName']}) "
            f"| Phone: {rec['officePhone']}"
        )
    print(f"Actionable Note: {match_result['bookingNote']}")
    print("-" * 60)
    print("Successfully verified office and employee directory service.\n")


def main() -> None:
    """Entry point for the application. Delegates directly to showcase methods."""
    example_homeowners_quote()
    example_office_employee_directory()


if __name__ == "__main__":
    main()

