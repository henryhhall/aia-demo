"""Main entry point to showcase the Homeowners Quote functionality.

This file adheres strictly to the PEP 8 style guide.
The main() method contains no inline business logic; it solely delegates
to example_homeowners_quote() to demonstrate the quote service.
"""

import json
from homeowners_quote_service import (
    ConstructionDetails,
    ContactAndCoverage,
    HomeownersQuoteService,
    PropertyLocation,
    SafetyAndRisks,
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
    print("Successfully formatted and verified homeowners quote payload.")


def main() -> None:
    """Entry point for the application. Delegates directly to showcase method."""
    example_homeowners_quote()


if __name__ == "__main__":
    main()
