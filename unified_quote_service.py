"""Unified Insurance Quote Service Module.

This module implements the unified quote foundation architecture for Associated
Insurance Agency (AIA). It provides a shared baseline across all products:
- Full Name
- Phone Number (with SMS consent)
- Email Address
- Best time / method to reach (Call / Text / Email)

Coupled with a single dynamic line-specific anchor per line of business:
1. Homeowners: Property Address (Assessor/GIS records lookup)
2. Personal Auto: Vehicle Year/Make/Model or VIN (Risk tier & vehicle mix)
3. Commercial Auto: Business Name & Commercial Vehicle Count (Fleet & DOT scope)
4. Umbrella: Underlying Coverage Status & Liability Limits (Prerequisite verification)
5. Commercial / General Liability: Business Name & Industry/Trade (NAICS/SIC appetite)

This module conforms strictly to PEP 8 style guides and includes comprehensive docstrings.
"""

from dataclasses import asdict, dataclass, field
from enum import Enum
import re
import datetime
from typing import Any, Dict, List, Optional, Tuple, Union


class LineOfBusiness(str, Enum):
    """Enumeration of supported insurance lines."""
    HOMEOWNERS = "Homeowners"
    PERSONAL_AUTO = "Personal Auto"
    COMMERCIAL_AUTO = "Commercial Auto"
    UMBRELLA = "Umbrella"
    COMMERCIAL_GL = "Commercial / General Liability"


@dataclass
class SharedFoundation:
    """The shared baseline contact foundation required across all products."""

    full_name: str
    phone: str
    email: str
    reach_method: str = "Call"  # 'Call', 'Text', 'Email'
    reach_time_preference: str = "Anytime"  # 'Morning', 'Afternoon', 'Evening', 'Anytime'
    sms_consent: bool = False
    preferred_office: str = "Danbury"  # 'Danbury', 'Watertown', 'Bridgeport'

    def validate(self) -> List[str]:
        """Validate the shared contact baseline fields."""
        errors: List[str] = []

        if len(self.full_name.strip()) < 2:
            errors.append("Full Name must be at least 2 characters.")

        # Clean digits from phone number
        phone_digits = re.sub(r"\D", "", self.phone)
        if len(phone_digits) < 10:
            errors.append("Phone Number must include a valid 10-digit number.")

        email_pattern = r"^[\w\.-]+@([\w-]+\.)+[\w-]{2,4}$"
        if not re.match(email_pattern, self.email.strip()):
            errors.append("Email Address must be a valid email format.")

        valid_methods = {"Call", "Text", "Email"}
        if self.reach_method not in valid_methods:
            errors.append(f"Reach method must be one of {valid_methods}.")

        # If user requests text communication, verify SMS consent
        if self.reach_method == "Text" and not self.sms_consent:
            errors.append("SMS consent checkbox is required when selecting 'Text' contact method.")

        return errors


@dataclass
class HomeownersAnchor:
    """Line-specific anchor for Homeowners quotes."""

    property_address: str

    @property
    def producer_rationale(self) -> str:
        """Why the producer needs this anchor prior to initial contact."""
        return (
            "Allows instant lookup of tax assessor / GIS records "
            "(square footage, year built, roof type, distance to hydrant)."
        )

    def validate(self) -> List[str]:
        """Validate the property address."""
        errors: List[str] = []
        if len(self.property_address.strip()) < 8:
            errors.append("Property address must include street, city, state, or ZIP.")
        return errors


@dataclass
class PersonalAutoAnchor:
    """Line-specific anchor for Personal Auto quotes."""

    vehicles_summary: str  # e.g., "2021 Toyota RAV4, 2018 Subaru Outback" or VIN

    @property
    def producer_rationale(self) -> str:
        """Why the producer needs this anchor prior to initial contact."""
        return (
            "Lets the producer understand risk tier, safety equipment credits, "
            "and vehicle mix immediately."
        )

    def validate(self) -> List[str]:
        """Validate the vehicle summary."""
        errors: List[str] = []
        if len(self.vehicles_summary.strip()) < 3:
            errors.append("Vehicle details must include year, make, model, or VIN.")
        return errors


@dataclass
class CommercialAutoAnchor:
    """Line-specific anchor for Commercial Auto quotes."""

    business_name: str
    number_of_vehicles: int

    @property
    def producer_rationale(self) -> str:
        """Why the producer needs this anchor prior to initial contact."""
        return (
            "Identifies whether this is a 2-van trade contractor or a "
            "15-truck commercial fleet requiring USDOT / MC filings."
        )

    def validate(self) -> List[str]:
        """Validate commercial auto fleet specifics."""
        errors: List[str] = []
        if len(self.business_name.strip()) < 2:
            errors.append("Business Name is required.")
        if self.number_of_vehicles < 1:
            errors.append("Number of Commercial Vehicles must be at least 1.")
        return errors


@dataclass
class UmbrellaAnchor:
    """Line-specific anchor for Umbrella Liability quotes."""

    underlying_coverage_status: str  # e.g., "Home + 2 autos with Travelers ($500k liability limits)"

    @property
    def producer_rationale(self) -> str:
        """Why the producer needs this anchor prior to initial contact."""
        return (
            "Umbrella cannot be written in a vacuum; it requires underlying "
            "auto/home liability limits (typically $250k/$500k or $500k CSL)."
        )

    def validate(self) -> List[str]:
        """Validate umbrella coverage prerequisites."""
        errors: List[str] = []
        if len(self.underlying_coverage_status.strip()) < 5:
            errors.append("Please specify your current underlying auto or home coverage status.")
        return errors


@dataclass
class CommercialGLAnchor:
    """Line-specific anchor for Commercial / General Liability quotes."""

    business_name: str
    nature_of_business: str  # e.g., "HVAC & Plumbing contractor, commercial & residential"

    @property
    def producer_rationale(self) -> str:
        """Why the producer needs this anchor prior to initial contact."""
        return (
            "Determines NAICS/SIC risk category, class codes, and carrier appetite "
            "before the first conversation."
        )

    def validate(self) -> List[str]:
        """Validate commercial GL specifics."""
        errors: List[str] = []
        if len(self.business_name.strip()) < 2:
            errors.append("Business Name is required.")
        if len(self.nature_of_business.strip()) < 3:
            errors.append("Nature of business / industry description is required.")
        return errors


AnchorType = Union[
    HomeownersAnchor,
    PersonalAutoAnchor,
    CommercialAutoAnchor,
    UmbrellaAnchor,
    CommercialGLAnchor,
]


@dataclass
class UnifiedQuoteRequest:
    """Unified single-form quote request combining shared foundation and dynamic anchor."""

    shared: SharedFoundation
    line_of_business: LineOfBusiness
    anchor: AnchorType
    quote_reference_id: Optional[str] = None
    created_at: datetime.datetime = field(default_factory=lambda: datetime.datetime.now(datetime.timezone.utc))

    def __post_init__(self) -> None:
        """Initialize reference identifier if not supplied."""
        if not self.quote_reference_id:
            prefix = {
                LineOfBusiness.HOMEOWNERS: "HO",
                LineOfBusiness.PERSONAL_AUTO: "PA",
                LineOfBusiness.COMMERCIAL_AUTO: "CA",
                LineOfBusiness.UMBRELLA: "UMB",
                LineOfBusiness.COMMERCIAL_GL: "CGL",
            }.get(self.line_of_business, "GEN")
            stamp = datetime.datetime.now(datetime.timezone.utc).strftime("%Y%m%d%H%M%S")
            self.quote_reference_id = f"AIA-{prefix}-{stamp}"

    def validate(self) -> Tuple[bool, List[str]]:
        """Validate shared foundation and the single dynamic anchor."""
        errors = self.shared.validate()

        # Validate matching anchor type
        if self.line_of_business == LineOfBusiness.HOMEOWNERS:
            if not isinstance(self.anchor, HomeownersAnchor):
                errors.append("Expected HomeownersAnchor for Homeowners line.")
            else:
                errors.extend(self.anchor.validate())
        elif self.line_of_business == LineOfBusiness.PERSONAL_AUTO:
            if not isinstance(self.anchor, PersonalAutoAnchor):
                errors.append("Expected PersonalAutoAnchor for Personal Auto line.")
            else:
                errors.extend(self.anchor.validate())
        elif self.line_of_business == LineOfBusiness.COMMERCIAL_AUTO:
            if not isinstance(self.anchor, CommercialAutoAnchor):
                errors.append("Expected CommercialAutoAnchor for Commercial Auto line.")
            else:
                errors.extend(self.anchor.validate())
        elif self.line_of_business == LineOfBusiness.UMBRELLA:
            if not isinstance(self.anchor, UmbrellaAnchor):
                errors.append("Expected UmbrellaAnchor for Umbrella line.")
            else:
                errors.extend(self.anchor.validate())
        elif self.line_of_business == LineOfBusiness.COMMERCIAL_GL:
            if not isinstance(self.anchor, CommercialGLAnchor):
                errors.append("Expected CommercialGLAnchor for Commercial GL line.")
            else:
                errors.extend(self.anchor.validate())

        return len(errors) == 0, errors

    def generate_producer_prep_brief(self) -> Dict[str, Any]:
        """Generate structured briefing document enabling producer prep work."""
        anchor_data = asdict(self.anchor)
        return {
            "quoteReferenceId": self.quote_reference_id,
            "submissionTimestamp": self.created_at.isoformat(),
            "lineOfBusiness": self.line_of_business.value,
            "producerActionSummary": {
                "whyProducerNeedsThis": getattr(self.anchor, "producer_rationale", ""),
                "actionBeforeFirstCall": self._get_producer_action_steps(),
            },
            "contactFoundation": {
                "clientName": self.shared.full_name,
                "phone": self.shared.phone,
                "email": self.shared.email,
                "preferredMethod": self.shared.reach_method,
                "preferredTime": self.shared.reach_time_preference,
                "smsConsentGiven": self.shared.sms_consent,
                "assignedOffice": self.shared.preferred_office,
            },
            "lineSpecificAnchorData": anchor_data,
        }

    def _get_producer_action_steps(self) -> List[str]:
        """Return concrete preparatory workflow steps for the insurance producer."""
        if self.line_of_business == LineOfBusiness.HOMEOWNERS:
            return [
                "Open municipal Vision/GIS tax assessor portal to pull building footprint.",
                "Verify year built, exterior siding, roof composition, and square footage.",
                "Verify ISO fire protection rating and nearest hydrant distance in CT GIS.",
                "Pre-load 3-5 carrier rating engines (Travelers, Safeco, Hartford) before call.",
            ]
        elif self.line_of_business == LineOfBusiness.PERSONAL_AUTO:
            return [
                "Run vehicle VIN or Year/Make/Model through ISO symbol / risk tier index.",
                "Check ADAS safety features (lane assist, collision mitigation) for discounts.",
                "Review multi-car eligibility and prepare preliminary comparative rate tier.",
            ]
        elif self.line_of_business == LineOfBusiness.COMMERCIAL_AUTO:
            return [
                "Determine fleet class: <5 light duty vs 5+ vehicles requiring fleet rating.",
                "Check Connecticut / FMCSA USDOT registry if commercial trucks or trailers.",
                "Assess symbol 7 (specifically described) vs symbol 1 (any auto) appetite.",
            ]
        elif self.line_of_business == LineOfBusiness.UMBRELLA:
            return [
                "Verify underlying primary auto limits meet carrier minimums ($250k/$500k).",
                "Verify underlying homeowners Coverage E liability meets minimum ($300k+).",
                "Prepare $1M, $2M, and $5M personal umbrella excess tier quotes.",
            ]
        elif self.line_of_business == LineOfBusiness.COMMERCIAL_GL:
            return [
                "Classify business operations into primary NAICS and ISO CGL class codes.",
                "Filter carrier appetite guidelines (contractor vs mercantile vs service).",
                "Review subcontractor exposure and certificate of insurance (COI) requirements.",
            ]
        return ["Contact prospect to gather preliminary rating metrics."]
