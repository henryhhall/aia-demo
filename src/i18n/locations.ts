import type { LocationId } from '../data/locations';

export interface LocationFAQ {
  question: string;
  answer: string;
}

export interface LocationCoverageLine {
  title: string;
  desc: string;
  icon?: string;
}

export interface LocationTranslation {
  name: string;
  shortName: string;
  tag: string;
  seoTitle: string;
  metaDescription: string;
  heroHeadline: string;
  heroSubheadline: string;
  officeOverview: string[];
  localRisksAndFocusHeading: string;
  localRisksAndFocusDesc: string;
  coverageLines: LocationCoverageLine[];
  communitiesHeading: string;
  communitiesDesc: string;
  staffHeading: string;
  staffSubheading: string;
  faqs: LocationFAQ[];
  directionsCta: string;
  callOfficeCta: string;
  quoteOfficeCta: string;
  openHoursLabel: string;
  languagesLabel: string;
}

export interface LocationsHubTranslation {
  seoTitle: string;
  metaDescription: string;
  heroBadge: string;
  heroHeadline: string;
  heroSubheadline: string;
  introTitle: string;
  introText: string;
  viewOfficeDetails: string;
  getDirections: string;
  callOffice: string;
  headquartersBadge: string;
  branchBadge: string;
  allOfficesHours: string;
  whyLocalMattersTitle: string;
  whyLocalMattersText: string;
  feature1Title: string;
  feature1Desc: string;
  feature2Title: string;
  feature2Desc: string;
  feature3Title: string;
  feature3Desc: string;
}

export interface LocationsDataLocale {
  hub: LocationsHubTranslation;
  locations: Record<LocationId, LocationTranslation>;
}

export const locationsI18n: Record<'en' | 'es' | 'pt' | 'tr', LocationsDataLocale> = {
  en: {
    hub: {
      seoTitle: 'Our Connecticut Office Locations | Danbury HQ, Watertown & Bridgeport',
      metaDescription: 'Find Associated Insurance Agency office locations in Danbury (HQ), Watertown, and Bridgeport, CT. Visit our local licensed agents or call for personalized coverage.',
      heroBadge: 'Local Connecticut Presence',
      heroHeadline: 'Three Convenient Offices Across Connecticut',
      heroSubheadline: 'Visit our independent insurance professionals in Danbury, Watertown, or Bridgeport for customized personal and commercial insurance solutions.',
      introTitle: 'Local Agents. Real Relationships. Independent Choice.',
      introText: 'Unlike direct online insurers or captive single-company agents, Associated Insurance Agency operates three fully staffed community offices in Connecticut. We compare policies across 11+ leading regional and national carriers—giving you the competitive pricing of a major brokerage with the personal attention of your neighborhood agent.',
      viewOfficeDetails: 'View Office Details & Staff',
      getDirections: 'Get Directions',
      callOffice: 'Call Office',
      headquartersBadge: 'Headquarters',
      branchBadge: 'Branch Office',
      allOfficesHours: 'All branches open Monday – Friday, 8:30 AM – 5:00 PM EST',
      whyLocalMattersTitle: 'Why a Local Connecticut Agency Matters',
      whyLocalMattersText: 'Connecticut insurance requirements have distinct statutory and regional complexities—from coastal storm and flood risks along Long Island Sound to mandatory state auto liability laws (CGS § 14-112) and strict workers’ compensation rules (CGS § 31-284). Our local agents live in these communities and understand your risks firsthand.',
      feature1Title: 'Independent Rate Comparison',
      feature1Desc: 'We shop top-rated carriers including Travelers, Safeco, The Hartford, Progressive, and Guard to find the optimal coverage and lowest premiums.',
      feature2Title: 'Multilingual In-Person Service',
      feature2Desc: 'Get clear, jargon-free policy guidance in English, Spanish, Portuguese, or Turkish from licensed agents stationed right in your branch.',
      feature3Title: 'Fast Local Advocacy & Claims',
      feature3Desc: 'When you need a certificate of insurance (COI), policy amendment, or claims advocacy, you speak directly with our team—never an anonymous call center.',
    },
    locations: {
      danbury: {
        name: 'Danbury Corporate Office (HQ)',
        shortName: 'Danbury HQ',
        tag: 'Headquarters',
        seoTitle: 'Insurance Agency Danbury CT | Auto, Home, Business | Danbury HQ',
        metaDescription: 'Visit Associated Insurance Agency in Danbury, CT at 50 Newtown Road. Compare auto, home, and commercial insurance quotes across multiple carriers in Fairfield County.',
        heroHeadline: 'Trusted Local Insurance in Danbury, CT',
        heroSubheadline: 'Personal & Commercial Coverage from Associated Insurance Agency',
        officeOverview: [
          'Associated Insurance Agency was established in 2008. Our Danbury office is at 50 Newtown Road (Suite 1), right off Interstate 84 at Exit 8, with free parking on site. This is our main office, staffed by our licensed agents and customer service team.',
          'We write personal and commercial policies throughout Fairfield and Litchfield counties. Whether you need same-day COIs for a job site, liability coverage for a multi-family rental, or auto insurance that meets Connecticut state limits, our agents handle the paperwork and help you through claims.',
          'As an independent agency, we work with carriers like Travelers, Safeco, The Hartford, Progressive, and Guard. We shop multiple quotes to find you the right coverage at a lower rate.',
        ],
        localRisksAndFocusHeading: 'Insurance Specialties in Danbury',
        localRisksAndFocusDesc: 'Danbury has active trade contractors, lakeside homes around Candlewood Lake, multi-family rentals, and heavy I-84 commuter traffic. Our agents focus on:',
        coverageLines: [
          {
            title: 'Commercial General Liability & Contractors',
            desc: 'General liability, inland marine for tools and equipment, and same-day ACORD 25 certificates for contractors, builders, and electricians across Fairfield County.',
          },
          {
            title: 'Multifamily & Residential Landlord Policies',
            desc: 'Dwelling fire, loss of rents, and premises liability for 2- to 4-family properties and rental homes in the Danbury area.',
          },
          {
            title: 'Personal Auto & I-84 Commuter Insurance',
            desc: 'Auto policies that meet or exceed Connecticut CGS § 14-112 statutory limits, with collision, comprehensive, 24/7 roadside assistance, and umbrella options.',
          },
          {
            title: 'Homeowners & Single-Family Dwelling Insurance',
            desc: 'Dwelling, personal property, and storm coverage for single-family homes in Danbury, Bethel, Brookfield, and Ridgefield.',
          },
        ],
        communitiesHeading: 'Towns We Serve',
        communitiesDesc: 'Our Danbury office insures clients across northern Fairfield County, southern Litchfield County, and nearby New York towns:',
        staffHeading: 'Our Danbury Team',
        staffSubheading: 'Meet the licensed agents and customer service staff at our Newtown Road office.',
        faqs: [
          {
            question: 'Where is Associated Insurance Agency located in Danbury, CT?',
            answer: 'We are at 50 Newtown Road, Suite 1, Danbury, CT 06810. Take Exit 8 off Interstate 84. Free parking is available in the front lot.',
          },
          {
            question: 'Do I need an appointment to visit the Danbury office?',
            answer: 'No appointment is needed. Walk-ins are welcome Monday through Friday from 8:30 AM to 5:00 PM. If you want to review complex commercial accounts or meet with a specific agent, call us at (203) 748-9272 before stopping by.',
          },
          {
            question: 'What languages are spoken at the Danbury headquarters?',
            answer: 'Our Danbury staff speaks English, Spanish, Portuguese, and Turkish. You can discuss quotes, review policy details, and file claims in your preferred language.',
          },
          {
            question: 'How fast can I get a Certificate of Insurance (COI) in Danbury?',
            answer: 'For active commercial clients, we issue ACORD 25 certificates the same day, including additional insured endorsements and waivers of subrogation.',
          },
        ],
        directionsCta: 'Get Directions to Danbury HQ',
        callOfficeCta: 'Call (203) 748-9272',
        quoteOfficeCta: 'Get a Danbury Quote',
        openHoursLabel: 'Office Hours',
        languagesLabel: 'Languages Spoken',
      },
      watertown: {
        name: 'Watertown Branch Office',
        shortName: 'Watertown',
        tag: 'Branch Office',
        seoTitle: 'Insurance Agency Watertown CT | Auto, Home & Business Insurance',
        metaDescription: 'Associated Insurance Agency in Watertown, CT at 51 Depot Street. Trusted independent insurance agents serving Watertown, Waterbury, and Litchfield County.',
        heroHeadline: 'Trusted Local Insurance in Watertown, CT',
        heroSubheadline: 'Personal & Commercial Coverage from Associated Insurance Agency',
        officeOverview: [
          'The Watertown branch of Associated Insurance Agency is situated at 51 Depot Street, Suite 112, right in the heart of downtown Watertown near the Route 63 and Route 73 corridors. Our branch offers dedicated, community-rooted insurance representation for residents and business owners throughout Litchfield County and the greater Waterbury region.',
          'Led by experienced personal lines specialists and front-desk customer service agents, our Watertown team assists clients with everything from comprehensive home and auto bundles to specialized coverage for classic vehicles, pet insurance, and landlord dwelling fire policies.',
          'As an independent brokerage, we do not work for any single insurance company. We compare coverage options across leading carriers including Travelers, Safeco, Progressive, and Foremost to ensure you receive the strongest protection at competitive rates.',
        ],
        localRisksAndFocusHeading: 'Insurance Focus for Watertown & Litchfield County',
        localRisksAndFocusDesc: 'Litchfield County features unique property profiles, historic homes, and Route 8 commuters. Our Watertown office specializes in:',
        coverageLines: [
          {
            title: 'Personal Lines Bundles (Home & Auto)',
            desc: 'Cost-saving multi-policy combinations that maximize coverage limits while applying significant cross-policy discounts from premier carriers.',
          },
          {
            title: 'Classic, Collector & Antique Vehicles',
            desc: 'Agreed-value policies, flexible mileage restrictions, and specialized spare parts coverage designed specifically for car enthusiasts.',
          },
          {
            title: 'Dwelling Fire & Landlord Property Insurance',
            desc: 'Reliable property and liability protection for non-owner-occupied rental homes, seasonal dwellings, and multi-unit residences in Waterbury and Watertown.',
          },
          {
            title: 'Personal Umbrella Excess Liability',
            desc: 'Extra liability protection starting at $1,000,000 to protect your family home, retirement savings, and future earnings from major unexpected lawsuits.',
          },
        ],
        communitiesHeading: 'Communities & Municipalities Served',
        communitiesDesc: 'Our Watertown branch proudly serves residents and businesses throughout Litchfield County and the Central Naugatuck Valley:',
        staffHeading: 'Your Watertown Office Team',
        staffSubheading: 'Meet our dedicated insurance representatives based at our Watertown branch on Depot Street.',
        faqs: [
          {
            question: 'Where is the Watertown branch of Associated Insurance Agency located?',
            answer: 'Our Watertown office is located at 51 Depot St Ste 112, Watertown, CT 06795, situated conveniently near the intersection of Main Street (Route 63) and Depot Street with convenient visitor parking.',
          },
          {
            question: 'Can the Watertown office help with Waterbury and Oakville policies?',
            answer: 'Yes! Our Watertown branch serves all of Greater Waterbury, Oakville, Woodbury, Middlebury, and surrounding Litchfield County communities with personal, auto, and commercial coverage.',
          },
          {
            question: 'What languages are supported at the Watertown branch?',
            answer: 'Our Watertown branch provides service in English, Spanish, Portuguese, and Turkish. You can discuss quotes, review policy details, and file claims in your preferred language.',
          },
          {
            question: 'Can I pay my carrier insurance bill at the Watertown office?',
            answer: 'Yes. Our front-desk customer service representative can accept direct payments and guide you through setting up automatic carrier EFT or online payments through our carrier directory.',
          },
        ],
        directionsCta: 'Get Directions to Watertown Office',
        callOfficeCta: 'Call (203) 748-9272',
        quoteOfficeCta: 'Request a Quote from Watertown Office',
        openHoursLabel: 'Office Hours',
        languagesLabel: 'Languages Spoken',
      },
      bridgeport: {
        name: 'Bridgeport Office',
        shortName: 'Bridgeport',
        tag: 'Branch Office',
        seoTitle: 'Insurance Agency Bridgeport CT | Auto, Home, Business | 2465 Main St',
        metaDescription: 'Visit Associated Insurance Agency at 2465 Main Street in Bridgeport, CT. Compare auto, home, multi-family, and commercial quotes across multiple carriers.',
        heroHeadline: 'Trusted Local Insurance in Bridgeport, CT',
        heroSubheadline: 'Personal & Commercial Coverage from Associated Insurance Agency',
        officeOverview: [
          'Our Bridgeport branch is located at 2465 Main Street in the North End, two blocks from St. Vincent’s Medical Center with direct access from Route 8 and Route 25 (Exits 4 and 5). Free parking is available in front of the office and along Main Street.',
          'We write personal and commercial policies throughout coastal Fairfield County. Our licensed agents handle multi-family rental property insurance (including 2-to-4 family homes and triple-deckers), coastal flood coverage along Long Island Sound, commercial auto, workers’ compensation, and same-day Certificates of Insurance (COI) for trade contractors.',
          'As an independent agency, we compare rates across Travelers, Safeco, The Hartford, Progressive, and Guard. Our licensed agents speak English, Spanish, Portuguese, and Turkish, helping you review coverages and file claims without language barriers.',
        ],
        localRisksAndFocusHeading: 'Insurance Lines We Write in Bridgeport',
        localRisksAndFocusDesc: 'Bridgeport has a dense mix of multi-family rental properties, coastal flood zones, commercial contractors, and busy commuter corridors like I-95, Route 8, and Route 25. Our office focuses on:',
        coverageLines: [
          {
            title: 'Multi-Family (2-to-4 Family) & Landlord Insurance',
            desc: 'Dwelling fire, building replacement, loss of rent, and premises liability for owner-occupied and tenant-occupied multi-family properties across Bridgeport.',
          },
          {
            title: 'Coastal & NFIP Flood Insurance',
            desc: 'FEMA National Flood Insurance Program (NFIP) policies and private flood insurance for properties near Long Island Sound, Black Rock Harbor, and the Pequonnock River.',
          },
          {
            title: 'Commercial General Liability & Contractors',
            desc: 'General liability, tools coverage, workers’ compensation (CGS § 31-284), and same-day ACORD 25 certificates for retail shops, restaurants, and trade contractors.',
          },
          {
            title: 'Auto Insurance & State Minimum Limits',
            desc: 'Personal and commercial vehicle coverage meeting Connecticut CGS § 14-112 requirements, with options for collision, comprehensive, roadside assistance, and uninsured motorist.',
          },
        ],
        communitiesHeading: 'Cities and Towns We Serve',
        communitiesDesc: 'Our Bridgeport office serves policyholders across coastal Fairfield County and the lower Naugatuck Valley:',
        staffHeading: 'Bridgeport Office Team',
        staffSubheading: 'Licensed agents and customer service representatives based at 2465 Main Street:',
        faqs: [
          {
            question: 'Where is Associated Insurance Agency located in Bridgeport?',
            answer: 'Our office is at 2465 Main Street, Bridgeport, CT 06606, between Capitol Avenue and Vincellette Street, near St. Vincent’s Medical Center. You can reach us from Route 8 or Route 25 via Exits 4 and 5.',
          },
          {
            question: 'Do you have Spanish- and Portuguese-speaking agents in Bridgeport?',
            answer: 'Yes. Our Bridgeport staff speaks English, Spanish, Portuguese, and Turkish fluently. You can discuss quotes, review policy endorsements, and handle claims in your preferred language.',
          },
          {
            question: 'Can I get flood insurance for a property in Bridgeport?',
            answer: 'Yes. We write both FEMA NFIP policies and private flood insurance for homes, multi-family properties, and commercial buildings near Long Island Sound and local flood zones.',
          },
          {
            question: 'What do I need to bring for an auto insurance quote?',
            answer: 'Bring your driver’s license, vehicle registration, and your current insurance declarations page if you currently have coverage. We compare quotes across multiple carriers on the spot.',
          },
        ],
        directionsCta: 'Get Directions to Bridgeport',
        callOfficeCta: 'Call (203) 748-9272',
        quoteOfficeCta: 'Get a Bridgeport Quote',
        openHoursLabel: 'Office Hours',
        languagesLabel: 'Languages Spoken',
      },
    },
  },
  es: {
    hub: {
      seoTitle: 'Nuestras Sucursales en Connecticut | Danbury HQ, Watertown y Bridgeport',
      metaDescription: 'Conozca las oficinas de Associated Insurance Agency en Danbury (Sede Central), Watertown y Bridgeport, CT. Visite a nuestros agentes de seguros independientes o llame hoy.',
      heroBadge: 'Presencia Local en Connecticut',
      heroHeadline: 'Tres Sucursales a su Servicio en Todo Connecticut',
      heroSubheadline: 'Visite a nuestros agentes de seguros independientes en Danbury, Watertown o Bridgeport para obtener pólizas personales y comerciales con atención en su idioma.',
      introTitle: 'Agentes Locales. Relaciones Reales. Variedad de Opciones.',
      introText: 'A diferencia de las aseguradoras en línea o los agentes exclusivos de una sola compañía, Associated Insurance Agency opera tres sucursales activas en Connecticut. Comparamos más de 11 aseguradoras líderes para brindarle precios competitivos y atención cercana y personalizada.',
      viewOfficeDetails: 'Ver Detalles y Equipo',
      getDirections: 'Cómo Llegar',
      callOffice: 'Llamar a la Sucursal',
      headquartersBadge: 'Sede Central',
      branchBadge: 'Sucursal',
      allOfficesHours: 'Todas las sucursales abren de Lunes a Viernes, 8:30 AM – 5:00 PM EST',
      whyLocalMattersTitle: 'Por Qué Importa Trabajar con una Agencia Local en Connecticut',
      whyLocalMattersText: 'Connecticut tiene regulaciones y riesgos climáticos muy particulares: desde zonas de inundación costeras cerca de Long Island Sound hasta normas estrictas de responsabilidad vial (CGS § 14-112) y seguro de compensación laboral (CGS § 31-284). Nuestros agentes viven en estas comunidades y conocen sus necesidades.',
      feature1Title: 'Comparación Independiente de Tarifas',
      feature1Desc: 'Comparamos aseguradoras de primer nivel como Travelers, Safeco, The Hartford, Progressive y Guard para conseguirle la mejor cobertura al precio más justo.',
      feature2Title: 'Atención Personalizada en su Idioma',
      feature2Desc: 'Reciba orientación clara y sin tecnicismos en español, inglés, portugués o turco directamente con agentes licenciados en cada sucursal.',
      feature3Title: 'Emisión Rápida de Certificados y Gestión de Reclamos',
      feature3Desc: 'Si necesita un certificado de seguro (COI) el mismo día o soporte con un reclamo, hablará con personas reales que conocen su póliza.',
    },
    locations: {
      danbury: {
        name: 'Sede Central en Danbury (HQ)',
        shortName: 'Danbury (HQ)',
        tag: 'Sede Central',
        seoTitle: 'Agencia de Seguros en Danbury CT | Autos, Hogar y Negocios | Danbury HQ',
        metaDescription: 'Associated Insurance Agency en Danbury, CT (50 Newtown Road). Compare cotizaciones de seguros de auto, casa y comerciales con múltiples aseguradoras. Hablamos español.',
        heroHeadline: 'Seguros Locales de Confianza en Danbury, CT',
        heroSubheadline: 'Cobertura Personal y Comercial de Associated Insurance Agency',
        officeOverview: [
          'Associated Insurance Agency se estableció en 2008. Nuestra oficina principal en Danbury está en 50 Newtown Road (Suite 1), junto a la salida 8 de la autopista Interestatal 84, con estacionamiento gratuito. Aquí trabaja nuestro equipo de agentes licenciados y representantes de servicio.',
          'Emitimos pólizas personales y comerciales para todo el condado de Fairfield. Si necesita certificados de seguro (COI) en el mismo día para una obra, cobertura de responsabilidad civil para una propiedad multifamiliar o un seguro de auto con los límites legales de Connecticut, le ayudamos con el trámite y con cualquier reclamo.',
          'Como agencia independiente, trabajamos con aseguradoras como Travelers, Safeco, The Hartford, Progressive y Guard. Comparamos cotizaciones para conseguirle una tarifa conveniente con la cobertura que realmente necesita.',
        ],
        localRisksAndFocusHeading: 'Especialidades de Seguro en Danbury',
        localRisksAndFocusDesc: 'Danbury reúne contratistas de la construcción, casas junto al lago Candlewood, inmuebles multifamiliares y alto tránsito por la I-84. Nuestros agentes se enfocan en:',
        coverageLines: [
          {
            title: 'Responsabilidad Civil Comercial y Contratistas',
            desc: 'Seguro de responsabilidad general, cobertura de herramientas y equipos (inland marine) y certificados COI (ACORD 25) el mismo día para electricistas, carpinteros y contratistas.',
          },
          {
            title: 'Seguro para Casas Multifamiliares y Propietarios',
            desc: 'Cobertura contra incendio de vivienda (dwelling fire), pérdida de rentas y responsabilidad civil para propiedades de 2 a 4 familias en el área de Danbury.',
          },
          {
            title: 'Seguro de Autos Personales y Conductores de la I-84',
            desc: 'Pólizas de auto según la ley de Connecticut (CGS § 14-112), con opciones de colisión, cobertura total, grúa 24 horas y seguro paraguas (umbrella).',
          },
          {
            title: 'Seguro de Propietarios de Vivienda (Homeowners)',
            desc: 'Pólizas de hogar para viviendas unifamiliares en Danbury, Bethel, Brookfield y Ridgefield, con cobertura ante tormentas, viento, incendio y responsabilidad civil.',
          },
        ],
        communitiesHeading: 'Ciudades que Atendemos',
        communitiesDesc: 'Nuestra oficina de Danbury atiende a clientes en el norte de Fairfield, sur de Litchfield y poblaciones cercanas del estado de Nueva York:',
        staffHeading: 'Nuestro Equipo en Danbury',
        staffSubheading: 'Conozca a los agentes licenciados y representantes de atención en nuestra oficina de Newtown Road.',
        faqs: [
          {
            question: '¿Dónde está ubicada Associated Insurance Agency en Danbury, CT?',
            answer: 'Estamos en 50 Newtown Road, Suite 1, Danbury, CT 06810, justo en la salida 8 de la autopista Interestatal 84. Disponemos de estacionamiento gratuito en el frente.',
          },
          {
            question: '¿Se requiere cita previa para visitar la oficina de Danbury?',
            answer: 'No necesita cita previa. Atendemos sin cita de lunes a viernes de 8:30 AM a 5:00 PM. Si desea revisar una póliza comercial compleja o hablar con un agente en particular, llámenos al (203) 748-9272 antes de venir.',
          },
          {
            question: '¿Qué idiomas se hablan en la sede central de Danbury?',
            answer: 'Nuestro equipo habla español, inglés, portugués y turco. Le explicamos los términos, coberturas y deducibles de su póliza en español sin complicaciones.',
          },
          {
            question: '¿Con qué rapidez puedo obtener un Certificado de Seguro (COI)?',
            answer: 'Para clientes comerciales con póliza activa, emitimos certificados ACORD 25 el mismo día, con cláusulas de asegurado adicional y renuncia de subrogación.',
          },
        ],
        directionsCta: 'Cómo Llegar a Danbury HQ',
        callOfficeCta: 'Llamar al (203) 748-9272',
        quoteOfficeCta: 'Pedir Cotización en Danbury',
        openHoursLabel: 'Horario de Atención',
        languagesLabel: 'Idiomas Hablados',
      },
      watertown: {
        name: 'Sucursal de Watertown',
        shortName: 'Watertown',
        tag: 'Sucursal',
        seoTitle: 'Agencia de Seguros en Watertown CT | Auto, Hogar y Comercio',
        metaDescription: 'Associated Insurance Agency en Watertown, CT en 51 Depot Street. Agentes de seguros independientes al servicio de Watertown, Waterbury y el condado de Litchfield.',
        heroHeadline: 'Seguros Locales de Confianza en Watertown, CT',
        heroSubheadline: 'Cobertura Personal y Comercial de Associated Insurance Agency',
        officeOverview: [
          'La sucursal de Watertown de Associated Insurance Agency está ubicada en 51 Depot Street, Suite 112, en el centro de Watertown, muy cerca de las rutas 63 y 73. Brindamos asesoramiento cercano para residentes y dueños de empresas en Watertown, Waterbury y todo el condado de Litchfield.',
          'Especialistas en líneas personales y atención al cliente le ayudarán a asegurar desde su casa y auto hasta vehículos clásicos, pólizas de mascotas y propiedades de alquiler.',
          'Al ser una agencia independiente, no vendemos una sola marca. Comparamos aseguradoras como Travelers, Safeco, Progressive y Foremost para garantizarle la mejor cobertura al costo más accesible.',
        ],
        localRisksAndFocusHeading: 'Enfoque de Seguros en Watertown y Litchfield',
        localRisksAndFocusDesc: 'El condado de Litchfield cuenta con viviendas suburbanas y rurales, vehículos clásicos y conductores diarios de la Ruta 8. Nos especializamos en:',
        coverageLines: [
          {
            title: 'Paquetes de Hogar y Auto (Bundles)',
            desc: 'Combinaciones de pólizas que amplían la cobertura y aplican importantes descuentos por pólizas múltiples con las mejores aseguradoras.',
          },
          {
            title: 'Vehículos Clásicos y de Colección',
            desc: 'Pólizas a valor acordado (Agreed Value) y coberturas especializadas para entusiastas de automóviles en Connecticut.',
          },
          {
            title: 'Seguros para Propiedades de Alquiler',
            desc: 'Pólizas contra incendio de vivienda (Dwelling Fire) y responsabilidad civil para propietarios con inmuebles de alquiler en Waterbury y Watertown.',
          },
          {
            title: 'Seguro Paraguas Personal (Umbrella)',
            desc: 'Protección adicional de responsabilidad a partir de $1,000,000 para proteger su vivienda, ahorros y patrimonio familiar ante demandas imprevistas.',
          },
        ],
        communitiesHeading: 'Comunidades que Atendemos',
        communitiesDesc: 'Nuestra sucursal de Watertown presta servicio en todo el condado de Litchfield y la zona de Waterbury:',
        staffHeading: 'Equipo de Nuestra Oficina en Watertown',
        staffSubheading: 'Conozca a nuestros representantes de seguros en Watertown.',
        faqs: [
          {
            question: '¿Dónde está ubicada la oficina de Watertown?',
            answer: 'Estamos en 51 Depot St Ste 112, Watertown, CT 06795, cerca de Main Street (Ruta 63), con cómodo estacionamiento para clientes.',
          },
          {
            question: '¿Atienden clientes de Waterbury y Oakville?',
            answer: '¡Por supuesto! Servimos a todo Waterbury, Oakville, Woodbury, Middlebury y pueblos vecinos con seguros de autos, hogar y comerciales.',
          },
          {
            question: '¿En qué idiomas atienden en Watertown?',
            answer: 'En nuestra sucursal de Watertown atendemos en español, inglés, portugués y turco. Puede consultar cotizaciones, revisar pólizas y gestionar trámites en su idioma preferido.',
          },
          {
            question: '¿Puedo pagar mi factura de seguro en la oficina de Watertown?',
            answer: 'Sí, recibimos pagos y le ayudamos a configurar pagos automáticos (EFT) con su compañía aseguradora.',
          },
        ],
        directionsCta: 'Cómo Llegar a la Oficina de Watertown',
        callOfficeCta: 'Llamar al (203) 748-9272',
        quoteOfficeCta: 'Pedir Cotización en Watertown',
        openHoursLabel: 'Horario de Atención',
        languagesLabel: 'Idiomas Hablados',
      },
      bridgeport: {
        name: 'Sucursal Bridgeport',
        shortName: 'Bridgeport',
        tag: 'Sucursal',
        seoTitle: 'Agencia de Seguros en Bridgeport CT | Auto, Casa y Negocio | 2465 Main St',
        metaDescription: 'Associated Insurance Agency en Bridgeport, CT (2465 Main Street). Compare tarifas de autos, casas, edificios multifamiliares y comercios con múltiples aseguradoras. Atención en español.',
        heroHeadline: 'Seguros Locales de Confianza en Bridgeport, CT',
        heroSubheadline: 'Cobertura Personal y Comercial de Associated Insurance Agency',
        officeOverview: [
          'Nuestra sucursal de Bridgeport está ubicada en 2465 Main Street, en el sector North End, a dos cuadras de St. Vincent’s Medical Center y con acceso rápido desde las rutas 8 y 25 (salidas 4 y 5). Disponemos de estacionamiento gratuito frente a la oficina y sobre Main Street.',
          'Emitimos pólizas comerciales y personales en todo el condado de Fairfield. Aseguramos casas multifamiliares de 2 a 4 familias, pólizas contra inundaciones costeras cerca de Long Island Sound, vehículos comerciales, compensación laboral para empleados (CGS § 31-284) y certificados de seguro (COI) el mismo día para contratistas.',
          'Como agencia independiente, comparamos tarifas entre compañías como Travelers, Safeco, The Hartford, Progressive y Guard. Nuestras agentes hablan español, inglés, portugués y turco para explicarle coberturas, deducibles y trámites sin barreras de idioma.',
        ],
        localRisksAndFocusHeading: 'Ramos de Seguro en Bridgeport',
        localRisksAndFocusDesc: 'Bridgeport concentra una gran cantidad de propiedades multifamiliares en alquiler, zonas costeras expuestas a inundaciones y contratistas independientes. En Main Street nos enfocamos en:',
        coverageLines: [
          {
            title: 'Propiedades Multifamiliares (2 a 4 Familias)',
            desc: 'Pólizas de incendio, reposición de edificio, pérdida de ingresos por alquiler y responsabilidad civil para dueños de casas multifamiliares en Bridgeport.',
          },
          {
            title: 'Seguro de Inundación Costera (NFIP y Privado)',
            desc: 'Pólizas de FEMA (NFIP) y alternativas privadas para propiedades cercanas a Long Island Sound, Black Rock Harbor y el río Pequonnock.',
          },
          {
            title: 'Responsabilidad Comercial y Contratistas',
            desc: 'Responsabilidad civil general, seguro de herramientas, compensación laboral (CGS § 31-284) y certificados ACORD 25 el mismo día para tiendas, bodegas y contratistas.',
          },
          {
            title: 'Seguro de Auto y Límites Estatales de CT',
            desc: 'Coberturas que cumplen con los requisitos de la ley CGS § 14-112 de Connecticut, con opciones de choque, cobertura contra todo riesgo, grúa y conductor sin seguro.',
          },
        ],
        communitiesHeading: 'Ciudades que Atendemos',
        communitiesDesc: 'Nuestra oficina de Bridgeport atiende a residentes y empresas de la zona costera de Fairfield y el valle de Naugatuck:',
        staffHeading: 'Equipo de Bridgeport',
        staffSubheading: 'Agentes licenciadas y representantes de servicio en 2465 Main Street:',
        faqs: [
          {
            question: '¿Dónde está la oficina de Associated Insurance Agency en Bridgeport?',
            answer: 'Estamos en 2465 Main Street, Bridgeport, CT 06606, entre Capitol Avenue y Vincellette Street, cerca de St. Vincent’s Medical Center. Puede llegar desde la Ruta 8 o la Ruta 25 por las salidas 4 y 5.',
          },
          {
            question: '¿Atienden en español en la oficina de Bridgeport?',
            answer: 'Sí. Nuestro equipo en Bridgeport habla español, inglés, portugués y turco. Le explicamos coberturas, exclusiones y facturas directamente en su idioma.',
          },
          {
            question: '¿Puedo contratar seguro de inundación en Bridgeport?',
            answer: 'Sí. Tramitamos pólizas de FEMA (NFIP) y seguros privados contra inundación para casas, edificios multifamiliares y negocios en zonas costeras o cerca de ríos.',
          },
          {
            question: '¿Qué documentos necesito para cotizar un seguro de auto?',
            answer: 'Traiga su licencia de conducir, el registro del vehículo y la página de declaraciones de su póliza actual si ya cuenta con seguro. Comparamos opciones de inmediato.',
          },
        ],
        directionsCta: 'Cómo Llegar a Bridgeport',
        callOfficeCta: 'Llamar al (203) 748-9272',
        quoteOfficeCta: 'Pedir Cotización en Bridgeport',
        openHoursLabel: 'Horario de Atención',
        languagesLabel: 'Idiomas Hablados',
      },
    },
  },
  pt: {
    hub: {
      seoTitle: 'Nossas Agências em Connecticut | Danbury HQ, Watertown e Bridgeport',
      metaDescription: 'Conheça os escritórios da Associated Insurance Agency em Danbury (Sede Principal), Watertown e Bridgeport, CT. Fale com corretores licenciados fluentes em português.',
      heroBadge: 'Presença Local em Connecticut',
      heroHeadline: 'Três Agências Convenientes em Todo o Estado de Connecticut',
      heroSubheadline: 'Visite nossos profissionais de seguros independentes em Danbury, Watertown ou Bridgeport para contratar seguros pessoais e comerciais no seu idioma.',
      introTitle: 'Corretores Locais. Relações Reais. Liberdade de Escolha.',
      introText: 'Ao contrário de seguradoras diretas da internet ou agências exclusivas de uma única marca, a Associated Insurance Agency opera três escritórios comunitários em Connecticut. Comparamos mais de 11 seguradoras líderes para oferecer a você preços competitivos com atendimento próximo e humano.',
      viewOfficeDetails: 'Ver Detalhes e Equipe',
      getDirections: 'Como Chegar',
      callOffice: 'Ligar para a Agência',
      headquartersBadge: 'Sede Principal',
      branchBadge: 'Agência',
      allOfficesHours: 'Todas as agências abertas de Segunda a Sexta, 8:30 AM – 5:00 PM EST',
      whyLocalMattersTitle: 'Por Que Ter uma Agência Local em Connecticut Faz Toda a Diferença',
      whyLocalMattersText: 'Connecticut tem leis e exigências securitárias específicas—desde inundações costeiras no estreito de Long Island Sound até limites legais de seguro auto (CGS § 14-112) e rigoroso seguro de acidentes de trabalho (Workers’ Comp CGS § 31-284). Nossos corretores vivem nessas cidades e entendem sua realidade.',
      feature1Title: 'Comparação Independente de Preços',
      feature1Desc: 'Comparamos seguradoras como Travelers, Safeco, The Hartford, Progressive e Guard para encontrar a melhor proteção pelo menor custo.',
      feature2Title: 'Atendimento Nativo em Português',
      feature2Desc: 'Tire suas dúvidas sem burocracia ou barreiras de idioma com corretores licenciados que falam português, espanhol e inglês.',
      feature3Title: 'Emissão Rápida de Certificados (COI) e Apoio em Sinistros',
      feature3Desc: 'Quando precisar de um certificado ACORD 25 no mesmo dia ou suporte com sinistro, você fala diretamente com quem cuidou da sua apólice.',
    },
    locations: {
      danbury: {
        name: 'Sede Principal em Danbury (HQ)',
        shortName: 'Danbury (HQ)',
        tag: 'Sede Principal',
        seoTitle: 'Agência de Seguros em Danbury CT | Auto, Casa e Comercial | Danbury HQ',
        metaDescription: 'Associated Insurance Agency em Danbury, CT (50 Newtown Road). Cote seguros de automóvel, casa e comercial com múltiplas seguradoras. Falamos português.',
        heroHeadline: 'Seguros Locais de Confiança em Danbury, CT',
        heroSubheadline: 'Cobertura Pessoal e Comercial da Associated Insurance Agency',
        officeOverview: [
          'A Associated Insurance Agency foi fundada em 2008. Nosso escritório de Danbury fica na 50 Newtown Road (Suite 1), logo na saída 8 da Interestadual 84, com estacionamento gratuito no local. Aqui atuam nossos corretores licenciados e a equipe de atendimento.',
          'Emitimos apólices pessoais e comerciais em todo o condado de Fairfield e região. Se você precisa de certificados de seguro (COI) no mesmo dia para obras, proteção de responsabilidade civil para imóveis multifamiliares ou seguro auto nos limites legais de Connecticut, cuidamos da documentação e acompanhamos você em casos de sinistro.',
          'Como agência independente, trabalhamos com seguradoras como Travelers, Safeco, The Hartford, Progressive e Guard. Comparamos cotações em várias empresas para encontrar o menor valor com a cobertura certa.',
        ],
        localRisksAndFocusHeading: 'Especialidades de Seguro em Danbury',
        localRisksAndFocusDesc: 'Danbury concentra empresas de construção e reforma, casas perto do lago Candlewood, imóveis multifamiliares e tráfego pesado na I-84. Nossos corretores são especializados em:',
        coverageLines: [
          {
            title: 'Responsabilidade Civil Comercial para Empreiteiros',
            desc: 'Seguro de responsabilidade civil geral (General Liability), ferramentas e maquinário (inland marine) e certificados ACORD 25 emitidos no mesmo dia para empreiteiros e prestadores de serviço.',
          },
          {
            title: 'Seguro para Imóveis Multifamiliares e Aluguel',
            desc: 'Cobertura contra incêndio (dwelling fire), perda de aluguel e responsabilidade civil para casas de 2 a 4 famílias e imóveis de locação em Danbury.',
          },
          {
            title: 'Seguro Automotivo e Motoristas da Rodovia I-84',
            desc: 'Apólices automotivas em conformidade com as leis de Connecticut (CGS § 14-112), com opções de colisão, cobertura compreensiva, guincho 24 horas e seguro Umbrella.',
          },
          {
            title: 'Seguro Residencial para Casas Unifamiliares',
            desc: 'Proteção para casas unifamiliares em Danbury, Bethel, Brookfield e Ridgefield contra vendavais, incêndio, danos elétricos e responsabilidade civil.',
          },
        ],
        communitiesHeading: 'Cidades Atendidas',
        communitiesDesc: 'Nosso escritório de Danbury atende moradores e empresas no norte de Fairfield, sul de Litchfield e cidades vizinhas do estado de Nova York:',
        staffHeading: 'Nossa Equipe em Danbury',
        staffSubheading: 'Conheça os corretores licenciados e a equipe de atendimento do escritório da Newtown Road.',
        faqs: [
          {
            question: 'Onde fica a Associated Insurance Agency em Danbury, CT?',
            answer: 'Estamos na 50 Newtown Road, Suite 1, Danbury, CT 06810, bem na saída 8 da Interstate 84. O estacionamento em frente é gratuito.',
          },
          {
            question: 'Preciso agendar horário para ser atendido em Danbury?',
            answer: 'Não precisa marcar hora. Atendemos sem agendamento de segunda a sexta-feira, das 8h30 às 17h. Se preferir falar com um corretor específico sobre apólices comerciais, ligue antes para (203) 748-9272.',
          },
          {
            question: 'Quais idiomas são falados na agência de Danbury?',
            answer: 'Nossa equipe em Danbury fala português, inglês, espanhol e turco. Explicamos suas coberturas, franquias e valores diretamente em português, sem termos complicados.',
          },
          {
            question: 'Com que rapidez consigo um Certificado de Seguro (COI)?',
            answer: 'Para clientes comerciais com apólice ativa, emitimos o certificado ACORD 25 no mesmo dia, incluindo cláusulas de segurado adicional e renúncia de sub-rogação.',
          },
        ],
        directionsCta: 'Como Chegar a Danbury HQ',
        callOfficeCta: 'Ligar para (203) 748-9272',
        quoteOfficeCta: 'Pedir Cotação em Danbury',
        openHoursLabel: 'Horário de Atendimento',
        languagesLabel: 'Idiomas Falados',
      },
      watertown: {
        name: 'Agência de Watertown',
        shortName: 'Watertown',
        tag: 'Agência',
        seoTitle: 'Agência de Seguros em Watertown CT | Carro, Casa e Empresas',
        metaDescription: 'Associated Insurance Agency em Watertown, CT na 51 Depot Street. Corretores independentes atendendo Watertown, Waterbury e o condado de Litchfield.',
        heroHeadline: 'Seguros Locais de Confiança em Watertown, CT',
        heroSubheadline: 'Cobertura Pessoal e Comercial da Associated Insurance Agency',
        officeOverview: [
          'A agência de Watertown da Associated Insurance Agency fica na 51 Depot Street, Suite 112, no centro de Watertown, próxima às rodovias 63 e 73. Atendemos moradores e empreendedores de Watertown, Waterbury e toda a região.',
          'Nossa equipe é especializada em linhas pessoais: pacotes de casa e carro, veículos clássicos e antigos, seguro pet e proteção para imóveis alugados.',
          'Por sermos corretores independentes, comparamos opções entre empresas como Travelers, Safeco, Progressive e Foremost para garantir o melhor custo-benefício.',
        ],
        localRisksAndFocusHeading: 'Foco de Seguros em Watertown e Região',
        localRisksAndFocusDesc: 'Casas com terrenos amplos, carros colecionáveis e motoristas da Rota 8 fazem parte da rotina local. Atuamos com:',
        coverageLines: [
          {
            title: 'Pacotes Conjugados de Casa e Carro (Bundles)',
            desc: 'Combinações que elevam seus limites de cobertura com descontos expressivos concedidos pelas seguradoras parceiras.',
          },
          {
            title: 'Carros Clássicos e Veículos de Colecionador',
            desc: 'Apólices com valor pré-acordado (Agreed Value) e cobertura específica para peças raras e eventos de carros antigos.',
          },
          {
            title: 'Seguros para Casas de Aluguel (Dwelling Fire)',
            desc: 'Proteção contra incêndio e danos para proprietários de imóveis locados em Watertown e Waterbury.',
          },
          {
            title: 'Seguro de Responsabilidade Civil Umbrella',
            desc: 'Proteção adicional a partir de US$ 1.000.000 para blindar seu patrimônio e rendimentos familiares contra processos.',
          },
        ],
        communitiesHeading: 'Cidades Atendidas',
        communitiesDesc: 'Nossa agência de Watertown atende o condado de Litchfield e a região de Waterbury:',
        staffHeading: 'Equipe da Nossa Agência em Watertown',
        staffSubheading: 'Conheça nossos profissionais de seguros na Depot Street em Watertown.',
        faqs: [
          {
            question: 'Onde fica a agência de Watertown?',
            answer: 'Estamos na 51 Depot St Ste 112, Watertown, CT 06795, bem perto da Main Street (Rota 63), com estacionamento fácil no local.',
          },
          {
            question: 'Vocês atendem clientes de Waterbury e Oakville?',
            answer: 'Sim! Atendemos com frequência clientes de Waterbury, Oakville, Woodbury, Middlebury e cidades vizinhas.',
          },
          {
            question: 'Quais idiomas são falados em Watertown?',
            answer: 'Na agência de Watertown atendemos em português, inglês, espanhol e turco. Você pode analisar cotações, revisar apólices e acionar sinistros no seu idioma de preferência.',
          },
          {
            question: 'Posso pagar minha fatura na agência de Watertown?',
            answer: 'Sim, nossa recepção aceita pagamentos e ajuda você a programar débito automático com sua seguradora.',
          },
        ],
        directionsCta: 'Como Chegar a Watertown',
        callOfficeCta: 'Ligar para (203) 748-9272',
        quoteOfficeCta: 'Pedir Cotação em Watertown',
        openHoursLabel: 'Horário de Atendimento',
        languagesLabel: 'Idiomas Falados',
      },
      bridgeport: {
        name: 'Agência de Bridgeport',
        shortName: 'Bridgeport',
        tag: 'Agência',
        seoTitle: 'Agência de Seguros em Bridgeport CT | Carro, Casa e Empresas | 2465 Main St',
        metaDescription: 'Associated Insurance Agency em Bridgeport, CT (2465 Main Street). Compare cotações de seguro auto, residencial, comercial e enchente com múltiplas seguradoras. Atendimento em português.',
        heroHeadline: 'Seguros Locais de Confiança em Bridgeport, CT',
        heroSubheadline: 'Cobertura Pessoal e Comercial da Associated Insurance Agency',
        officeOverview: [
          'Nosso escritório de Bridgeport fica na 2465 Main Street, no North End, a duas quadras do St. Vincent’s Medical Center e com acesso direto pelas rotas 8 e 25 (saídas 4 e 5). Há vagas de estacionamento gratuitas na frente e ao longo da Main Street.',
          'Emitimos apólices comerciais e residenciais em todo o litoral de Fairfield County. Cuidamos de seguros para casas multifamiliares de 2 a 4 famílias, seguro contra enchentes (flood) próximo ao Long Island Sound, veículos comerciais, seguro de acidentes de trabalho (Workers’ Comp) e certificados de seguro (COI) no mesmo dia para prestadores de serviço e construtores.',
          'Como agência independente, comparamos preços entre Travelers, Safeco, The Hartford, Progressive e Guard. Nossas corretoras falam português, espanhol, inglês e turco fluentemente, esclarecendo dúvidas sobre coberturas, franquias e sinistros sem complicações.',
        ],
        localRisksAndFocusHeading: 'Ramos de Seguro em Bridgeport',
        localRisksAndFocusDesc: 'Bridgeport concentra grande volume de casas multifamiliares para locação, imóveis expostos a enchentes litorâneas e profissionais autônomos. Nossa equipe foca em:',
        coverageLines: [
          {
            title: 'Imóveis Multifamiliares (2 a 4 Famílias e Triple-Deckers)',
            desc: 'Proteção contra incêndio, reposição predial, perda de aluguel e responsabilidade civil para proprietários e investidores imobiliários em Bridgeport.',
          },
          {
            title: 'Seguro Contra Enchentes (NFIP e Mercado Privado)',
            desc: 'Apólices federais da FEMA (NFIP) e seguros privados para imóveis próximos ao Long Island Sound, Black Rock Harbor e rio Pequonnock.',
          },
          {
            title: 'Responsabilidade Civil Comercial e Empreiteiros',
            desc: 'Garantia de responsabilidade civil geral, seguro de ferramentas, Workers’ Comp (CGS § 31-284) e emissão de certificados ACORD 25 no mesmo dia para lojas, oficinas e empreiteiros.',
          },
          {
            title: 'Seguro Automotivo e Limites Oficiais de CT',
            desc: 'Planos que cumprem a legislação CGS § 14-112 de Connecticut, com cobertura contra colisão, danos abrangentes, guincho 24 horas e motorista sem seguro.',
          },
        ],
        communitiesHeading: 'Cidades Atendidas',
        communitiesDesc: 'Nosso escritório de Bridgeport atende segurados em todo o litoral de Fairfield County e no vale do Naugatuck:',
        staffHeading: 'Equipe de Bridgeport',
        staffSubheading: 'Corretoras licenciadas e atendimento ao cliente na 2465 Main Street:',
        faqs: [
          {
            question: 'Onde fica o escritório da Associated Insurance Agency em Bridgeport?',
            answer: 'Fica na 2465 Main Street, Bridgeport, CT 06606, entre a Capitol Avenue e a Vincellette Street, perto do St. Vincent’s Medical Center. O acesso é direto pelas saídas 4 e 5 das rotas 8 e 25.',
          },
          {
            question: 'Vocês têm atendimento em português em Bridgeport?',
            answer: 'Sim. Nossa equipe em Bridgeport fala português, espanhol, inglês e turco fluentemente. Você revisa sua apólice e tira dúvidas diretamente no seu idioma nativo.',
          },
          {
            question: 'Posso contratar seguro contra enchentes (flood) em Bridgeport?',
            answer: 'Sim. Emitimos apólices da FEMA (NFIP) e planos de seguradoras privadas para casas, sobrados multifamiliares e estabelecimentos comerciais no litoral.',
          },
          {
            question: 'O que preciso levar para cotar seguro de carro?',
            answer: 'Traga sua carteira de habilitação (driver’s license), o registro do veículo (registration) e a apólice atual, caso já possua seguro. Comparamos os preços na hora.',
          },
        ],
        directionsCta: 'Como Chegar a Bridgeport',
        callOfficeCta: 'Ligar para (203) 748-9272',
        quoteOfficeCta: 'Pedir Cotação em Bridgeport',
        openHoursLabel: 'Horário de Atendimento',
        languagesLabel: 'Idiomas Falados',
      },
    },
  },
  tr: {
    hub: {
      seoTitle: 'Connecticut Ofislerimiz | Danbury Merkez, Watertown ve Bridgeport',
      metaDescription: 'Associated Insurance Agency Connecticut ofisleri: Danbury (Genel Merkez), Watertown ve Bridgeport. Türkçe ve çok dilli lisanslı sigorta uzmanlarımızla tanışın.',
      heroBadge: 'Connecticut Genelinde Yerel Varlık',
      heroHeadline: 'Connecticut Genelinde 3 Kolay Ulaşılabilir Şube',
      heroSubheadline: 'Danbury, Watertown ve Bridgeport şubelerimizde bireysel ve ticari sigorta ihtiyaçlarınız için ana dilinizde bağımsız sigorta acenteliği hizmeti alın.',
      introTitle: 'Yerel Uzmanlar. Güçlü Bağlar. Bağımsız Seçenekler.',
      introText: 'Yalnızca tek bir şirkete bağlı acentelerin veya çevrim içi çağrı merkezlerinin aksine, Associated Insurance Agency Connecticut genelinde üç tam yetkili ofisle hizmet verir. 11’den fazla lider sigorta şirketini karşılaştırarak rekabetçi fiyatları samimi ve yerel ilgiyle sunuyoruz.',
      viewOfficeDetails: 'Şube Detayları ve Ekip',
      getDirections: 'Yol Tarifi Al',
      callOffice: 'Şubeyi Ara',
      headquartersBadge: 'Genel Merkez',
      branchBadge: 'Şube',
      allOfficesHours: 'Tüm şubelerimiz Pazartesi – Cuma, 8:30 – 17:00 EST saatleri arasında açıktır',
      whyLocalMattersTitle: 'Connecticut’ta Yerel Bir Acente ile Çalışmanın Önemi',
      whyLocalMattersText: 'Connecticut eyaletinin kendine özgü sigorta gereksinimleri ve iklim riskleri bulunur: Kıyı fırtınaları ve sel risklerinden zorunlu araç sorumluluk limitlerine (CGS § 14-112) ve işçi tazminatına (CGS § 31-284) kadar tüm detayları bölgede yaşayan uzmanlarımız yakından bilir.',
      feature1Title: 'Bağımsız Fiyat Karşılaştırması',
      feature1Desc: 'Travelers, Safeco, The Hartford, Progressive ve Guard gibi prestijli şirketlerin tekliflerini karşılaştırarak en uygun primi buluruz.',
      feature2Title: 'Türkçe ve Çok Dilli Hizmet',
      feature2Desc: 'Poliçe detaylarını Türkçe, İngilizce, İspanyolca veya Portekizce dillerinde karmaşık terimler olmadan rahatça anlayabilirsiniz.',
      feature3Title: 'Hızlı Sigorta Belgesi (COI) ve Hasar Desteği',
      feature3Desc: 'ACORD 25 belgesine veya hasar anında yardıma ihtiyaç duyduğunuzda çağrı merkezi robotlarıyla değil, doğrudan poliçenizi hazırlayan ekiple görüşürsünüz.',
    },
    locations: {
      danbury: {
        name: 'Danbury Merkez Ofisi (HQ)',
        shortName: 'Danbury (HQ)',
        tag: 'Genel Merkez',
        seoTitle: 'Danbury CT Sigorta Acentesi | Araç, Konut ve Ticari Sigorta | Danbury HQ',
        metaDescription: 'Associated Insurance Agency Danbury ofisi (50 Newtown Road). Birden fazla şirketten araç, ev ve ticari sigorta tekliflerini karşılaştırın. Türkçe destek.',
        heroHeadline: 'Danbury, CT’de Güvenilir Yerel Sigorta',
        heroSubheadline: 'Associated Insurance Agency’den Bireysel ve Ticari Teminatlar',
        officeOverview: [
          'Associated Insurance Agency 2008 yılında kuruldu. Danbury ofisimiz Interstate 84 Otoyolu 8. çıkışında, 50 Newtown Road (Suite 1) adresindedir ve ücretsiz otoparkı vardır. Lisanslı acente temsilcilerimiz ve müşteri ekibimiz bu ofiste hizmet verir.',
          'Fairfield ve Litchfield bölgelerinde bireysel ve ticari poliçeler düzenliyoruz. Şantiye için aynı gün sigorta belgesi (COI), çok aileli kiralık binalar için sorumluluk poliçesi veya Connecticut eyalet sınırlarına uygun araç sigortası gerektiğinde tüm evrak işlemlerinizi yürütüyoruz.',
          'Bağımsız acente olarak Travelers, Safeco, The Hartford, Progressive ve Guard gibi şirketlerle çalışıyoruz. Farklı şirketlerin tekliflerini karşılaştırarak bütçenize en uygun primi buluyoruz.',
        ],
        localRisksAndFocusHeading: 'Danbury Sigorta Alanlarımız',
        localRisksAndFocusDesc: 'Danbury’de inşaat ustaları, Candlewood Gölü çevresindeki evler, çok aileli binalar ve I-84 otoyol trafiği öne çıkar. Ekibimiz şu branşlara odaklanır:',
        coverageLines: [
          {
            title: 'Ticari Genel Sorumluluk ve Müteahhit Sigortası',
            desc: 'İnşaat ve tadilat ustaları için genel sorumluluk, alet-ekipman teminatı ve aynı gün düzenlenen ACORD 25 sigorta belgesi (COI).',
          },
          {
            title: 'Çok Aileli Konut ve Kiralık Mülk Sigortası',
            desc: 'Danbury genelindeki 2 ila 4 daireli binalar için bina yangın teminatı, kira kaybı ve mülk sahibi sorumluluk sigortası.',
          },
          {
            title: 'Bireysel Araç Sigortası ve I-84 Yolculuk Koruması',
            desc: 'Connecticut CGS § 14-112 yasal limitlerine uygun; kasko, çarpışma, 7/24 yol yardımı ve şemsiye poliçe seçenekli araç sigortası.',
          },
          {
            title: 'Müstakil Konut ve Ev Sahibi Sigortası (Homeowners)',
            desc: 'Danbury, Bethel, Brookfield ve Ridgefield çevresindeki müstakil konutlar için fırtına, yangın, rüzgar ve sorumluluk teminatı.',
          },
        ],
        communitiesHeading: 'Hizmet Verdiğimiz Şehirler',
        communitiesDesc: 'Danbury ofisimiz kuzey Fairfield, güney Litchfield ve sınır komşusu New York ilçelerine hizmet verir:',
        staffHeading: 'Danbury Ekibimiz',
        staffSubheading: 'Newtown Road ofisimizdeki lisanslı sigorta danışmanlarımız ve müşteri temsilcilerimiz:',
        faqs: [
          {
            question: 'Associated Insurance Agency Danbury ofisi nerede?',
            answer: 'Ofisimiz 50 Newtown Road, Suite 1, Danbury, CT 06810 adresindedir. Interstate 84 Otoyolu 8. çıkışından hemen ulaşabilirsiniz. Ön tarafta ücretsiz otoparkımız mevcuttur.',
          },
          {
            question: 'Ofise gelmeden önce randevu almam gerekiyor mu?',
            answer: 'Randevu gerekmez. Pazartesi-Cuma günleri 8:30 – 17:00 saatleri arasında doğrudan gelebilirsiniz. Kapsamlı ticari poliçeler için gelmeden önce (203) 748-9272 numarasını arayabilirsiniz.',
          },
          {
            question: 'Danbury ofisinde hangi diller konuşuluyor?',
            answer: 'Danbury ofisimizde Türkçe, İngilizce, İspanyolca ve Portekizce konuşulur. Poliçe detaylarınızı ve hasar işlemlerinizi doğrudan Türkçe görüşebilirsiniz.',
          },
          {
            question: 'Sigorta Belgesini (COI) ne kadar sürede alabilirim?',
            answer: 'Aktif ticari poliçesi olan müşterilerimize ek sigortalı ve rücu feragati maddeleri dahil ACORD 25 belgesini aynı gün teslim ediyoruz.',
          },
        ],
        directionsCta: 'Danbury Ofisine Yol Tarifi',
        callOfficeCta: 'Ara: (203) 748-9272',
        quoteOfficeCta: 'Danbury Ofisinden Teklif Al',
        openHoursLabel: 'Çalışma Saatleri',
        languagesLabel: 'Konuşulan Diller',
      },
      watertown: {
        name: 'Watertown Şubesi',
        shortName: 'Watertown',
        tag: 'Şube',
        seoTitle: 'Watertown CT Sigorta Acentesi | Araç, Konut ve İş Yeri Sigortası',
        metaDescription: 'Associated Insurance Agency Watertown, CT şubesi: 51 Depot Street. Watertown, Waterbury ve Litchfield bölgesinde bireysel ve ticari sigorta hizmetleri.',
        heroHeadline: 'Watertown, CT’de Güvenilir Yerel Sigorta',
        heroSubheadline: 'Associated Insurance Agency’den Bireysel ve Ticari Teminatlar',
        officeOverview: [
          'Associated Insurance Agency Watertown şubesi, Watertown merkezinde Route 63 ve Route 73 kavşağına yakın 51 Depot Street, Suite 112 adresinde yer alır. Litchfield County ve Waterbury çevresindeki aileler ve işletmeler için güvenilir bir başvuru noktasıdır.',
          'Bireysel branş uzmanlarımız konut ve araç paketlerinden klasik otomobil sigortasına, evcil hayvan sigortasından kiralık mülk yangın poliçelerine kadar geniş bir yelpazede hizmet verir.',
          'Bağımsız bir acente olarak tek bir şirkete bağlı değiliz. Travelers, Safeco, Progressive ve Foremost şirketlerinin tekliflerini karşılaştırarak bütçenizi koruruz.',
        ],
        localRisksAndFocusHeading: 'Watertown ve Litchfield Bölgesinde Sigorta Odağımız',
        localRisksAndFocusDesc: 'Geniş arazili evler, klasik araç koleksiyonları ve Route 8 yolcuları için sunduğumuz özel çözümler:',
        coverageLines: [
          {
            title: 'Konut ve Araç İndirimli Paketleri (Bundles)',
            desc: 'Tek poliçe çatısı altında prim avantajı sağlayan çoklu poliçe indirimleri.',
          },
          {
            title: 'Klasik ve Antika Araç Sigortası',
            desc: 'Değeri önceden belirlenmiş (Agreed Value) ve hobi araçlarına özel koruma paketleri.',
          },
          {
            title: 'Kiralık Mülk ve Yangın Sigortası (Dwelling Fire)',
            desc: 'Waterbury ve Watertown bölgesindeki kiralık ev sahipleri için sorumluluk ve bina hasar teminatı.',
          },
          {
            title: 'Bireysel Şemsiye Sorumluluk Sigortası (Umbrella)',
            desc: '1 Milyon Dolar ve üzeri ek sorumluluk limitiyle beklenmedik davalara karşı ailenizin mal varlığını koruma.',
          },
        ],
        communitiesHeading: 'Hizmet Verilen Şehirler',
        communitiesDesc: 'Watertown şubemiz Litchfield County ve Central Naugatuck Valley genelinde hizmet vermektedir:',
        staffHeading: 'Watertown Şubesi Ekibimiz',
        staffSubheading: 'Watertown Depot Street ofisimizdeki sigorta temsilcilerimizle tanışın.',
        faqs: [
          {
            question: 'Watertown ofisi nerede yer alıyor?',
            answer: 'Ofisimiz 51 Depot St Ste 112, Watertown, CT 06795 adresinde, Main Street’e çok yakın ve kolay otopark imkanı olan bir konumdadır.',
          },
          {
            question: 'Waterbury ve Oakville bölgesine hizmet veriyor musunuz?',
            answer: 'Evet! Watertown şubemiz Waterbury, Oakville, Woodbury, Middlebury ve komşu tüm yerleşim yerlerine hizmet vermektedir.',
          },
          {
            question: 'Watertown şubesinde hangi diller konuşuluyor?',
            answer: 'Watertown şubemizde İngilizce, İspanyolca, Portekizce ve Türkçe hizmet verilmektedir. Poliçe tekliflerini ve ayrıntılarını ana dilinizde görüşebilirsiniz.',
          },
          {
            question: 'Poliçe ödememi Watertown ofisinden yapabilir miyim?',
            answer: 'Evet, ofisimizde doğrudan ödeme yapabilir veya otomatik ödeme talimatlarınızı oluşturabilirsiniz.',
          },
        ],
        directionsCta: 'Watertown Ofisine Yol Tarifi',
        callOfficeCta: 'Ara: (203) 748-9272',
        quoteOfficeCta: 'Watertown Ofisinden Teklif Al',
        openHoursLabel: 'Çalışma Saatleri',
        languagesLabel: 'Konuşulan Diller',
      },
      bridgeport: {
        name: 'Bridgeport Şubesi',
        shortName: 'Bridgeport',
        tag: 'Şube',
        seoTitle: 'Bridgeport CT Sigorta Acentesi | Araç, Ev ve Ticari Sigorta | 2465 Main St',
        metaDescription: 'Associated Insurance Agency Bridgeport ofisi (2465 Main Street). Birden fazla şirketten araç, çok aileli konut, ticari ve sel sigortası tekliflerini karşılaştırın.',
        heroHeadline: 'Bridgeport, CT’de Güvenilir Yerel Sigorta',
        heroSubheadline: 'Associated Insurance Agency’den Bireysel ve Ticari Teminatlar',
        officeOverview: [
          'Bridgeport ofisimiz 2465 Main Street adresinde, St. Vincent’s Medical Center’a iki sokak mesafede ve Route 8 ile Route 25 otoyollarının 4 ve 5 numaralı çıkışlarının hemen yanındadır. Bina önünde ve cadde üzerinde ücretsiz otopark mevcuttur.',
          'Fairfield County kıyı bölgesinde bireysel ve ticari poliçeler düzenliyoruz. Bridgeport genelindeki 2 ila 4 daireli kiralık binalar, Long Island Sound kıyısındaki sel sigortaları (NFIP), ticari araçlar ve inşaat ustaları için aynı gün ACORD 25 sigorta belgesi (COI) düzenliyoruz.',
          'Bağımsız acente olarak Travelers, Safeco, The Hartford, Progressive ve Guard dahil olmak üzere birden fazla sigorta şirketiyle çalışıyoruz. Lisanslı temsilcilerimiz İngilizce, İspanyolca, Portekizce ve Türkçe dillerinde hizmet verir.',
        ],
        localRisksAndFocusHeading: 'Bridgeport Sigorta Alanlarımız',
        localRisksAndFocusDesc: 'Bridgeport’ta çok aileli kiralık binalar, Long Island Sound kıyısındaki sel riskleri, ticari işletmeler ve I-95 ile Route 8/25 otoyol trafiği öne çıkar. Ekibimiz şu branşlara odaklanır:',
        coverageLines: [
          {
            title: 'Çok Aileli Konut ve Kiralık Mülk Sigortası',
            desc: 'Bridgeport genelindeki 2 ila 4 daireli binalar ve triple-decker yapılar için bina yangın teminatı, kira kaybı ve mülk sahibi sorumluluk sigortası.',
          },
          {
            title: 'Kıyı ve Sel Sigortası (NFIP ve Özel Sel)',
            desc: 'Long Island Sound, Black Rock Limanı ve Pequonnock Nehri çevresindeki binalar için federal FEMA (NFIP) ve özel sel sigortası poliçeleri.',
          },
          {
            title: 'Ticari Genel Sorumluluk ve Müteahhit Sigortası',
            desc: 'Marketler, restoranlar ve inşaat ustaları için genel sorumluluk, alet teminatı, işçi tazminatı (CGS § 31-284) ve aynı gün düzenlenen ACORD 25 belgesi.',
          },
          {
            title: 'Araç Sigortası ve Connecticut Yasal Limitleri',
            desc: 'Connecticut CGS § 14-112 yasal limitlerine tam uyumlu; kasko, çarpışma, 7/24 çekici ve sigortasız sürücü teminatlı otomobil poliçeleri.',
          },
        ],
        communitiesHeading: 'Hizmet Verdiğimiz Şehirler',
        communitiesDesc: 'Bridgeport ofisimiz kıyı Fairfield bölgesi ve Naugatuck Vadisi ilçelerine hizmet verir:',
        staffHeading: 'Bridgeport Ekibimiz',
        staffSubheading: '2465 Main Street ofisimizdeki lisanslı sigorta danışmanlarımız ve müşteri temsilcilerimiz:',
        faqs: [
          {
            question: 'Associated Insurance Agency Bridgeport ofisi nerede?',
            answer: 'Ofisimiz 2465 Main Street, Bridgeport, CT 06606 adresinde, Capitol Avenue ile Vincellette Street arasında ve St. Vincent’s Medical Center yakınındadır. Route 8 veya Route 25 üzerinden 4 ve 5 numaralı çıkışlardan doğrudan ulaşabilirsiniz.',
          },
          {
            question: 'Bridgeport ofisinde hangi diller konuşuluyor?',
            answer: 'Bridgeport ofisimizde İngilizce, İspanyolca, Portekizce ve Türkçe dillerinde hizmet verilir. Poliçe kapsamı ve evrak işlemlerinizi bu dillerde yürütebilirsiniz.',
          },
          {
            question: 'Bridgeport’ta sel sigortası yaptırabilir miyim?',
            answer: 'Evet. Long Island Sound kıyısı ve nehir taşkın alanlarındaki konutlar ve ticari binalar için hem resmi FEMA (NFIP) hem de özel sel poliçeleri düzenliyoruz.',
          },
          {
            question: 'Araç sigortası teklifi almak için ne getirmeliyim?',
            answer: 'Ehliyetiniz, araç tescil belgeniz (registration) ve varsa mevcut poliçenizi getirmeniz yeterlidir. Farklı şirketlerin tekliflerini anında karşılaştırıyoruz.',
          },
        ],
        directionsCta: 'Bridgeport Ofisine Yol Tarifi',
        callOfficeCta: 'Ara: (203) 748-9272',
        quoteOfficeCta: 'Bridgeport Ofisinden Teklif Al',
        openHoursLabel: 'Çalışma Saatleri',
        languagesLabel: 'Konuşulan Diller',
      },
    },
  },
};

export function getLocationTranslation(locationId: LocationId, lang: 'en' | 'es' | 'pt' | 'tr' = 'en'): LocationTranslation {
  const locLang = locationsI18n[lang] || locationsI18n.en;
  return locLang.locations[locationId] || locationsI18n.en.locations[locationId];
}

export function getLocationsHubTranslation(lang: 'en' | 'es' | 'pt' | 'tr' = 'en'): LocationsHubTranslation {
  const locLang = locationsI18n[lang] || locationsI18n.en;
  return locLang.hub;
}
