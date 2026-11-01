export type LocationId = 'danbury' | 'watertown' | 'bridgeport';

export interface LocationBase {
  id: LocationId;
  slug: string;
  streetAddress: string;
  city: string;
  county: string;
  state: string;
  postalCode: string;
  fullAddress: string;
  phoneFormatted: string;
  phoneRaw: string;
  fax?: string;
  email: string;
  hours: string;
  directionsUrl: string;
  embedUrl: string;
  lat: number;
  lng: number;
  isHQ: boolean;
  staffIds: string[];
  surroundingTowns: string[];
  languages: ('English' | 'Spanish' | 'Portuguese' | 'Turkish')[];
  sameAs?: string[];
}

export const LOCATIONS_DATA: LocationBase[] = [
  {
    id: 'danbury',
    slug: 'danbury',
    streetAddress: '50 Newtown Road, Suite 1',
    city: 'Danbury',
    county: 'Fairfield County',
    state: 'CT',
    postalCode: '06810',
    fullAddress: '50 Newtown Road, Suite 1, Danbury, CT 06810',
    phoneFormatted: '(203) 748-9272',
    phoneRaw: '2037489272',
    fax: '(203) 798-2917',
    email: 'danbury@aia-danbury.com',
    hours: 'Mon - Fri 8:30 AM - 5:00 PM EST',
    directionsUrl: 'https://maps.google.com/?q=50+Newtown+Road,+Suite+1,+Danbury,+CT+06810',
    embedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2879.6344940730055!2d-73.42662732423537!3d41.403672894985256!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89e7ff217cb29b37%3A0x264721e992b3c2ee!2sAssociated%20Insurance%20Agency%20LLC!5e1!3m2!1sen!2sus!4v1791229405450!5m2!1sen!2sus',
    // Aligned to exact rooftop coordinates of 50 Newtown Rd Suite 1 (matching embedUrl)
    lat: 41.4037,
    lng: -73.4244,
    isHQ: true,
    staffIds: [
      'ronald-boucher',
      'yesica-ramirez',
      'isayeli-perez',
      'ema-rego',
      'clara-de-barros',
    ],
    surroundingTowns: [
      'Danbury',
      'Bethel',
      'Brookfield',
      'New Fairfield',
      'Ridgefield',
      'Newtown',
      'Redding',
      'Sherman',
      'Brewster, NY',
    ],
    languages: ['English', 'Spanish', 'Portuguese', 'Turkish'],
    sameAs: [
      'https://www.progressiveagent.com/local-agent/connecticut/danbury/associated-insurance-agency-llc/',
      'https://agents.libertymutual.com/find-an-agent/state/connecticut/danbury/associated-insurance-agency_8872768332',
      'https://agent.travelers.com/ct/danbury/50-newtown-rd-3752-30',
      'https://www.plymouthrock.com/find-an-agent/connecticut/danbury/associated-insurance-agency-llc',
      'https://agency.nationwide.com/ct/danbury/06810/associated-insurance-agency-llc',
    ],
  },
  {
    id: 'watertown',
    slug: 'watertown',
    streetAddress: '51 Depot St Ste 112',
    city: 'Watertown',
    county: 'Litchfield County',
    state: 'CT',
    postalCode: '06795',
    fullAddress: '51 Depot St Ste 112, Watertown, CT 06795',
    phoneFormatted: '(203) 748-9272',
    phoneRaw: '2037489272',
    email: 'watertown@aia-danbury.com',
    hours: 'Mon - Fri 8:30 AM - 5:00 PM EST',
    directionsUrl: 'https://maps.google.com/?q=51+Depot+St+Ste+112,+Watertown,+CT+06795',
    embedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1435.4183773278282!2d-73.113893!3d41.6018117!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89e7eac9777b827b%3A0x67e441f80fbeaede!2sAssociated%20Insurance%20Agency!5e1!3m2!1sen!2sus!4v1791394791132!5m2!1sen!2sus',
    lat: 41.6018,
    lng: -73.1139,
    isHQ: false,
    staffIds: [
      'ashley-mercan',
      'janaija-hammer',
    ],
    surroundingTowns: [
      'Watertown',
      'Oakville',
      'Waterbury',
      'Woodbury',
      'Middlebury',
      'Thomaston',
      'Bethlehem',
      'Litchfield',
      'Plymouth',
    ],
    languages: ['English', 'Spanish', 'Portuguese', 'Turkish'],
    sameAs: [
      'https://www.yellowpages.com/watertown-ct/mip/associated-insurance-agency-495580720',
    ],
  },
  {
    id: 'bridgeport',
    slug: 'bridgeport',
    streetAddress: '2465 Main Street',
    city: 'Bridgeport',
    county: 'Fairfield County',
    state: 'CT',
    postalCode: '06606',
    fullAddress: '2465 Main Street, Bridgeport, CT 06606',
    phoneFormatted: '(203) 748-9272',
    phoneRaw: '2037489272',
    email: 'bridgeport@aia-danbury.com',
    hours: 'Mon - Fri 8:30 AM - 5:00 PM EST',
    directionsUrl: 'https://maps.google.com/?q=2465+Main+Street,+Bridgeport,+CT+06606',
    // Fixed: Previous pb= string pointed to old 3860 Main St coordinates (41.21407, -73.21209).
    // This embeds the exact 2465 Main Street, Bridgeport, CT 06606 location (41.1963, -73.1972).
    embedUrl: 'https://maps.google.com/maps?q=2465+Main+Street,+Bridgeport,+CT+06606&t=m&z=16&output=embed&iwloc=near',
    lat: 41.1963,
    lng: -73.1972,
    isHQ: false,
    staffIds: [
      'camila-macedo',
      'betania-almeida',
    ],
    surroundingTowns: [
      'Bridgeport',
      'Fairfield',
      'Stratford',
      'Trumbull',
      'Milford',
      'Shelton',
    ],
    languages: ['English', 'Spanish', 'Portuguese', 'Turkish'],
    sameAs: [
      'https://www.bbb.org/us/ct/bridgeport/profile/insurance-companies/associated-insurance-agency-llc-0111-87064656',
    ],
  },
];

export function formatTownWithState(town: string, defaultState = 'CT'): string {
  if (town.includes(',')) return town;
  if (town.includes('(NY)')) return town.replace(/\s*\(NY\)/, ', NY');
  return `${town}, ${defaultState}`;
}

export function getLocationById(id: string): LocationBase | undefined {
  const norm = id.toLowerCase().replace('-hq', '');
  return LOCATIONS_DATA.find((l) => l.id === norm || l.slug === norm);
}

export function getAllLocationIds(): LocationId[] {
  return ['danbury', 'watertown', 'bridgeport'];
}