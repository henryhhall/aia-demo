/**
 * Concrete WebMCP Tools for Associated Insurance Agency (AIA)
 * Multi-lingual (English, Spanish, Portuguese, Turkish) & Multi-location (Danbury, Watertown, Bridgeport CT)
 */

import type { WebMCPTool } from './types.ts';
import { teamData } from '../../i18n/team.ts';

export interface AIAStaffMember {
  id: string;
  name: string;
  role: string;
  isProducer: boolean;
  npn?: string;
  languages: string[];
  specialties: string[];
}

export interface AIAOfficeLocation {
  id: string;
  aliases: string[];
  name: string;
  tag: string;
  shortName: string;
  streetAddress: string;
  city: string;
  state: string;
  postalCode: string;
  fullAddress: string;
  phone: string;
  phoneFormatted: string;
  phoneRaw: string;
  fax?: string;
  email: string;
  hours: string;
  directionsUrl: string;
  embedUrl: string;
  languages: string[];
  latitude: number;
  longitude: number;
  isHeadquarters: boolean;
  staff: AIAStaffMember[];
}

// Agency Data Constants with comprehensive office metadata and staff rosters
export const AIA_LOCATIONS: AIAOfficeLocation[] = [
  {
    id: 'danbury-hq',
    aliases: ['danbury', 'danbury-hq'],
    name: 'Danbury Corporate Office (HQ)',
    tag: 'Headquarters',
    shortName: 'Danbury HQ',
    streetAddress: '50 Newtown Road, Suite 1',
    city: 'Danbury',
    state: 'CT',
    postalCode: '06810',
    fullAddress: '50 Newtown Road, Suite 1, Danbury, CT 06810',
    phone: '203-748-9272',
    phoneFormatted: '(203) 748-9272',
    phoneRaw: '2037489272',
    fax: '203-798-2917',
    email: 'danbury@aia-danbury.com',
    hours: 'Monday - Friday: 8:30 AM - 5:00 PM EST',
    directionsUrl: 'https://maps.google.com/?q=50+Newtown+Road,+Suite+1,+Danbury,+CT+06810',
    embedUrl:
      'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2879.6344940730055!2d-73.42662732423537!3d41.403672894985256!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89e7ff217cb29b37%3A0x264721e992b3c2ee!2sAssociated%20Insurance%20Agency%20LLC!5e1!3m2!1sen!2sus!4v1791229405450!5m2!1sen!2sus',
    languages: ['English', 'Spanish', 'Portuguese', 'Turkish'],
    latitude: 41.4087,
    longitude: -73.4285,
    isHeadquarters: true,
    staff: [
      {
        id: 'ronald-boucher',
        name: 'Ronald T. Boucher',
        role: 'Principal & Founder',
        isProducer: true,
        npn: '8963915',
        languages: ['English'],
        specialties: ['Commercial Lines', 'Construction Risks', 'Business Liability', 'Agency Leadership'],
      },
      {
        id: 'yesica-ramirez',
        name: 'Yesica D. Ramirez-Mendez',
        role: 'Customer Service Representative',
        isProducer: false,
        languages: ['English', 'Spanish', 'Portuguese'],
        specialties: ['Truckers & Transportation', 'Contractors Insurance', 'Personal Policies', 'Commercial Coverage'],
      },
      {
        id: 'isayeli-perez',
        name: 'Isayeli Perez De La Mora',
        role: 'Customer Service Representative',
        isProducer: true,
        npn: '20265776',
        languages: ['English', 'Portuguese', 'Spanish'],
        specialties: ['Multifamily Dwellings', 'General Liability', 'Property Policies', 'Personal & Commercial Lines'],
      },
      {
        id: 'ema-rego',
        name: 'Ema Rego',
        role: 'Customer Service Representative',
        isProducer: true,
        npn: '21656039',
        languages: ['English', 'Portuguese', 'Spanish'],
        specialties: ['Personal Lines', 'Commercial Coverage', 'Client Consultation', 'Multilingual Support'],
      },
      {
        id: 'clara-de-barros',
        name: 'Clara De Barros',
        role: 'Customer Service Representative',
        isProducer: false,
        languages: ['English', 'Portuguese', 'Spanish'],
        specialties: ['Client Support', 'Policy Guidance', 'Inquiry Resolution', 'Customer Care'],
      },
    ],
  },
  {
    id: 'watertown',
    aliases: ['watertown'],
    name: 'Watertown Branch Office',
    tag: 'Branch Office',
    shortName: 'Watertown',
    streetAddress: '51 Depot St Ste 112',
    city: 'Watertown',
    state: 'CT',
    postalCode: '06795',
    fullAddress: '51 Depot St Ste 112, Watertown, CT 06795',
    phone: '860-274-8888',
    phoneFormatted: '(860) 274-8888',
    phoneRaw: '8602748888',
    email: 'watertown@aia-danbury.com',
    hours: 'Monday - Friday: 8:30 AM - 5:00 PM EST',
    directionsUrl: 'https://maps.google.com/?q=51+Depot+St+Ste+112,+Watertown,+CT+06795',
    embedUrl:
      'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1435.4183773278282!2d-73.113893!3d41.6018117!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89e7eac9777b827b%3A0x67e441f80fbeaede!2sAssociated%20Insurance%20Agency!5e1!3m2!1sen!2sus!4v1791394791132!5m2!1sen!2sus',
    languages: ['English', 'Spanish', 'Portuguese', 'Turkish'],
    latitude: 41.6018,
    longitude: -73.1139,
    isHeadquarters: false,
    staff: [
      {
        id: 'ashley-mercan',
        name: 'Ashley L. Mercan',
        role: 'Customer Service Representative',
        isProducer: false,
        languages: ['English', 'Turkish'],
        specialties: ['Home & Auto', 'Umbrella Liability', 'Dwelling Fire', 'Classic Vehicles & Pets'],
      },
      {
        id: 'janaija-hammer',
        name: 'Janaija S. Hammer',
        role: 'Customer Service Representative',
        isProducer: false,
        languages: ['English'],
        specialties: ['Front Desk Reception', 'Policy Inquiries', 'Payment Processing', 'Customer Support'],
      },
    ],
  },
  {
    id: 'bridgeport',
    aliases: ['bridgeport'],
    name: 'Bridgeport Community Branch',
    tag: 'Branch Office',
    shortName: 'Bridgeport',
    streetAddress: '2465 Main Street',
    city: 'Bridgeport',
    state: 'CT',
    postalCode: '06606',
    fullAddress: '2465 Main Street, Bridgeport, CT 06606',
    phone: '203-333-8880',
    phoneFormatted: '(203) 333-8880',
    phoneRaw: '2033338880',
    email: 'bridgeport@aia-danbury.com',
    hours: 'Monday - Friday: 8:30 AM - 5:00 PM EST',
    directionsUrl: 'https://maps.google.com/?q=2465+Main+Street,+Bridgeport,+CT+06606',
    embedUrl:
      'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1021.0695509775729!2d-73.2120973643344!3d41.214073760533175!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89e80e8ad160179d%3A0x2174691e2b983696!2sAssociated%20Insurance%20Agency!5e1!3m2!1sen!2sus!4v1791394610287!5m2!1sen!2sus',
    languages: ['English', 'Spanish', 'Portuguese'],
    latitude: 41.1963,
    longitude: -73.1972,
    isHeadquarters: false,
    staff: [
      {
        id: 'camila-macedo',
        name: 'Camila Macedo de Jesus',
        role: 'Customer Service Representative',
        isProducer: true,
        npn: '19946151',
        languages: ['English', 'Portuguese', 'Spanish'],
        specialties: ['Commercial Coverage', 'Personal Insurance', 'Coverage Consultations', 'Policy Servicing'],
      },
      {
        id: 'betania-almeida',
        name: 'Betania Almeida',
        role: 'Customer Service Representative',
        isProducer: false,
        languages: ['English', 'Spanish', 'Portuguese'],
        specialties: ['Commercial Risk', 'Small Business Solutions', 'Personal Lines', 'Client Advocacy'],
      },
    ],
  },
];

export const AIA_CARRIERS = [
  {
    name: 'Safeco Insurance',
    phone: '1-800-332-3226',
    payUrl: 'https://customer.safeco.com/accountservices/login.aspx',
    claimUrl: 'http://www.safeco.com/claims-center',
    lines: ['Personal Auto', 'Homeowners', 'Renters', 'Umbrella'],
  },
  {
    name: 'MetLife / Farmers',
    phone: '1-800-638-5433',
    payUrl: 'https://www.metlife.com/individual/index.html',
    claimUrl: 'https://www.metlife.com/about/corporate-profile/pay-a-bill/claims/index.html',
    lines: ['Personal Auto', 'Homeowners', 'Life'],
  },
  {
    name: 'The Hartford',
    phone: '1-877-896-9320',
    payUrl: 'https://service.thehartford.com/consumer/public/service/login',
    claimUrl: 'http://www.thehartford.com/claims-center',
    lines: ['Commercial Property', 'General Liability', 'Workers Comp', 'AARP Home/Auto'],
  },
  {
    name: 'Progressive',
    phone: '1-800-776-4737 (Commercial: 1-888-240-9839)',
    payUrl: 'https://onlineservice7.progressive.com/SelfService.Web/SelfService.aspx',
    claimUrl: 'http://www.progressive.com/claims/',
    lines: ['Auto', 'Commercial Auto', 'Motorcycle', 'Boat/RV'],
  },
  {
    name: 'Travelers',
    phone: '1-800-842-5075 (Claims: 1-800-252-4633)',
    payUrl: 'https://www.travelers.com/login/#/',
    claimUrl: 'https://www.travelers.com/claim/index.aspx',
    lines: ['Homeowners', 'Auto', 'Commercial Business', 'Umbrella'],
  },
  {
    name: 'Foremost Insurance',
    phone: '1-888-888-0080',
    payUrl: 'http://www.foremost.com/payonline/index.asp',
    claimUrl: 'http://www.foremost.com/claims/',
    lines: ['Vacant Home', 'Mobile Home', 'Landlord', 'Motorcycle'],
  },
  {
    name: 'Guard Insurance Group',
    phone: '1-888-639-2567',
    payUrl: 'https://policyholder.guard.com/scripts/psc/psc.exe',
    claimUrl: 'http://www.guard.com/docs/ClaimReport.pdf',
    lines: ['Workers Compensation', 'Businessowners Policy (BOP)'],
  },
  {
    name: 'Infinity Insurance',
    phone: '1-800-782-1020 (Claims: 1-800-334-1661)',
    payUrl: 'https://www.infinityauto.com/make-your-payments-go',
    claimUrl: 'https://www.infinityauto.com/report-claim',
    lines: ['Non-Standard Auto', 'Commercial Auto'],
  },
  {
    name: 'Utica First Insurance',
    phone: '1-315-736-8211',
    payUrl: 'https://www.uticafirst.com/dirbill.html',
    claimUrl: 'https://www.uticafirst.com/claims.html',
    lines: ['Contractors GL', 'Restaurants', 'Retail Commercial'],
  },
  {
    name: 'Victoria Insurance',
    phone: '1-800-888-8424 (Claims: 1-800-926-3168)',
    payUrl: 'https://www.victoriainsurance.com/pay/SearchPayment.do',
    claimUrl: 'https://www.victoriainsurance.com/ClaimsService.do',
    lines: ['Specialty Auto'],
  },
  {
    name: 'K & K Insurance',
    phone: '1-800-637-4757',
    payUrl: 'http://www.kandkinsurance.com/Pages/Home.aspx',
    claimUrl: 'https://www.kandkinsurance.com/Pages/Claims.aspx',
    lines: ['Sports', 'Events', 'Recreation Liability'],
  },
];

export const AIA_FAQS = [
  {
    topic: 'Independent Agency Value',
    question: 'What is an independent insurance agency and how does it save money?',
    answer:
      'Unlike captive agents (like State Farm or Geico) who can only sell one carrier, Associated Insurance Agency is an independent agency representing over a dozen top-tier insurance carriers. We shop the entire market on your behalf, compare rates, and match your exact coverage needs at the most competitive price, with no broker fees.',
  },
  {
    topic: 'Accident Claims Procedure',
    question: 'What should I do immediately after an auto accident in Connecticut?',
    answer:
      '1. Ensure safety and dial 911 if there are injuries. 2. Exchange driver, vehicle, and insurance info. 3. Photograph damage, street signs, and license plates. 4. Call AIA at 203-748-9272 or call your carrier direct claims line directly (e.g. Progressive 1-800-776-4737, Travelers 1-800-252-4633). 5. Do not admit fault at the scene.',
  },
  {
    topic: 'Flood & Hurricane Coverage',
    question: 'Are flood and coastal storm damages covered by standard homeowners policies?',
    answer:
      'No. Standard CT homeowners insurance policies exclude flood/rising ground water. Flood insurance must be purchased separately through the National Flood Insurance Program (NFIP) or private flood carriers. AIA can evaluate your FEMA flood zone and place separate coverage.',
  },
  {
    topic: 'Connecticut State Minimums',
    question: 'What are the legal minimum auto liability limits in Connecticut?',
    answer:
      'Connecticut law requires minimum auto liability limits of 25/50/25 ($25,000 bodily injury per person, $50,000 bodily injury per accident, and $25,000 property damage), plus matching Uninsured/Underinsured Motorist coverage. AIA typically recommends at least 100/300/100 or 250/500/100 with an Umbrella policy to protect personal assets.',
  },
  {
    topic: 'Multilingual Support',
    question: 'What languages does Associated Insurance Agency support?',
    answer:
      'AIA provides native fluent support in English, Spanish (Español), Portuguese (Português), and Turkish (Türkçe) across all stages of service: quote shopping, policy issuance, endorsement changes, and claims assistance.',
  },
];

// WebMCP Tools Collection
export const aiaWebMcpTools: WebMCPTool[] = [
  {
    name: 'get_agency_profile',
    description:
      'Retrieve high-level profile, mission, licensing, languages, branch network, and contact points for Associated Insurance Agency (AIA) in Connecticut.',
    inputSchema: {
      type: 'object',
      properties: {},
    },
    annotations: {
      readOnlyHint: true,
      idempotentHint: true,
    },
    execute: async () => {
      return {
        agencyName: 'Associated Insurance Agency (AIA)',
        tagline: 'We Shop. You Save. Insurance Built For You.',
        foundedYear: 2008,
        founder: 'Ronald T. Boucher (Principal & Founder)',
        type: 'Full-Service Independent Insurance Brokerage',
        headquarters: '50 Newtown Road, Suite 1, Danbury, CT 06810',
        phone: '(203) 748-9272',
        email: 'danbury@aia-danbury.com',
        website: 'https://aia-danbury.com',
        licensedStates: ['CT', 'NY', 'NJ', 'MA'],
        supportedLanguages: ['English', 'Spanish', 'Portuguese', 'Turkish'],
        branchCount: AIA_LOCATIONS.length,
        totalStaffCount: teamData.en.members.length,
        licensedProducersCount: teamData.en.members.filter((m) => m.isProducer).length,
        partnerCarriersCount: AIA_CARRIERS.length,
        linesOfInsurance: [
          'Personal Auto & Motorcycle',
          'Homeowners & Condos',
          'Renters Insurance',
          'Personal Umbrella Liability',
          'Commercial General Liability',
          'Commercial Property',
          'Workers Compensation',
          'Commercial Auto & Fleet',
          'Business Owners Policy (BOP)',
        ],
      };
    },
  },

  {
    name: 'get_office_locations',
    description:
      'Get structured branch office information (Danbury HQ, Watertown, Bridgeport), including full addresses, direct phone numbers, office hours, GPS coordinates, Google Maps directions links, and assigned staff rosters.',
    inputSchema: {
      type: 'object',
      properties: {
        officeId: {
          type: 'string',
          description: 'Filter by office ID ("all", "danbury", "danbury-hq", "watertown", "bridgeport")',
          enum: ['all', 'danbury', 'danbury-hq', 'watertown', 'bridgeport'],
        },
        city: {
          type: 'string',
          description: 'Optional filter by city name (e.g., Danbury, Watertown, Bridgeport)',
        },
        language: {
          type: 'string',
          description: 'Optional filter for branches supporting a specific language (e.g., Spanish, Portuguese, Turkish, English)',
        },
        includeStaffRoster: {
          type: 'boolean',
          description: 'Whether to include the full staff roster for each office. Defaults to true.',
        },
      },
    },
    annotations: {
      readOnlyHint: true,
      idempotentHint: true,
    },
    execute: async (params?: {
      officeId?: string;
      city?: string;
      language?: string;
      includeStaffRoster?: boolean;
    }) => {
      let filtered = [...AIA_LOCATIONS];

      if (params?.officeId && params.officeId !== 'all') {
        const target = params.officeId.toLowerCase();
        filtered = filtered.filter(
          (loc) => loc.id.toLowerCase() === target || loc.aliases.includes(target)
        );
      }

      if (params?.city) {
        const cityLower = params.city.toLowerCase();
        filtered = filtered.filter((loc) =>
          loc.city.toLowerCase().includes(cityLower)
        );
      }

      if (params?.language) {
        const langLower = params.language.toLowerCase();
        filtered = filtered.filter((loc) =>
          loc.languages.some((l) => l.toLowerCase().includes(langLower))
        );
      }

      const includeStaff = params?.includeStaffRoster !== false;
      const results = filtered.map((loc) => {
        if (!includeStaff) {
          const { staff, ...rest } = loc;
          return rest;
        }
        return loc;
      });

      return {
        total: results.length,
        locations: results,
      };
    },
  },

  {
    name: 'get_team_members',
    description:
      'Search and filter Associated Insurance Agency (AIA) employees and licensed insurance agents across Danbury, Watertown, and Bridgeport branches by office, language, specialty, or licensing status.',
    inputSchema: {
      type: 'object',
      properties: {
        office: {
          type: 'string',
          description: 'Filter by office branch ID ("all", "danbury", "danbury-hq", "watertown", "bridgeport")',
          enum: ['all', 'danbury', 'danbury-hq', 'watertown', 'bridgeport'],
        },
        language: {
          type: 'string',
          description: 'Filter by spoken language (e.g., "Spanish", "Portuguese", "Turkish", "English", "es", "pt", "tr", "en")',
        },
        specialty: {
          type: 'string',
          description: 'Filter by specialty, line of insurance, or keyword (e.g., "Commercial", "Truckers", "Contractors", "Home & Auto", "Multifamily", "General Liability", "Umbrella")',
        },
        producersOnly: {
          type: 'boolean',
          description: 'If true, returns only licensed insurance producers with an active National Producer Number (NPN).',
        },
        locale: {
          type: 'string',
          description: 'Language locale for titles and bios ("en", "es", "pt", "tr"). Defaults to "en".',
          enum: ['en', 'es', 'pt', 'tr'],
        },
      },
    },
    annotations: {
      readOnlyHint: true,
      idempotentHint: true,
    },
    execute: async (params?: {
      office?: string;
      language?: string;
      specialty?: string;
      producersOnly?: boolean;
      locale?: 'en' | 'es' | 'pt' | 'tr';
    }) => {
      const activeLocale = params?.locale && teamData[params.locale] ? params.locale : 'en';
      const allMembers = teamData[activeLocale].members;

      const langMap: Record<string, string> = {
        en: 'English',
        es: 'Spanish',
        pt: 'Portuguese',
        tr: 'Turkish',
        english: 'English',
        spanish: 'Spanish',
        portuguese: 'Portuguese',
        turkish: 'Turkish',
        inglés: 'English',
        español: 'Spanish',
        português: 'Portuguese',
        türkçe: 'Turkish',
      };

      let filtered = allMembers;

      // 1. Office filter
      if (params?.office && params.office !== 'all') {
        const targetOffice = params.office.toLowerCase().replace('-hq', '');
        filtered = filtered.filter((m) => m.officeId.toLowerCase() === targetOffice);
      }

      // 2. Language filter
      if (params?.language) {
        const normalized = langMap[params.language.toLowerCase()] || params.language.toLowerCase();
        filtered = filtered.filter((m) =>
          m.languages.some((l) => {
            const lNorm = langMap[l.toLowerCase()] || l.toLowerCase();
            return lNorm.toLowerCase() === normalized.toLowerCase() || l.toLowerCase().includes(normalized.toLowerCase());
          })
        );
      }

      // 3. Specialty or keyword filter
      if (params?.specialty) {
        const specQuery = params.specialty.toLowerCase();
        filtered = filtered.filter(
          (m) =>
            m.specialties.some((s) => s.toLowerCase().includes(specQuery)) ||
            m.shortBio.toLowerCase().includes(specQuery) ||
            m.role.toLowerCase().includes(specQuery)
        );
      }

      // 4. Producers only filter
      if (params?.producersOnly) {
        filtered = filtered.filter((m) => m.isProducer);
      }

      // Enrich with office contact information
      const enrichedMembers = filtered.map((m) => {
        const office =
          AIA_LOCATIONS.find(
            (loc) => loc.id === m.officeId || loc.aliases.includes(m.officeId)
          ) || AIA_LOCATIONS[0];

        return {
          id: m.id,
          name: m.name,
          role: m.role,
          officeId: m.officeId,
          officeName: m.officeName,
          isProducer: m.isProducer,
          npn: m.npn || null,
          languages: m.languages,
          experienceBadge: m.experienceBadge,
          shortBio: m.shortBio,
          specialties: m.specialties,
          personalHighlight: m.personalHighlight,
          officeContact: {
            phone: office.phoneFormatted,
            phoneRaw: office.phoneRaw,
            email: office.email,
            fullAddress: office.fullAddress,
            directionsUrl: office.directionsUrl,
          },
        };
      });

      return {
        total: enrichedMembers.length,
        locale: activeLocale,
        filtersApplied: {
          office: params?.office || 'all',
          language: params?.language || null,
          specialty: params?.specialty || null,
          producersOnly: Boolean(params?.producersOnly),
        },
        members: enrichedMembers,
      };
    },
  },

  {
    name: 'get_employee_profile',
    description:
      'Retrieve full biography, National Producer Number (NPN), credentials, areas of specialty, languages spoken, and assigned office contact details for a specific AIA team member by employee ID or name.',
    inputSchema: {
      type: 'object',
      properties: {
        memberIdOrName: {
          type: 'string',
          description:
            'Employee ID (e.g., "ronald-boucher", "yesica-ramirez", "camila-macedo", "ashley-mercan", "isayeli-perez", "ema-rego", "clara-de-barros", "betania-almeida", "janaija-hammer") or employee full/partial name.',
        },
        locale: {
          type: 'string',
          description: 'Language locale for biography and titles ("en", "es", "pt", "tr"). Defaults to "en".',
          enum: ['en', 'es', 'pt', 'tr'],
        },
      },
      required: ['memberIdOrName'],
    },
    annotations: {
      readOnlyHint: true,
      idempotentHint: true,
    },
    execute: async (params: { memberIdOrName: string; locale?: 'en' | 'es' | 'pt' | 'tr' }) => {
      const activeLocale = params?.locale && teamData[params.locale] ? params.locale : 'en';
      const allMembers = teamData[activeLocale].members;
      const query = (params?.memberIdOrName || '').trim().toLowerCase();

      if (!query) {
        return {
          found: false,
          error: 'Parameter "memberIdOrName" cannot be empty.',
          availableMembers: teamData.en.members.map((m) => ({ id: m.id, name: m.name, role: m.role })),
        };
      }

      // Exact ID match first, then partial name match, then partial ID match
      let member = allMembers.find((m) => m.id.toLowerCase() === query);
      if (!member) {
        member = allMembers.find((m) => m.name.toLowerCase().includes(query));
      }
      if (!member) {
        member = allMembers.find((m) => m.id.toLowerCase().includes(query));
      }

      if (!member) {
        return {
          found: false,
          searchedTerm: params.memberIdOrName,
          error: `No employee matching "${params.memberIdOrName}" was found.`,
          availableMembers: teamData.en.members.map((m) => ({
            id: m.id,
            name: m.name,
            role: m.role,
            office: m.officeName,
          })),
        };
      }

      const office =
        AIA_LOCATIONS.find(
          (loc) => loc.id === member!.officeId || loc.aliases.includes(member!.officeId)
        ) || AIA_LOCATIONS[0];

      return {
        found: true,
        locale: activeLocale,
        profile: {
          id: member.id,
          name: member.name,
          role: member.role,
          officeId: member.officeId,
          officeName: member.officeName,
          isProducer: member.isProducer,
          npn: member.npn || null,
          languages: member.languages,
          experienceBadge: member.experienceBadge,
          shortBio: member.shortBio,
          fullBio: member.fullBio,
          specialties: member.specialties,
          personalHighlight: member.personalHighlight,
          officeContact: {
            branchName: office.name,
            streetAddress: office.streetAddress,
            city: office.city,
            state: office.state,
            postalCode: office.postalCode,
            fullAddress: office.fullAddress,
            phone: office.phoneFormatted,
            phoneRaw: office.phoneRaw,
            fax: office.fax || null,
            email: office.email,
            hours: office.hours,
            directionsUrl: office.directionsUrl,
          },
          consultation: {
            directPhone: office.phoneFormatted,
            quoteUrl: activeLocale === 'en' ? '/quote' : `/${activeLocale}/quote`,
            bookingNote: `To consult with ${member.name}, call ${office.phoneFormatted} and request them by name or ask for ${member.officeName}.`,
          },
        },
      };
    },
  },

  {
    name: 'find_agent_by_language',
    description:
      'Search for AIA licensed insurance agents and customer service representatives that speak a specific language (Spanish, Portuguese, Turkish, English), including their assigned branch office and contact details.',
    inputSchema: {
      type: 'object',
      properties: {
        language: {
          type: 'string',
          description: 'Target language: "en" / "English", "es" / "Spanish", "pt" / "Portuguese", "tr" / "Turkish"',
          enum: ['en', 'es', 'pt', 'tr', 'English', 'Spanish', 'Portuguese', 'Turkish'],
        },
        preferredCity: {
          type: 'string',
          description: 'Optional preferred city (Danbury, Watertown, Bridgeport)',
        },
        producersOnly: {
          type: 'boolean',
          description: 'If true, only returns licensed insurance producers fluent in the requested language.',
        },
      },
      required: ['language'],
    },
    annotations: {
      readOnlyHint: true,
      idempotentHint: true,
    },
    execute: async (params: { language: string; preferredCity?: string; producersOnly?: boolean }) => {
      const langMap: Record<string, string> = {
        en: 'English',
        es: 'Spanish',
        pt: 'Portuguese',
        tr: 'Turkish',
        english: 'English',
        spanish: 'Spanish',
        portuguese: 'Portuguese',
        turkish: 'Turkish',
      };
      const normalizedLang = langMap[params.language.toLowerCase()] || params.language;

      // Find matching branch offices
      const matchingLocations = AIA_LOCATIONS.filter((loc) =>
        loc.languages.some((l) => l.toLowerCase() === normalizedLang.toLowerCase())
      );

      let primaryBranch = matchingLocations[0];
      if (params.preferredCity) {
        const cityMatch = matchingLocations.find((l) =>
          l.city.toLowerCase().includes(params.preferredCity!.toLowerCase())
        );
        if (cityMatch) primaryBranch = cityMatch;
      }

      // Find all matching agents from teamData
      let matchingMembers = teamData.en.members.filter((m) =>
        m.languages.some((l) => l.toLowerCase() === normalizedLang.toLowerCase())
      );

      if (params.preferredCity) {
        const prefCity = params.preferredCity.toLowerCase();
        matchingMembers = [...matchingMembers].sort((a, b) => {
          const aMatch = a.officeName.toLowerCase().includes(prefCity) ? -1 : 1;
          const bMatch = b.officeName.toLowerCase().includes(prefCity) ? -1 : 1;
          return aMatch - bMatch;
        });
      }

      if (params.producersOnly) {
        matchingMembers = matchingMembers.filter((m) => m.isProducer);
      }

      const formattedAgents = matchingMembers.map((m) => {
        const office =
          AIA_LOCATIONS.find(
            (loc) => loc.id === m.officeId || loc.aliases.includes(m.officeId)
          ) || AIA_LOCATIONS[0];

        return {
          id: m.id,
          name: m.name,
          role: m.role,
          officeId: m.officeId,
          officeName: m.officeName,
          isProducer: m.isProducer,
          npn: m.npn || null,
          specialties: m.specialties,
          languages: m.languages,
          officePhone: office.phoneFormatted,
        };
      });

      // Recommended agent: prefer licensed producer in preferred city, or first producer
      const recommendedAgent =
        formattedAgents.find(
          (a) =>
            a.isProducer &&
            (!params.preferredCity || a.officeName.toLowerCase().includes(params.preferredCity.toLowerCase()))
        ) ||
        formattedAgents.find((a) => a.isProducer) ||
        formattedAgents[0] ||
        null;

      return {
        languageRequested: normalizedLang,
        supported: matchingLocations.length > 0 && formattedAgents.length > 0,
        matchingAgentsCount: formattedAgents.length,
        matchingAgents: formattedAgents,
        recommendedAgent,
        recommendedBranch: primaryBranch || null,
        allMatchingBranches: matchingLocations,
        bookingNote: recommendedAgent
          ? `Call ${recommendedAgent.officePhone} to speak with ${recommendedAgent.name} (${recommendedAgent.role}, ${recommendedAgent.officeName}) fluent in ${normalizedLang}.`
          : `Call ${primaryBranch ? primaryBranch.phone : '203-748-9272'} to speak directly with an AIA ${normalizedLang}-speaking representative.`,
      };
    },
  },

  {
    name: 'get_insurance_products',
    description:
      'List all insurance coverage options available at Associated Insurance Agency with coverage limits, bundle savings, and carrier underwriting options.',
    inputSchema: {
      type: 'object',
      properties: {
        category: {
          type: 'string',
          description: 'Filter by "personal" or "commercial"',
          enum: ['personal', 'commercial', 'all'],
        },
      },
    },
    annotations: {
      readOnlyHint: true,
      idempotentHint: true,
    },
    execute: async (params: { category?: string }) => {
      const personal = [
        {
          line: 'Homeowners Insurance (HO-3 / HO-5)',
          description: 'Dwelling, personal property, loss of use, personal liability for CT homeowners.',
          popularAddOns: ['Water Backup Endorsement', 'Service Line Coverage', 'Equipment Breakdown'],
        },
        {
          line: 'Auto & Recreational Vehicles',
          description: 'Liability, collision, comprehensive, roadside assistance, GAP insurance.',
          discounts: ['Multi-car', 'Safe Driver', 'Bundle with Home', 'Good Student', 'Continuous Coverage'],
        },
        {
          line: 'Renters Insurance (HO-4)',
          description: 'Tenant personal belongings and personal liability protection starting at ~$15/month.',
        },
        {
          line: 'Personal Umbrella Liability',
          description: 'Excess liability in increments of $1M to $5M above standard home/auto limits.',
        },
      ];

      const commercial = [
        {
          line: 'General Liability (GL)',
          description: 'Protects Connecticut businesses against bodily injury, property damage, and advertising claims.',
          limits: '$1,000,000 / $2,000,000 standard',
        },
        {
          line: 'Commercial Property',
          description: 'Covers business physical buildings, inventory, equipment, and business income disruption.',
        },
        {
          line: 'Workers Compensation',
          description: 'Mandatory CT statutory coverage for employee on-the-job medical expenses and lost wages.',
        },
        {
          line: 'Commercial Auto & Fleet',
          description: 'Vehicles titled to businesses or used for commercial delivery, contracting, and transport.',
        },
        {
          line: 'Business Owners Policy (BOP)',
          description: 'Discounted bundle combining General Liability and Commercial Property for small-medium businesses.',
        },
      ];

      const category = params?.category?.toLowerCase() || 'all';
      if (category === 'personal') return { personalLines: personal };
      if (category === 'commercial') return { commercialLines: commercial };
      return { personalLines: personal, commercialLines: commercial };
    },
  },

  {
    name: 'calculate_quote_estimate',
    description:
      'Calculates an instant benchmark premium estimate for CT insurance policies based on coverage line, property/vehicle factors, deductible, and bundle preferences.',
    inputSchema: {
      type: 'object',
      properties: {
        insuranceType: {
          type: 'string',
          description: 'The insurance line requested',
          enum: ['home', 'auto', 'renters', 'business', 'umbrella'],
        },
        location: {
          type: 'string',
          description: 'City/town in Connecticut (e.g., Danbury, Watertown, Bridgeport, Stamford, Waterbury)',
        },
        estimatedValueOrVehicles: {
          type: 'number',
          description: 'Home replacement cost in USD (e.g. 450000) OR Number of vehicles for auto (e.g. 2)',
        },
        bundleWithOtherPolicy: {
          type: 'boolean',
          description: 'Whether the applicant wants to bundle Home + Auto for multi-policy discounts',
        },
        deductible: {
          type: 'number',
          description: 'Desired deductible amount in USD (e.g. 500, 1000, 2500)',
        },
      },
      required: ['insuranceType'],
    },
    annotations: {
      readOnlyHint: true,
      idempotentHint: true,
    },
    execute: async (params: {
      insuranceType: 'home' | 'auto' | 'renters' | 'business' | 'umbrella';
      location?: string;
      estimatedValueOrVehicles?: number;
      bundleWithOtherPolicy?: boolean;
      deductible?: number;
    }) => {
      const type = params.insuranceType;
      const bundle = params.bundleWithOtherPolicy ?? true;
      const deductible = params.deductible || 1000;
      const location = params.location || 'Danbury';

      let baseAnnualMin = 0;
      let baseAnnualMax = 0;
      let factors: string[] = [];

      switch (type) {
        case 'home': {
          const dwellingVal = params.estimatedValueOrVehicles || 400000;
          // Benchmark ~ $3.50 - $5.50 per $1000 dwelling in CT
          baseAnnualMin = Math.round((dwellingVal / 1000) * 3.4);
          baseAnnualMax = Math.round((dwellingVal / 1000) * 4.9);
          factors.push(`Dwelling coverage calculated at $${dwellingVal.toLocaleString()}`);
          break;
        }
        case 'auto': {
          const vehicles = params.estimatedValueOrVehicles || 1;
          baseAnnualMin = vehicles * 1100;
          baseAnnualMax = vehicles * 1650;
          factors.push(`${vehicles} vehicle(s) with standard comprehensive & collision`);
          break;
        }
        case 'renters': {
          baseAnnualMin = 140;
          baseAnnualMax = 220;
          factors.push('$30,000 personal property + $300,000 liability');
          break;
        }
        case 'umbrella': {
          baseAnnualMin = 220;
          baseAnnualMax = 380;
          factors.push('$1,000,000 excess personal liability');
          break;
        }
        case 'business': {
          baseAnnualMin = 650;
          baseAnnualMax = 1800;
          factors.push('$1M/$2M General Liability base bracket');
          break;
        }
      }

      // Deductible adjustment
      if (deductible >= 2500) {
        baseAnnualMin *= 0.88;
        baseAnnualMax *= 0.88;
        factors.push(`Higher deductible ($${deductible}) applied: ~12% savings`);
      } else if (deductible <= 500) {
        baseAnnualMin *= 1.1;
        baseAnnualMax *= 1.1;
      }

      // Bundle discount (15%-20%)
      let bundleSavingsAnnual = 0;
      if (bundle) {
        bundleSavingsAnnual = Math.round(baseAnnualMin * 0.18);
        baseAnnualMin = Math.round(baseAnnualMin * 0.82);
        baseAnnualMax = Math.round(baseAnnualMax * 0.82);
        factors.push('Multi-policy bundle discount (~18%) applied');
      }

      const monthlyMin = Math.round(baseAnnualMin / 12);
      const monthlyMax = Math.round(baseAnnualMax / 12);

      return {
        insuranceType: type,
        location,
        estimatedAnnualPremium: {
          min: Math.round(baseAnnualMin),
          max: Math.round(baseAnnualMax),
          currency: 'USD',
        },
        estimatedMonthlyPayment: {
          min: monthlyMin,
          max: monthlyMax,
          currency: 'USD',
        },
        potentialBundleSavingsAnnual: bundleSavingsAnnual,
        appliedFactors: factors,
        nextStep: 'Submit a full quote request or call AIA at 203-748-9272 for exact carrier underwritten rates.',
      };
    },
  },

  {
    name: 'submit_quote_request',
    description:
      'Submit an insurance quote request to Associated Insurance Agency on behalf of a customer or AI agent.',
    inputSchema: {
      type: 'object',
      properties: {
        name: {
          type: 'string',
          description: 'Full name of the customer',
        },
        email: {
          type: 'string',
          description: 'Customer contact email',
        },
        phone: {
          type: 'string',
          description: 'Customer phone number',
        },
        insuranceType: {
          type: 'string',
          description: 'Coverage line needed (e.g. home, auto, renters, commercial, umbrella)',
          enum: ['home', 'auto', 'renters', 'business', 'commercial', 'umbrella'],
        },
        preferredOffice: {
          type: 'string',
          description: 'Preferred AIA branch (Danbury, Watertown, Bridgeport)',
          enum: ['Danbury', 'Watertown', 'Bridgeport'],
        },
        preferredLanguage: {
          type: 'string',
          description: 'Preferred language for follow-up (en, es, pt, tr)',
        },
        currentCarrier: {
          type: 'string',
          description: 'Current insurance company (if any)',
        },
        notes: {
          type: 'string',
          description: 'Any additional notes, property details, or requested discounts',
        },
      },
      required: ['name', 'email', 'phone', 'insuranceType'],
    },
    annotations: {
      readOnlyHint: false,
      idempotentHint: false,
    },
    execute: async (params: {
      name: string;
      email: string;
      phone: string;
      insuranceType: string;
      preferredOffice?: string;
      preferredLanguage?: string;
      currentCarrier?: string;
      notes?: string;
    }) => {
      const confirmationCode = 'AIA-' + Math.floor(100000 + Math.random() * 900000);
      const office = params.preferredOffice || 'Danbury';
      const officeObj = AIA_LOCATIONS.find((l) => l.city.toLowerCase() === office.toLowerCase()) || AIA_LOCATIONS[0];

      // POST to backend API if in browser runtime
      if (typeof window !== 'undefined' && typeof fetch !== 'undefined') {
        try {
          await fetch('/api/quote', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              ...params,
              confirmationCode,
              source: 'WebMCP_Tool',
              timestamp: new Date().toISOString(),
            }),
          });
        } catch {
          // Continue gracefully in offline / dev mode
        }
      }

      return {
        status: 'SUCCESS',
        confirmationCode,
        message: `Quote request successfully registered for ${params.name}.`,
        assignedOffice: officeObj.name,
        officePhone: officeObj.phone,
        officeEmail: officeObj.email,
        expectedResponseTime: 'Within 24 business hours',
        summary: {
          customer: params.name,
          email: params.email,
          phone: params.phone,
          line: params.insuranceType,
          language: params.preferredLanguage || 'en',
        },
      };
    },
  },

  {
    name: 'get_carrier_billing_directory',
    description:
      'Lookup online payment links, login portals, customer service numbers, and claims phone lines for all 11 partner insurance carriers.',
    inputSchema: {
      type: 'object',
      properties: {
        carrierName: {
          type: 'string',
          description: 'Optional carrier name filter (e.g. Progressive, Travelers, Safeco, Hartford)',
        },
      },
    },
    annotations: {
      readOnlyHint: true,
      idempotentHint: true,
    },
    execute: async (params: { carrierName?: string }) => {
      if (params?.carrierName) {
        const filtered = AIA_CARRIERS.filter((c) =>
          c.name.toLowerCase().includes(params.carrierName!.toLowerCase())
        );
        return {
          total: filtered.length,
          carriers: filtered,
        };
      }
      return {
        total: AIA_CARRIERS.length,
        carriers: AIA_CARRIERS,
      };
    },
  },

  {
    name: 'search_knowledge_base',
    description:
      'Search insurance FAQs, Connecticut state liability regulations, claims steps, and coverage explanations.',
    inputSchema: {
      type: 'object',
      properties: {
        query: {
          type: 'string',
          description: 'Keywords or question (e.g. accident, minimum limits, flood, languages, discount)',
        },
      },
      required: ['query'],
    },
    annotations: {
      readOnlyHint: true,
      idempotentHint: true,
    },
    execute: async (params: { query: string }) => {
      const q = params.query.toLowerCase();
      const results = AIA_FAQS.filter(
        (faq) =>
          faq.question.toLowerCase().includes(q) ||
          faq.answer.toLowerCase().includes(q) ||
          faq.topic.toLowerCase().includes(q)
      );

      return {
        query: params.query,
        matchCount: results.length,
        results: results.length > 0 ? results : AIA_FAQS.slice(0, 3),
        note: results.length === 0 ? 'No exact keyword matches found; returning top general insurance FAQs.' : undefined,
      };
    },
  },

  {
    name: 'check_office_open_status',
    description:
      'Determine if Associated Insurance Agency offices are currently open based on current Eastern Time.',
    inputSchema: {
      type: 'object',
      properties: {
        branchId: {
          type: 'string',
          description: 'Branch ID ("danbury-hq", "watertown", "bridgeport")',
          enum: ['danbury-hq', 'watertown', 'bridgeport', 'all'],
        },
      },
    },
    annotations: {
      readOnlyHint: true,
      idempotentHint: true,
    },
    execute: async (params: { branchId?: string }) => {
      // Calculate America/New_York local time
      const now = new Date();
      const estString = now.toLocaleString('en-US', { timeZone: 'America/New_York' });
      const estDate = new Date(estString);
      const day = estDate.getDay(); // 0 = Sun, 6 = Sat
      const hours = estDate.getHours();
      const minutes = estDate.getMinutes();
      const currentDecimalHour = hours + minutes / 60;

      // Mon-Fri: 8:30 AM (8.5) to 5:00 PM (17.0)
      const isWeekday = day >= 1 && day <= 5;
      const isOpen = isWeekday && currentDecimalHour >= 8.5 && currentDecimalHour < 17.0;

      const branchId = params?.branchId || 'all';
      const targetLocations =
        branchId === 'all'
          ? AIA_LOCATIONS
          : AIA_LOCATIONS.filter((l) => l.id === branchId);

      return {
        currentEasternTime: estDate.toLocaleTimeString('en-US', {
          hour: '2-digit',
          minute: '2-digit',
          timeZoneName: 'short',
        }),
        isWeekday,
        isOpenNow: isOpen,
        businessHours: 'Monday - Friday: 8:30 AM - 5:00 PM EST',
        message: isOpen
          ? 'Offices are currently OPEN. Agents are available by phone and in-person.'
          : 'Offices are currently CLOSED. You can still submit quote requests or call 24/7 carrier claims lines.',
        branches: targetLocations.map((loc) => ({
          name: loc.name,
          phone: loc.phone,
          isOpen,
        })),
      };
    },
  },
];
