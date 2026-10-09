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
from unified_quote_service import (
    CommercialAutoAnchor,
    CommercialGLAnchor,
    HomeownersAnchor,
    LineOfBusiness,
    PersonalAutoAnchor,
    SharedFoundation,
    UmbrellaAnchor,
    UnifiedQuoteRequest,
)


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


def example_unified_quote() -> None:
    """Showcase the unified quote process flow with shared foundation and dynamic anchors.

    Demonstrates how a single shared foundation (Name, Phone, Email,
    Reach Preference, SMS Consent) pairs with a single line-specific anchor
    across all five insurance lines to allow the producer to perform
    targeted prep work before the first phone call.
    """
    print("=" * 60)
    print("AIA UNIFIED QUOTE PROCESS - SHARED FOUNDATION & LINE ANCHORS")
    print("=" * 60)

    # 1. Establish the Shared Contact Foundation
    foundation = SharedFoundation(
        full_name="Sarah Jenkins",
        phone="(203) 555-0199",
        email="sarah.jenkins@example.com",
        reach_method="Text",
        reach_time_preference="Morning",
        sms_consent=True,
        preferred_office="Danbury",
    )

    # 2. Showcase each of the 5 products with its single specific anchor:
    cases = [
        (
            LineOfBusiness.HOMEOWNERS,
            HomeownersAnchor(
                property_address="50 Newtown Road, Danbury, CT 06810"
            ),
        ),
        (
            LineOfBusiness.PERSONAL_AUTO,
            PersonalAutoAnchor(
                vehicles_summary="2022 Subaru Outback & 2019 Toyota RAV4"
            ),
        ),
        (
            LineOfBusiness.COMMERCIAL_AUTO,
            CommercialAutoAnchor(
                business_name="Danbury Heating & Air LLC",
                number_of_vehicles=4,
            ),
        ),
        (
            LineOfBusiness.UMBRELLA,
            UmbrellaAnchor(
                underlying_coverage_status=(
                    "Home & 2 Autos with Travelers ($250k/$500k auto limits, "
                    "$500k home liability)"
                )
            ),
        ),
        (
            LineOfBusiness.COMMERCIAL_GL,
            CommercialGLAnchor(
                business_name="Northeast Electrical Contractors LLC",
                nature_of_business=(
                    "Commercial and residential electrical wiring & service"
                ),
            ),
        ),
    ]

    for line, anchor in cases:
        request = UnifiedQuoteRequest(
            shared=foundation,
            line_of_business=line,
            anchor=anchor,
        )

        is_valid, errors = request.validate()
        brief = request.generate_producer_prep_brief()

        print(f"\n[ Product Line: {line.value} ]")
        print(f"Quote Ref ID: {brief['quoteReferenceId']}")
        print(f"Validation: {'PASS' if is_valid else 'FAIL'}")
        if not is_valid:
            print(f"Errors: {errors}")
            continue

        print(f"Why Producer Needs This Anchor:")
        print(f"  -> {brief['producerActionSummary']['whyProducerNeedsThis']}")
        print("Producer Prep Steps Before First Contact:")
        for step in brief["producerActionSummary"]["actionBeforeFirstCall"]:
            print(f"  * {step}")
        print("Anchor Payload Recorded:")
        print(f"  {brief['lineSpecificAnchorData']}")

    print("\n" + "=" * 60)
    print("Successfully verified unified quote foundation architecture.\n")


def main() -> None:
    """Entry point for the application. Delegates directly to showcase methods."""
    example_unified_quote()
    example_homeowners_quote()
    example_office_employee_directory()


if __name__ == "__main__":
    main()


