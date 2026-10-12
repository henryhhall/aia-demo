export type LocationId = 'danbury' | 'watertown' | 'bridgeport';

export interface LocationBase {
  id: LocationId;
  slug: string;
  streetAddress: string;
  city: string;
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
}

export const LOCATIONS_DATA: LocationBase[] = [
  {
    id: 'danbury',
    slug: 'danbury',
    streetAddress: '50 Newtown Road, Suite 1',
    city: 'Danbury',
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
    lat: 41.4087,
    lng: -73.4285,
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
      'Brewster (NY)',
    ],
    languages: ['English', 'Spanish', 'Portuguese', 'Turkish'],
  },
  {
    id: 'watertown',
    slug: 'watertown',
    streetAddress: '51 Depot St Ste 112',
    city: 'Watertown',
    state: 'CT',
    postalCode: '06795',
    fullAddress: '51 Depot St Ste 112, Watertown, CT 06795',
    phoneFormatted: '(860) 274-8888',
    phoneRaw: '8602748888',
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
    languages: ['English', 'Turkish'],
  },
  {
    id: 'bridgeport',
    slug: 'bridgeport',
    streetAddress: '2465 Main Street',
    city: 'Bridgeport',
    state: 'CT',
    postalCode: '06606',
    fullAddress: '2465 Main Street, Bridgeport, CT 06606',
    phoneFormatted: '(203) 333-8880',
    phoneRaw: '2033338880',
    email: 'bridgeport@aia-danbury.com',
    hours: 'Mon - Fri 8:30 AM - 5:00 PM EST',
    directionsUrl: 'https://maps.google.com/?q=2465+Main+Street,+Bridgeport,+CT+06606',
    embedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1021.0695509775729!2d-73.2120973643344!3d41.214073760533175!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89e80e8ad160179d%3A0x2174691e2b983696!2sAssociated%20Insurance%20Agency!5e1!3m2!1sen!2sus!4v1791394610287!5m2!1sen!2sus',
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
    languages: ['English', 'Spanish', 'Portuguese'],
  },
];

export function getLocationById(id: string): LocationBase | undefined {
  const norm = id.toLowerCase().replace('-hq', '');
  return LOCATIONS_DATA.find((l) => l.id === norm || l.slug === norm);
}

export function getAllLocationIds(): LocationId[] {
  return ['danbury', 'watertown', 'bridgeport'];
}
