"""Office and Employee Directory Service for Associated Insurance Agency (AIA).

This module implements structured query, filtering, and profile retrieval
for AIA's Connecticut branch offices (Danbury HQ, Watertown, Bridgeport)
and licensed multilingual staff. It directly mirrors the declarative WebMCP
(Web Model Context Protocol) tool suite exposed to AI agents and web clients.

Adheres strictly to PEP 8 style conventions with comprehensive type hints
and docstrings.
"""

from dataclasses import dataclass, field
from typing import Any, Dict, List, Optional, Tuple


@dataclass
class OfficeBranch:
    """Represents a physical AIA Connecticut branch location."""

    id: str
    aliases: List[str]
    name: str
    tag: str
    short_name: str
    street_address: str
    city: str
    state: str
    postal_code: str
    phone: str
    phone_formatted: str
    phone_raw: str
    email: str
    hours: str
    directions_url: str
    latitude: float
    longitude: float
    is_headquarters: bool
    languages: List[str]
    fax: Optional[str] = None


@dataclass
class TeamMember:
    """Represents an AIA licensed insurance producer or customer service agent."""

    id: str
    name: str
    role: str
    office_id: str
    office_name: str
    is_producer: bool
    languages: List[str]
    experience_badge: str
    short_bio: str
    full_bio: str
    specialties: List[str]
    personal_highlight: str
    npn: Optional[str] = None


class OfficeEmployeeDirectoryService:
    """Service providing search, filter, and WebMCP tooling for offices and staff."""

    def __init__(self) -> None:
        """Initialize the directory service with canonical AIA branch and staff records."""
        self._offices: List[OfficeBranch] = self._load_offices()
        self._members: List[TeamMember] = self._load_team_members()

    def get_office_locations(
        self,
        office_id: Optional[str] = None,
        city: Optional[str] = None,
        language: Optional[str] = None,
        include_staff_roster: bool = True,
    ) -> Dict[str, Any]:
        """Retrieve structured branch office locations matching filter criteria.

        Args:
            office_id: Optional filter by branch ID ('danbury', 'watertown', 'bridgeport').
            city: Optional filter by city name substring.
            language: Optional filter for offices supporting a specific language.
            include_staff_roster: Whether to include assigned staff roster.

        Returns:
            Dictionary containing total count and list of office profiles.
        """
        filtered = list(self._offices)

        if office_id and office_id.lower() != "all":
            target = office_id.lower().replace("-hq", "")
            filtered = [
                loc
                for loc in filtered
                if loc.id.lower() == target
                or target in [alias.lower() for alias in loc.aliases]
            ]

        if city:
            target_city = city.lower()
            filtered = [
                loc for loc in filtered if target_city in loc.city.lower()
            ]

        if language:
            target_lang = self._normalize_language(language).lower()
            filtered = [
                loc
                for loc in filtered
                if any(
                    self._normalize_language(l).lower() == target_lang
                    for l in loc.languages
                )
            ]

        locations_output = []
        for office in filtered:
            record: Dict[str, Any] = {
                "id": office.id,
                "name": office.name,
                "tag": office.tag,
                "shortName": office.short_name,
                "streetAddress": office.street_address,
                "city": office.city,
                "state": office.state,
                "postalCode": office.postal_code,
                "fullAddress": (
                    f"{office.street_address}, {office.city}, "
                    f"{office.state} {office.postal_code}"
                ),
                "phone": office.phone_formatted,
                "phoneRaw": office.phone_raw,
                "fax": office.fax,
                "email": office.email,
                "hours": office.hours,
                "directionsUrl": office.directions_url,
                "latitude": office.latitude,
                "longitude": office.longitude,
                "isHeadquarters": office.is_headquarters,
                "languages": office.languages,
            }

            if include_staff_roster:
                staff_members = [
                    {
                        "id": m.id,
                        "name": m.name,
                        "role": m.role,
                        "isProducer": m.is_producer,
                        "npn": m.npn,
                        "languages": m.languages,
                        "specialties": m.specialties,
                    }
                    for m in self._members
                    if m.office_id == office.id
                ]
                record["staff"] = staff_members

            locations_output.append(record)

        return {
            "total": len(locations_output),
            "locations": locations_output,
        }

    def get_team_members(
        self,
        office: Optional[str] = None,
        language: Optional[str] = None,
        specialty: Optional[str] = None,
        producers_only: bool = False,
    ) -> Dict[str, Any]:
        """Search and filter AIA insurance agents and CSRs across all branches.

        Args:
            office: Branch filter ('all', 'danbury', 'watertown', 'bridgeport').
            language: Filter by spoken language (e.g. 'Spanish', 'Portuguese', 'Turkish').
            specialty: Filter by specialty line or keyword (e.g. 'Commercial', 'Truckers').
            producers_only: If True, restricts to licensed producers with an active NPN.

        Returns:
            Dictionary containing total count, active filters, and matching member profiles.
        """
        filtered = list(self._members)

        if office and office.lower() != "all":
            target_office = office.lower().replace("-hq", "")
            filtered = [
                m for m in filtered if m.office_id.lower() == target_office
            ]

        if language:
            target_lang = self._normalize_language(language).lower()
            filtered = [
                m
                for m in filtered
                if any(
                    self._normalize_language(l).lower() == target_lang
                    for l in m.languages
                )
            ]

        if specialty:
            spec_query = specialty.lower()
            filtered = [
                m
                for m in filtered
                if any(spec_query in s.lower() for s in m.specialties)
                or spec_query in m.short_bio.lower()
                or spec_query in m.role.lower()
            ]

        if producers_only:
            filtered = [m for m in filtered if m.is_producer]

        enriched = []
        for member in filtered:
            office_obj = self._find_office(member.office_id)
            enriched.append(
                {
                    "id": member.id,
                    "name": member.name,
                    "role": member.role,
                    "officeId": member.office_id,
                    "officeName": member.office_name,
                    "isProducer": member.is_producer,
                    "npn": member.npn,
                    "languages": member.languages,
                    "experienceBadge": member.experience_badge,
                    "shortBio": member.short_bio,
                    "specialties": member.specialties,
                    "personalHighlight": member.personal_highlight,
                    "officeContact": {
                        "phone": office_obj.phone_formatted,
                        "email": office_obj.email,
                        "fullAddress": (
                            f"{office_obj.street_address}, {office_obj.city}, "
                            f"{office_obj.state} {office_obj.postal_code}"
                        ),
                        "directionsUrl": office_obj.directions_url,
                    },
                }
            )

        return {
            "total": len(enriched),
            "filtersApplied": {
                "office": office or "all",
                "language": language,
                "specialty": specialty,
                "producersOnly": producers_only,
            },
            "members": enriched,
        }

    def get_employee_profile(
        self, member_id_or_name: str
    ) -> Dict[str, Any]:
        """Retrieve full biography, credentials, and contact details for a team member.

        Args:
            member_id_or_name: Employee ID or full/partial name.

        Returns:
            Dictionary with found status and full employee profile.
        """
        query = member_id_or_name.strip().lower()
        if not query:
            return {
                "found": False,
                "error": "Query parameter cannot be empty.",
            }

        # 1. Exact ID match
        member = next(
            (m for m in self._members if m.id.lower() == query), None
        )

        # 2. Substring name match
        if not member:
            member = next(
                (m for m in self._members if query in m.name.lower()), None
            )

        # 3. Substring ID match
        if not member:
            member = next(
                (m for m in self._members if query in m.id.lower()), None
            )

        if not member:
            return {
                "found": False,
                "searchedTerm": member_id_or_name,
                "error": f"No employee matching '{member_id_or_name}' found.",
                "availableMemberIds": [m.id for m in self._members],
            }

        office_obj = self._find_office(member.office_id)

        return {
            "found": True,
            "profile": {
                "id": member.id,
                "name": member.name,
                "role": member.role,
                "officeId": member.office_id,
                "officeName": member.office_name,
                "isProducer": member.is_producer,
                "npn": member.npn,
                "languages": member.languages,
                "experienceBadge": member.experience_badge,
                "shortBio": member.short_bio,
                "fullBio": member.full_bio,
                "specialties": member.specialties,
                "personalHighlight": member.personal_highlight,
                "officeContact": {
                    "branchName": office_obj.name,
                    "streetAddress": office_obj.street_address,
                    "city": office_obj.city,
                    "state": office_obj.state,
                    "postalCode": office_obj.postal_code,
                    "fullAddress": (
                        f"{office_obj.street_address}, {office_obj.city}, "
                        f"{office_obj.state} {office_obj.postal_code}"
                    ),
                    "phone": office_obj.phone_formatted,
                    "fax": office_obj.fax,
                    "email": office_obj.email,
                    "hours": office_obj.hours,
                    "directionsUrl": office_obj.directions_url,
                },
                "consultation": {
                    "directPhone": office_obj.phone_formatted,
                    "quoteUrl": "/quote",
                    "bookingNote": (
                        f"Call {office_obj.phone_formatted} to consult directly "
                        f"with {member.name} at {member.office_name}."
                    ),
                },
            },
        }

    def find_agent_by_language(
        self,
        language: str,
        preferred_city: Optional[str] = None,
        producers_only: bool = False,
    ) -> Dict[str, Any]:
        """Find multilingual agents and branches supporting a specific language.

        Args:
            language: Requested language (English, Spanish, Portuguese, Turkish).
            preferred_city: Optional city preference (Danbury, Watertown, Bridgeport).
            producers_only: If True, restricts to licensed insurance producers.

        Returns:
            Dictionary with matching agents, top recommendation, and branch contact info.
        """
        normalized_lang = self._normalize_language(language)

        # Matching branches
        matching_branches = [
            loc
            for loc in self._offices
            if any(
                self._normalize_language(l).lower() == normalized_lang.lower()
                for l in loc.languages
            )
        ]

        primary_branch = matching_branches[0] if matching_branches else self._offices[0]
        if preferred_city:
            city_match = next(
                (
                    loc
                    for loc in matching_branches
                    if preferred_city.lower() in loc.city.lower()
                ),
                None,
            )
            if city_match:
                primary_branch = city_match

        # Matching agents
        matching_members = [
            m
            for m in self._members
            if any(
                self._normalize_language(l).lower() == normalized_lang.lower()
                for l in m.languages
            )
        ]

        if preferred_city:
            pref_lower = preferred_city.lower()
            matching_members.sort(
                key=lambda m: 0 if pref_lower in m.office_name.lower() else 1
            )

        if producers_only:
            matching_members = [m for m in matching_members if m.is_producer]

        formatted_agents = []
        for m in matching_members:
            off = self._find_office(m.office_id)
            formatted_agents.append(
                {
                    "id": m.id,
                    "name": m.name,
                    "role": m.role,
                    "officeId": m.office_id,
                    "officeName": m.office_name,
                    "isProducer": m.is_producer,
                    "npn": m.npn,
                    "specialties": m.specialties,
                    "languages": m.languages,
                    "officePhone": off.phone_formatted,
                }
            )

        # Recommended agent: prioritize licensed producer
        recommended = next(
            (a for a in formatted_agents if a["isProducer"]), None
        )
        if not recommended and formatted_agents:
            recommended = formatted_agents[0]

        return {
            "languageRequested": normalized_lang,
            "supported": len(matching_branches) > 0 and len(formatted_agents) > 0,
            "matchingAgentsCount": len(formatted_agents),
            "matchingAgents": formatted_agents,
            "recommendedAgent": recommended,
            "recommendedBranch": {
                "name": primary_branch.name,
                "city": primary_branch.city,
                "phone": primary_branch.phone_formatted,
                "directionsUrl": primary_branch.directions_url,
            },
            "bookingNote": (
                f"Call {recommended['officePhone']} to speak with {recommended['name']} "
                f"fluent in {normalized_lang}."
                if recommended
                else f"Call {primary_branch.phone_formatted} for assistance."
            ),
        }

    def _find_office(self, office_id: str) -> OfficeBranch:
        """Find office by ID or alias, defaulting to Danbury HQ."""
        target = office_id.lower().replace("-hq", "")
        for off in self._offices:
            if off.id.lower() == target or target in [
                a.lower() for a in off.aliases
            ]:
                return off
        return self._offices[0]

    @staticmethod
    def _normalize_language(lang: str) -> str:
        """Normalize language codes or synonyms to standard English names."""
        mapping = {
            "en": "English",
            "es": "Spanish",
            "pt": "Portuguese",
            "tr": "Turkish",
            "english": "English",
            "spanish": "Spanish",
            "portuguese": "Portuguese",
            "turkish": "Turkish",
            "inglés": "English",
            "ingles": "English",
            "español": "Spanish",
            "espanol": "Spanish",
            "português": "Portuguese",
            "portugues": "Portuguese",
            "türkçe": "Turkish",
            "turkce": "Turkish",
        }
        return mapping.get(lang.lower().strip(), lang.title())

    @staticmethod
    def _load_offices() -> List[OfficeBranch]:
        """Load the three official Connecticut office branches."""
        return [
            OfficeBranch(
                id="danbury",
                aliases=["danbury", "danbury-hq"],
                name="Danbury Corporate Office (HQ)",
                tag="Headquarters",
                short_name="Danbury HQ",
                street_address="50 Newtown Road, Suite 1",
                city="Danbury",
                state="CT",
                postal_code="06810",
                phone="203-748-9272",
                phone_formatted="(203) 748-9272",
                phone_raw="2037489272",
                fax="203-798-2917",
                email="danbury@aia-danbury.com",
                hours="Monday - Friday: 8:30 AM - 5:00 PM EST",
                directions_url="https://maps.google.com/?q=50+Newtown+Road,+Suite+1,+Danbury,+CT+06810",
                latitude=41.4087,
                longitude=-73.4285,
                is_headquarters=True,
                languages=["English", "Spanish", "Portuguese", "Turkish"],
            ),
            OfficeBranch(
                id="watertown",
                aliases=["watertown"],
                name="Watertown Branch Office",
                tag="Branch Office",
                short_name="Watertown",
                street_address="51 Depot St Ste 112",
                city="Watertown",
                state="CT",
                postal_code="06795",
                phone="860-274-8888",
                phone_formatted="(860) 274-8888",
                phone_raw="8602748888",
                fax=None,
                email="watertown@aia-danbury.com",
                hours="Monday - Friday: 8:30 AM - 5:00 PM EST",
                directions_url="https://maps.google.com/?q=51+Depot+St+Ste+112,+Watertown,+CT+06795",
                latitude=41.6018,
                longitude=-73.1139,
                is_headquarters=False,
                languages=["English", "Turkish"],
            ),
            OfficeBranch(
                id="bridgeport",
                aliases=["bridgeport"],
                name="Bridgeport Community Branch",
                tag="Branch Office",
                short_name="Bridgeport",
                street_address="2465 Main Street",
                city="Bridgeport",
                state="CT",
                postal_code="06606",
                phone="203-333-8880",
                phone_formatted="(203) 333-8880",
                phone_raw="2033338880",
                fax=None,
                email="bridgeport@aia-danbury.com",
                hours="Monday - Friday: 8:30 AM - 5:00 PM EST",
                directions_url="https://maps.google.com/?q=2465+Main+Street,+Bridgeport,+CT+06606",
                latitude=41.1963,
                longitude=-73.1972,
                is_headquarters=False,
                languages=["English", "Spanish", "Portuguese"],
            ),
        ]

    @staticmethod
    def _load_team_members() -> List[TeamMember]:
        """Load all nine AIA insurance professionals across the three branches."""
        return [
            TeamMember(
                id="ronald-boucher",
                name="Ronald T. Boucher",
                role="Principal & Founder",
                office_id="danbury",
                office_name="Danbury HQ",
                is_producer=True,
                npn="8963915",
                languages=["English"],
                experience_badge="Agency Founder (2008)",
                short_bio="Founder of Associated Insurance Agency LLC in 2008, bringing deep commercial and construction market expertise.",
                full_bio=(
                    "Ron Boucher is the founder of Associated Insurance Agency LLC in 2008 "
                    "and is still an active team member. Coming from the construction field he is a "
                    "major asset in the commercial market. He has grown the agency over the years "
                    "to include all team members. He also enjoys SCUBA Diving, woodworking, and family time."
                ),
                specialties=[
                    "Commercial Lines",
                    "Construction Risks",
                    "Business Liability",
                    "Agency Leadership",
                ],
                personal_highlight="Enjoys SCUBA diving, woodworking in his shop, and family time.",
            ),
            TeamMember(
                id="yesica-ramirez",
                name="Yesica D. Ramirez-Mendez",
                role="Customer Service Representative",
                office_id="danbury",
                office_name="Danbury HQ",
                is_producer=False,
                npn=None,
                languages=["English", "Spanish", "Portuguese"],
                experience_badge="13+ Years Experience • 10+ at AIA",
                short_bio="Over 13 years of experience specializing in commercial and personal coverage for truckers, contractors, and individuals.",
                full_bio=(
                    "Yesica Ramirez is an insurance professional with more than 13 years of experience. "
                    "She specializes in commercial and personal insurance, with a strong focus on truckers, "
                    "contractors, and individuals. She has been an AIA team member for over 10 years."
                ),
                specialties=[
                    "Truckers & Transportation",
                    "Contractors Insurance",
                    "Personal Policies",
                    "Commercial Coverage",
                ],
                personal_highlight="Deeply committed to personalized community service and long-term relationships.",
            ),
            TeamMember(
                id="isayeli-perez",
                name="Isayeli Perez De La Mora",
                role="Customer Service Representative",
                office_id="danbury",
                office_name="Danbury HQ",
                is_producer=True,
                npn="20265776",
                languages=["English", "Portuguese", "Spanish"],
                experience_badge="Licensed Producer • Since 2020",
                short_bio="Licensed producer specializing in General Liability and Property policies for multifamily dwellings, personal, and commercial lines.",
                full_bio=(
                    "Isayeli joined the AIA family in November 2020. She obtained her Producer's License "
                    "and works with both Personal and Commercial Lines, primarily General Liability and "
                    "Property policies for multifamily dwellings."
                ),
                specialties=[
                    "Multifamily Dwellings",
                    "General Liability",
                    "Property Policies",
                    "Personal & Commercial Lines",
                ],
                personal_highlight="Cherishes family time and being a devoted mother to two kids.",
            ),
            TeamMember(
                id="ema-rego",
                name="Ema Rego",
                role="Customer Service Representative",
                office_id="danbury",
                office_name="Danbury HQ",
                is_producer=True,
                npn="21656039",
                languages=["English", "Portuguese", "Spanish"],
                experience_badge="Licensed Producer • Insurance Since 2020",
                short_bio="Licensed producer with 20+ years of customer service experience, guiding Connecticut clients in personal and commercial insurance.",
                full_bio=(
                    "Ema is from Brazil and brings over 20 years of customer service experience, serving the "
                    "Connecticut community in Portuguese, English, and Spanish across personal and commercial lines."
                ),
                specialties=[
                    "Personal Lines",
                    "Commercial Coverage",
                    "Client Consultation",
                    "Multilingual Support",
                ],
                personal_highlight="Avid reader who treasures quality family gatherings.",
            ),
            TeamMember(
                id="clara-de-barros",
                name="Clara De Barros",
                role="Customer Service Representative",
                office_id="danbury",
                office_name="Danbury HQ",
                is_producer=False,
                npn=None,
                languages=["English", "Portuguese", "Spanish"],
                experience_badge="AIA Team Member Since 2023",
                short_bio="Provides clear guidance and smooth policy support, ensuring every client receives reliable, personalized assistance.",
                full_bio=(
                    "Clara is originally from Brazil and joined AIA in 2023. She focuses on assisting clients "
                    "with clear policy guidance, billing resolutions, and efficient customer support."
                ),
                specialties=[
                    "Client Support",
                    "Policy Guidance",
                    "Inquiry Resolution",
                    "Customer Care",
                ],
                personal_highlight="Enjoys fitness, family gatherings, and playing with Goldendoodle Simba.",
            ),
            TeamMember(
                id="ashley-mercan",
                name="Ashley L. Mercan",
                role="Customer Service Representative",
                office_id="watertown",
                office_name="Watertown Branch",
                is_producer=False,
                npn=None,
                languages=["English", "Turkish"],
                experience_badge="3+ Years at Watertown Office",
                short_bio="Personal Lines specialist at Watertown office covering Home, Auto, Umbrella, Dwelling Fire, Classic Vehicles, and Pet Insurance.",
                full_bio=(
                    "Ashley Mercan specializes in Personal Lines insurance at the Watertown branch, "
                    "including Home, Auto, Dwelling Fire, Umbrella, Classic Vehicles, and Pet Insurance."
                ),
                specialties=[
                    "Home & Auto",
                    "Umbrella Liability",
                    "Dwelling Fire",
                    "Classic Vehicles & Pets",
                ],
                personal_highlight="Passionate about travel, photography, and spending time with loved ones.",
            ),
            TeamMember(
                id="janaija-hammer",
                name="Janaija S. Hammer",
                role="Customer Service Representative",
                office_id="watertown",
                office_name="Watertown Branch",
                is_producer=False,
                npn=None,
                languages=["English"],
                experience_badge="Front Desk CSR • Watertown Office",
                short_bio="Front Desk CSR at our Watertown office, assisting clients with policy inquiries, billing, and seamless account servicing.",
                full_bio=(
                    "Janaija Hammer ('Nai') works as the Front Desk CSR in Watertown, managing "
                    "incoming calls, payment processing, and policy service workflows."
                ),
                specialties=[
                    "Front Desk Reception",
                    "Policy Inquiries",
                    "Payment Processing",
                    "Customer Support",
                ],
                personal_highlight="Goes by 'Nai', loves caring for pets and spending time with friends.",
            ),
            TeamMember(
                id="camila-macedo",
                name="Camila Macedo de Jesus",
                role="Customer Service Representative",
                office_id="bridgeport",
                office_name="Bridgeport Branch",
                is_producer=True,
                npn="19946151",
                languages=["English", "Portuguese", "Spanish"],
                experience_badge="Licensed Producer • AIA Since 2020",
                short_bio="Licensed producer dedicated to helping clients feel confident, protected, and fully supported across commercial and personal coverage.",
                full_bio=(
                    "Camila has been part of AIA since 2020 at the Bridgeport branch. She specializes in "
                    "commercial and personal coverage and is fluent in English, Portuguese, and Spanish."
                ),
                specialties=[
                    "Commercial Coverage",
                    "Personal Insurance",
                    "Coverage Consultations",
                    "Policy Servicing",
                ],
                personal_highlight="Loves warm beach days, quality family time, and continuous learning.",
            ),
            TeamMember(
                id="betania-almeida",
                name="Betania Almeida",
                role="Customer Service Representative",
                office_id="bridgeport",
                office_name="Bridgeport Branch",
                is_producer=False,
                npn=None,
                languages=["English", "Spanish", "Portuguese"],
                experience_badge="10+ Years Experience",
                short_bio="Over a decade of industry expertise helping business owners and individuals build reliable, tailored coverage solutions.",
                full_bio=(
                    "With over 10 years in the insurance industry, Betania works closely with businesses "
                    "of all sizes at the Bridgeport branch to structure reliable, tailored protection."
                ),
                specialties=[
                    "Commercial Risk",
                    "Small Business Solutions",
                    "Personal Lines",
                    "Client Advocacy",
                ],
                personal_highlight="Known for approachable, dependable client service and long-term trust.",
            ),
        ]
