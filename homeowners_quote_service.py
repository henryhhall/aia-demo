"""Homeowners Insurance Quote Service Module.

This module provides validation, risk assessment, and payload formatting
for homeowners insurance quotes, mirroring the multi-step web application
architecture. It follows the PEP 8 style guide and includes comprehensive
comments and docstrings.
"""

import datetime
import json
import re
from dataclasses import asdict, dataclass, field
from typing import Any, Dict, List, Optional, Tuple


@dataclass
class PropertyLocation:
    """Represents Step 1: Property Location & Basics."""

    street_address: str
    unit: str
    city: str
    state: str
    zip_code: str
    property_type: str  # single_family, condo_townhouse, multi_family, mobile_home
    primary_usage: str  # primary, secondary_vacation, rental
    year_built: int

    def validate(self) -> List[str]:
        """Validate location and basic property fields."""
        errors: List[str] = []
        if len(self.street_address.strip()) < 3:
            errors.append("Street address must be at least 3 characters.")
        if len(self.city.strip()) < 2:
            errors.append("City is required.")
        if len(self.state.strip()) != 2:
            errors.append("State must be a 2-letter abbreviation.")
        if not re.match(r"^\d{5}(-\d{4})?$", self.zip_code.strip()):
            errors.append("ZIP code must be a valid 5-digit US postal code.")
        valid_types = {
            "single_family",
            "condo_townhouse",
            "multi_family",
            "mobile_home",
        }
        if self.property_type not in valid_types:
            errors.append(f"Invalid property type: {self.property_type}")
        valid_usages = {"primary", "secondary_vacation", "rental"}
        if self.primary_usage not in valid_usages:
            errors.append(f"Invalid primary usage: {self.primary_usage}")
        current_year = datetime.date.today().year
        if not (1700 <= self.year_built <= current_year + 1):
            errors.append(f"Year built must be between 1700 and {current_year + 1}.")
        return errors


@dataclass
class ConstructionDetails:
    """Represents Step 2: Construction & Structural Details."""

    square_footage: int
    stories: str  # '1', '1.5', '2', '2.5', '3+'
    roof_material: str  # asphalt_shingle, metal, tile, slate, flat_rubber
    roof_age: str  # 0-5, 6-10, 11-20, 20+, unknown
    foundation_type: str  # basement_finished, basement_unfinished, crawlspace, slab
    exterior_wall_type: str  # vinyl_siding, brick_veneer, stucco, wood, stone

    def validate(self) -> List[str]:
        """Validate structural details and construction materials."""
        errors: List[str] = []
        if not (250 <= self.square_footage <= 30000):
            errors.append("Square footage must be between 250 and 30,000 sq ft.")
        if self.stories not in {"1", "1.5", "2", "2.5", "3+"}:
            errors.append(f"Invalid stories count: {self.stories}")
        valid_roofs = {
            "asphalt_shingle",
            "metal",
            "tile",
            "slate",
            "flat_rubber",
        }
        if self.roof_material not in valid_roofs:
            errors.append(f"Invalid roof material: {self.roof_material}")
        if self.roof_age not in {"0-5", "6-10", "11-20", "20+", "unknown"}:
            errors.append(f"Invalid roof age category: {self.roof_age}")
        valid_foundations = {
            "basement_finished",
            "basement_unfinished",
            "crawlspace",
            "slab",
        }
        if self.foundation_type not in valid_foundations:
            errors.append(f"Invalid foundation: {self.foundation_type}")
        valid_walls = {
            "vinyl_siding",
            "brick_veneer",
            "stucco",
            "wood",
            "stone",
        }
        if self.exterior_wall_type not in valid_walls:
            errors.append(f"Invalid wall type: {self.exterior_wall_type}")
        return errors


@dataclass
class SafetyAndRisks:
    """Represents Step 3: Safety, Features & Risk Factors."""

    distance_to_hydrant: str  # under_1000, over_1000, unknown
    protective_devices: List[str] = field(default_factory=list)
    has_pool: bool = False
    pool_fence_status: str = "none"  # fenced, unfenced, none
    has_trampoline_or_ramp: bool = False
    has_dog: bool = False
    dog_breed: Optional[str] = None
    prior_claims: str = "0"  # '0', '1', '2', '3+'

    def validate(self) -> List[str]:
        """Validate safety factors and conditional underwriting questions."""
        errors: List[str] = []
        if self.distance_to_hydrant not in {"under_1000", "over_1000", "unknown"}:
            errors.append("Invalid hydrant distance specification.")
        if self.has_pool and self.pool_fence_status not in {"fenced", "unfenced"}:
            errors.append("Because a pool is present, fence status must be specified.")
        if self.prior_claims not in {"0", "1", "2", "3+"}:
            errors.append(f"Invalid prior claims count: {self.prior_claims}")
        return errors


@dataclass
class ContactAndCoverage:
    """Represents Step 4: Contact & Coverage Preferences."""

    coverage_start_date: str  # YYYY-MM-DD
    estimated_home_value: int
    replacement_cost_preference: str  # standard_100, extended_125, guaranteed
    deductible: str  # '500', '1000', '2500', '5000'
    first_name: str
    last_name: str
    email: str
    phone: str
    insurance_status: str  # currently_insured, renewal_lapse, first_time_homebuyer

    def validate(self) -> List[str]:
        """Validate coverage limits, deductible, and applicant contact info."""
        errors: List[str] = []
        if not re.match(r"^\d{4}-\d{2}-\d{2}$", self.coverage_start_date):
            errors.append("Start date must be formatted as YYYY-MM-DD.")
        if not (50000 <= self.estimated_home_value <= 25000000):
            errors.append("Home value must be between $50,000 and $25,000,000.")
        valid_rc = {"standard_100", "extended_125", "guaranteed"}
        if self.replacement_cost_preference not in valid_rc:
            errors.append("Invalid replacement cost preference.")
        if self.deductible not in {"500", "1000", "2500", "5000"}:
            errors.append("Invalid deductible option.")
        if len(self.first_name.strip()) < 2:
            errors.append("First name must be at least 2 characters.")
        if len(self.last_name.strip()) < 2:
            errors.append("Last name must be at least 2 characters.")
        if not re.match(r"^[^@\s]+@[^@\s]+\.[^@\s]+$", self.email.strip()):
            errors.append("Email must be a valid email address.")
        cleaned_phone = re.sub(r"\D", "", self.phone)
        if len(cleaned_phone) < 10:
            errors.append("Phone number must have at least 10 digits.")
        return errors


class HomeownersQuoteService:
    """Service class for coordinating validation and insurance rating payload generation."""

    def __init__(
        self,
        location: PropertyLocation,
        construction: ConstructionDetails,
        safety: SafetyAndRisks,
        coverage: ContactAndCoverage,
    ):
        """Initialize the quote service with multi-step data."""
        self.location = location
        self.construction = construction
        self.safety = safety
        self.coverage = coverage

    def validate_all(self) -> Tuple[bool, List[str]]:
        """Validate all steps across the quote submission."""
        all_errors = (
            self.location.validate()
            + self.construction.validate()
            + self.safety.validate()
            + self.coverage.validate()
        )
        return (len(all_errors) == 0, all_errors)

    def generate_rating_api_payload(self) -> Dict[str, Any]:
        """Format gathered information into a structured insurance rating payload."""
        is_valid, errors = self.validate_all()
        if not is_valid:
            raise ValueError(f"Cannot generate payload with validation errors: {errors}")

        multiplier = 1.0
        if self.coverage.replacement_cost_preference == "extended_125":
            multiplier = 1.25
        elif self.coverage.replacement_cost_preference == "guaranteed":
            multiplier = 1.50

        dwelling_limit = int(round(self.coverage.estimated_home_value * multiplier))

        reference_id = (
            f"HO-{datetime.datetime.now().strftime('%Y%m%d%H%M%S')}-"
            f"{abs(hash(self.coverage.email)) % 10000:04d}"
        )

        return {
            "meta": {
                "schemaVersion": "2026.1.0",
                "system": "AIA-Connecticut-Rating-Engine",
                "quoteReferenceId": reference_id,
                "submissionTimestamp": datetime.datetime.now(datetime.timezone.utc).isoformat(),
                "agentOffice": "Danbury-Corporate",
                "agencyNPN": "18492041",
            },
            "applicant": {
                "firstName": self.coverage.first_name,
                "lastName": self.coverage.last_name,
                "fullName": f"{self.coverage.first_name} {self.coverage.last_name}",
                "email": self.coverage.email,
                "phone": self.coverage.phone,
                "insuranceStatus": self.coverage.insurance_status,
                "isFirstTimeBuyer": (
                    self.coverage.insurance_status == "first_time_homebuyer"
                ),
            },
            "riskLocation": {
                "streetAddress": self.location.street_address,
                "unit": self.location.unit or None,
                "city": self.location.city,
                "state": self.location.state,
                "zipCode": self.location.zip_code,
                "country": "USA",
            },
            "propertyCharacteristics": {
                "propertyType": self.location.property_type,
                "primaryUsage": self.location.primary_usage,
                "yearBuilt": self.location.year_built,
                "squareFootage": self.construction.square_footage,
                "stories": self.construction.stories,
                "construction": {
                    "foundation": self.construction.foundation_type,
                    "exteriorWalls": self.construction.exterior_wall_type,
                    "roof": {
                        "material": self.construction.roof_material,
                        "estimatedAgeCategory": self.construction.roof_age,
                    },
                },
            },
            "safetyAndUnderwriting": {
                "fireProtection": {
                    "hydrantDistanceCategory": self.safety.distance_to_hydrant,
                    "isHydrantWithin1000Ft": (
                        self.safety.distance_to_hydrant == "under_1000"
                    ),
                    "installedProtectiveDevices": self.safety.protective_devices,
                },
                "liabilityHazards": {
                    "swimmingPool": {
                        "hasPool": self.safety.has_pool,
                        "fenceStatus": self.safety.pool_fence_status,
                    },
                    "trampolineOrSkateboardRamp": self.safety.has_trampoline_or_ramp,
                    "dogOnPremises": {
                        "hasDog": self.safety.has_dog,
                        "breed": self.safety.dog_breed,
                    },
                },
                "lossHistory": {
                    "priorClaimsLast5Years": self.safety.prior_claims,
                },
            },
            "coveragePreferences": {
                "policyForm": "HO-3-Special-Form",
                "coverageStartDate": self.coverage.coverage_start_date,
                "estimatedHomeValue": self.coverage.estimated_home_value,
                "replacementCostPreference": self.coverage.replacement_cost_preference,
                "dwellingCoverageLimitA": dwelling_limit,
                "personalPropertyLimitC": int(round(dwelling_limit * 0.5)),
                "lossOfUseLimitD": int(round(dwelling_limit * 0.2)),
                "personalLiabilityLimitE": 500000,
                "deductible": int(self.coverage.deductible),
            },
        }
