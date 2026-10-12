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
        metaDescription: 'Visit Associated Insurance Agency in Danbury, CT at 50 Newtown Road. Full-service independent insurance brokerage for auto, homeowners, and commercial coverage in Fairfield County.',
        heroHeadline: 'Insurance Agency in Danbury, CT',
        heroSubheadline: 'Our corporate headquarters on Newtown Road serves Danbury and Greater Fairfield County with comprehensive personal and business insurance solutions in English, Spanish, Portuguese, and Turkish.',
        officeOverview: [
          'Founded in 2008 and incorporated in 2016, Associated Insurance Agency’s Danbury headquarters is located conveniently at 50 Newtown Road (Suite 1), directly accessible from Interstate 84 at Exit 8. As our flagship corporate office, Danbury houses our executive leadership and our largest team of licensed insurance producers and customer service representatives.',
          'Whether you are purchasing a home in Candlewood Lake, operating a construction company in Fairfield County, or seeking affordable auto coverage that meets Connecticut statutory limits, our Danbury team provides hands-on policy design and dedicated claims advocacy.',
          'We represent over 11 top-tier regional and national carriers, allowing us to independently compare coverage options and secure competitive rates without sacrificing personal service.',
        ],
        localRisksAndFocusHeading: 'Key Coverage Specialties in Greater Danbury',
        localRisksAndFocusDesc: 'Greater Danbury blends thriving commercial trades, lakeside properties, and active commuter corridors. Our Danbury agents specialize in addressing these unique regional requirements:',
        coverageLines: [
          {
            title: 'Commercial General Liability & Contractors',
            desc: 'Tailored general liability, tools & equipment inland marine, and same-day ACORD 25 certificates for trade contractors, builders, and artisans across Fairfield County.',
          },
          {
            title: 'Multifamily & Residential Landlord Policies',
            desc: 'Comprehensive dwelling fire, loss of rent, and premises liability for 2-to-4 family properties and rental dwellings throughout the Danbury metro area.',
          },
          {
            title: 'Personal Auto & I-84 Commuter Insurance',
            desc: 'Policies tailored to meet Connecticut CGS § 14-112 limits with optional collision, comprehensive, roadside assistance, and umbrella excess liability.',
          },
          {
            title: 'Homeowners & High-Value Dwelling Protection',
            desc: 'Dwelling, personal property, and specialized storm protection for single-family homes in Danbury, Bethel, Brookfield, and Ridgefield.',
          },
        ],
        communitiesHeading: 'Communities & Municipalities Served',
        communitiesDesc: 'Our Danbury office serves clients throughout northern Fairfield County, Litchfield County borders, and adjacent New York counties:',
        staffHeading: 'Your Danbury Office Team',
        staffSubheading: 'Meet our licensed insurance professionals and customer service specialists based at our Danbury headquarters.',
        faqs: [
          {
            question: 'Where is Associated Insurance Agency located in Danbury, CT?',
            answer: 'Associated Insurance Agency Danbury HQ is located at 50 Newtown Road, Suite 1, Danbury, CT 06810. We are easily accessible from Interstate 84 (Exit 8), close to major retail centers with ample free on-site parking.',
          },
          {
            question: 'Do I need an appointment to visit the Danbury office?',
            answer: 'Walk-in visitors are always welcome during standard business hours (Monday through Friday, 8:30 AM to 5:00 PM EST). If you have complex commercial policies or wish to meet with a specific licensed producer, calling ahead at (203) 748-9272 helps ensure immediate availability.',
          },
          {
            question: 'What languages are spoken at the Danbury headquarters?',
            answer: 'Our Danbury headquarters offers native multilingual service in English, Spanish (Español), Portuguese (Português), and Turkish (Türkçe). Our staff will guide you through your coverage options in the language you are most comfortable with.',
          },
          {
            question: 'How fast can I get a Certificate of Insurance (COI) in Danbury?',
            answer: 'For active commercial policyholders, our Danbury office provides same-day ACORD 25 certificates of insurance with necessary additional insured endorsements and waivers of subrogation to keep your jobs moving forward.',
          },
        ],
        directionsCta: 'Get Directions to Danbury HQ',
        callOfficeCta: 'Call (203) 748-9272',
        quoteOfficeCta: 'Request a Quote from Danbury HQ',
        openHoursLabel: 'Office Hours',
        languagesLabel: 'Languages Spoken',
      },
      watertown: {
        name: 'Watertown Branch Office',
        shortName: 'Watertown',
        tag: 'Branch Office',
        seoTitle: 'Insurance Agency Watertown CT | Auto, Home & Business Insurance',
        metaDescription: 'Associated Insurance Agency in Watertown, CT at 51 Depot Street. Trusted independent insurance agents serving Watertown, Waterbury, and Litchfield County.',
        heroHeadline: 'Insurance Agency in Watertown, CT',
        heroSubheadline: 'Located on Depot Street in Watertown, our branch office delivers trusted personal and commercial insurance solutions to Litchfield County and the Naugatuck Valley.',
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
            answer: 'Our Watertown branch provides service in English and Turkish directly on-site, with seamless real-time access to our Spanish and Portuguese licensed producers via our internal multi-branch network.',
          },
          {
            question: 'Can I pay my carrier insurance bill at the Watertown office?',
            answer: 'Yes. Our front-desk customer service representative can accept direct payments and guide you through setting up automatic carrier EFT or online payments through our carrier directory.',
          },
        ],
        directionsCta: 'Get Directions to Watertown Office',
        callOfficeCta: 'Call (860) 274-8888',
        quoteOfficeCta: 'Request a Quote from Watertown Office',
        openHoursLabel: 'Office Hours',
        languagesLabel: 'Languages Spoken',
      },
      bridgeport: {
        name: 'Bridgeport Community Branch',
        shortName: 'Bridgeport',
        tag: 'Community Branch',
        seoTitle: 'Insurance Agency Bridgeport CT | Auto, Home, Business | Main St',
        metaDescription: 'Associated Insurance Agency in Bridgeport, CT at 2465 Main Street. Bilingual licensed insurance agents offering auto, home, commercial & flood coverage in Fairfield County.',
        heroHeadline: 'Insurance Agency in Bridgeport, CT',
        heroSubheadline: 'Located on Main Street in Bridgeport’s North End, our community branch provides licensed, bilingual insurance representation for personal and commercial clients across Fairfield County.',
        officeOverview: [
          'Our Bridgeport community branch is situated at 2465 Main Street in Bridgeport’s vibrant North End corridor, near St. Vincent’s Medical Center and with swift access to Route 1, Route 8, and Route 25. This location was specifically established to provide accessible, face-to-face insurance guidance to Bridgeport’s dynamic residential and business communities.',
          'Our Bridgeport team consists of fully bilingual and trilingual licensed professionals fluent in English, Spanish, and Portuguese. We understand the unique needs of local homeowners, multi-family real estate investors, and small business owners—from corner bodegas and restaurants to transport and construction trades.',
          'With access to more than 11 regional and national insurance carriers, our Bridgeport agents help families and business owners identify high-value coverage that protects against Connecticut’s strict liability requirements and Long Island Sound storm exposures.',
        ],
        localRisksAndFocusHeading: 'Key Coverage Specialties in Coastal Fairfield County',
        localRisksAndFocusDesc: 'Coastal weather, urban density, and active small enterprise define Bridgeport. Our Main Street office specializes in:',
        coverageLines: [
          {
            title: 'Coastal & NFIP Flood Insurance',
            desc: 'National Flood Insurance Program (NFIP) policies and private market flood solutions for properties exposed to Long Island Sound coastal storm surges.',
          },
          {
            title: 'Small Business & Trade Contractor Policies',
            desc: 'Business Owners Policies (BOP), commercial liability, and workers’ compensation for local retail shops, restaurants, and subcontracting trades.',
          },
          {
            title: 'Multifamily (3-Family & Multi-Unit) Insurance',
            desc: 'Tailored property and premise liability solutions for classic Connecticut multi-family dwellings, absentee owners, and local property managers.',
          },
          {
            title: 'Urban Auto & State Minimum Liability',
            desc: 'Competitive personal and commercial auto insurance meeting Connecticut statutory standards (CGS § 14-112) with roadside and collision enhancements.',
          },
        ],
        communitiesHeading: 'Communities & Municipalities Served',
        communitiesDesc: 'Our Bridgeport branch proudly serves coastal Fairfield County and surrounding metropolitan communities:',
        staffHeading: 'Your Bridgeport Office Team',
        staffSubheading: 'Meet our bilingual licensed insurance producers and customer service representatives on Main Street.',
        faqs: [
          {
            question: 'Where is the Bridgeport branch of Associated Insurance Agency located?',
            answer: 'Our Bridgeport office is located at 2465 Main Street, Bridgeport, CT 06606, in the North End, directly accessible from Route 8 / Route 25 (Exit 4/5) and close to St. Vincent’s Medical Center.',
          },
          {
            question: 'Do you have Spanish and Portuguese speaking agents in Bridgeport?',
            answer: 'Yes! Our Bridgeport office features licensed insurance producers and staff who speak fluent Spanish and Portuguese (Hablamos Español / Falamos Português), ensuring all policy terms and documents are clearly explained.',
          },
          {
            question: 'Can I get flood insurance for my home or business in Bridgeport?',
            answer: 'Yes. Bridgeport and surrounding coastal towns (Stratford, Fairfield, Milford) face specific flood zones along Long Island Sound. We offer both FEMA NFIP policies and private flood insurance options.',
          },
          {
            question: 'What do I need to bring to get an auto insurance quote at the Bridgeport office?',
            answer: 'Bring your driver’s license, current vehicle registration, and a copy of your existing insurance declarations page (if currently insured). Our team will compare multiple carriers to find the best rate immediately.',
          },
        ],
        directionsCta: 'Get Directions to Bridgeport Office',
        callOfficeCta: 'Call (203) 333-8880',
        quoteOfficeCta: 'Request a Quote from Bridgeport Office',
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
        metaDescription: 'Visite Associated Insurance Agency en Danbury, CT en 50 Newtown Road. Agencia independiente de seguros para auto, casa y negocios en el condado de Fairfield. Hablamos español.',
        heroHeadline: 'Agencia de Seguros en Danbury, CT',
        heroSubheadline: 'Nuestra sede central en Newtown Road atiende a Danbury y el condado de Fairfield con seguros personales y comerciales en español, inglés, portugués y turco.',
        officeOverview: [
          'Fundada en 2008 e incorporada en 2016, la sede central de Associated Insurance Agency se encuentra convenientemente ubicada en 50 Newtown Road (Suite 1), con acceso directo desde la autopista Interestatal 84 (Salida 8). Como oficina principal, alberga al equipo directivo y a nuestro grupo más amplio de productores licenciados y representantes de atención.',
          'Ya sea que esté comprando una vivienda, operando una empresa de construcción en Fairfield o buscando seguro de auto asequible que cumpla con los límites de Connecticut, nuestro equipo en Danbury le brinda asesoría personalizada y defensa en reclamos.',
          'Representamos a más de 11 aseguradoras regionales y nacionales, lo que nos permite comparar tarifas y opciones de cobertura para ofrecerle la mejor protección sin perder la atención cercana.',
        ],
        localRisksAndFocusHeading: 'Especialidades de Cobertura en el Área de Danbury',
        localRisksAndFocusDesc: 'El área de Danbury combina empresas comerciales en crecimiento, viviendas residenciales y transitados corredores viales. Nuestros agentes se especializan en:',
        coverageLines: [
          {
            title: 'Responsabilidad Civil Comercial y Contratistas',
            desc: 'Pólizas de responsabilidad general, cobertura de herramientas y certificados COI (ACORD 25) en el mismo día para contratistas de construcción.',
          },
          {
            title: 'Seguro para Casas Multifamiliares y Propietarios',
            desc: 'Protección para viviendas de 2 a 4 familias, pólizas de incendio de vivienda y pérdida de alquileres en toda el área metropolitana de Danbury.',
          },
          {
            title: 'Seguro de Autos Personales y Conductores de la I-84',
            desc: 'Pólizas que cumplen con la ley CGS § 14-112 de Connecticut, con opciones de cobertura completa, asistencia en carretera y pólizas paraguas.',
          },
          {
            title: 'Seguro de Propietarios de Vivienda (Homeowners)',
            desc: 'Cobertura para casas unifamiliares en Danbury, Bethel, Brookfield y Ridgefield frente a daños por tormentas, fuego y responsabilidad civil.',
          },
        ],
        communitiesHeading: 'Comunidades y Ciudades que Atendemos',
        communitiesDesc: 'Nuestra oficina de Danbury atiende a clientes en el norte del condado de Fairfield, áreas vecinas de Litchfield y condados cercanos de Nueva York:',
        staffHeading: 'Equipo de Nuestra Oficina en Danbury',
        staffSubheading: 'Conozca a nuestros productores de seguros licenciados y representantes de servicio al cliente en Danbury.',
        faqs: [
          {
            question: '¿Dónde está ubicada Associated Insurance Agency en Danbury, CT?',
            answer: 'Nuestra sede central está ubicada en 50 Newtown Road, Suite 1, Danbury, CT 06810, muy cerca de la Interestatal 84 (Salida 8), con amplio estacionamiento gratuito.',
          },
          {
            question: '¿Se requiere cita previa para visitar la oficina de Danbury?',
            answer: 'No es obligatoria; atendemos visitas sin cita de lunes a viernes, de 8:30 AM a 5:00 PM EST. Si desea reunirse con un agente específico o analizar un caso comercial complejo, puede llamarnos al (203) 748-9272.',
          },
          {
            question: '¿Qué idiomas se hablan en la sede central de Danbury?',
            answer: 'Ofrecemos atención directa y fluida en español, inglés, portugués y turco. Le explicaremos cada detalle de su póliza en su idioma materno.',
          },
          {
            question: '¿Con qué rapidez puedo obtener un Certificado de Seguro (COI)?',
            answer: 'Para clientes comerciales con pólizas activas, nuestra oficina de Danbury emite certificados ACORD 25 el mismo día, incluyendo asegurados adicionales y exención de subrogación.',
          },
        ],
        directionsCta: 'Cómo Llegar a Danbury HQ',
        callOfficeCta: 'Llamar al (203) 748-9272',
        quoteOfficeCta: 'Pedir Cotización en Danbury HQ',
        openHoursLabel: 'Horario de Atención',
        languagesLabel: 'Idiomas Hablados',
      },
      watertown: {
        name: 'Sucursal de Watertown',
        shortName: 'Watertown',
        tag: 'Sucursal',
        seoTitle: 'Agencia de Seguros en Watertown CT | Auto, Hogar y Comercio',
        metaDescription: 'Associated Insurance Agency en Watertown, CT en 51 Depot Street. Agentes de seguros independientes al servicio de Watertown, Waterbury y el condado de Litchfield.',
        heroHeadline: 'Agencia de Seguros en Watertown, CT',
        heroSubheadline: 'Ubicada en Depot Street en Watertown, nuestra sucursal ofrece soluciones integrales de seguros para familias y negocios en el condado de Litchfield y el Valle de Naugatuck.',
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
            answer: 'En Watertown contamos con atención en inglés y turco directamente, y conectamos en tiempo real con nuestros productores hispanohablantes de Danbury y Bridgeport.',
          },
          {
            question: '¿Puedo pagar mi factura de seguro en la oficina de Watertown?',
            answer: 'Sí, recibimos pagos y le ayudamos a configurar pagos automáticos (EFT) con su compañía aseguradora.',
          },
        ],
        directionsCta: 'Cómo Llegar a la Oficina de Watertown',
        callOfficeCta: 'Llamar al (860) 274-8888',
        quoteOfficeCta: 'Pedir Cotización en Watertown',
        openHoursLabel: 'Horario de Atención',
        languagesLabel: 'Idiomas Hablados',
      },
      bridgeport: {
        name: 'Sucursal Comunitaria de Bridgeport',
        shortName: 'Bridgeport',
        tag: 'Sucursal Comunitaria',
        seoTitle: 'Agencia de Seguros en Bridgeport CT | Auto, Casa y Negocio | Main St',
        metaDescription: 'Associated Insurance Agency en Bridgeport, CT en 2465 Main Street. Agentes bilingües con seguros para autos, casas, negocios e inundación en Fairfield. Hablamos español.',
        heroHeadline: 'Agencia de Seguros en Bridgeport, CT',
        heroSubheadline: 'En Main Street en el North End de Bridgeport, nuestra sucursal brinda atención personalizada y bilingüe en seguros para familias y negocios en todo el condado de Fairfield.',
        officeOverview: [
          'Nuestra sucursal en Bridgeport está ubicada en 2465 Main Street, en el concurrido sector North End de Bridgeport, cerca de St. Vincent’s Medical Center y con acceso rápido a las rutas 1, 8 y 25. Esta oficina fue creada para brindar atención presencial y en su propio idioma a la comunidad de Bridgeport.',
          'Contamos con productores licenciados bilingües y trilingües (español, inglés y portugués). Entendemos a fondo las necesidades de familias locales, inversionistas en bienes raíces multifamiliares y pequeños negocios, bodegas, restaurantes y talleres.',
          'Con acceso a más de 11 aseguradoras, nuestros agentes le ayudan a elegir la póliza que mejor lo proteja frente a las regulaciones de Connecticut y los riesgos climáticos costeros de Long Island Sound.',
        ],
        localRisksAndFocusHeading: 'Especialidades de Cobertura en la Zona Costera de Fairfield',
        localRisksAndFocusDesc: 'La densidad urbana, el dinamismo comercial y el clima costero marcan las necesidades de Bridgeport. En Main Street nos especializamos en:',
        coverageLines: [
          {
            title: 'Seguro de Inundación Costera (NFIP y Privado)',
            desc: 'Pólizas del Programa Nacional de Seguro de Inundación y opciones privadas para zonas costeras expuestas a marejadas de Long Island Sound.',
          },
          {
            title: 'Pólizas Comerciales para Pequeñas Empresas',
            desc: 'Paquetes para dueños de negocios (BOP), responsabilidad comercial y compensación laboral (Workers’ Comp) para bodegas, restaurantes y contratistas.',
          },
          {
            title: 'Propiedades Multifamiliares (Casas de 3 Familias)',
            desc: 'Cobertura especializada para viviendas multifamiliares típicas de Connecticut, protección contra pérdida de rentas y responsabilidad civil.',
          },
          {
            title: 'Seguro de Autos y Límites de Connecticut',
            desc: 'Seguros de autos personales y comerciales que cumplen con la ley CGS § 14-112 de CT, con opciones de grúa y cobertura contra choques.',
          },
        ],
        communitiesHeading: 'Comunidades y Ciudades que Atendemos',
        communitiesDesc: 'Nuestra sucursal de Bridgeport atiende con orgullo a todo el condado costero de Fairfield:',
        staffHeading: 'Equipo de Nuestra Oficina en Bridgeport',
        staffSubheading: 'Conozca a nuestras productoras licenciadas y agentes de atención bilingües en Main Street.',
        faqs: [
          {
            question: '¿Dónde está la oficina de Bridgeport de Associated Insurance Agency?',
            answer: 'Estamos en 2465 Main Street, Bridgeport, CT 06606, en el North End, con acceso directo por la Ruta 8 / Ruta 25 y muy cerca de St. Vincent’s Medical Center.',
          },
          {
            question: '¿Tienen agentes que hablen español en Bridgeport?',
            answer: '¡Sí, absolutamente! En nuestra oficina de Bridgeport contamos con personal que habla español y portugués fluido (Hablamos Español / Falamos Português) para explicarle cada detalle de sus coberturas.',
          },
          {
            question: '¿Puedo contratar seguro de inundación para mi casa o negocio?',
            answer: 'Sí. En Bridgeport, Stratford, Fairfield y Milford existen áreas de alto riesgo por cercanía al agua. Gestionamos pólizas de FEMA (NFIP) y alternativas privadas.',
          },
          {
            question: '¿Qué documentos debo llevar para cotizar seguro de auto?',
            answer: 'Solo necesita su licencia de conducir, el registro del vehículo y, si ya tiene seguro, una copia de la póliza actual para comparar y mejorar su precio.',
          },
        ],
        directionsCta: 'Cómo Llegar a la Oficina de Bridgeport',
        callOfficeCta: 'Llamar al (203) 333-8880',
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
        metaDescription: 'Visite a Associated Insurance Agency em Danbury, CT na 50 Newtown Road. Corretora independente de seguros para carro, casa e empresas. Falamos português.',
        heroHeadline: 'Agência de Seguros em Danbury, CT',
        heroSubheadline: 'Nossa sede principal na Newtown Road atende Danbury e todo o condado de Fairfield com seguros pessoais e comerciais em português, inglês, espanhol e turco.',
        officeOverview: [
          'Fundada em 2008 e incorporada em 2016, a sede da Associated Insurance Agency está convenientemente localizada na 50 Newtown Road (Suite 1), com acesso direto pela Interestadual 84 (Saída 8). Como nossa principal agência, Danbury abriga nossa liderança e a maior equipe de corretores licenciados.',
          'Seja comprando seu imóvel, administrando sua empresa de construção ou buscando seguro de carro com os limites exigidos por Connecticut, nossa equipe em Danbury oferece assessoria direta e suporte em sinistros.',
          'Representamos mais de 11 seguradoras respeitadas, comparando coberturas para entregar a melhor economia sem abrir mão da qualidade.',
        ],
        localRisksAndFocusHeading: 'Especialidades de Cobertura na Região de Danbury',
        localRisksAndFocusDesc: 'Danbury combina forte atividade de construção civil, imóveis residenciais e tráfego intenso na I-84. Nossos especialistas atuam em:',
        coverageLines: [
          {
            title: 'Responsabilidade Civil Comercial para Empreiteiros',
            desc: 'Pólizas de General Liability, seguro de ferramentas e emissão de certificados COI (ACORD 25) no mesmo dia para profissionais da construção civil.',
          },
          {
            title: 'Seguro para Imóveis Multifamiliares e Aluguel',
            desc: 'Proteção contra incêndio, responsabilidade civil e perda de aluguel para casas de 2 a 4 famílias em toda a grande Danbury.',
          },
          {
            title: 'Seguro Automotivo e Motoristas da Rodovia I-84',
            desc: 'Apólices de acordo com a norma CGS § 14-112 de CT, com cobertura contra colisão, guincho 24h e apólice Umbrella complementar.',
          },
          {
            title: 'Seguro Residencial para Casas Unifamiliares',
            desc: 'Proteção para casas em Danbury, Bethel, Brookfield e Ridgefield contra vendavais, fogo e processos de terceiros.',
          },
        ],
        communitiesHeading: 'Cidades e Regiões Atendidas',
        communitiesDesc: 'Nossa sede de Danbury atende todo o norte de Fairfield County, divisa de Litchfield e regiões próximas de Nova York:',
        staffHeading: 'Equipe da Nossa Agência em Danbury',
        staffSubheading: 'Conheça nossos corretores licenciados e agentes de atendimento em Danbury.',
        faqs: [
          {
            question: 'Onde fica a Associated Insurance Agency em Danbury, CT?',
            answer: 'Nossa sede fica na 50 Newtown Road, Suite 1, Danbury, CT 06810, com acesso fácil pela saída 8 da I-84 e amplo estacionamento gratuito.',
          },
          {
            question: 'Preciso agendar horário para ser atendido em Danbury?',
            answer: 'Não é necessário; atendemos clientes sem hora marcada de segunda a sexta, das 8:30 AM às 5:00 PM EST. Para casos comerciais específicos, ligue para (203) 748-9272.',
          },
          {
            question: 'Quais idiomas são falados na agência de Danbury?',
            answer: 'Falamos português, inglês, espanhol e turco com fluência nativa para explicar cada detalhe da sua apólice com segurança.',
          },
          {
            question: 'Com que rapidez consigo um Certificado de Seguro (COI)?',
            answer: 'Para clientes com apólice ativa, nossa agência em Danbury emite certificados ACORD 25 no mesmo dia com endorsements de segurado adicional.',
          },
        ],
        directionsCta: 'Como Chegar a Danbury HQ',
        callOfficeCta: 'Ligar para (203) 748-9272',
        quoteOfficeCta: 'Pedir Cotação em Danbury HQ',
        openHoursLabel: 'Horário de Atendimento',
        languagesLabel: 'Idiomas Falados',
      },
      watertown: {
        name: 'Agência de Watertown',
        shortName: 'Watertown',
        tag: 'Agência',
        seoTitle: 'Agência de Seguros em Watertown CT | Carro, Casa e Empresas',
        metaDescription: 'Associated Insurance Agency em Watertown, CT na 51 Depot Street. Corretores independentes atendendo Watertown, Waterbury e o condado de Litchfield.',
        heroHeadline: 'Agência de Seguros em Watertown, CT',
        heroSubheadline: 'Localizada na Depot Street em Watertown, nossa agência oferece soluções de seguros pessoais e comerciais para todo o condado de Litchfield e Naugatuck Valley.',
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
            answer: 'No local falamos inglês e turco, e conectamos você em tempo real aos nossos corretores fluentes em português de Danbury e Bridgeport.',
          },
          {
            question: 'Posso pagar minha fatura na agência de Watertown?',
            answer: 'Sim, nossa recepção aceita pagamentos e ajuda você a programar débito automático com sua seguradora.',
          },
        ],
        directionsCta: 'Como Chegar a Watertown',
        callOfficeCta: 'Ligar para (860) 274-8888',
        quoteOfficeCta: 'Pedir Cotação em Watertown',
        openHoursLabel: 'Horário de Atendimento',
        languagesLabel: 'Idiomas Falados',
      },
      bridgeport: {
        name: 'Agência Comunitária de Bridgeport',
        shortName: 'Bridgeport',
        tag: 'Agência Comunitária',
        seoTitle: 'Agência de Seguros em Bridgeport CT | Carro, Casa e Negócios | Main St',
        metaDescription: 'Associated Insurance Agency em Bridgeport, CT na 2465 Main Street. Corretores licenciados fluentes em português oferecendo seguros de carro, casa, empresas e enchente.',
        heroHeadline: 'Agência de Seguros em Bridgeport, CT',
        heroSubheadline: 'Localizada na Main Street no North End de Bridgeport, nossa agência comunitária oferece atendimento bilíngue em seguros para famílias e empresas de Fairfield County.',
        officeOverview: [
          'Nossa agência de Bridgeport fica na 2465 Main Street, no dinâmico North End de Bridgeport, próxima ao St. Vincent’s Medical Center e com acesso rápido pelas rotas 1, 8 e 25. Criamos este espaço para oferecer atendimento presencial e próximo à numerosa comunidade brasileira e latina da região.',
          'Nossa equipe conta com corretoras licenciadas fluentes em português, espanhol e inglês. Compreendemos a fundo as necessidades de quem compra a casa própria, investe em imóveis multifamiliares de 3 famílias ou comanda pequenos negócios, restaurantes, oficinas e empresas prestadoras de serviço.',
          'Com mais de 11 seguradoras parceiras, comparamos as melhores opções para proteger seu patrimônio contra as exigências legais de Connecticut e tempestades litorâneas.',
        ],
        localRisksAndFocusHeading: 'Especialidades de Cobertura na Região Costeira de Fairfield',
        localRisksAndFocusDesc: 'Clima costeiro, densidade urbana e forte comércio caracterizam Bridgeport. Na Main Street, somos especialistas em:',
        coverageLines: [
          {
            title: 'Seguro Contra Enchentes e Tempestades (Flood)',
            desc: 'Apólices federais (NFIP) e opções no mercado privado para propriedades próximas à costa de Long Island Sound.',
          },
          {
            title: 'Seguros Comerciais para Pequenas Empresas',
            desc: 'Pacotes comerciais (BOP), responsabilidade civil e seguro de acidentes de trabalho (Workers’ Comp) para restaurantes, lojas e serviços.',
          },
          {
            title: 'Imóveis Multifamiliares (Casas de 3 Famílias)',
            desc: 'Cobertura ideal para as tradicionais casas multifamiliares de Connecticut, protegendo contra incêndio e processos de inquilinos.',
          },
          {
            title: 'Seguro Automotivo Urbano e Limites Estaduais',
            desc: 'Planos que atendem à legislação CGS § 14-112 de CT, com opções completas de colisão, guincho e proteção de terceiros.',
          },
        ],
        communitiesHeading: 'Cidades Atendidas',
        communitiesDesc: 'Nossa agência de Bridgeport atende com orgulho todo o litoral do condado de Fairfield:',
        staffHeading: 'Equipe da Nossa Agência em Bridgeport',
        staffSubheading: 'Conheça nossas corretoras licenciadas na Main Street fluentes em português.',
        faqs: [
          {
            question: 'Onde fica a agência de Bridgeport da Associated Insurance Agency?',
            answer: 'Fica na 2465 Main Street, Bridgeport, CT 06606, no North End, com fácil acesso pela Rota 8 / Rota 25 e bem perto do St. Vincent’s Medical Center.',
          },
          {
            question: 'Vocês têm corretores que falam português em Bridgeport?',
            answer: 'Sim! Nossa agência em Bridgeport tem atendimento nativo em português (Falamos Português) para explicar cada termo da sua apólice com clareza.',
          },
          {
            question: 'Consigo contratar seguro contra enchentes (Flood) para minha casa?',
            answer: 'Sim. Em Bridgeport, Stratford, Fairfield e Milford há áreas sujeitas a inundações costeiras. Trabalhamos com planos FEMA (NFIP) e seguradoras privadas.',
          },
          {
            question: 'O que preciso levar para cotar um seguro de carro em Bridgeport?',
            answer: 'Basta trazer sua carteira de motorista, o registro (registration) do veículo e a apólice atual (caso já possua seguro) para compararmos o preço.',
          },
        ],
        directionsCta: 'Como Chegar a Bridgeport',
        callOfficeCta: 'Ligar para (203) 333-8880',
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
        metaDescription: 'Associated Insurance Agency Danbury, CT merkez ofisi: 50 Newtown Road. Fairfield County bölgesinde araç, ev ve iş yeri sigortası için bağımsız sigorta acentesi. Türkçe destek.',
        heroHeadline: 'Danbury, CT Sigorta Acentesi',
        heroSubheadline: 'Newtown Road üzerindeki genel merkezimiz; Danbury ve Fairfield bölgesine Türkçe, İngilizce, İspanyolca ve Portekizce dillerinde kapsamlı sigorta çözümleri sunar.',
        officeOverview: [
          '2008 yılında kurulan ve 2016 yılında şirketleşen Associated Insurance Agency Danbury Genel Merkezi, Interstate 84 Otoyolu 8. Çıkışında, 50 Newtown Road (Suite 1) adresinde merkezi bir konumdadır. En büyük ofisimiz olarak yönetim ekibimize ve lisanslı sigorta danışmanlarımıza ev sahipliği yapar.',
          'Bölgede ev satın alırken, inşaat veya ticaret işletmenizi güvenceye alırken ya da Connecticut yasal sınırlarına uygun uygun fiyatlı araç sigortası ararken uzman ekibimiz yanınızdadır.',
          '11’den fazla bölgesel ve ulusal sigorta şirketini temsil ederek bağımsız teklif karşılaştırması sunuyor, en iyi teminatı bütçenize uygun primlerle sağlıyoruz.',
        ],
        localRisksAndFocusHeading: 'Danbury Bölgesinde Öne Çıkan Sigorta Branşları',
        localRisksAndFocusDesc: 'Gelişen ticari işletmeler, müstakil evler ve I-84 otoyol trafiği Danbury bölgesinin ana hatlarını oluşturur. Uzmanlıklarımız:',
        coverageLines: [
          {
            title: 'Ticari Genel Sorumluluk ve Müteahhit Sigortası',
            desc: 'İnşaat ustaları ve ticari işletmeler için aynı gün ACORD 25 sigorta belgesi (COI) ve genel sorumluluk teminatları.',
          },
          {
            title: 'Çok Aileli Konut ve Kiralık Mülk Sigortası',
            desc: '2 ila 4 daireli kiralık binalar ve konutlar için kira kaybı ve yangın teminatı sunan mülk sigortaları.',
          },
          {
            title: 'Bireysel Araç Sigortası ve I-84 Yolculuk Koruması',
            desc: 'Connecticut CGS § 14-112 yasa standartlarına uygun, kasko, yol yardımı ve şemsiye sorumluluk seçenekli poliçeler.',
          },
          {
            title: 'Müstakil Konut ve Ev Sahibi Sigortası (Homeowners)',
            desc: 'Danbury, Bethel, Brookfield ve Ridgefield çevresindeki evler için fırtına, yangın ve hırsızlık koruması.',
          },
        ],
        communitiesHeading: 'Hizmet Verilen Çevre Bölgeler',
        communitiesDesc: 'Danbury ofisimiz Fairfield County’nin kuzeyi, Litchfield sınırları ve komşu New York bölgelerine hizmet vermektedir:',
        staffHeading: 'Danbury Ofisi Ekibimiz',
        staffSubheading: 'Danbury merkez ofisimizde görev yapan lisanslı sigorta danışmanlarımız ve müşteri temsilcilerimizle tanışın.',
        faqs: [
          {
            question: 'Associated Insurance Agency Danbury ofisi nerede?',
            answer: 'Genel merkezimiz 50 Newtown Road, Suite 1, Danbury, CT 06810 adresindedir. Interstate 84 (Çıkış 8) hemen yanındadır ve geniş ücretsiz otoparkı mevcuttur.',
          },
          {
            question: 'Ofise gelmeden önce randevu almam gerekiyor mu?',
            answer: 'Randevusuz gelebilirsiniz; Pazartesi-Cuma günleri 8:30 – 17:00 saatleri arasında açığız. Kapsamlı ticari görüşmeler için önceden (203) 748-9272 numarasından arayabilirsiniz.',
          },
          {
            question: 'Danbury ofisinde hangi diller konuşuluyor?',
            answer: 'Danbury merkezimizde Türkçe, İngilizce, İspanyolca ve Portekizce dillerinde ana dil seviyesinde sigorta danışmanlığı sunulmaktadır.',
          },
          {
            question: 'Sigorta Belgesini (COI) ne kadar sürede alabilirim?',
            answer: 'Aktif ticari poliçesi olan müşterilerimize işlerini aksatmamak adına aynı gün ACORD 25 belgesi düzenlenmektedir.',
          },
        ],
        directionsCta: 'Danbury Merkezine Yol Tarifi',
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
        heroHeadline: 'Watertown, CT Sigorta Acentesi',
        heroSubheadline: 'Watertown şehir merkezindeki Depot Street ofisimiz, Litchfield County ve Naugatuck Vadisi sakinlerine güvenilir bağımsız sigorta hizmeti sunar.',
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
            answer: 'Watertown şubemizde İngilizce ve Türkçe hizmet verilmekte olup, İspanyolca ve Portekizce danışmanlarımıza anında erişim sağlanmaktadır.',
          },
          {
            question: 'Poliçe ödememi Watertown ofisinden yapabilir miyim?',
            answer: 'Evet, ofisimizde doğrudan ödeme yapabilir veya otomatik ödeme talimatlarınızı oluşturabilirsiniz.',
          },
        ],
        directionsCta: 'Watertown Ofisine Yol Tarifi',
        callOfficeCta: 'Ara: (860) 274-8888',
        quoteOfficeCta: 'Watertown Ofisinden Teklif Al',
        openHoursLabel: 'Çalışma Saatleri',
        languagesLabel: 'Konuşulan Diller',
      },
      bridgeport: {
        name: 'Bridgeport Şubesi',
        shortName: 'Bridgeport',
        tag: 'Şube',
        seoTitle: 'Bridgeport CT Sigorta Acentesi | Araç, Konut ve İş Yeri | Main St',
        metaDescription: 'Associated Insurance Agency Bridgeport, CT şubesi: 2465 Main Street. Fairfield bölgesinde araç, ev, ticari ve sel sigortası seçenekleri.',
        heroHeadline: 'Bridgeport, CT Sigorta Acentesi',
        heroSubheadline: 'Bridgeport North End Main Street adresindeki şubemiz, Fairfield County genelinde ailelere ve işletmelere yerinde sigorta danışmanlığı sağlar.',
        officeOverview: [
          'Bridgeport şubemiz 2465 Main Street adresinde, St. Vincent’s Medical Center yakınında ve Route 1, Route 8 ve Route 25 bağlantı yollarının hemen yanında yer almaktadır. Bridgeport sakinlerine ve esnafına yüz yüze güvenilir sigorta danışmanlığı sunmak amacıyla kurulmuştur.',
          'Lisanslı ekibimiz çok dilli hizmet sunarak yerel ev sahiplerinin, 3 aileli bina yatırımcılarının, restoranların, marketlerin ve müteahhitlerin ihtiyaçlarını yakından analiz eder.',
          '11’den fazla sigorta şirketi portföyümüzle, Long Island Sound kıyı risklerine ve Connecticut eyalet standartlarına uygun en avantajlı poliçeleri seçmenize yardımcı oluyoruz.',
        ],
        localRisksAndFocusHeading: 'Kıyı Fairfield Bölgesinde Sigorta Branşları',
        localRisksAndFocusDesc: 'Kıyı iklimi ve şehir içi ticari hareketlilik Bridgeport’un öncelikleridir. Main Street ofisimizin uzmanlıkları:',
        coverageLines: [
          {
            title: 'Kıyı ve Sel Sigortası (NFIP & Özel Sel)',
            desc: 'Long Island Sound kıyısında fırtına ve su baskını riskine maruz kalan konut ve iş yerleri için resmi ve özel sel poliçeleri.',
          },
          {
            title: 'Küçük İşletme ve Esnaf Sigortası',
            desc: 'Restoranlar, marketler ve servis işletmeleri için İş Yeri Paketi (BOP), genel sorumluluk ve işçi tazminatı (Workers’ Comp).',
          },
          {
            title: 'Çok Aileli (3-Family) Konut Sigortası',
            desc: 'Connecticut’ın tipik çok daireli binaları için kira kaybı ve bina sorumluluk teminatları.',
          },
          {
            title: 'Şehir İçi Araç Sigortası ve Yasal Limitler',
            desc: 'Connecticut CGS § 14-112 yasa limitlerine tam uyumlu, uygun fiyatlı ticari ve şahsi otomobil poliçeleri.',
          },
        ],
        communitiesHeading: 'Hizmet Verilen Şehirler',
        communitiesDesc: 'Bridgeport şubemiz kıyı Fairfield County ve komşu metropol ilçelerine hizmet vermektedir:',
        staffHeading: 'Bridgeport Şubesi Ekibimiz',
        staffSubheading: 'Main Street ofisimizdeki lisanslı sigorta danışmanlarımızla tanışın.',
        faqs: [
          {
            question: 'Bridgeport ofisi nerede yer alıyor?',
            answer: 'Ofisimiz 2465 Main Street, Bridgeport, CT 06606 adresinde, Route 8 / Route 25 çıkışına yakın konumdadır.',
          },
          {
            question: 'Bridgeport ofisinde hangi diller konuşuluyor?',
            answer: 'Ofisimizde İngilizce, İspanyolca ve Portekizce dillerinde hizmet verilmektedir.',
          },
          {
            question: 'Bridgeport’ta evim veya iş yerim için sel sigortası yaptırabilir miyim?',
            answer: 'Evet, Bridgeport, Stratford, Fairfield ve Milford kıyı bölgeleri için FEMA (NFIP) ve özel sel sigortası seçenekleri sunmaktayız.',
          },
          {
            question: 'Araç sigortası teklifi almak için ne getirmeliyim?',
            answer: 'Ehliyetiniz, araç tescil belgeniz (registration) ve varsa mevcut poliçenizi getirmeniz en iyi fiyatı karşılaştırmamız için yeterlidir.',
          },
        ],
        directionsCta: 'Bridgeport Ofisine Yol Tarifi',
        callOfficeCta: 'Ara: (203) 333-8880',
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
