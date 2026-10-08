export type HomeownersLang = 'en' | 'es' | 'pt' | 'tr';

export interface HomeownersTranslations {
  // Navigation & Header
  worksheetTitle: string;
  saveDraft: string;
  resetForm: string;
  draftSavedToast: string;
  stepOf: (current: number, total: number) => string;
  progressComplete: (pct: number) => string;
  hasErrorsAlert: string;
  otherErrors: (count: number) => string;

  // Buttons
  back: string;
  backToStep4: string;
  continueToNext: string;
  reviewAndSubmit: string;
  submitQuoteRequest: string;
  submittingQuoteRequest: string;
  edit: string;

  // Trust Badges
  trustCarriersTitle: string;
  trustCarriersSub: string;
  trustObligationTitle: string;
  trustObligationSub: string;
  trustSecurityTitle: string;
  trustSecuritySub: string;
  trustHqTitle: string;
  trustHqSub: string;

  // Steps Nav
  steps: {
    location: { label: string; short: string; desc: string };
    construction: { label: string; short: string; desc: string };
    safety: { label: string; short: string; desc: string };
    coverage: { label: string; short: string; desc: string };
    review: { label: string; short: string; desc: string };
  };

  // Step 1: Location
  step1: {
    title: string;
    subtitle: string;
    addressLegend: string;
    streetAddress: string;
    streetPlaceholder: string;
    streetHelper: string;
    unit: string;
    unitPlaceholder: string;
    unitHelper: string;
    city: string;
    cityPlaceholder: string;
    state: string;
    zipCode: string;
    zipPlaceholder: string;
    zipHelper: string;
    propertyLegend: string;
    propertyType: string;
    propertyTypeSelect: string;
    primaryUsage: string;
    primaryUsageSelect: string;
    yearBuilt: string;
    yearBuiltHelper: (currentYear: number) => string;
    propertyTypeOptions: Record<string, { label: string; desc: string }>;
    primaryUsageOptions: Record<string, { label: string; desc: string }>;
  };

  // Step 2: Construction
  step2: {
    title: string;
    subtitle: string;
    squareFootage: string;
    squareFootageHelper: string;
    stories: string;
    storiesSelect: string;
    roofMaterial: string;
    roofMaterialSelect: string;
    roofAge: string;
    roofAgeSelect: string;
    foundation: string;
    foundationSelect: string;
    exteriorWall: string;
    exteriorWallSelect: string;
    storiesOptions: Record<string, string>;
    roofMaterialOptions: Record<string, string>;
    roofAgeOptions: Record<string, string>;
    foundationOptions: Record<string, string>;
    exteriorWallOptions: Record<string, string>;
  };

  // Step 3: Safety
  step3: {
    title: string;
    subtitle: string;
    hydrant: string;
    hydrantHelper: string;
    hydrantOptions: Record<string, { label: string; desc: string }>;
    protectiveSystemsLegend: string;
    protectiveSystemsSub: string;
    protectiveDeviceOptions: Record<string, { label: string; discount: string }>;
    riskFactorsLegend: string;
    poolLabel: string;
    poolSub: string;
    poolFence: string;
    poolFenceOptions: { fenced: string; unfenced: string };
    trampolineLabel: string;
    trampolineSub: string;
    dogLabel: string;
    dogSub: string;
    dogBreed: string;
    dogBreedPlaceholder: string;
    claimsLegend: string;
    claimsHelper: string;
    claimsOptions: Record<string, string>;
  };

  // Step 4: Contact & Coverage
  step4: {
    title: string;
    subtitle: string;
    coverageLegend: string;
    startDate: string;
    startDateHelper: string;
    homeValue: string;
    homeValueHelper: string;
    replacementCost: string;
    replacementCostOptions: Record<string, { title: string; desc: string; popular?: boolean }>;
    deductible: string;
    deductibleHelper: string;
    deductibleOptions: Record<string, { label: string; note: string; recommended?: boolean }>;
    contactLegend: string;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    phoneNotice: string;
    insuranceStatus: string;
    insuranceStatusOptions: Record<string, { label: string; desc: string }>;
  };

  // Step 5: Review & Submit
  step5: {
    title: string;
    subtitle: string;
    step1Title: string;
    step2Title: string;
    step3Title: string;
    step4Title: string;
    applicant: string;
    effectiveDate: string;
    emailPhone: string;
    deductible: string;
    squareFootage: string;
    stories: string;
    roof: string;
    foundation: string;
    hydrant: string;
    protectiveDevices: string;
    noDevices: string;
    pool: string;
    trampoline: string;
    dog: string;
    dogNone: string;
    claimsLast5Years: string;
    previewBadge: string;
    estimatedDwellingReplacement: string;
    basedOnText: (replacementTitle: string, deductible: string) => string;
    legalConsentText: string;
    consentRequiredError: string;
    successBadge: string;
    successTitle: string;
    referenceCode: string;
    whatHappensNext: string;
    stepNext1Title: string;
    stepNext1Desc: string;
    stepNext2Title: string;
    stepNext2Desc: string;
    stepNext3Title: string;
    stepNext3Desc: (email: string) => string;
    callAgentBtn: string;
    startAnotherBtn: string;
    payloadBadge: string;
    payloadDesc: string;
    collapseJson: string;
    inspectPayload: string;
    copied: string;
    copyJson: string;
    download: string;
  };
}

export const homeownersTranslations: Record<HomeownersLang, HomeownersTranslations> = {
  en: {
    worksheetTitle: 'Official Rating Worksheet',
    saveDraft: 'Save Draft',
    resetForm: 'Reset Form',
    draftSavedToast: 'Quote draft saved! Your progress will persist across visits.',
    stepOf: (current, total) => `Step ${current} of ${total}`,
    progressComplete: (pct) => `${pct}% Complete`,
    hasErrorsAlert: 'Please correct the highlighted items below to continue:',
    otherErrors: (count) => `...and ${count} other item(s)`,

    back: 'Back',
    backToStep4: 'Back to Step 4',
    continueToNext: 'Continue to Next Step',
    reviewAndSubmit: 'Review & Submit',
    submitQuoteRequest: 'Submit Quote Request',
    submittingQuoteRequest: 'Submitting Quote Request...',
    edit: 'Edit',

    trustCarriersTitle: '10+ CT Carriers',
    trustCarriersSub: 'Travelers, Safeco, Chubb',
    trustObligationTitle: 'Zero Obligation',
    trustObligationSub: '100% Free rate comparison',
    trustSecurityTitle: '256-Bit SSL',
    trustSecuritySub: 'Encrypted data transmission',
    trustHqTitle: 'Danbury, CT HQ',
    trustHqSub: 'Local licensed brokers',

    steps: {
      location: { label: 'Property Location', short: 'Location', desc: 'Address & building basics' },
      construction: { label: 'Construction Details', short: 'Structure', desc: 'Sq ft, roof & foundation' },
      safety: { label: 'Safety & Risks', short: 'Safety', desc: 'Hydrant, alarms & exposures' },
      coverage: { label: 'Coverage & Contact', short: 'Coverage', desc: 'Deductible & personal info' },
      review: { label: 'Review & Rating', short: 'Review', desc: 'Verify details & submit' },
    },

    step1: {
      title: 'Step 1: Property Location & Basics',
      subtitle: 'Tell us about where your property is situated and its primary residential classification.',
      addressLegend: 'Physical Property Address',
      streetAddress: 'Street Address',
      streetPlaceholder: '123 Main Street',
      streetHelper: 'E.g., 50 Newtown Road',
      unit: 'Unit / Apt / Suite',
      unitPlaceholder: 'Apt 2B',
      unitHelper: 'Optional',
      city: 'City / Town',
      cityPlaceholder: 'Danbury',
      state: 'State',
      zipCode: 'ZIP Code',
      zipPlaceholder: '06810',
      zipHelper: '5-digit ZIP',
      propertyLegend: 'Property Classification',
      propertyType: 'Property Type',
      propertyTypeSelect: 'Select property classification...',
      primaryUsage: 'Primary Usage',
      primaryUsageSelect: 'Select residential usage...',
      yearBuilt: 'Year Built',
      yearBuiltHelper: (currentYear) => `Between 1700 and ${currentYear + 1}`,
      propertyTypeOptions: {
        single_family: { label: 'Single-family Home', desc: 'Detached standalone residential house' },
        condo_townhouse: { label: 'Condo / Townhouse', desc: 'Attached unit or condominium development' },
        multi_family: { label: 'Multi-family (2-4 Units)', desc: 'Duplex, triplex, or 4-unit residential building' },
        mobile_home: { label: 'Mobile / Manufactured', desc: 'Prefabricated manufactured home structure' },
      },
      primaryUsageOptions: {
        primary: { label: 'Primary Residence', desc: 'You live here most of the year' },
        secondary_vacation: { label: 'Secondary / Vacation', desc: 'Seasonal retreat or weekend getaway' },
        rental: { label: 'Rental Property', desc: 'Tenant-occupied investment property' },
      },
    },

    step2: {
      title: 'Step 2: Construction & Structural Details',
      subtitle: 'Provide structural specs so our replacement cost model can benchmark dwelling rebuild expenses accurately.',
      squareFootage: 'Living Area (Square Feet)',
      squareFootageHelper: 'Heated finished living area (excluding unfinished basement or garage)',
      stories: 'Number of Stories',
      storiesSelect: 'Select stories...',
      roofMaterial: 'Roof Material',
      roofMaterialSelect: 'Select primary roofing...',
      roofAge: 'Estimated Roof Age',
      roofAgeSelect: 'Select roof age bracket...',
      foundation: 'Foundation Type',
      foundationSelect: 'Select foundation...',
      exteriorWall: 'Exterior Wall Material',
      exteriorWallSelect: 'Select siding / exterior...',
      storiesOptions: {
        '1': '1 Story',
        '1.5': '1.5 Stories',
        '2': '2 Stories',
        '2.5': '2.5 Stories',
        '3+': '3+ Stories',
      },
      roofMaterialOptions: {
        asphalt_shingle: 'Asphalt Shingle',
        metal: 'Metal (Standing Seam)',
        tile: 'Clay / Concrete Tile',
        slate: 'Natural Slate',
        flat_rubber: 'Flat / Rubber Membrane',
      },
      roofAgeOptions: {
        '0-5': '0–5 years (Newer)',
        '6-10': '6–10 years',
        '11-20': '11–20 years',
        '20+': '20+ years (Aging)',
        unknown: 'Unknown / Not sure',
      },
      foundationOptions: {
        basement_finished: 'Basement - Finished',
        basement_unfinished: 'Basement - Unfinished',
        crawlspace: 'Crawlspace',
        slab: 'Concrete Slab',
      },
      exteriorWallOptions: {
        vinyl_siding: 'Vinyl Siding',
        brick_veneer: 'Brick Veneer',
        stucco: 'Stucco',
        wood: 'Wood / Cedar Shake',
        stone: 'Natural Stone / Masonry',
      },
    },

    step3: {
      title: 'Step 3: Safety, Features & Risk Factors',
      subtitle: 'Identify installed security measures, municipal fire response distance, and recreational exposures.',
      hydrant: 'Distance to Nearest Fire Hydrant',
      hydrantHelper: 'Proximity to municipal water sources directly discounts ISO Public Protection Class rates.',
      hydrantOptions: {
        under_1000: { label: '< 1,000 feet', desc: 'Optimal fire protection credit' },
        over_1000: { label: '> 1,000 feet', desc: 'Extended distance rating' },
        unknown: { label: 'Unknown', desc: 'Agent will verify Town GIS records' },
      },
      protectiveSystemsLegend: 'Protective Security & Fire Systems',
      protectiveSystemsSub: 'Select all devices in working order. Each adds tier discounts:',
      protectiveDeviceOptions: {
        smoke_detectors: { label: 'Smoke Detectors', discount: 'Base Credit' },
        deadbolts: { label: 'Deadbolts on Exterior Doors', discount: 'Up to 2% off' },
        burglar_alarm: { label: 'Local Burglar Alarm', discount: 'Up to 5% off' },
        central_station_fire: { label: 'Central Station Monitored Fire/Burglary', discount: 'Up to 10% off' },
        sprinkler_system: { label: 'Interior Fire Sprinkler System', discount: 'Up to 15% off' },
      },
      riskFactorsLegend: 'Property Features & Liability Factors',
      poolLabel: 'Swimming Pool on Premises',
      poolSub: 'In-ground or above-ground pool',
      poolFence: 'Pool Fence Enclosure',
      poolFenceOptions: {
        fenced: 'Fully fenced with latching gate',
        unfenced: 'Unfenced or partially open',
      },
      trampolineLabel: 'Trampoline or Skateboard Ramp',
      trampolineSub: 'Requires net enclosure for standard underwriting',
      dogLabel: 'Dog on Premises',
      dogSub: 'Liability verification for canine breeds',
      dogBreed: 'Dog Breed(s)',
      dogBreedPlaceholder: 'E.g., Golden Retriever, Labrador Mix',
      claimsLegend: 'Loss History (Last 5 Years)',
      claimsHelper: 'Prior property losses (weather, water, theft) on any residence in past 5 years.',
      claimsOptions: {
        '0': '0 Claims (Claim-Free Discount)',
        '1': '1 Prior Claim',
        '2': '2 Prior Claims',
        '3+': '3 or More Prior Claims',
      },
    },

    step4: {
      title: 'Step 4: Contact & Coverage Preferences',
      subtitle: 'Set your coverage expectations, deductible thresholds, and contact information for formal quote delivery.',
      coverageLegend: 'Coverage Endorsement Elections',
      startDate: 'Desired Coverage Start Date',
      startDateHelper: 'Choose your closing date or policy renewal date.',
      homeValue: 'Estimated Home Value (Reconstruction Basis)',
      homeValueHelper: 'Estimate rebuild cost, not land market valuation.',
      replacementCost: 'Dwelling Replacement Cost Endorsement',
      replacementCostOptions: {
        standard_100: {
          title: 'Standard (100%)',
          desc: 'Covers calculated dwelling replacement cost at policy renewal limit.',
        },
        extended_125: {
          title: 'Extended Replacement (125%)',
          desc: 'Provides up to an extra 25% buffer if construction materials or labor spike after a catastrophe.',
          popular: true,
        },
        guaranteed: {
          title: 'Guaranteed Replacement',
          desc: 'Pays whatever it costs to rebuild your dwelling back to original condition without cap.',
        },
      },
      deductible: 'All-Peril Deductible',
      deductibleHelper: 'Higher deductibles lower your annual premium cost.',
      deductibleOptions: {
        '500': { label: '$500', note: 'Higher premium, minimal out-of-pocket' },
        '1000': { label: '$1,000', note: 'Most popular balanced choice', recommended: true },
        '2500': { label: '$2,500', note: 'Moderate premium savings' },
        '5000': { label: '$5,000', note: 'Maximum upfront discount' },
      },
      contactLegend: 'Applicant Contact Information',
      firstName: 'First Name',
      lastName: 'Last Name',
      email: 'Email Address',
      phone: 'Phone Number',
      phoneNotice: 'By providing your contact details, you permit licensed AIA brokers to present quote options.',
      insuranceStatus: 'Current Insurance Status',
      insuranceStatusOptions: {
        currently_insured: { label: 'Currently Insured (Shopping / Expiring)', desc: 'Qualifies for prior coverage discount' },
        renewal_lapse: { label: 'Lapse in Coverage', desc: 'Currently uninsured or recently expired' },
        first_time_homebuyer: { label: 'First-Time Homebuyer / Closing Escrow', desc: 'Binder needed for mortgage closing' },
      },
    },

    step5: {
      title: 'Step 5: Review & Rate Submission',
      subtitle: 'Verify your property details, structural characteristics, and coverage elections before dispatching to carrier rating engines.',
      step1Title: 'Property Location & Basics',
      step2Title: 'Structural Specifications',
      step3Title: 'Safety & Risk Profile',
      step4Title: 'Coverage & Applicant Details',
      applicant: 'Applicant:',
      effectiveDate: 'Effective Date:',
      emailPhone: 'Email / Phone:',
      deductible: 'Deductible:',
      squareFootage: 'Square Footage:',
      stories: 'Stories:',
      roof: 'Roof:',
      foundation: 'Foundation:',
      hydrant: 'Hydrant:',
      protectiveDevices: 'Protective Devices:',
      noDevices: 'None selected',
      pool: 'Pool:',
      trampoline: 'Trampoline:',
      dog: 'Dog:',
      dogNone: 'None',
      claimsLast5Years: 'Claims (5 yrs):',
      previewBadge: 'Rating Formulation Preview',
      estimatedDwellingReplacement: 'Estimated Dwelling Replacement',
      basedOnText: (replacementTitle, deductible) => `Based on ${replacementTitle} with $${deductible} all-peril deductible.`,
      legalConsentText:
        'I certify that the information provided is accurate to the best of my knowledge. I understand that this quote request does not bind coverage and is subject to carrier underwriting approval. Associated Insurance Agency is authorized to shop rates with independent carriers in Connecticut.',
      consentRequiredError: 'Please confirm the consent acknowledgment to proceed.',
      successBadge: 'Rating Request Dispatched',
      successTitle: 'Quote Request Confirmed!',
      referenceCode: 'Reference Code:',
      whatHappensNext: 'What Happens Next?',
      stepNext1Title: '1. Multi-Carrier Pricing',
      stepNext1Desc: 'Our rating engine shops Travelers, Hartford, Safeco, Chubb & Andover for your optimal rate.',
      stepNext2Title: '2. Local Underwriting Review',
      stepNext2Desc: 'A licensed AIA Connecticut agent verifies town GIS hydrant data and optimizes all available discounts.',
      stepNext3Title: '3. Delivery & Binder',
      stepNext3Desc: (email) => `You will receive a side-by-side comparison PDF at ${email} within 24 business hours.`,
      callAgentBtn: 'Call Danbury Agent: (203) 748-9272',
      startAnotherBtn: 'Start Another Homeowners Quote',
      payloadBadge: 'Structured Rating API Payload',
      payloadDesc: 'Formatted payload delivered to insurance carrier rating webhooks.',
      collapseJson: 'Collapse JSON',
      inspectPayload: 'Inspect Payload',
      copied: 'Copied!',
      copyJson: 'Copy JSON',
      download: 'Download',
    },
  },

  es: {
    worksheetTitle: 'Formulario Oficial de Cotización',
    saveDraft: 'Guardar Borrador',
    resetForm: 'Reiniciar Formulario',
    draftSavedToast: '¡Borrador de cotización guardado! Su progreso se mantendrá si vuelve más tarde.',
    stepOf: (current, total) => `Paso ${current} de ${total}`,
    progressComplete: (pct) => `${pct}% Completado`,
    hasErrorsAlert: 'Por favor, corrija los campos resaltados a continuación para continuar:',
    otherErrors: (count) => `...y ${count} elemento(s) más`,

    back: 'Atrás',
    backToStep4: 'Volver al Paso 4',
    continueToNext: 'Continuar al Siguiente Paso',
    reviewAndSubmit: 'Revisar y Enviar',
    submitQuoteRequest: 'Enviar Solicitud de Cotización',
    submittingQuoteRequest: 'Enviando Solicitud de Cotización...',
    edit: 'Editar',

    trustCarriersTitle: '10+ Aseguradoras de CT',
    trustCarriersSub: 'Travelers, Safeco, Chubb',
    trustObligationTitle: 'Cero Compromiso',
    trustObligationSub: 'Comparación 100% gratuita',
    trustSecurityTitle: 'SSL de 256 Bits',
    trustSecuritySub: 'Transmisión de datos encriptada',
    trustHqTitle: 'Sede en Danbury, CT',
    trustHqSub: 'Agentes locales autorizados',

    steps: {
      location: { label: 'Ubicación de la Propiedad', short: 'Ubicación', desc: 'Dirección y datos básicos' },
      construction: { label: 'Detalles de Construcción', short: 'Estructura', desc: 'Pies cuadrados, techo y base' },
      safety: { label: 'Seguridad y Riesgos', short: 'Seguridad', desc: 'Hidrante, alarmas y protecciones' },
      coverage: { label: 'Cobertura y Contacto', short: 'Cobertura', desc: 'Deducible y datos personales' },
      review: { label: 'Revisión y Cotización', short: 'Revisión', desc: 'Verificar detalles y enviar' },
    },

    step1: {
      title: 'Paso 1: Ubicación de la Propiedad y Datos Básicos',
      subtitle: 'Indíquenos la ubicación de su propiedad y su clasificación residencial principal.',
      addressLegend: 'Dirección Física de la Propiedad',
      streetAddress: 'Dirección (Calle y Número)',
      streetPlaceholder: '123 Main Street',
      streetHelper: 'Ej., 50 Newtown Road',
      unit: 'Unidad / Apt / Suite',
      unitPlaceholder: 'Apt 2B',
      unitHelper: 'Opcional',
      city: 'Ciudad / Municipio',
      cityPlaceholder: 'Danbury',
      state: 'Estado',
      zipCode: 'Código Postal (ZIP)',
      zipPlaceholder: '06810',
      zipHelper: 'ZIP de 5 dígitos',
      propertyLegend: 'Clasificación de la Propiedad',
      propertyType: 'Tipo de Propiedad',
      propertyTypeSelect: 'Seleccione el tipo de propiedad...',
      primaryUsage: 'Uso Principal',
      primaryUsageSelect: 'Seleccione el uso residencial...',
      yearBuilt: 'Año de Construcción',
      yearBuiltHelper: (currentYear) => `Entre 1700 y ${currentYear + 1}`,
      propertyTypeOptions: {
        single_family: { label: 'Casa Unifamiliar', desc: 'Vivienda residencial independiente' },
        condo_townhouse: { label: 'Condominio / Casa Adosada', desc: 'Unidad adosada o desarrollo en régimen de condominio' },
        multi_family: { label: 'Multifamiliar (2-4 Unidades)', desc: 'Edificio residencial dúplex, tríplex o de 4 unidades' },
        mobile_home: { label: 'Casa Prefabricada / Móvil', desc: 'Estructura de vivienda manufacturada' },
      },
      primaryUsageOptions: {
        primary: { label: 'Residencia Principal', desc: 'Vive aquí la mayor parte del año' },
        secondary_vacation: { label: 'Secundaria / Vacacional', desc: 'Refugio de temporada o fines de semana' },
        rental: { label: 'Propiedad en Alquiler', desc: 'Propiedad de inversión ocupada por inquilinos' },
      },
    },

    step2: {
      title: 'Paso 2: Detalles Estructurales y de Construcción',
      subtitle: 'Proporcione especificaciones para que nuestro modelo estime con precisión los costos de reconstrucción.',
      squareFootage: 'Área Habitable (Pies Cuadrados)',
      squareFootageHelper: 'Superficie terminada con calefacción (excluyendo sótano sin terminar o garaje)',
      stories: 'Número de Pisos',
      storiesSelect: 'Seleccione los pisos...',
      roofMaterial: 'Material del Techo',
      roofMaterialSelect: 'Seleccione el material del techo...',
      roofAge: 'Antigüedad Estimada del Techo',
      roofAgeSelect: 'Seleccione el rango de antigüedad...',
      foundation: 'Tipo de Cimientos',
      foundationSelect: 'Seleccione los cimientos...',
      exteriorWall: 'Material de Paredes Exteriores',
      exteriorWallSelect: 'Seleccione el revestimiento exterior...',
      storiesOptions: {
        '1': '1 Piso',
        '1.5': '1.5 Pisos',
        '2': '2 Pisos',
        '2.5': '2.5 Pisos',
        '3+': '3+ Pisos',
      },
      roofMaterialOptions: {
        asphalt_shingle: 'Teja Asfáltica',
        metal: 'Metal (Junta Alzada)',
        tile: 'Teja de Arcilla o Concreto',
        slate: 'Pizarra Natural',
        flat_rubber: 'Membrana Plana / Caucho',
      },
      roofAgeOptions: {
        '0-5': '0–5 años (Reciente)',
        '6-10': '6–10 años',
        '11-20': '11–20 años',
        '20+': '20+ años (Antiguo)',
        unknown: 'No estoy seguro / Desconocido',
      },
      foundationOptions: {
        basement_finished: 'Sótano Terminado',
        basement_unfinished: 'Sótano Sin Terminar',
        crawlspace: 'Espacio Sanitario (Crawlspace)',
        slab: 'Losa de Concreto',
      },
      exteriorWallOptions: {
        vinyl_siding: 'Revestimiento de Vinilo',
        brick_veneer: 'Enchapado de Ladrillo',
        stucco: 'Estuco',
        wood: 'Madera / Teja de Cedro',
        stone: 'Piedra Natural / Mampostería',
      },
    },

    step3: {
      title: 'Paso 3: Seguridad, Medidas y Factores de Riesgo',
      subtitle: 'Indique los sistemas de seguridad instalados, proximidad al hidrante municipal y elementos recreativos.',
      hydrant: 'Distancia al Hidrante Más Cercano',
      hydrantHelper: 'La cercanía a fuentes municipales de agua aplica descuentos directos en la clase de protección ISO.',
      hydrantOptions: {
        under_1000: { label: '< 1,000 pies', desc: 'Crédito óptimo de protección contra incendios' },
        over_1000: { label: '> 1,000 pies', desc: 'Tarificación de distancia extendida' },
        unknown: { label: 'Desconocido', desc: 'El agente verificará los registros GIS del municipio' },
      },
      protectiveSystemsLegend: 'Sistemas de Seguridad y Protección Contra Incendios',
      protectiveSystemsSub: 'Seleccione todos los dispositivos que funcionan. Cada uno suma descuentos:',
      protectiveDeviceOptions: {
        smoke_detectors: { label: 'Detectores de Humo', discount: 'Crédito Base' },
        deadbolts: { label: 'Cerraduras de Seguridad en Puertas Exteriores', discount: 'Hasta 2% desc.' },
        burglar_alarm: { label: 'Alarma Local Antirrobo', discount: 'Hasta 5% desc.' },
        central_station_fire: { label: 'Alarma Monitoreada por Central (Fuego/Robo)', discount: 'Hasta 10% desc.' },
        sprinkler_system: { label: 'Sistema de Rociadores Interiores', discount: 'Hasta 15% desc.' },
      },
      riskFactorsLegend: 'Características del Inmueble y Factores de Responsabilidad',
      poolLabel: 'Piscina en la Propiedad',
      poolSub: 'Piscina enterrada o sobre suelo',
      poolFence: 'Cierre Perimetral de la Piscina',
      poolFenceOptions: {
        fenced: 'Completamente cercada con puerta con pestillo',
        unfenced: 'Sin cercar o parcialmente abierta',
      },
      trampolineLabel: 'Cama Elástica o Rampa de Skateboard',
      trampolineSub: 'Requiere red protectora para suscripción estándar',
      dogLabel: 'Perro en la Propiedad',
      dogSub: 'Verificación de responsabilidad según raza',
      dogBreed: 'Raza(s) del Perro',
      dogBreedPlaceholder: 'Ej., Golden Retriever, Mezcla de Labrador',
      claimsLegend: 'Historial de Reclamaciones (Últimos 5 Años)',
      claimsHelper: 'Reclamaciones previas de propiedad (clima, agua, robo) en cualquier residencia en los últimos 5 años.',
      claimsOptions: {
        '0': '0 Reclamaciones (Descuento por Cero Reclamos)',
        '1': '1 Reclamación Previa',
        '2': '2 Reclamaciones Previas',
        '3+': '3 o Más Reclamaciones Previas',
      },
    },

    step4: {
      title: 'Paso 4: Cobertura y Datos de Contacto',
      subtitle: 'Defina sus preferencias de cobertura, opciones de deducible y datos para enviarle su propuesta formal.',
      coverageLegend: 'Elección de Coberturas',
      startDate: 'Fecha Deseada de Inicio de Cobertura',
      startDateHelper: 'Elija su fecha de cierre o renovación de póliza.',
      homeValue: 'Valor Estimado de la Vivienda (Costo de Reconstrucción)',
      homeValueHelper: 'Estime el costo de reconstrucción, no el valor de mercado del terreno.',
      replacementCost: 'Endoso de Costo de Reemplazo de la Vivienda',
      replacementCostOptions: {
        standard_100: {
          title: 'Estándar (100%)',
          desc: 'Cubre el costo calculado de reemplazo al límite de renovación de la póliza.',
        },
        extended_125: {
          title: 'Reemplazo Extendido (125%)',
          desc: 'Ofrece hasta un 25% extra de margen si los materiales o mano de obra aumentan tras una catástrofe.',
          popular: true,
        },
        guaranteed: {
          title: 'Reemplazo Garantizado',
          desc: 'Paga lo que cueste reconstruir su vivienda a su estado original sin tope.',
        },
      },
      deductible: 'Deducible para Todo Peligro',
      deductibleHelper: 'Un deducible más alto reduce el costo anual de la póliza.',
      deductibleOptions: {
        '500': { label: '$500', note: 'Mayor prima, menor gasto de bolsillo' },
        '1000': { label: '$1,000', note: 'Opción equilibrada más popular', recommended: true },
        '2500': { label: '$2,500', note: 'Ahorro moderado en prima' },
        '5000': { label: '$5,000', note: 'Máximo descuento inicial' },
      },
      contactLegend: 'Datos de Contacto del Solicitante',
      firstName: 'Nombre',
      lastName: 'Apellido',
      email: 'Correo Electrónico',
      phone: 'Número de Teléfono',
      phoneNotice: 'Al proporcionar sus datos, autoriza a los agentes autorizados de AIA a presentarle opciones de cotización.',
      insuranceStatus: 'Estado Actual de Seguro',
      insuranceStatusOptions: {
        currently_insured: { label: 'Actualmente Asegurado (Comparando / Por Vencer)', desc: 'Califica para descuento por cobertura previa' },
        renewal_lapse: { label: 'Interrupción en Cobertura', desc: 'Actualmente sin seguro o vencido recientemente' },
        first_time_homebuyer: { label: 'Comprador de Primera Vivienda / En Cierre', desc: 'Requiere constancia para cierre hipotecario' },
      },
    },

    step5: {
      title: 'Paso 5: Revisión y Envío de Cotización',
      subtitle: 'Verifique los detalles de la propiedad, características estructurales y coberturas antes de enviar al motor de cotización.',
      step1Title: 'Ubicación y Datos Básicos',
      step2Title: 'Especificaciones Estructurales',
      step3Title: 'Seguridad y Perfil de Riesgo',
      step4Title: 'Cobertura y Datos del Solicitante',
      applicant: 'Solicitante:',
      effectiveDate: 'Fecha Efectiva:',
      emailPhone: 'Correo / Teléfono:',
      deductible: 'Deducible:',
      squareFootage: 'Pies Cuadrados:',
      stories: 'Pisos:',
      roof: 'Techo:',
      foundation: 'Cimientos:',
      hydrant: 'Hidrante:',
      protectiveDevices: 'Dispositivos de Protección:',
      noDevices: 'Ninguno seleccionado',
      pool: 'Piscina:',
      trampoline: 'Cama Elástica:',
      dog: 'Perro:',
      dogNone: 'Ninguno',
      claimsLast5Years: 'Reclamos (5 años):',
      previewBadge: 'Vista Previa de Formulación de Tarifa',
      estimatedDwellingReplacement: 'Reemplazo Estimado de Vivienda',
      basedOnText: (replacementTitle, deductible) => `Basado en ${replacementTitle} con deducible de $${deductible} para todo peligro.`,
      legalConsentText:
        'Certifico que la información provista es precisa a mi leal saber y entender. Entiendo que esta solicitud de cotización no vincula cobertura y está sujeta a la aprobación de suscripción de la aseguradora. Associated Insurance Agency está autorizada para comparar tarifas con aseguradoras independientes en Connecticut.',
      consentRequiredError: 'Por favor, confirme el consentimiento para continuar.',
      successBadge: 'Solicitud de Cotización Despachada',
      successTitle: '¡Solicitud de Cotización Confirmada!',
      referenceCode: 'Código de Referencia:',
      whatHappensNext: '¿Qué Sucede Ahora?',
      stepNext1Title: '1. Comparación con Múltiples Aseguradoras',
      stepNext1Desc: 'Cotizamos con Travelers, Hartford, Safeco, Chubb y Andover para encontrar su tarifa óptima.',
      stepNext2Title: '2. Revisión de Suscripción Local',
      stepNext2Desc: 'Un agente licenciado de AIA en Connecticut verifica los datos GIS de hidrantes y aplica todos los descuentos disponibles.',
      stepNext3Title: '3. Entrega de Propuesta y Certificado',
      stepNext3Desc: (email) => `Recibirá un informe comparativo en PDF en ${email} dentro de las próximas 24 horas hábiles.`,
      callAgentBtn: 'Llamar al Agente en Danbury: (203) 748-9272',
      startAnotherBtn: 'Iniciar Otra Cotización de Vivienda',
      payloadBadge: 'Carga Útil de API de Tarifas Estructurada',
      payloadDesc: 'Carga formateada entregada a los webhooks de aseguradoras.',
      collapseJson: 'Ocultar JSON',
      inspectPayload: 'Inspeccionar Carga JSON',
      copied: '¡Copiado!',
      copyJson: 'Copiar JSON',
      download: 'Descargar',
    },
  },

  pt: {
    worksheetTitle: 'Formulário Oficial de Cotação',
    saveDraft: 'Salvar Rascunho',
    resetForm: 'Redefinir Formulário',
    draftSavedToast: 'Rascunho da cotação salvo! Seu progresso continuará disponível.',
    stepOf: (current, total) => `Passo ${current} de ${total}`,
    progressComplete: (pct) => `${pct}% Concluído`,
    hasErrorsAlert: 'Por favor, corrija os itens destacados abaixo para continuar:',
    otherErrors: (count) => `...e mais ${count} item(ns)`,

    back: 'Voltar',
    backToStep4: 'Voltar ao Passo 4',
    continueToNext: 'Continuar para o Próximo Passo',
    reviewAndSubmit: 'Revisar e Enviar',
    submitQuoteRequest: 'Enviar Solicitação de Cotação',
    submittingQuoteRequest: 'Enviando Solicitação de Cotação...',
    edit: 'Editar',

    trustCarriersTitle: '10+ Seguradoras de CT',
    trustCarriersSub: 'Travelers, Safeco, Chubb',
    trustObligationTitle: 'Sem Compromisso',
    trustObligationSub: 'Comparação 100% gratuita',
    trustSecurityTitle: 'SSL de 256 Bits',
    trustSecuritySub: 'Transmissão de dados criptografada',
    trustHqTitle: 'Sede em Danbury, CT',
    trustHqSub: 'Corretores locais licenciados',

    steps: {
      location: { label: 'Localização do Imóvel', short: 'Localização', desc: 'Endereço e dados básicos' },
      construction: { label: 'Detalhes da Construção', short: 'Estrutura', desc: 'Área, telhado e fundação' },
      safety: { label: 'Segurança e Riscos', short: 'Segurança', desc: 'Hidrante, alarmes e proteções' },
      coverage: { label: 'Cobertura e Contato', short: 'Cobertura', desc: 'Franquia e dados pessoais' },
      review: { label: 'Revisão e Cotação', short: 'Revisão', desc: 'Verificar detalhes e enviar' },
    },

    step1: {
      title: 'Passo 1: Localização do Imóvel e Dados Básicos',
      subtitle: 'Informe onde sua propriedade está localizada e sua classificação residencial principal.',
      addressLegend: 'Endereço Físico do Imóvel',
      streetAddress: 'Endereço (Rua e Número)',
      streetPlaceholder: '123 Main Street',
      streetHelper: 'Ex.: 50 Newtown Road',
      unit: 'Unidade / Apt / Bloco',
      unitPlaceholder: 'Apt 2B',
      unitHelper: 'Opcional',
      city: 'Cidade / Município',
      cityPlaceholder: 'Danbury',
      state: 'Estado',
      zipCode: 'Código Postal (ZIP)',
      zipPlaceholder: '06810',
      zipHelper: 'ZIP de 5 dígitos',
      propertyLegend: 'Classificação do Imóvel',
      propertyType: 'Tipo de Propriedade',
      propertyTypeSelect: 'Selecione o tipo de propriedade...',
      primaryUsage: 'Uso Principal',
      primaryUsageSelect: 'Selecione o uso residencial...',
      yearBuilt: 'Ano de Construção',
      yearBuiltHelper: (currentYear) => `Entre 1700 e ${currentYear + 1}`,
      propertyTypeOptions: {
        single_family: { label: 'Casa Unifamiliar', desc: 'Residência individual isolada' },
        condo_townhouse: { label: 'Condomínio / Sobrado Adossado', desc: 'Unidade acoplada ou condomínio fechado' },
        multi_family: { label: 'Multifamiliar (2-4 Unidades)', desc: 'Prédio residencial duplex, triplex ou até 4 unidades' },
        mobile_home: { label: 'Casa Modular / Pré-Fabricada', desc: 'Estrutura residencial pré-fabricada' },
      },
      primaryUsageOptions: {
        primary: { label: 'Residência Principal', desc: 'Mora aqui a maior parte do ano' },
        secondary_vacation: { label: 'Segunda Residência / Férias', desc: 'Casa de veraneio ou finais de semana' },
        rental: { label: 'Imóvel para Aluguel', desc: 'Propriedade de investimento ocupada por inquilinos' },
      },
    },

    step2: {
      title: 'Passo 2: Detalhes Estruturais e de Construção',
      subtitle: 'Forneça especificações para que nosso modelo calcule com precisão os custos de reconstrução do imóvel.',
      squareFootage: 'Área Construída Habitável (Pés Quadrados)',
      squareFootageHelper: 'Área com aquecimento concluída (excluindo porão inacabado ou garagem)',
      stories: 'Número de Andares',
      storiesSelect: 'Selecione os andares...',
      roofMaterial: 'Material do Telhado',
      roofMaterialSelect: 'Selecione o material do telhado...',
      roofAge: 'Idade Estimada do Telhado',
      roofAgeSelect: 'Selecione a faixa etária do telhado...',
      foundation: 'Tipo de Fundação',
      foundationSelect: 'Selecione a fundação...',
      exteriorWall: 'Material das Paredes Externas',
      exteriorWallSelect: 'Selecione o revestimento exterior...',
      storiesOptions: {
        '1': '1 Andar',
        '1.5': '1.5 Andares',
        '2': '2 Andares',
        '2.5': '2.5 Andares',
        '3+': '3+ Andares',
      },
      roofMaterialOptions: {
        asphalt_shingle: 'Telha Asfáltica (Shingle)',
        metal: 'Metálico (Costura Saliente)',
        tile: 'Telha de Cerâmica ou Concreto',
        slate: 'Ardósia Natural',
        flat_rubber: 'Membrana Plana / Borracha',
      },
      roofAgeOptions: {
        '0-5': '0–5 anos (Mais novo)',
        '6-10': '6–10 anos',
        '11-20': '11–20 anos',
        '20+': '20+ anos (Mais antigo)',
        unknown: 'Não tenho certeza / Desconhecido',
      },
      foundationOptions: {
        basement_finished: 'Porão Acabado',
        basement_unfinished: 'Porão Inacabado',
        crawlspace: 'Espaço Técnico (Crawlspace)',
        slab: 'Laje de Concreto',
      },
      exteriorWallOptions: {
        vinyl_siding: 'Revestimento de Vinil',
        brick_veneer: 'Tijolo Aparente',
        stucco: 'Estuque',
        wood: 'Madeira / Telha de Cedro',
        stone: 'Pedra Natural / Alvenaria',
      },
    },

    step3: {
      title: 'Passo 3: Segurança, Equipamentos e Fatores de Risco',
      subtitle: 'Informe sistemas de alarme ativos, proximidade de hidrante municipal e áreas de lazer.',
      hydrant: 'Distância ao Hidrante Mais Próximo',
      hydrantHelper: 'A proximidade da água municipal reduz diretamente a pontuação da classe de proteção ISO.',
      hydrantOptions: {
        under_1000: { label: '< 1.000 pés', desc: 'Desconto máximo de proteção contra incêndio' },
        over_1000: { label: '> 1.000 pés', desc: 'Classificação de distância estendida' },
        unknown: { label: 'Desconhecido', desc: 'O corretor verificará os registros GIS municipais' },
      },
      protectiveSystemsLegend: 'Sistemas de Segurança e Prevenção de Incêndio',
      protectiveSystemsSub: 'Marque todos os dispositivos em funcionamento. Cada um acrescenta descontos:',
      protectiveDeviceOptions: {
        smoke_detectors: { label: 'Detectores de Fumaça', discount: 'Crédito Base' },
        deadbolts: { label: 'Fechaduras Trincadas em Portas Externas', discount: 'Até 2% desc.' },
        burglar_alarm: { label: 'Alarme Antirroubo Local', discount: 'Até 5% desc.' },
        central_station_fire: { label: 'Alarme Monitorado por Central 24h', discount: 'Até 10% desc.' },
        sprinkler_system: { label: 'Sistema de Sprinklers Internos', discount: 'Até 15% desc.' },
      },
      riskFactorsLegend: 'Características do Imóvel e Responsabilidade Civil',
      poolLabel: 'Piscina no Imóvel',
      poolSub: 'Piscina embutida ou de superfície',
      poolFence: 'Cercamento da Piscina',
      poolFenceOptions: {
        fenced: 'Totalmente cercada com portão com trava',
        unfenced: 'Sem cerca ou parcialmente aberta',
      },
      trampolineLabel: 'Cama Elástica ou Pista de Skate',
      trampolineSub: 'Exige rede de segurança para subscrição padrão',
      dogLabel: 'Cão no Imóvel',
      dogSub: 'Verificação de responsabilidade para raças',
      dogBreed: 'Raça(s) do Cão',
      dogBreedPlaceholder: 'Ex.: Golden Retriever, Labrador Mix',
      claimsLegend: 'Histórico de Sinistros (Últimos 5 Anos)',
      claimsHelper: 'Sinistros anteriores (tempo, água, roubo) em qualquer imóvel nos últimos 5 anos.',
      claimsOptions: {
        '0': '0 Sinistros (Desconto por Ausência de Sinistro)',
        '1': '1 Sinistro Anterior',
        '2': '2 Sinistros Anteriores',
        '3+': '3 ou Mais Sinistros Anteriores',
      },
    },

    step4: {
      title: 'Passo 4: Cobertura e Dados de Contato',
      subtitle: 'Defina as opções de cobertura, limite de franquia e informações para envio da cotação formal.',
      coverageLegend: 'Preferências de Cobertura',
      startDate: 'Data Desejada de Início da Cobertura',
      startDateHelper: 'Escolha a data de fechamento da compra ou de renovação da apólice.',
      homeValue: 'Valor Estimado do Imóvel (Custo de Reconstrução)',
      homeValueHelper: 'Estime o custo de reconstrução, não o valor de mercado do terreno.',
      replacementCost: 'Cláusula Adicional de Custo de Reposição',
      replacementCostOptions: {
        standard_100: {
          title: 'Padrão (100%)',
          desc: 'Cobre o custo calculado de reconstrução até o limite da apólice.',
        },
        extended_125: {
          title: 'Reposição Estendida (125%)',
          desc: 'Oferece até 25% extra de margem caso os materiais ou mão de obra subam após catástrofes.',
          popular: true,
        },
        guaranteed: {
          title: 'Reposição Garantida',
          desc: 'Cobre o custo total necessário para reconstruir sua casa nas condições originais, sem teto.',
        },
      },
      deductible: 'Franquia (Deductible) para Todas as Causas',
      deductibleHelper: 'Franquias maiores diminuem o prêmio anual da apólice.',
      deductibleOptions: {
        '500': { label: '$500', note: 'Prêmio maior, menor gasto no sinistro' },
        '1000': { label: '$1.000', note: 'Escolha equilibrada mais popular', recommended: true },
        '2500': { label: '$2.500', note: 'Economia moderada no prêmio' },
        '5000': { label: '$5.000', note: 'Máximo desconto imediato' },
      },
      contactLegend: 'Dados de Contato do Solicitante',
      firstName: 'Nome',
      lastName: 'Sobrenome',
      email: 'E-mail',
      phone: 'Número de Telefone',
      phoneNotice: 'Ao fornecer seus dados, você autoriza os corretores licenciados da AIA a apresentar opções de cotação.',
      insuranceStatus: 'Situação Atual do Seguro',
      insuranceStatusOptions: {
        currently_insured: { label: 'Atualmente Segurado (Pesquisando / Vencendo)', desc: 'Qualifica para desconto por histórico contínuo' },
        renewal_lapse: { label: 'Interrupção na Cobertura', desc: 'Atualmente sem seguro ou vencido recentemente' },
        first_time_homebuyer: { label: 'Comprador do Primeiro Imóvel / Fechando Escritura', desc: 'Comprovante necessário para financiamento' },
      },
    },

    step5: {
      title: 'Passo 5: Revisão e Envio da Cotação',
      subtitle: 'Verifique os dados da propriedade, características construtivas e coberturas antes de enviar às seguradoras.',
      step1Title: 'Localização e Dados Básicos',
      step2Title: 'Especificações da Estrutura',
      step3Title: 'Segurança e Perfil de Risco',
      step4Title: 'Cobertura e Dados do Solicitante',
      applicant: 'Solicitante:',
      effectiveDate: 'Data Efetiva:',
      emailPhone: 'E-mail / Telefone:',
      deductible: 'Franquia:',
      squareFootage: 'Área (Pés Quadrados):',
      stories: 'Andares:',
      roof: 'Telhado:',
      foundation: 'Fundação:',
      hydrant: 'Hidrante:',
      protectiveDevices: 'Dispositivos de Proteção:',
      noDevices: 'Nenhum selecionado',
      pool: 'Piscina:',
      trampoline: 'Cama Elástica:',
      dog: 'Cão:',
      dogNone: 'Nenhum',
      claimsLast5Years: 'Sinistros (5 anos):',
      previewBadge: 'Prévia de Formulação de Tarifa',
      estimatedDwellingReplacement: 'Custo Estimado de Reposição da Residência',
      basedOnText: (replacementTitle, deductible) => `Com base em ${replacementTitle} com franquia de $${deductible} para todas as causas.`,
      legalConsentText:
        'Declaro que as informações fornecidas são verdadeiras e precisas. Entendo que esta solicitação de cotação não vincula cobertura de imediato e está sujeita à aprovação de subscrição da seguradora. A Associated Insurance Agency está autorizada a cotar taxas com seguradoras independentes em Connecticut.',
      consentRequiredError: 'Por favor, confirme a declaração de consentimento para continuar.',
      successBadge: 'Solicitação de Cotação Enviada',
      successTitle: 'Solicitação de Cotação Confirmada!',
      referenceCode: 'Código de Referência:',
      whatHappensNext: 'O que acontece a seguir?',
      stepNext1Title: '1. Comparação Multi-Seguradoras',
      stepNext1Desc: 'Nosso sistema cota com Travelers, Hartford, Safeco, Chubb e Andover para obter a melhor taxa.',
      stepNext2Title: '2. Análise Local de Subscrição',
      stepNext2Desc: 'Um corretor licenciado da AIA em Connecticut analisa dados municipais de hidrantes e aplica todos os descontos.',
      stepNext3Title: '3. Envio da Comparação e Apólice',
      stepNext3Desc: (email) => `Você receberá um comparativo em PDF no e-mail ${email} em até 24 horas úteis.`,
      callAgentBtn: 'Ligar para o Corretor em Danbury: (203) 748-9272',
      startAnotherBtn: 'Iniciar Outra Cotação Residencial',
      payloadBadge: 'Carga Útil da API de Tarifas',
      payloadDesc: 'Carga formatada enviada aos webhooks de cotação das seguradoras.',
      collapseJson: 'Recolher JSON',
      inspectPayload: 'Inspecionar Carga JSON',
      copied: 'Copiado!',
      copyJson: 'Copiar JSON',
      download: 'Baixar',
    },
  },

  tr: {
    worksheetTitle: 'Resmi Teklif Hesaplama Formu',
    saveDraft: 'Taslağı Kaydet',
    resetForm: 'Formu Sıfırla',
    draftSavedToast: 'Teklif taslağı kaydedildi! Daha sonra kaldığınız yerden devam edebilirsiniz.',
    stepOf: (current, total) => `${total} Adımdan ${current}. Adım`,
    progressComplete: (pct) => `%${pct} Tamamlandı`,
    hasErrorsAlert: 'Lütfen devam etmek için aşağıdaki vurgulanan alanları düzeltin:',
    otherErrors: (count) => `...ve ${count} diğer eksik alan`,

    back: 'Geri',
    backToStep4: '4. Adıma Dön',
    continueToNext: 'Sonraki Adıma Geç',
    reviewAndSubmit: 'İncele ve Gönder',
    submitQuoteRequest: 'Teklif Talebini Gönder',
    submittingQuoteRequest: 'Teklif Talebi Gönderiliyor...',
    edit: 'Düzenle',

    trustCarriersTitle: '10+ CT Sigorta Şirketi',
    trustCarriersSub: 'Travelers, Safeco, Chubb',
    trustObligationTitle: 'Taahhütsüz',
    trustObligationSub: '%100 Ücretsiz oran karşılaştırması',
    trustSecurityTitle: '256-Bit SSL',
    trustSecuritySub: 'Şifreli güvenli veri aktarımı',
    trustHqTitle: 'Danbury, CT Merkez Ofis',
    trustHqSub: 'Yerel lisanslı sigorta acenteleri',

    steps: {
      location: { label: 'Mülk Konumu', short: 'Konum', desc: 'Adres ve temel bilgiler' },
      construction: { label: 'Yapı Detayları', short: 'Yapı', desc: 'Metrekare, çatı ve temel' },
      safety: { label: 'Güvenlik ve Riskler', short: 'Güvenlik', desc: 'Hidrant, alarm ve önlemler' },
      coverage: { label: 'Teminat ve İletişim', short: 'Teminat', desc: 'Muafiyet ve kişisel bilgiler' },
      review: { label: 'İnceleme ve Teklif', short: 'İnceleme', desc: 'Detayları doğrula ve gönder' },
    },

    step1: {
      title: '1. Adım: Mülk Konumu ve Temel Bilgiler',
      subtitle: 'Mülkünüzün bulunduğu konumu ve birincil konut kullanım türünü belirtin.',
      addressLegend: 'Mülkün Açık Adresi',
      streetAddress: 'Sokak / Cadde Adresi',
      streetPlaceholder: '123 Main Street',
      streetHelper: 'Örn., 50 Newtown Road',
      unit: 'Daire / No / Süit',
      unitPlaceholder: 'Daire 2B',
      unitHelper: 'İsteğe bağlı',
      city: 'Şehir / İlçe',
      cityPlaceholder: 'Danbury',
      state: 'Eyalet',
      zipCode: 'Posta Kodu (ZIP)',
      zipPlaceholder: '06810',
      zipHelper: '5 haneli posta kodu',
      propertyLegend: 'Mülk Türü ve Sınıflandırması',
      propertyType: 'Mülk Türü',
      propertyTypeSelect: 'Mülk türünü seçin...',
      primaryUsage: 'Birincil Kullanım',
      primaryUsageSelect: 'Kullanım amacını seçin...',
      yearBuilt: 'Yapım Yılı',
      yearBuiltHelper: (currentYear) => `1700 ile ${currentYear + 1} arasında`,
      propertyTypeOptions: {
        single_family: { label: 'Müstakil Ev', desc: 'Bağımsız tek ailelik konut' },
        condo_townhouse: { label: 'Kondo / Sıra Ev (Townhouse)', desc: 'Bitişik nizam konut veya site dairesi' },
        multi_family: { label: 'Çok Aileli (2-4 Daireli)', desc: 'Dubleks, tripleks veya 4 daireli konut binası' },
        mobile_home: { label: 'Prefabrik / Mobil Ev', desc: 'Fabrika yapımı prefabrik konut' },
      },
      primaryUsageOptions: {
        primary: { label: 'Ana İkametgah', desc: 'Yılın büyük bölümünde burada yaşıyorsunuz' },
        secondary_vacation: { label: 'Yazlık / İkinci Konut', desc: 'Mevsimlik kullanım veya hafta sonu evi' },
        rental: { label: 'Kiralık Mülk', desc: 'Kiracıların oturduğu yatırım mülkü' },
      },
    },

    step2: {
      title: '2. Adım: Yapısal ve İnşaat Detayları',
      subtitle: 'Yeniden inşa maliyet modelimizin doğru hesaplama yapabilmesi için yapısal özellikleri belirtin.',
      squareFootage: 'Net Yaşam Alanı (Metrekare / Sq Ft)',
      squareFootageHelper: 'Isıtılan bitmiş yaşam alanı (bitmemiş bodrum veya garaj hariç)',
      stories: 'Kat Sayısı',
      storiesSelect: 'Kat sayısını seçin...',
      roofMaterial: 'Çatı Malzemesi',
      roofMaterialSelect: 'Çatı kaplamasını seçin...',
      roofAge: 'Tahmini Çatı Yaşı',
      roofAgeSelect: 'Çatının yaş aralığını seçin...',
      foundation: 'Temel Türü',
      foundationSelect: 'Bina temelini seçin...',
      exteriorWall: 'Dış Cephe Kaplaması',
      exteriorWallSelect: 'Dış cephe malzemesini seçin...',
      storiesOptions: {
        '1': '1 Kat',
        '1.5': '1.5 Kat',
        '2': '2 Kat',
        '2.5': '2.5 Kat',
        '3+': '3+ Kat',
      },
      roofMaterialOptions: {
        asphalt_shingle: 'Asfalt Kiremit (Shingle)',
        metal: 'Metal (Kenet Çatı)',
        tile: 'Kil / Beton Kiremit',
        slate: 'Doğal Kayrak Taşı',
        flat_rubber: 'Düz / Kauçuk Membran',
      },
      roofAgeOptions: {
        '0-5': '0–5 yıl (Yeni)',
        '6-10': '6–10 yıl',
        '11-20': '11–20 yıl',
        '20+': '20+ yıl (Eski)',
        unknown: 'Bilinmiyor / Emin değilim',
      },
      foundationOptions: {
        basement_finished: 'Bodrum - Yapılı/Bitmiş',
        basement_unfinished: 'Bodrum - Ham/Bitmemiş',
        crawlspace: 'Tesisat Boşluğu (Crawlspace)',
        slab: 'Beton Zemin (Düz Plaka)',
      },
      exteriorWallOptions: {
        vinyl_siding: 'Vinil Kaplama (Siding)',
        brick_veneer: 'Tuğla Kaplama',
        stucco: 'Sıva (Stucco)',
        wood: 'Ahşap / Sedir Kaplama',
        stone: 'Doğal Taş / Taş Duvar',
      },
    },

    step3: {
      title: '3. Adım: Güvenlik, Donanım ve Risk Faktörleri',
      subtitle: 'Kurulu güvenlik sistemlerini, itfaiye hidrant mesafesini ve rekreasyonel risk faktörlerini seçin.',
      hydrant: 'En Yakın Yangın Hidrantına Olan Mesafe',
      hydrantHelper: 'Belediye yangın suyu şebekesine yakınlık, ISO koruma sınıfı indirimlerini doğrudan artırır.',
      hydrantOptions: {
        under_1000: { label: '< 1.000 feet (300 metre)', desc: 'En yüksek yangın koruma indirimi' },
        over_1000: { label: '> 1.000 feet', desc: 'Uzak mesafe standart tarifesi' },
        unknown: { label: 'Bilinmiyor', desc: 'Acentemiz belediye GIS kayıtlarından teyit edecektir' },
      },
      protectiveSystemsLegend: 'Güvenlik ve Yangın Koruma Sistemleri',
      protectiveSystemsSub: 'Çalışır durumdaki tüm donanımları işaretleyin. Her biri ek indirim sağlar:',
      protectiveDeviceOptions: {
        smoke_detectors: { label: 'Duman Dedektörleri', discount: 'Temel İndirim' },
        deadbolts: { label: 'Dış Kapılarda Emniyet Kilitleri', discount: '%2\'ye varan indirim' },
        burglar_alarm: { label: 'Yerel Hırsız Alarmı', discount: '%5\'e varan indirim' },
        central_station_fire: { label: 'Merkeze Bağlı Yangın/Hırsız Alarmı', discount: '%10\'a varan indirim' },
        sprinkler_system: { label: 'İç Mekan Yangın Söndürme Sprinkleri', discount: '%15\'e varan indirim' },
      },
      riskFactorsLegend: 'Mülk Özellikleri ve Sorumluluk Riskleri',
      poolLabel: 'Mülkte Yüzme Havuzu',
      poolSub: 'Gömme veya zemin üstü havuz',
      poolFence: 'Havuz Çit Durumu',
      poolFenceOptions: {
        fenced: 'Kilitli kapılı tam çitle çevrili',
        unfenced: 'Çitsiz veya kısmen açık',
      },
      trampolineLabel: 'Trambolin veya Kaykay Rampası',
      trampolineSub: 'Standart poliçe için güvenlik filesi gereklidir',
      dogLabel: 'Evde Köpek Bulunması',
      dogSub: 'Sorumluluk teminatı için köpek ırkı teyidi',
      dogBreed: 'Köpek Cinsi / Irkı',
      dogBreedPlaceholder: 'Örn., Golden Retriever, Labrador Kırması',
      claimsLegend: 'Hasar Geçmişi (Son 5 Yıl)',
      claimsHelper: 'Son 5 yılda herhangi bir mülkünüzde yaşanan hasar talepleri (fırtına, su baskını, hırsızlık).',
      claimsOptions: {
        '0': '0 Hasar (Hasarsızlık İndirimi)',
        '1': '1 Önceki Hasar Kaydı',
        '2': '2 Önceki Hasar Kaydı',
        '3+': '3 veya Daha Fazla Hasar Kaydı',
      },
    },

    step4: {
      title: '4. Adım: Teminat ve İletişim Tercihleri',
      subtitle: 'Teminat beklentilerinizi, muafiyet tercihinizi ve resmi teklifin iletileceği iletişim bilgilerinizi girin.',
      coverageLegend: 'Teminat ve Kloz Tercihleri',
      startDate: 'İstenen Poliçe Başlangıç Tarihi',
      startDateHelper: 'Tapu devir veya mevcut poliçenizin yenileme tarihini seçin.',
      homeValue: 'Tahmini Konut Değeri (Yeniden İnşa Maliyeti)',
      homeValueHelper: 'Arsa piyasa değerini değil, binanın yeniden yapım maliyetini tahmin edin.',
      replacementCost: 'Konut Yeniden İnşa Teminatı Türü',
      replacementCostOptions: {
        standard_100: {
          title: 'Standart (%100)',
          desc: 'Hesaplanan konut yeniden inşa maliyetini poliçe limiti dahilinde karşılar.',
        },
        extended_125: {
          title: 'Genişletilmiş Yeniden İnşa (%125)',
          desc: 'Afet sonrası malzeme veya işçilik fiyatları fırlarsa %25\'e kadar ek güvence sağlar.',
          popular: true,
        },
        guaranteed: {
          title: 'Garantili Yeniden İnşa',
          desc: 'Maliyet ne olursa olsun mülkünüzü orijinal haline getirmek için gereken tutarı limitsiz karşılar.',
        },
      },
      deductible: 'Genel Muafiyet Tutarı (Deductible)',
      deductibleHelper: 'Daha yüksek muafiyet, yıllık prim maliyetinizi düşürür.',
      deductibleOptions: {
        '500': { label: '$500', note: 'Daha yüksek prim, hasarda daha az cepten ödeme' },
        '1000': { label: '$1.000', note: 'En popüler dengeli tercih', recommended: true },
        '2500': { label: '$2.500', note: 'Orta düzeyde prim tasarrufu' },
        '5000': { label: '$5.000', note: 'Maksimum peşin indirim' },
      },
      contactLegend: 'Başvuru Sahibi İletişim Bilgileri',
      firstName: 'Adınız',
      lastName: 'Soyadınız',
      email: 'E-posta Adresi',
      phone: 'Telefon Numarası',
      phoneNotice: 'İletişim bilgilerinizi paylaşarak lisanslı AIA temsilcilerinin size teklif seçeneklerini sunmasına onay verirsiniz.',
      insuranceStatus: 'Mevcut Sigorta Durumu',
      insuranceStatusOptions: {
        currently_insured: { label: 'Halen Sigortalı (Fiyat Araştıran / Süresi Biten)', desc: 'Kesintisiz sigortalılık indiriminden yararlanır' },
        renewal_lapse: { label: 'Sigortada Kesinti Yaşandı', desc: 'Şu an sigortasız veya süresi yakın zamanda bitti' },
        first_time_homebuyer: { label: 'İlk Kez Ev Alan / Tapu Aşamasında', desc: 'Mortgage kredisi için poliçe belgesi gerekli' },
      },
    },

    step5: {
      title: '5. Adım: İnceleme ve Teklif Gönderimi',
      subtitle: 'Sigorta şirketlerinin teklif motoruna iletilmeden önce mülk detaylarını ve teminat seçimlerinizi kontrol edin.',
      step1Title: 'Mülk Konumu ve Temel Bilgiler',
      step2Title: 'Yapısal Özellikler',
      step3Title: 'Güvenlik ve Risk Profili',
      step4Title: 'Teminat ve Başvuru Sahibi Bilgileri',
      applicant: 'Başvuru Sahibi:',
      effectiveDate: 'Yürürlük Tarihi:',
      emailPhone: 'E-posta / Telefon:',
      deductible: 'Muafiyet:',
      squareFootage: 'Metrekare:',
      stories: 'Kat Sayısı:',
      roof: 'Çatı:',
      foundation: 'Temel:',
      hydrant: 'Hidrant:',
      protectiveDevices: 'Güvenlik Donanımları:',
      noDevices: 'Seçilmedi',
      pool: 'Havuz:',
      trampoline: 'Trambolin:',
      dog: 'Köpek:',
      dogNone: 'Yok',
      claimsLast5Years: 'Hasar (5 yıl):',
      previewBadge: 'Teklif Hesaplama Özeti',
      estimatedDwellingReplacement: 'Tahmini Konut Yeniden İnşa Bedeli',
      basedOnText: (replacementTitle, deductible) => `${replacementTitle} ve $${deductible} genel muafiyet esasına göre.`,
      legalConsentText:
        'Verdiğim bilgilerin doğru ve eksiksiz olduğunu beyan ederim. Bu teklif talebinin teminatı anında bağlamadığını ve sigorta şirketinin onayına tabi olduğunu anlıyorum. Associated Insurance Agency, Connecticut\'taki bağımsız şirketlerden fiyat araştırması yapmaya yetkilidir.',
      consentRequiredError: 'Lütfen devam etmek için yasal onay kutusunu işaretleyin.',
      successBadge: 'Teklif Talebi İletildi',
      successTitle: 'Teklif Talebiniz Alındı!',
      referenceCode: 'Referans Kodu:',
      whatHappensNext: 'Sonraki Süreç Nasıl İşler?',
      stepNext1Title: '1. Çoklu Şirket Fiyat Karşılaştırması',
      stepNext1Desc: 'Sistemimiz Travelers, Hartford, Safeco, Chubb ve Andover üzerinden sizin için en iyi oranı araştırır.',
      stepNext2Title: '2. Yerel Risk İncelemesi',
      stepNext2Desc: 'Lisanslı AIA Connecticut acentemiz belediye hidrant verilerini ve tüm indirimleri kontrol eder.',
      stepNext3Title: '3. Teklif ve Poliçe Teslimi',
      stepNext3Desc: (email) => `24 iş saati içerisinde ${email} adresinize karşılaştırmalı PDF raporu iletilecektir.`,
      callAgentBtn: 'Danbury Acentesini Arayın: (203) 748-9272',
      startAnotherBtn: 'Yeni Bir Konut Sigortası Teklifi Başlat',
      payloadBadge: 'Yapılandırılmış Teklif API Verisi',
      payloadDesc: 'Sigorta şirketlerinin entegrasyon sistemine iletilen formatlanmış veri.',
      collapseJson: 'JSON Kapat',
      inspectPayload: 'JSON Verisini İncele',
      copied: 'Kopyalandı!',
      copyJson: 'JSON Kopyala',
      download: 'İndir',
    },
  },
};

export const localizedValidationErrors: Record<HomeownersLang, Record<string, string>> = {
  en: {
    streetAddress: 'Street address is required (at least 3 characters).',
    city: 'City is required.',
    state: 'Please select a valid state code.',
    zipCode: 'Enter a valid 5-digit US ZIP code (e.g. 06810).',
    propertyType: 'Please select a property type.',
    primaryUsage: 'Please select primary usage of this property.',
    yearBuilt: 'Please enter a valid year built.',
    squareFootage: 'Square footage is required (at least 250 sq ft).',
    stories: 'Please specify the number of stories.',
    roofMaterial: 'Please select the roof material/type.',
    roofAge: 'Please select the estimated roof age.',
    foundationType: 'Please select the foundation type.',
    exteriorWallType: 'Please select the exterior wall material.',
    distanceToHydrant: 'Please select distance to the nearest fire hydrant.',
    poolFenceStatus: 'Because a pool is present, please indicate if it is fenced or unfenced.',
    priorClaims: 'Please specify prior claims in the last 5 years.',
    coverageStartDate: 'Please select a valid date in the future.',
    estimatedHomeValue: 'Estimated home value is required (at least $50,000).',
    replacementCostPreference: 'Please choose a replacement cost preference.',
    deductible: 'Please select your deductible preference.',
    firstName: 'First name must be at least 2 characters.',
    lastName: 'Last name must be at least 2 characters.',
    email: 'Please enter a valid email address.',
    phone: 'Please enter a valid 10-digit phone number.',
  },
  es: {
    streetAddress: 'La dirección es obligatoria (al menos 3 caracteres).',
    city: 'La ciudad o municipio es obligatorio.',
    state: 'Por favor seleccione un estado válido.',
    zipCode: 'Ingrese un código postal válido de 5 dígitos (ej. 06810).',
    propertyType: 'Por favor seleccione un tipo de propiedad.',
    primaryUsage: 'Por favor seleccione el uso principal de la propiedad.',
    yearBuilt: 'Por favor ingrese un año de construcción válido.',
    squareFootage: 'El área habitable es obligatoria (al menos 250 pies cuadrados).',
    stories: 'Por favor especifique el número de pisos.',
    roofMaterial: 'Por favor seleccione el material del techo.',
    roofAge: 'Por favor seleccione la antigüedad estimada del techo.',
    foundationType: 'Por favor seleccione el tipo de cimientos.',
    exteriorWallType: 'Por favor seleccione el material exterior.',
    distanceToHydrant: 'Por favor seleccione la distancia al hidrante más cercano.',
    poolFenceStatus: 'Debido a que hay piscina, indique si tiene cerco o no.',
    priorClaims: 'Por favor indique las reclamaciones de los últimos 5 años.',
    coverageStartDate: 'Por favor seleccione una fecha válida en el futuro.',
    estimatedHomeValue: 'El valor estimado de la vivienda es obligatorio (mínimo $50,000).',
    replacementCostPreference: 'Por favor elija una preferencia de costo de reemplazo.',
    deductible: 'Por favor seleccione su deducible preferido.',
    firstName: 'El nombre debe tener al menos 2 caracteres.',
    lastName: 'El apellido debe tener al menos 2 caracteres.',
    email: 'Por favor ingrese un correo electrónico válido.',
    phone: 'Por favor ingrese un número de teléfono válido de 10 dígitos.',
  },
  pt: {
    streetAddress: 'O endereço é obrigatório (pelo menos 3 caracteres).',
    city: 'A cidade é obrigatória.',
    state: 'Por favor, selecione um estado válido.',
    zipCode: 'Digite um código postal (ZIP) válido de 5 dígitos (ex.: 06810).',
    propertyType: 'Por favor, selecione um tipo de propriedade.',
    primaryUsage: 'Por favor, selecione o uso principal do imóvel.',
    yearBuilt: 'Por favor, informe um ano de construção válido.',
    squareFootage: 'A área construída é obrigatória (pelo menos 250 pés quadrados).',
    stories: 'Por favor, especifique o número de andares.',
    roofMaterial: 'Por favor, selecione o material do telhado.',
    roofAge: 'Por favor, selecione a idade estimada do telhado.',
    foundationType: 'Por favor, selecione o tipo de fundação.',
    exteriorWallType: 'Por favor, selecione o material exterior.',
    distanceToHydrant: 'Por favor, selecione a distância até o hidrante mais próximo.',
    poolFenceStatus: 'Como há piscina, informe se é cercada ou não.',
    priorClaims: 'Por favor, informe os sinistros dos últimos 5 anos.',
    coverageStartDate: 'Por favor, selecione uma data válida no futuro.',
    estimatedHomeValue: 'O valor estimado do imóvel é obrigatório (mínimo $50.000).',
    replacementCostPreference: 'Por favor, escolha uma preferência de custo de reposição.',
    deductible: 'Por favor, selecione sua preferência de franquia.',
    firstName: 'O nome deve ter pelo menos 2 caracteres.',
    lastName: 'O sobrenome deve ter pelo menos 2 caracteres.',
    email: 'Por favor, insira um endereço de e-mail válido.',
    phone: 'Por favor, insira um número de telefone válido de 10 dígitos.',
  },
  tr: {
    streetAddress: 'Sokak adresi zorunludur (en az 3 karakter).',
    city: 'Şehir / İlçe zorunludur.',
    state: 'Lütfen geçerli bir eyalet seçin.',
    zipCode: 'Geçerli bir 5 haneli posta kodu girin (örn. 06810).',
    propertyType: 'Lütfen bir mülk türü seçin.',
    primaryUsage: 'Lütfen mülkün kullanım amacını seçin.',
    yearBuilt: 'Lütfen geçerli bir yapım yılı girin.',
    squareFootage: 'Net yaşam alanı zorunludur (en az 250 sq ft).',
    stories: 'Lütfen kat sayısını belirtin.',
    roofMaterial: 'Lütfen çatı malzemesini seçin.',
    roofAge: 'Lütfen tahmini çatı yaşını seçin.',
    foundationType: 'Lütfen temel türünü seçin.',
    exteriorWallType: 'Lütfen dış cephe malzemesini seçin.',
    distanceToHydrant: 'Lütfen en yakın hidranta olan mesafeyi seçin.',
    poolFenceStatus: 'Havuz bulunduğu için çit durumunu belirtin.',
    priorClaims: 'Lütfen son 5 yıldaki hasar geçmişini belirtin.',
    coverageStartDate: 'Lütfen ileriye dönük geçerli bir tarih seçin.',
    estimatedHomeValue: 'Tahmini konut değeri zorunludur (en az $50.000).',
    replacementCostPreference: 'Lütfen bir yeniden inşa teminatı seçin.',
    deductible: 'Lütfen muafiyet tercihinizi seçin.',
    firstName: 'Ad en az 2 karakter olmalıdır.',
    lastName: 'Soyad en az 2 karakter olmalıdır.',
    email: 'Lütfen geçerli bir e-posta adresi girin.',
    phone: 'Lütfen geçerli bir 10 haneli telefon numarası girin.',
  },
};
