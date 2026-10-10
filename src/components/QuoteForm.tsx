import { useState, useEffect } from 'react';
import { getRecaptchaToken } from '../lib/recaptcha';
import RecaptchaLegalNotice from './RecaptchaLegalNotice';

export type LineOfBusiness = 'home' | 'auto' | 'commercial-auto' | 'umbrella' | 'business';
export type ReachMethod = 'call' | 'text' | 'email';
export type ReachTime = 'anytime' | 'morning' | 'afternoon' | 'evening';
export type FunnelStep = 1 | 2 | 3;

interface QuoteFormProps {
  lang?: 'en' | 'es' | 'pt' | 'tr';
  initialLine?: LineOfBusiness;
}

export default function QuoteForm({ lang = 'en', initialLine = 'home' }: QuoteFormProps) {
  // Funnel Step State (3-Step Progressive Funnel)
  const [currentStep, setCurrentStep] = useState<FunnelStep>(1);
  const [maxStepReached, setMaxStepReached] = useState<FunnelStep>(1);

  // Step 1: Policy Line & Connecticut Location
  const [lineOfBusiness, setLineOfBusiness] = useState<LineOfBusiness>(initialLine);
  const [zipCode, setZipCode] = useState('');
  const [preferredOffice, setPreferredOffice] = useState('Danbury');

  // Step 2: Contact Information & Lead Capture
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [reachMethod, setReachMethod] = useState<ReachMethod>('call');
  const [reachTime, setReachTime] = useState<ReachTime>('anytime');
  const [smsConsent, setSmsConsent] = useState(false);
  const [partialSaved, setPartialSaved] = useState(false);

  // Step 3: Coverage Details Fields
  const [propertyAddress, setPropertyAddress] = useState('');
  const [vehicleDetails, setVehicleDetails] = useState('');
  const [commBusinessName, setCommBusinessName] = useState('');
  const [vehicleCount, setVehicleCount] = useState('');
  const [underlyingCoverage, setUnderlyingCoverage] = useState('');
  const [glBusinessName, setGlBusinessName] = useState('');
  const [glIndustry, setGlIndustry] = useState('');

  // Honeypot trap fields for bot defense
  const [hpWebsite, setHpWebsite] = useState('');
  const [hpCompany, setHpCompany] = useState('');
  const [renderedAt, setRenderedAt] = useState<number>(0);

  // Submission & Validation States
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [confirmationCode, setConfirmationCode] = useState('');
  const [submittedData, setSubmittedData] = useState<{
    name: string;
    lineName: string;
    office: string;
    reachMethod: string;
  } | null>(null);

  // Parse query parameters from hero rate starter or direct URL
  useEffect(() => {
    setRenderedAt(Date.now());
    if (typeof window === 'undefined') return;
    const params = new URLSearchParams(window.location.search);
    const typeParam = params.get('type') as LineOfBusiness | null;
    const zipParam = params.get('zip');

    if (typeParam && ['home', 'auto', 'commercial-auto', 'umbrella', 'business'].includes(typeParam)) {
      setLineOfBusiness(typeParam);
    }

    if (zipParam) {
      const clean = zipParam.trim().replace(/\D/g, '').substring(0, 5);
      if (clean) {
        setZipCode(clean);
        setPropertyAddress(`${clean}, CT`);
        if (clean.startsWith('067')) {
          setPreferredOffice('Watertown');
        } else if (clean.startsWith('066')) {
          setPreferredOffice('Bridgeport');
        } else if (clean.startsWith('068')) {
          setPreferredOffice('Danbury');
        }
      }
    }
  }, []);

  const dict = {
    en: {
      headline: 'Request an Insurance Quote',
      subheadline: 'Compare quotes across 20+ top-rated carriers in Connecticut. Free, fast, and completely confidential.',
      formBadge: 'Free Rate Review',
      formBadgeSub: 'Fast & Confidential',
      stepBadge: '3-Step Quote Funnel',
      stepLabel1: 'Needs & Location',
      stepLabel2: 'Contact Info',
      stepLabel3: 'Coverage Details',
      stepOf: 'Step',
      stepOfTotal: 'of 3',
      step1Title: 'Select Coverage & Connecticut Location',
      step1Subtitle: 'Pick your insurance line and enter your CT ZIP code to automatically connect with your nearest local branch.',
      step2Title: 'Your Contact Information',
      step2Subtitle: 'We respect your privacy. You will speak directly with our local licensed CT staff with zero telemarketer spam.',
      step3Title: 'Coverage Details',
      step3Subtitle: 'Share a few specifics so our agents can benchmark the lowest rates across Travelers, Safeco, Progressive, and 20+ carriers.',
      selectLine: 'Select Line of Business',
      lines: {
        home: 'Home',
        auto: 'Auto',
        'commercial-auto': 'Commercial Auto',
        umbrella: 'Umbrella',
        business: 'Business / GL',
      },
      linesSub: {
        home: 'Homeowners & Dwelling',
        auto: 'Personal Auto & RV',
        'commercial-auto': 'Work Vans & Fleets',
        umbrella: 'Excess Liability ($1M - $10M)',
        business: 'General Liability & Property',
      },
      zipLabel: 'Connecticut ZIP Code',
      zipPlaceholder: 'E.g. 06810, 06795, or 06606',
      zipDanbury: 'Danbury HQ Service Area (50 Newtown Rd)',
      zipWatertown: 'Watertown Branch Service Area (51 Depot St)',
      zipBridgeport: 'Bridgeport Branch Service Area (2465 Main St)',
      zipCt: 'Connecticut Licensed Brokerage Area',
      preferredOffice: 'Assigned Local Branch',
      officeDanbury: 'Danbury Corporate HQ (50 Newtown Rd)',
      officeWatertown: 'Watertown Branch (51 Depot St)',
      officeBridgeport: 'Bridgeport Branch (2465 Main St)',
      fullName: 'Full Name',
      fullNamePlaceholder: 'E.g. Sarah Jenkins',
      email: 'Email Address',
      emailPlaceholder: 'E.g. sarah@example.com',
      phone: 'Phone Number',
      phonePlaceholder: 'E.g. (203) 555-0199',
      reachPreference: 'Best Time / Method to Reach',
      methodCall: 'Phone Call',
      methodText: 'SMS Text Message',
      methodEmail: 'Email Only',
      timeAnytime: 'Anytime during business hours',
      timeMorning: 'Morning (8:30 AM - 12:00 PM)',
      timeAfternoon: 'Afternoon (12:00 PM - 5:00 PM)',
      timeEvening: 'Evening (Call-back priority)',
      smsConsentLabel: 'I consent to receive SMS text updates regarding this quote request from Associated Insurance Agency at the phone number provided. Message & data rates may apply. Reply STOP to cancel.',
      producerNeedBadge: 'Why We Ask This',
      homeAnchorTitle: 'Property Address',
      homeAnchorDesc: 'Allows instant lookup of tax assessor / GIS records (square footage, year built, roof type, distance to hydrant).',
      homeAnchorPlaceholder: 'E.g. 50 Newtown Road, Danbury, CT 06810',
      homeLongFormNotice: 'Looking for our full 4-step rating wizard with building specs and instant replacement calculations?',
      homeLongFormLink: 'Launch Full Homeowners Wizard →',
      autoAnchorTitle: 'Current Vehicles (Year / Make / Model or VIN)',
      autoAnchorDesc: 'Lets the producer understand risk tier, vehicle mix, and ADAS safety equipment immediately.',
      autoAnchorPlaceholder: 'E.g. 2022 Subaru Outback & 2019 Toyota RAV4 (or VIN if handy)',
      commAutoAnchorTitle: 'Business Name & Number of Commercial Vehicles',
      commAutoAnchorDesc: 'Identifies whether this is a 2-van trade contractor or a 15-truck fleet requiring DOT filings.',
      commBusinessPlaceholder: 'E.g. Danbury Heating & Air LLC',
      commVehicleCountPlaceholder: 'E.g. 3 service vans, 1 dump truck',
      umbrellaAnchorTitle: 'Underlying Coverage Status & Liability Limits',
      umbrellaAnchorDesc: 'Umbrella requires underlying auto/home liability limits (e.g. $250k/$500k auto, $300k home).',
      umbrellaPlaceholder: 'E.g. Auto & Home currently with Travelers ($250k/$500k limits)',
      glAnchorTitle: 'Business Name & Nature of Business / Industry',
      glAnchorDesc: 'Determines NAICS/SIC category, risk profile, and carrier appetite before the first conversation.',
      glBusinessPlaceholder: 'E.g. Northeast Electrical Contractors LLC',
      glIndustryPlaceholder: 'E.g. Commercial & residential electrical wiring, licensed CT contractor',
      btnNextContact: 'Continue to Contact Details',
      btnNextDetails: 'Continue to Coverage Specifics',
      btnBack: 'Back',
      submitBtn: 'Request My Review & Quote',
      submitting: 'Preparing Your Quote Review...',
      step1Error: 'Please select a coverage line and enter a valid 5-digit ZIP code.',
      step2Error: 'Please provide your full name, email address, and phone number.',
      step3Error: 'Please complete the requested coverage details to finalize your quote request.',
      smsError: 'Please check the SMS consent checkbox to allow text message updates.',
      successTitle: 'Quote Review Request Registered!',
      successDesc: (name: string, line: string, office: string, method: string) =>
        `Thank you, ${name}. Your quote review request for ${line} has been dispatched to our ${office} branch. A licensed producer will review market options and follow up via ${method}.`,
      refLabel: 'Confirmation Code',
      anotherBtn: 'Start Another Quote',
      antiSpamTitle: 'AIA Anti-Spam & Confidentiality Guarantee:',
      antiSpamDesc: 'Your information is strictly protected and never sold to third-party telemarketers. Quotes are prepared exclusively by our licensed Connecticut staff in Danbury, Watertown, and Bridgeport.',
      microTrust: '100% Free • Independent Comparison • No Telemarketer Spam',
      officeAutoRouteNote: 'Auto-routed by CT territory. You can switch offices at any time.',
      nextStepsTitle: 'Next Steps:',
      nextStepsDesc: 'Our licensed CT producers in Danbury, Watertown, and Bridgeport are pulling GIS records and comparing quotes across Travelers, Safeco, Progressive, and The Hartford.',
    },
    es: {
      headline: 'Solicitar una Cotización de Seguro',
      subheadline: 'Compare cotizaciones entre más de 20 aseguradoras líderes en Connecticut. Rápido, gratuito y confidencial.',
      formBadge: 'Revisión Gratuita',
      formBadgeSub: 'Rápido y Confidencial',
      stepBadge: 'Cotización en 3 Pasos',
      stepLabel1: 'Tipo y Ubicación',
      stepLabel2: 'Contacto',
      stepLabel3: 'Detalles',
      stepOf: 'Paso',
      stepOfTotal: 'de 3',
      step1Title: 'Seleccione Cobertura y Ubicación en CT',
      step1Subtitle: 'Elija su tipo de seguro e ingrese su código postal de CT para conectarse automáticamente con su sucursal más cercana.',
      step2Title: 'Su Información de Contacto',
      step2Subtitle: 'Respetamos su privacidad. Hablará directamente con nuestro equipo licenciado en CT sin intermediarios ni spam.',
      step3Title: 'Detalles de la Cobertura',
      step3Subtitle: 'Comparta algunos detalles para que nuestros agentes comparen las mejores tarifas entre Travelers, Safeco, Progressive y más de 20 aseguradoras.',
      selectLine: 'Seleccione Línea de Seguro',
      lines: {
        home: 'Hogar',
        auto: 'Auto',
        'commercial-auto': 'Auto Comercial',
        umbrella: 'Paraguas',
        business: 'Comercial / GL',
      },
      linesSub: {
        home: 'Propietarios y Vivienda',
        auto: 'Auto Personal y Recreativo',
        'commercial-auto': 'Vehículos de Trabajo y Flotas',
        umbrella: 'Exceso de Responsabilidad ($1M - $10M)',
        business: 'Responsabilidad Civil y Propiedad',
      },
      zipLabel: 'Código Postal de Connecticut (ZIP)',
      zipPlaceholder: 'Ej. 06810, 06795, o 06606',
      zipDanbury: 'Área Sede Danbury (50 Newtown Rd)',
      zipWatertown: 'Área Sucursal Watertown (51 Depot St)',
      zipBridgeport: 'Área Sucursal Bridgeport (2465 Main St)',
      zipCt: 'Área de Correduría Licenciada en CT',
      preferredOffice: 'Sucursal Local Asignada',
      officeDanbury: 'Sede Danbury (50 Newtown Rd)',
      officeWatertown: 'Sucursal Watertown (51 Depot St)',
      officeBridgeport: 'Sucursal Bridgeport (2465 Main St)',
      fullName: 'Nombre Completo',
      fullNamePlaceholder: 'Ej. María Rodríguez',
      email: 'Correo Electrónico',
      emailPlaceholder: 'Ej. maria@ejemplo.com',
      phone: 'Número de Teléfono',
      phonePlaceholder: 'Ej. (203) 555-0199',
      reachPreference: 'Mejor Horario / Método de Contacto',
      methodCall: 'Llamada Telefónica',
      methodText: 'Mensaje de Texto (SMS)',
      methodEmail: 'Solo Correo Electrónico',
      timeAnytime: 'Cualquier hora hábil',
      timeMorning: 'Mañana (8:30 AM - 12:00 PM)',
      timeAfternoon: 'Tarde (12:00 PM - 5:00 PM)',
      timeEvening: 'Tarde / Noche (Prioridad)',
      smsConsentLabel: 'Acepto recibir actualizaciones por SMS sobre esta cotización de Associated Insurance Agency en el número provisto. Tarifas de mensajes pueden aplicar. Responda STOP para cancelar.',
      producerNeedBadge: 'Por Qué Pedimos Esto',
      homeAnchorTitle: 'Dirección de la Propiedad',
      homeAnchorDesc: 'Permite consulta inmediata en registros catastrales / GIS (superficie, año, techo, hidrantes).',
      homeAnchorPlaceholder: 'Ej. 50 Newtown Road, Danbury, CT 06810',
      homeLongFormNotice: '¿Desea usar nuestro cotizador completo de 4 pasos con cálculo de reposición?',
      homeLongFormLink: 'Abrir Cotizador Completo de Hogar →',
      autoAnchorTitle: 'Vehículos Actuales (Año / Marca / Modelo o VIN)',
      autoAnchorDesc: 'Permite al agente evaluar perfil de riesgo, tipos de vehículos y asistencias de seguridad de inmediato.',
      autoAnchorPlaceholder: 'Ej. 2022 Subaru Outback y 2019 Toyota RAV4 (o VIN)',
      commAutoAnchorTitle: 'Nombre de la Empresa y Número de Vehículos',
      commAutoAnchorDesc: 'Identifica si es un contratista con 2 vehículos o una flota de 15 camiones con registros DOT.',
      commBusinessPlaceholder: 'Ej. Danbury Heating & Air LLC',
      commVehicleCountPlaceholder: 'Ej. 3 camionetas de servicio, 1 camión',
      umbrellaAnchorTitle: 'Pólizas Vigentes y Límites de Responsabilidad',
      umbrellaAnchorDesc: 'El seguro paraguas requiere límites vigentes en auto y hogar (ej. $250k/$500k auto, $300k hogar).',
      umbrellaPlaceholder: 'Ej. Auto y Hogar actualmente con Travelers ($250k/$500k)',
      glAnchorTitle: 'Nombre de la Empresa y Actividad Comercial',
      glAnchorDesc: 'Determina categoría NAICS/SIC y apetito de las aseguradoras antes del primer contacto.',
      glBusinessPlaceholder: 'Ej. Northeast Electrical Contractors LLC',
      glIndustryPlaceholder: 'Ej. Instalaciones eléctricas comerciales y residenciales, contratista con licencia en CT',
      btnNextContact: 'Continuar a Contacto',
      btnNextDetails: 'Continuar a Detalles de Cobertura',
      btnBack: 'Atrás',
      submitBtn: 'Solicitar Mi Revisión y Cotización',
      submitting: 'Preparando Su Revisión...',
      step1Error: 'Por favor seleccione una línea de seguro e ingrese un código postal de 5 dígitos válido.',
      step2Error: 'Por favor proporcione su nombre completo, correo electrónico y teléfono.',
      step3Error: 'Por favor complete los detalles de cobertura solicitados para enviar su cotización.',
      smsError: 'Por favor marque la casilla de consentimiento de SMS para permitir mensajes de texto.',
      successTitle: '¡Solicitud de Cotización Recibida!',
      successDesc: (name: string, line: string, office: string, method: string) =>
        `Gracias, ${name}. Su solicitud de revisión para ${line} fue enviada a nuestra sucursal de ${office}. Un agente con licencia revisará las opciones y le contactará vía ${method}.`,
      refLabel: 'Código de Confirmación',
      anotherBtn: 'Iniciar Otra Cotización',
      antiSpamTitle: 'Garantía de Privacidad y Anti-Spam de AIA:',
      antiSpamDesc: 'Su información nunca se vende a empresas de telemarketing ni corredores de datos. Las cotizaciones son gestionadas exclusivamente por nuestros agentes licenciados en Connecticut.',
      microTrust: '100% Gratis • Comparación Independiente • Sin Telemarketing',
      officeAutoRouteNote: 'Asignado automáticamente por territorio en CT. Puede cambiar de sucursal en cualquier momento.',
      nextStepsTitle: 'Próximos Pasos:',
      nextStepsDesc: 'Nuestros agentes con licencia en Danbury, Watertown y Bridgeport están consultando registros catastrales y comparando cotizaciones entre Travelers, Safeco, Progressive y The Hartford.',
    },
    pt: {
      headline: 'Solicitar uma Cotação de Seguro',
      subheadline: 'Compare cotações em mais de 20 seguradoras líderes em Connecticut. Rápido, gratuito e totalmente confidencial.',
      formBadge: 'Revisão Gratuita',
      formBadgeSub: 'Rápido e Confidencial',
      stepBadge: 'Cotação em 3 Etapas',
      stepLabel1: 'Plano e Local',
      stepLabel2: 'Contato',
      stepLabel3: 'Detalhes',
      stepOf: 'Etapa',
      stepOfTotal: 'de 3',
      step1Title: 'Selecione a Cobertura e Localização em CT',
      step1Subtitle: 'Escolha a modalidade de seguro e digite seu CEP de CT para conectar-se automaticamente à filial mais próxima.',
      step2Title: 'Suas Informações de Contato',
      step2Subtitle: 'Respeitamos sua privacidade. Fale diretamente com nossos corretores licenciados em CT, sem telemarketing nem spam.',
      step3Title: 'Detalhes da Cobertura',
      step3Subtitle: 'Compartilhe alguns detalhes para que nossos corretores cotem as melhores tarifas entre Travelers, Safeco, The Hartford e 20+ seguradoras.',
      selectLine: 'Selecione a Linha de Seguro',
      lines: {
        home: 'Residencial',
        auto: 'Auto',
        'commercial-auto': 'Auto Comercial',
        umbrella: 'Guarda-Chuva',
        business: 'Empresarial / RC',
      },
      linesSub: {
        home: 'Proprietários e Habitação',
        auto: 'Auto Pessoal e Reboque',
        'commercial-auto': 'Vans e Frotas de Trabalho',
        umbrella: 'Excesso de Responsabilidade ($1M - $10M)',
        business: 'Responsabilidade Civil Geral e Negócios',
      },
      zipLabel: 'Código Postal (ZIP) em Connecticut',
      zipPlaceholder: 'Ex: 06810, 06795, ou 06606',
      zipDanbury: 'Área Danbury HQ (50 Newtown Rd)',
      zipWatertown: 'Área Filial Watertown (51 Depot St)',
      zipBridgeport: 'Área Filial Bridgeport (2465 Main St)',
      zipCt: 'Área com Licença Oficial em CT',
      preferredOffice: 'Escritório Local Designado',
      officeDanbury: 'Sede Danbury (50 Newtown Rd)',
      officeWatertown: 'Filial Watertown (51 Depot St)',
      officeBridgeport: 'Filial Bridgeport (2465 Main St)',
      fullName: 'Nome Completo',
      fullNamePlaceholder: 'Ex: Carlos Silva',
      email: 'Endereço de E-mail',
      emailPlaceholder: 'Ex: carlos@exemplo.com',
      phone: 'Número de Telefone',
      phonePlaceholder: 'Ex: (203) 555-0199',
      reachPreference: 'Melhor Horário / Método de Contato',
      methodCall: 'Ligação Telefônica',
      methodText: 'Mensagem de Texto (SMS)',
      methodEmail: 'Apenas E-mail',
      timeAnytime: 'Qualquer horário comercial',
      timeMorning: 'Manhã (8:30 AM - 12:00 PM)',
      timeAfternoon: 'Tarde (12:00 PM - 5:00 PM)',
      timeEvening: 'Noite (Prioridade de retorno)',
      smsConsentLabel: 'Concordo em receber atualizações por SMS sobre esta cotação da Associated Insurance Agency no número fornecido. Taxas podem ser aplicadas. Envie STOP para cancelar.',
      producerNeedBadge: 'Por Que Pedimos Isto',
      homeAnchorTitle: 'Endereço do Imóvel',
      homeAnchorDesc: 'Permite consulta imediata em registros de IPTU/GIS (área construída, ano, tipo de telhado, hidrantes).',
      homeAnchorPlaceholder: 'Ex: 50 Newtown Road, Danbury, CT 06810',
      homeLongFormNotice: 'Deseja usar nosso assistente completo de 4 etapas com cálculo de custos de substituição?',
      homeLongFormLink: 'Abrir Assistente Residencial Completo →',
      autoAnchorTitle: 'Veículos Atuais (Ano / Marca / Modelo ou VIN)',
      autoAnchorDesc: 'Permite ao corretor avaliar perfil de risco, tecnologias de segurança e tipos de veículos de imediato.',
      autoAnchorPlaceholder: 'Ex: 2022 Subaru Outback e 2019 Toyota RAV4 (ou VIN)',
      commAutoAnchorTitle: 'Nome da Empresa e Quantidade de Veículos',
      commAutoAnchorDesc: 'Identifica se é um profissional com 2 vans ou uma frota de 15 caminhões com registros DOT.',
      commBusinessPlaceholder: 'Ex: Danbury Heating & Air LLC',
      commVehicleCountPlaceholder: 'Ex: 3 vans de serviço, 1 caminhão',
      umbrellaAnchorTitle: 'Apólices Vigentes e Limites de Responsabilidade',
      umbrellaAnchorDesc: 'A apólice guarda-chuva exige limites prévios de auto e residência (ex: $250k/$500k auto, $300k residencial).',
      umbrellaPlaceholder: 'Ex: Auto e Residência na Travelers ($250k/$500k)',
      glAnchorTitle: 'Nome da Empresa e Ramo de Atividade',
      glAnchorDesc: 'Determina a classificação NAICS/SIC e apetite das seguradoras antes da primeira conversa.',
      glBusinessPlaceholder: 'Ex: Northeast Electrical Contractors LLC',
      glIndustryPlaceholder: 'Ex: Prestador de serviços elétricos comerciais e residenciais com licença em CT',
      btnNextContact: 'Continuar para Contato',
      btnNextDetails: 'Continuar para Detalhes de Cobertura',
      btnBack: 'Voltar',
      submitBtn: 'Solicitar Minha Revisão e Cotação',
      submitting: 'Preparando Sua Revisão...',
      step1Error: 'Por favor, selecione uma modalidade e insira um código postal válido de 5 dígitos.',
      step2Error: 'Por favor, informe seu nome completo, e-mail e número de telefone.',
      step3Error: 'Por favor, preencha os detalhes de cobertura solicitados para enviar sua cotação.',
      smsError: 'Por favor, marque a caixa de consentimento de SMS para permitir mensagens de texto.',
      successTitle: 'Solicitação de Cotação Recebida!',
      successDesc: (name: string, line: string, office: string, method: string) =>
        `Obrigado, ${name}. Sua solicitação de ${line} foi encaminhada para a filial de ${office}. Um corretor licenciado entrará em contato via ${method}.`,
      refLabel: 'Código de Confirmação',
      anotherBtn: 'Solicitar Outra Cotação',
      antiSpamTitle: 'Garantia de Confidencialidade e Anti-Spam da AIA:',
      antiSpamDesc: 'Seus dados são protegidos e nunca vendidos a empresas de telemarketing. As cotações são elaboradas exclusivamente por nossos corretores licenciados em Connecticut.',
      microTrust: '100% Grátis • Comparação Independente • Sem Telemarketing',
      officeAutoRouteNote: 'Encaminhado automaticamente por território em CT. Você pode alterar a filial quando desejar.',
      nextStepsTitle: 'Próximas Etapas:',
      nextStepsDesc: 'Nossos corretores licenciados em Danbury, Watertown e Bridgeport estão consultando registros prediais e comparando cotações na Travelers, Safeco, Progressive e The Hartford.',
    },
    tr: {
      headline: 'Sigorta Teklifi İsteyin',
      subheadline: "Connecticut'ta 20'den fazla lider sigorta şirketinden teklif karşılaştırın. Ücretsiz, hızlı ve tamamen gizli.",
      formBadge: 'Ücretsiz Fiyat İncelemesi',
      formBadgeSub: 'Hızlı ve Gizli',
      stepBadge: '3 Adımda Hızlı Teklif',
      stepLabel1: 'Branş ve Konum',
      stepLabel2: 'İletişim',
      stepLabel3: 'Detaylar',
      stepOf: 'Adım',
      stepOfTotal: '/ 3',
      step1Title: 'Teminat ve Connecticut Konumunu Seçin',
      step1Subtitle: 'Sigorta branşınızı seçin ve en yakın şubemize bağlanmak için CT posta kodunuzu girin.',
      step2Title: 'İletişim Bilgileriniz',
      step2Subtitle: 'Gizliliğinize saygı duyuyoruz. İstenmeyen telemarketing aramaları olmadan doğrudan lisanslı Connecticut ekibimizle görüşün.',
      step3Title: 'Teminat Detayları',
      step3Subtitle: "Temsilcilerimizin Travelers, Safeco, Progressive ve 20'den fazla şirket arasında en iyi oranları bulması için birkaç ayrıntı paylaşın.",
      selectLine: 'Sigorta Branşını Seçin',
      lines: {
        home: 'Konut',
        auto: 'Araç',
        'commercial-auto': 'Ticari Araç',
        umbrella: 'Şemsiye',
        business: 'İşyeri / GL',
      },
      linesSub: {
        home: 'Ev Sahibi ve Mülk',
        auto: 'Bireysel Otomobil ve Karavan',
        'commercial-auto': 'Hizmet Araçları ve Filolar',
        umbrella: 'Ek Sorumluluk ($1M - $10M)',
        business: 'Genel Sorumluluk ve Ticari Mülk',
      },
      zipLabel: 'Connecticut Posta Kodu (ZIP)',
      zipPlaceholder: 'Örn. 06810, 06795, veya 06606',
      zipDanbury: 'Danbury Genel Merkez Hizmet Alanı (50 Newtown Rd)',
      zipWatertown: 'Watertown Şubesi Hizmet Alanı (51 Depot St)',
      zipBridgeport: 'Bridgeport Şubesi Hizmet Alanı (2465 Main St)',
      zipCt: 'Connecticut Lisanslı Acente Hizmet Alanı',
      preferredOffice: 'Atanan Yerel Şube',
      officeDanbury: 'Danbury Genel Merkez (50 Newtown Rd)',
      officeWatertown: 'Watertown Şubesi (51 Depot St)',
      officeBridgeport: 'Bridgeport Şubesi (2465 Main St)',
      fullName: 'Ad Soyad',
      fullNamePlaceholder: 'Örn. Ahmet Yılmaz',
      email: 'E-posta Adresi',
      emailPlaceholder: 'Örn. ahmet@ornek.com',
      phone: 'Telefon Numarası',
      phonePlaceholder: 'Örn. (203) 555-0199',
      reachPreference: 'Tercih Edilen İletişim Yöntemi / Zamanı',
      methodCall: 'Telefon Araması',
      methodText: 'Kısa Mesaj (SMS)',
      methodEmail: 'Yalnızca E-posta',
      timeAnytime: 'Mesai saatleri içinde herhangi bir zaman',
      timeMorning: 'Sabah (8:30 - 12:00)',
      timeAfternoon: 'Öğleden Sonra (12:00 - 17:00)',
      timeEvening: 'Akşam (Öncelikli geri arama)',
      smsConsentLabel: 'Associated Insurance Agency tarafından bu teklif hakkında sağlanan telefon numarama SMS gönderilmesini kabul ediyorum. STOP yazarak iptal edebilirsiniz.',
      producerNeedBadge: 'Neden Bu Bilgiyi İstiyoruz?',
      homeAnchorTitle: 'Mülk / Konut Adresi',
      homeAnchorDesc: 'Belediye tapu/GIS kayıtlarından bina metrekaresi, yapım yılı, çatı tipi ve hidrant mesafesinin anında incelenmesini sağlar.',
      homeAnchorPlaceholder: 'Örn. 50 Newtown Road, Danbury, CT 06810',
      homeLongFormNotice: 'Yapı malzemeleri ve yeniden inşa hesaplamaları içeren ayrıntılı 4 adımlı konut sihirbazımızı mı tercih edersiniz?',
      homeLongFormLink: 'Tam Kapsamlı Konut Formunu Aç →',
      autoAnchorTitle: 'Mevcut Araçlar (Yıl / Marka / Model veya Şasi No)',
      autoAnchorDesc: 'Temsilcinin risk grubunu, güvenlik donanım indirimlerini ve araç bileşimini hemen anlamasını sağlar.',
      autoAnchorPlaceholder: 'Örn. 2022 Subaru Outback & 2019 Toyota RAV4 (veya VIN)',
      commAutoAnchorTitle: 'Firma Adı ve Ticari Araç Sayısı',
      commAutoAnchorDesc: '2 araçlı bir usta mı yoksa DOT bildirimleri gerektiren 15 kamyonluk bir filo mu olduğunu tespit eder.',
      commBusinessPlaceholder: 'Örn. Danbury Heating & Air LLC',
      commVehicleCountPlaceholder: 'Örn. 3 servis aracı, 1 kamyonet',
      umbrellaAnchorTitle: 'Mevcut Teminatlar ve Sorumluluk Limitleri',
      umbrellaAnchorDesc: 'Şemsiye sigortası mevcut araç/konut sorumluluk limitlerini gerektirir (örn: $250k/$500k araç, $300k konut).',
      umbrellaPlaceholder: 'Örn. Travelers poliçesinde araç ve konut ($250k/$500k limit)',
      glAnchorTitle: 'Firma Adı ve Faaliyet Alanı / Sektör',
      glAnchorDesc: 'İlk görüşmeden önce NAICS/SIC kodunu ve sigorta şirketlerinin kabul kriterlerini belirler.',
      glBusinessPlaceholder: 'Örn. Northeast Electrical Contractors LLC',
      glIndustryPlaceholder: 'Örn. Ticari ve konut elektrik tesisatı, CT lisanslı müteahhit',
      btnNextContact: 'İletişim Bilgilerine Devam Et',
      btnNextDetails: 'Teminat Detaylarına Devam Et',
      btnBack: 'Geri',
      submitBtn: 'Teklif ve İnceleme Talebini Gönder',
      submitting: 'İnceleme Hazırlanıyor...',
      step1Error: 'Lütfen bir sigorta branşı seçin ve geçerli 5 haneli bir posta kodu girin.',
      step2Error: 'Lütfen ad soyad, e-posta adresi ve telefon numaranızı girin.',
      step3Error: 'Teklifinizi hazırlayabilmemiz için lütfen istenen teminat ayrıntılarını doldurun.',
      smsError: 'Kısa mesajla bilgilendirme için lütfen SMS onay kutusunu işaretleyin.',
      successTitle: 'Teklif Talebiniz Alındı!',
      successDesc: (name: string, line: string, office: string, method: string) =>
        `Teşekkürler, ${name}. ${line} talebiniz ${office} şubemize atandı. Lisanslı temsilcimiz detayları inceleyip sizinle ${method} ile iletişime geçecektir.`,
      refLabel: 'Onay Kodu',
      anotherBtn: 'Başka Bir Teklif Başlat',
      antiSpamTitle: 'AIA Gizlilik ve İstenmeyen Mesaj Garantisi:',
      antiSpamDesc: 'Bilgileriniz korunur ve asla üçüncü şahıslara veya pazarlamacılara satılmaz. Teklifler yalnızca lisanslı Connecticut acentelerimiz tarafından hazırlanır.',
      microTrust: '100% Ücretsiz • Bağımsız Karşılaştırma • Reklam Spamı Yok',
      officeAutoRouteNote: 'CT bölgesine göre otomatik yönlendirilir. İstediğiniz zaman şube değiştirebilirsiniz.',
      nextStepsTitle: 'Sonraki Adımlar:',
      nextStepsDesc: "Danbury, Watertown ve Bridgeport'taki lisanslı temsilcilerimiz kayıtları inceleyerek Travelers, Safeco, Progressive ve The Hartford arasında teklifleri karşılaştırıyor.",
    },
  }[lang];

  // Helper to get localized homeowners wizard URL
  const getHomeownersWizardUrl = () => {
    if (lang === 'es') return '/es/quote/homeowners';
    if (lang === 'pt') return '/pt/quote/homeowners';
    if (lang === 'tr') return '/tr/quote/homeowners';
    return '/quote/homeowners';
  };

  // Helper to return dynamic CT branch badge
  const getZipBadge = () => {
    const clean = zipCode.trim();
    if (!clean) return null;
    if (clean.startsWith('068')) {
      return { text: dict.zipDanbury, color: 'text-emerald-700 bg-emerald-50 border-emerald-200' };
    }
    if (clean.startsWith('067')) {
      return { text: dict.zipWatertown, color: 'text-emerald-700 bg-emerald-50 border-emerald-200' };
    }
    if (clean.startsWith('066')) {
      return { text: dict.zipBridgeport, color: 'text-emerald-700 bg-emerald-50 border-emerald-200' };
    }
    if (clean.length === 5 && (clean.startsWith('06') || clean.startsWith('10') || clean.startsWith('01'))) {
      return { text: dict.zipCt, color: 'text-blue-700 bg-blue-50 border-blue-200' };
    }
    return null;
  };

  const handleZipChange = (val: string) => {
    const clean = val.replace(/\D/g, '').substring(0, 5);
    setZipCode(clean);
    setErrorMessage('');

    if (clean.length > 0 && (!propertyAddress || propertyAddress.endsWith(', CT'))) {
      setPropertyAddress(`${clean}, CT`);
    }

    if (clean.startsWith('067')) {
      setPreferredOffice('Watertown');
    } else if (clean.startsWith('066')) {
      setPreferredOffice('Bridgeport');
    } else if (clean.startsWith('068')) {
      setPreferredOffice('Danbury');
    }
  };

  // Step 1 Validation & Proceed
  const handleProceedToStep2 = (e: React.FormEvent) => {
    e.preventDefault();

    // Client-side Honeypot Check: if bot filled either hidden trap field, silently abort
    if (hpWebsite || hpCompany) {
      console.warn('[Security / Honeypot] Bot submission blocked at QuoteForm Step 1.');
      return;
    }

    if (zipCode && !/^\d{5}$/.test(zipCode)) {
      setErrorMessage(dict.step1Error);
      return;
    }
    setErrorMessage('');
    setCurrentStep(2);
    setMaxStepReached((prev) => Math.max(prev, 2) as FunnelStep);
  };

  // Step 2 Validation, Partial Lead Capture & Proceed
  const handleProceedToStep3 = async (e: React.FormEvent) => {
    e.preventDefault();

    // Client-side Honeypot Check: if bot filled either hidden trap field, silently abort
    if (hpWebsite || hpCompany) {
      console.warn('[Security / Honeypot] Bot submission blocked at QuoteForm Step 2.');
      return;
    }

    if (!fullName.trim() || !email.trim() || !phone.trim()) {
      setErrorMessage(dict.step2Error);
      return;
    }

    // Basic email validation
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      setErrorMessage(dict.step2Error);
      return;
    }

    if (reachMethod === 'text' && !smsConsent) {
      setErrorMessage(dict.smsError);
      return;
    }

    setErrorMessage('');

    // Fire Partial Lead Capture in background (non-blocking) with reCAPTCHA & honeypots
    if (!partialSaved) {
      getRecaptchaToken('quote_partial_lead')
        .then((recaptchaToken) => {
          fetch('/api/quote', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              name: fullName.trim(),
              email: email.trim(),
              phone: phone.trim(),
              insuranceType: dict.lines[lineOfBusiness],
              preferredOffice,
              preferredLanguage: lang,
              reachMethod,
              reachTime,
              smsConsent,
              notes: `Partial lead capture at Step 2. Connecticut ZIP: ${zipCode || 'Not provided'}`,
              source: 'Partial_Lead_Step_2',
              recaptchaToken,
              hp_website: hpWebsite,
              hp_company: hpCompany,
              form_rendered_at: renderedAt,
            }),
          })
            .then(() => setPartialSaved(true))
            .catch(() => {});
        })
        .catch(() => {});
    }

    setCurrentStep(3);
    setMaxStepReached((prev) => Math.max(prev, 3) as FunnelStep);
  };

  const getAnchorPayload = () => {
    switch (lineOfBusiness) {
      case 'home':
        return {
          propertyAddress,
          rationale: dict.homeAnchorDesc,
        };
      case 'auto':
        return {
          vehicles: vehicleDetails,
          rationale: dict.autoAnchorDesc,
        };
      case 'commercial-auto':
        return {
          businessName: commBusinessName,
          vehicleCount,
          rationale: dict.commAutoAnchorDesc,
        };
      case 'umbrella':
        return {
          underlyingCoverageStatus: underlyingCoverage,
          rationale: dict.umbrellaAnchorDesc,
        };
      case 'business':
        return {
          businessName: glBusinessName,
          natureOfBusiness: glIndustry,
          rationale: dict.glAnchorDesc,
        };
    }
  };

  const validateStep3 = (): boolean => {
    if (lineOfBusiness === 'home' && !propertyAddress.trim()) {
      setErrorMessage(dict.step3Error);
      return false;
    }
    if (lineOfBusiness === 'auto' && !vehicleDetails.trim()) {
      setErrorMessage(dict.step3Error);
      return false;
    }
    if (
      lineOfBusiness === 'commercial-auto' &&
      (!commBusinessName.trim() || !vehicleCount.trim())
    ) {
      setErrorMessage(dict.step3Error);
      return false;
    }
    if (lineOfBusiness === 'umbrella' && !underlyingCoverage.trim()) {
      setErrorMessage(dict.step3Error);
      return false;
    }
    if (
      lineOfBusiness === 'business' &&
      (!glBusinessName.trim() || !glIndustry.trim())
    ) {
      setErrorMessage(dict.step3Error);
      return false;
    }

    setErrorMessage('');
    return true;
  };

  // Step 3 Final Submission
  const handleFinalSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Client-side Honeypot Check: if bot filled either hidden trap field, silently abort
    if (hpWebsite || hpCompany) {
      console.warn('[Security / Honeypot] Bot submission blocked at QuoteForm Step 3.');
      const fallbackPrefix = lineOfBusiness.substring(0, 3).toUpperCase();
      setConfirmationCode(`AIA-${fallbackPrefix}-${Math.floor(100000 + Math.random() * 900000)}`);
      setSubmittedData({
        name: fullName.trim(),
        lineName: dict.lines[lineOfBusiness],
        office: preferredOffice,
        reachMethod: reachMethod === 'text' ? 'SMS Text' : reachMethod === 'email' ? 'Email' : 'Phone Call',
      });
      return;
    }

    if (!validateStep3()) {
      return;
    }

    setIsSubmitting(true);
    setErrorMessage('');

    try {
      // Execute Google reCAPTCHA v3
      const recaptchaToken = await getRecaptchaToken('quote_form');

      const anchorPayload = getAnchorPayload();

      const payload = {
        name: fullName.trim(),
        email: email.trim(),
        phone: phone.trim(),
        insuranceType: dict.lines[lineOfBusiness],
        preferredOffice,
        preferredLanguage: lang,
        reachMethod: dict[`method${reachMethod.charAt(0).toUpperCase() + reachMethod.slice(1)}` as keyof typeof dict] || reachMethod,
        reachTime,
        smsConsent,
        anchorData: anchorPayload,
        producerPrepRationale: anchorPayload.rationale,
        source: 'Unified_3Step_Funnel',
        recaptchaToken,
        // Honeypot fields
        hp_website: hpWebsite,
        hp_company: hpCompany,
        form_rendered_at: renderedAt,
      };

      const response = await fetch('/api/quote', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const resData = await response.json().catch(() => null);

      if (resData && resData.success) {
        setConfirmationCode(resData.confirmationCode);
      } else if (resData && !resData.success) {
        setErrorMessage(resData.error || dict.step3Error);
        setIsSubmitting(false);
        return;
      } else {
        const fallbackPrefix = lineOfBusiness.substring(0, 3).toUpperCase();
        setConfirmationCode(`AIA-${fallbackPrefix}-${Math.floor(100000 + Math.random() * 900000)}`);
      }

      setSubmittedData({
        name: fullName.trim(),
        lineName: dict.lines[lineOfBusiness],
        office: preferredOffice,
        reachMethod: reachMethod === 'text' ? 'SMS Text' : reachMethod === 'email' ? 'Email' : 'Phone Call',
      });
    } catch {
      // Offline / dev fallback
      const fallbackPrefix = lineOfBusiness.substring(0, 3).toUpperCase();
      setConfirmationCode(`AIA-${fallbackPrefix}-${Math.floor(100000 + Math.random() * 900000)}`);
      setSubmittedData({
        name: fullName.trim(),
        lineName: dict.lines[lineOfBusiness],
        office: preferredOffice,
        reachMethod: reachMethod === 'text' ? 'SMS Text' : reachMethod === 'email' ? 'Email' : 'Phone Call',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setCurrentStep(1);
    setMaxStepReached(1);
    setConfirmationCode('');
    setSubmittedData(null);
    setErrorMessage('');
    setFullName('');
    setEmail('');
    setPhone('');
    setPropertyAddress('');
    setVehicleDetails('');
    setCommBusinessName('');
    setVehicleCount('');
    setUnderlyingCoverage('');
    setGlBusinessName('');
    setGlIndustry('');
    setSmsConsent(false);
    setPartialSaved(false);
  };

  const zipBadge = getZipBadge();

  return (
    <div className="w-full max-w-3xl mx-auto">
      {/* Success View */}
      {submittedData && confirmationCode ? (
        <div className="bg-white border border-border-subtle shadow-xl rounded-2xl p-8 sm:p-10 text-center transition-all animate-fadeIn">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 mb-6 border border-emerald-200">
            <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
            </svg>
          </div>

          <h2 className="text-2xl sm:text-3xl font-extrabold text-accent mb-3">
            {dict.successTitle}
          </h2>

          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-bg-secondary border border-border-subtle rounded-lg mb-6 text-xs font-mono text-accent">
            <span className="text-text-muted">{dict.refLabel}:</span>
            <span className="font-bold text-accent-gold">{confirmationCode}</span>
          </div>

          <p className="text-sm sm:text-base text-text-secondary max-w-xl mx-auto mb-8 leading-relaxed">
            {dict.successDesc(
              submittedData.name,
              submittedData.lineName,
              submittedData.office,
              submittedData.reachMethod
            )}
          </p>

          <div className="bg-bg-secondary/70 border border-border-subtle rounded-xl p-4 max-w-md mx-auto mb-8 text-left space-y-2">
            <div className="text-xs font-bold text-accent uppercase tracking-wider flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <span>{dict.nextStepsTitle}</span>
            </div>
            <p className="text-xs text-text-secondary leading-normal">
              {dict.nextStepsDesc}
            </p>
          </div>

          <button
            type="button"
            onClick={resetForm}
            className="px-6 py-3 text-xs font-bold uppercase tracking-wider text-accent border border-accent hover:bg-bg-secondary rounded-xl transition-all shadow-xs cursor-pointer"
          >
            {dict.anotherBtn}
          </button>
        </div>
      ) : (
        /* 3-Step Progressive Funnel Form */
        <div className="bg-white border border-border-subtle shadow-xl rounded-2xl p-6 sm:p-10 transition-all space-y-8">
          {/* Honeypot traps for bot protection */}
          <div
            aria-hidden="true"
            style={{
              position: 'absolute',
              left: '-9999px',
              top: '-9999px',
              opacity: 0,
              zIndex: -1,
              width: 0,
              height: 0,
              overflow: 'hidden',
              pointerEvents: 'none',
              margin: 0,
              padding: 0,
            }}
          >
            <label htmlFor={`quote_global_hp_website_${lang}`}>Leave empty</label>
            <input
              id={`quote_global_hp_website_${lang}`}
              type="text"
              name="hp_website"
              tabIndex={-1}
              autoComplete="off"
              value={hpWebsite}
              onChange={(e) => setHpWebsite(e.target.value)}
            />
            <label htmlFor={`quote_global_hp_company_${lang}`}>Company Website</label>
            <input
              id={`quote_global_hp_company_${lang}`}
              type="text"
              name="hp_company"
              tabIndex={-1}
              autoComplete="off"
              value={hpCompany}
              onChange={(e) => setHpCompany(e.target.value)}
            />
          </div>

          {/* Form Header */}
          <div className="border-b border-border-subtle pb-6">
            <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
              <div className="inline-flex items-center gap-2">
                <span className="text-xs font-bold uppercase tracking-wider text-accent-gold">
                  {dict.formBadge}
                </span>
                <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                  {dict.stepBadge}
                </span>
              </div>
              <span className="text-[11px] font-semibold text-text-muted bg-bg-secondary px-2.5 py-1 rounded-full border border-border-subtle">
                {dict.stepOf} {currentStep} {dict.stepOfTotal}
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-accent tracking-tight">
              {dict.headline}
            </h2>
            <p className="text-xs sm:text-sm text-text-secondary mt-1 leading-relaxed">
              {dict.subheadline}
            </p>

            {/* Stepper Navigation Progress Bar */}
            <div className="mt-6 pt-2">
              {/* Progress track */}
              <div className="w-full bg-bg-secondary rounded-full h-1.5 overflow-hidden mb-4 border border-border-subtle">
                <div
                  className="bg-accent h-1.5 rounded-full transition-all duration-300 ease-out"
                  style={{ width: `${(currentStep / 3) * 100}%` }}
                ></div>
              </div>

              {/* Step Pill Buttons */}
              <div className="grid grid-cols-3 gap-2 text-center">
                {[
                  { step: 1 as FunnelStep, label: dict.stepLabel1, icon: '🎯' },
                  { step: 2 as FunnelStep, label: dict.stepLabel2, icon: '👤' },
                  { step: 3 as FunnelStep, label: dict.stepLabel3, icon: '📋' },
                ].map((s) => {
                  const isActive = currentStep === s.step;
                  const isDone = currentStep > s.step;
                  const isAccessible = maxStepReached >= s.step;

                  return (
                    <button
                      key={s.step}
                      type="button"
                      disabled={!isAccessible}
                      onClick={() => {
                        if (isAccessible) {
                          setCurrentStep(s.step);
                          setErrorMessage('');
                        }
                      }}
                      className={`flex items-center justify-center gap-1.5 p-2 rounded-xl text-xs font-semibold transition-all ${
                        isActive
                          ? 'bg-accent text-white shadow-xs font-bold'
                          : isDone
                          ? 'bg-emerald-50 text-emerald-800 border border-emerald-200 cursor-pointer hover:bg-emerald-100'
                          : isAccessible
                          ? 'bg-bg-secondary text-text-secondary cursor-pointer hover:bg-bg-secondary/80'
                          : 'bg-bg-secondary/40 text-text-muted cursor-not-allowed opacity-60'
                      }`}
                    >
                      <span>{isDone ? '✓' : s.step}</span>
                      <span className="hidden sm:inline">{s.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Validation Error Banner */}
          {errorMessage && (
            <div className="p-3.5 bg-red-50 border border-red-200 rounded-xl flex items-center gap-2.5 text-xs text-red-700 animate-fadeIn">
              <svg className="w-4 h-4 text-red-500 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>{errorMessage}</span>
            </div>
          )}

          {/* STEP 1: Policy Selection & Connecticut Location */}
          {currentStep === 1 && (
            <form onSubmit={handleProceedToStep2} className="space-y-6 animate-fadeIn">
              {/* ============================================================ */}
              {/* BOT HONEYPOT FIELDS (Invisible to human users, traps bots)   */}
              {/* ============================================================ */}
              <div
                aria-hidden="true"
                style={{
                  position: 'absolute',
                  left: '-9999px',
                  top: '-9999px',
                  opacity: 0,
                  zIndex: -1,
                  width: 0,
                  height: 0,
                  overflow: 'hidden',
                  pointerEvents: 'none',
                  margin: 0,
                  padding: 0,
                }}
              >
                <label htmlFor={`quote_s1_hp_website_${lang}`}>Leave this field empty if human</label>
                <input
                  id={`quote_s1_hp_website_${lang}`}
                  type="text"
                  name="hp_website"
                  tabIndex={-1}
                  autoComplete="off"
                  value={hpWebsite}
                  onChange={(e) => setHpWebsite(e.target.value)}
                />
                <label htmlFor={`quote_s1_hp_company_${lang}`}>Company Website</label>
                <input
                  id={`quote_s1_hp_company_${lang}`}
                  type="text"
                  name="hp_company"
                  tabIndex={-1}
                  autoComplete="off"
                  value={hpCompany}
                  onChange={(e) => setHpCompany(e.target.value)}
                />
              </div>
              {/* ============================================================ */}

              <div className="space-y-1">
                <h3 className="text-base sm:text-lg font-bold text-accent">
                  {dict.step1Title}
                </h3>
                <p className="text-xs text-text-secondary leading-relaxed">
                  {dict.step1Subtitle}
                </p>
              </div>

              {/* Line of Business Pills */}
              <div>
                <label className="block text-xs font-bold text-accent uppercase tracking-wider mb-2.5">
                  {dict.selectLine}
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5">
                  {(
                    [
                      { id: 'home', icon: '🏠', label: dict.lines.home, sub: 'Homeowners' },
                      { id: 'auto', icon: '🚗', label: dict.lines.auto, sub: 'Personal' },
                      { id: 'commercial-auto', icon: '🚚', label: dict.lines['commercial-auto'], sub: 'Fleet / Work' },
                      { id: 'umbrella', icon: '🛡️', label: dict.lines.umbrella, sub: '$1M - $10M' },
                      { id: 'business', icon: '🏢', label: dict.lines.business, sub: 'Commercial' },
                    ] as const
                  ).map((line) => {
                    const isSelected = lineOfBusiness === line.id;
                    return (
                      <button
                        key={line.id}
                        type="button"
                        onClick={() => {
                          setLineOfBusiness(line.id);
                          setErrorMessage('');
                        }}
                        className={`p-3 text-left rounded-xl border transition-all cursor-pointer flex flex-col justify-between ${
                          isSelected
                            ? 'border-accent bg-accent/5 ring-2 ring-accent/15 shadow-xs'
                            : 'border-border-subtle bg-bg-secondary/40 hover:border-accent-gold hover:bg-bg-secondary'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-1.5">
                          <span className="text-lg">{line.icon}</span>
                          {isSelected && (
                            <span className="w-2 h-2 rounded-full bg-accent animate-pulse"></span>
                          )}
                        </div>
                        <div>
                          <span
                            className={`block text-xs font-bold leading-tight ${
                              isSelected ? 'text-accent' : 'text-text-primary'
                            }`}
                          >
                            {line.label}
                          </span>
                          <span className="block text-[10px] text-text-muted mt-0.5 truncate">
                            {line.sub}
                          </span>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Connecticut ZIP & Local Branch Routing */}
              <div className="bg-bg-secondary/40 border border-border-subtle rounded-xl p-5 space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-start">
                  {/* ZIP Code Input */}
                  <div className="space-y-1.5">
                    <label htmlFor="zipCode" className="block text-xs font-semibold text-text-secondary uppercase">
                      {dict.zipLabel}
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-text-muted">
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
                        </svg>
                      </div>
                      <input
                        type="text"
                        id="zipCode"
                        name="zipCode"
                        inputMode="numeric"
                        maxLength={5}
                        value={zipCode}
                        onChange={(e) => handleZipChange(e.target.value)}
                        placeholder={dict.zipPlaceholder}
                        className="w-full pl-10 pr-4 py-2.5 text-sm bg-white border border-border-subtle rounded-lg focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all font-semibold"
                      />
                    </div>
                    {zipBadge && (
                      <p className={`text-[11px] font-semibold px-2.5 py-1 rounded-md border inline-flex items-center gap-1.5 mt-1 ${zipBadge.color}`}>
                        <svg className="w-3 h-3 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        <span>{zipBadge.text}</span>
                      </p>
                    )}
                  </div>

                  {/* Assigned Local Branch */}
                  <div className="space-y-1.5">
                    <label htmlFor="preferredOffice" className="block text-xs font-semibold text-text-secondary uppercase">
                      {dict.preferredOffice}
                    </label>
                    <select
                      id="preferredOffice"
                      name="preferredOffice"
                      value={preferredOffice}
                      onChange={(e) => setPreferredOffice(e.target.value)}
                      className="w-full px-3 py-2.5 text-xs bg-white border border-border-subtle rounded-lg focus:outline-none focus:border-accent transition-all font-medium"
                    >
                      <option value="Danbury">{dict.officeDanbury}</option>
                      <option value="Watertown">{dict.officeWatertown}</option>
                      <option value="Bridgeport">{dict.officeBridgeport}</option>
                    </select>
                    <p className="text-[11px] text-text-muted">
                      {dict.officeAutoRouteNote}
                    </p>
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-4 px-6 text-sm sm:text-base font-bold uppercase tracking-wider text-white bg-accent hover:bg-accent/90 active:scale-[0.99] rounded-xl transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2 cursor-pointer group"
                >
                  <span>{dict.btnNextContact}</span>
                  <svg className="w-4 h-4 text-accent-gold group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                  </svg>
                </button>
              </div>

              {/* Micro Trust */}
              <p className="text-center text-xs text-text-muted">
                {dict.microTrust}
              </p>

              {/* Google reCAPTCHA v3 Compliance Notice */}
              <RecaptchaLegalNotice lang={lang} className="pt-2 text-center" />
            </form>
          )}

          {/* STEP 2: Contact Information & Lead Capture */}
          {currentStep === 2 && (
            <form onSubmit={handleProceedToStep3} className="space-y-6 animate-fadeIn">
              {/* ============================================================ */}
              {/* BOT HONEYPOT FIELDS (Invisible to human users, traps bots)   */}
              {/* ============================================================ */}
              <div
                aria-hidden="true"
                style={{
                  position: 'absolute',
                  left: '-9999px',
                  top: '-9999px',
                  opacity: 0,
                  zIndex: -1,
                  width: 0,
                  height: 0,
                  overflow: 'hidden',
                  pointerEvents: 'none',
                  margin: 0,
                  padding: 0,
                }}
              >
                <label htmlFor={`quote_s2_hp_website_${lang}`}>Leave this field empty if human</label>
                <input
                  id={`quote_s2_hp_website_${lang}`}
                  type="text"
                  name="hp_website"
                  tabIndex={-1}
                  autoComplete="off"
                  value={hpWebsite}
                  onChange={(e) => setHpWebsite(e.target.value)}
                />
                <label htmlFor={`quote_s2_hp_company_${lang}`}>Company Website</label>
                <input
                  id={`quote_s2_hp_company_${lang}`}
                  type="text"
                  name="hp_company"
                  tabIndex={-1}
                  autoComplete="off"
                  value={hpCompany}
                  onChange={(e) => setHpCompany(e.target.value)}
                />
              </div>
              {/* ============================================================ */}

              <div className="space-y-1">
                <h3 className="text-base sm:text-lg font-bold text-accent">
                  {dict.step2Title}
                </h3>
                <p className="text-xs text-text-secondary leading-relaxed">
                  {dict.step2Subtitle}
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Full Name */}
                <div className="space-y-1.5 sm:col-span-2">
                  <label htmlFor="fullName" className="block text-xs font-semibold text-text-secondary uppercase">
                    {dict.fullName} <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="fullName"
                    name="fullName"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder={dict.fullNamePlaceholder}
                    className="w-full px-4 py-2.5 text-sm bg-white border border-border-subtle rounded-lg focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all"
                  />
                </div>

                {/* Email Address */}
                <div className="space-y-1.5">
                  <label htmlFor="email" className="block text-xs font-semibold text-text-secondary uppercase">
                    {dict.email} <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder={dict.emailPlaceholder}
                    className="w-full px-4 py-2.5 text-sm bg-white border border-border-subtle rounded-lg focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all"
                  />
                </div>

                {/* Phone Number */}
                <div className="space-y-1.5">
                  <label htmlFor="phone" className="block text-xs font-semibold text-text-secondary uppercase">
                    {dict.phone} <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder={dict.phonePlaceholder}
                    className="w-full px-4 py-2.5 text-sm bg-white border border-border-subtle rounded-lg focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all"
                  />
                </div>

                {/* Best Time / Method to Reach */}
                <div className="space-y-1.5 sm:col-span-2">
                  <label htmlFor="reachMethod" className="block text-xs font-semibold text-text-secondary uppercase">
                    {dict.reachPreference}
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    <select
                      id="reachMethod"
                      name="reachMethod"
                      value={reachMethod}
                      onChange={(e) => setReachMethod(e.target.value as ReachMethod)}
                      className="w-full px-3 py-2.5 text-xs bg-white border border-border-subtle rounded-lg focus:outline-none focus:border-accent transition-all"
                    >
                      <option value="call">{dict.methodCall}</option>
                      <option value="text">{dict.methodText}</option>
                      <option value="email">{dict.methodEmail}</option>
                    </select>

                    <select
                      id="reachTime"
                      name="reachTime"
                      value={reachTime}
                      onChange={(e) => setReachTime(e.target.value as ReachTime)}
                      className="w-full px-3 py-2.5 text-xs bg-white border border-border-subtle rounded-lg focus:outline-none focus:border-accent transition-all"
                    >
                      <option value="anytime">{dict.timeAnytime}</option>
                      <option value="morning">{dict.timeMorning}</option>
                      <option value="afternoon">{dict.timeAfternoon}</option>
                      <option value="evening">{dict.timeEvening}</option>
                    </select>
                  </div>
                </div>

                {/* SMS Consent Checkbox */}
                <div className="sm:col-span-2 pt-1">
                  <label className="flex items-start gap-2.5 cursor-pointer text-xs text-text-secondary leading-normal">
                    <input
                      type="checkbox"
                      checked={smsConsent}
                      onChange={(e) => setSmsConsent(e.target.checked)}
                      className="mt-0.5 w-4 h-4 rounded text-accent focus:ring-accent border-border-subtle"
                    />
                    <span>
                      {dict.smsConsentLabel}
                    </span>
                  </label>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => {
                    setCurrentStep(1);
                    setErrorMessage('');
                  }}
                  className="w-1/3 py-4 px-4 text-xs font-bold uppercase tracking-wider text-accent border border-accent/20 hover:bg-bg-secondary rounded-xl transition-all text-center cursor-pointer"
                >
                  {dict.btnBack}
                </button>
                <button
                  type="submit"
                  className="w-2/3 py-4 px-6 text-sm sm:text-base font-bold uppercase tracking-wider text-white bg-accent hover:bg-accent/90 active:scale-[0.99] rounded-xl transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2 cursor-pointer group"
                >
                  <span>{dict.btnNextDetails}</span>
                  <svg className="w-4 h-4 text-accent-gold group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                  </svg>
                </button>
              </div>

              {/* Google reCAPTCHA v3 Compliance Notice */}
              <RecaptchaLegalNotice lang={lang} className="pt-2 text-center" />
            </form>
          )}

          {/* STEP 3: Coverage Specifics & Final Submission */}
          {currentStep === 3 && (
            <form
              onSubmit={handleFinalSubmit}
              className="space-y-6 animate-fadeIn"
              data-mcp-tool="submit_quote_request"
              data-mcp-description="Submit an insurance quote request to Associated Insurance Agency"
            >
              {/* ============================================================ */}
              {/* BOT HONEYPOT FIELDS (Invisible to human users, traps bots)   */}
              {/* ============================================================ */}
              <div
                aria-hidden="true"
                style={{
                  position: 'absolute',
                  left: '-9999px',
                  top: '-9999px',
                  opacity: 0,
                  zIndex: -1,
                  width: 0,
                  height: 0,
                  overflow: 'hidden',
                  pointerEvents: 'none',
                  margin: 0,
                  padding: 0,
                }}
              >
                <label htmlFor={`quote_s3_hp_website_${lang}`}>Leave this field empty if human</label>
                <input
                  id={`quote_s3_hp_website_${lang}`}
                  type="text"
                  name="hp_website"
                  tabIndex={-1}
                  autoComplete="off"
                  value={hpWebsite}
                  onChange={(e) => setHpWebsite(e.target.value)}
                />
                <label htmlFor={`quote_s3_hp_company_${lang}`}>Company Website</label>
                <input
                  id={`quote_s3_hp_company_${lang}`}
                  type="text"
                  name="hp_company"
                  tabIndex={-1}
                  autoComplete="off"
                  value={hpCompany}
                  onChange={(e) => setHpCompany(e.target.value)}
                />
              </div>
              {/* ============================================================ */}

              <div className="bg-gradient-to-br from-accent/5 via-white to-accent-gold/5 border border-accent/20 rounded-xl p-5 sm:p-6 space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-accent/15 pb-3">
                  <div>
                    <h3 className="text-sm font-bold text-accent uppercase tracking-wider">
                      {dict.step3Title}: <span className="text-accent-gold">{dict.lines[lineOfBusiness]}</span>
                    </h3>
                    <p className="text-xs text-text-secondary mt-0.5">
                      {dict.step3Subtitle}
                    </p>
                  </div>
                  <span className="self-start sm:self-auto text-[11px] font-semibold text-accent bg-accent/10 px-2.5 py-1 rounded-full border border-accent/20">
                    {dict.producerNeedBadge}
                  </span>
                </div>

                {/* Line Anchor: Home */}
                {lineOfBusiness === 'home' && (
                  <div className="space-y-3">
                    <div className="space-y-1.5">
                      <label htmlFor="propertyAddress" className="block text-xs font-bold text-accent uppercase">
                        {dict.homeAnchorTitle} <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        id="propertyAddress"
                        name="propertyAddress"
                        required
                        value={propertyAddress}
                        onChange={(e) => setPropertyAddress(e.target.value)}
                        placeholder={dict.homeAnchorPlaceholder}
                        className="w-full px-4 py-2.5 text-sm bg-white border border-border-subtle rounded-lg focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all"
                      />
                      <p className="text-xs text-text-secondary leading-normal flex items-start gap-1.5 pt-1">
                        <svg className="w-3.5 h-3.5 text-accent-gold shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                        </svg>
                        <span>{dict.homeAnchorDesc}</span>
                      </p>
                    </div>

                    <div className="mt-3 p-3 rounded-lg bg-white/80 border border-border-subtle flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                      <p className="text-xs text-text-secondary">
                        {dict.homeLongFormNotice}
                      </p>
                      <a
                        href={getHomeownersWizardUrl()}
                        className="text-xs font-bold text-accent hover:text-accent-gold transition-colors shrink-0 underline decoration-accent-gold underline-offset-2"
                      >
                        {dict.homeLongFormLink}
                      </a>
                    </div>
                  </div>
                )}

                {/* Line Anchor: Personal Auto */}
                {lineOfBusiness === 'auto' && (
                  <div className="space-y-1.5">
                    <label htmlFor="vehicleDetails" className="block text-xs font-bold text-accent uppercase">
                      {dict.autoAnchorTitle} <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="vehicleDetails"
                      name="vehicleDetails"
                      required
                      value={vehicleDetails}
                      onChange={(e) => setVehicleDetails(e.target.value)}
                      placeholder={dict.autoAnchorPlaceholder}
                      className="w-full px-4 py-2.5 text-sm bg-white border border-border-subtle rounded-lg focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all"
                    />
                    <p className="text-xs text-text-secondary leading-normal flex items-start gap-1.5 pt-1">
                      <svg className="w-3.5 h-3.5 text-accent-gold shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                      </svg>
                      <span>{dict.autoAnchorDesc}</span>
                    </p>
                  </div>
                )}

                {/* Line Anchor: Commercial Auto */}
                {lineOfBusiness === 'commercial-auto' && (
                  <div className="space-y-3">
                    <div className="space-y-1">
                      <label htmlFor="commBusinessName" className="block text-xs font-bold text-accent uppercase">
                        Business Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        id="commBusinessName"
                        name="commBusinessName"
                        required
                        value={commBusinessName}
                        onChange={(e) => setCommBusinessName(e.target.value)}
                        placeholder={dict.commBusinessPlaceholder}
                        className="w-full px-4 py-2.5 text-sm bg-white border border-border-subtle rounded-lg focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all"
                      />
                    </div>
                    <div className="space-y-1">
                      <label htmlFor="vehicleCount" className="block text-xs font-bold text-accent uppercase">
                        Number & Type of Vehicles <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        id="vehicleCount"
                        name="vehicleCount"
                        required
                        value={vehicleCount}
                        onChange={(e) => setVehicleCount(e.target.value)}
                        placeholder={dict.commVehicleCountPlaceholder}
                        className="w-full px-4 py-2.5 text-sm bg-white border border-border-subtle rounded-lg focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all"
                      />
                    </div>
                    <p className="text-xs text-text-secondary leading-normal flex items-start gap-1.5 pt-1">
                      <svg className="w-3.5 h-3.5 text-accent-gold shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                      </svg>
                      <span>{dict.commAutoAnchorDesc}</span>
                    </p>
                  </div>
                )}

                {/* Line Anchor: Umbrella Liability */}
                {lineOfBusiness === 'umbrella' && (
                  <div className="space-y-1.5">
                    <label htmlFor="underlyingCoverage" className="block text-xs font-bold text-accent uppercase">
                      {dict.umbrellaAnchorTitle} <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="underlyingCoverage"
                      name="underlyingCoverage"
                      required
                      value={underlyingCoverage}
                      onChange={(e) => setUnderlyingCoverage(e.target.value)}
                      placeholder={dict.umbrellaPlaceholder}
                      className="w-full px-4 py-2.5 text-sm bg-white border border-border-subtle rounded-lg focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all"
                    />
                    <p className="text-xs text-text-secondary leading-normal flex items-start gap-1.5 pt-1">
                      <svg className="w-3.5 h-3.5 text-accent-gold shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                      </svg>
                      <span>{dict.umbrellaAnchorDesc}</span>
                    </p>
                  </div>
                )}

                {/* Line Anchor: Commercial Business / GL */}
                {lineOfBusiness === 'business' && (
                  <div className="space-y-3">
                    <div className="space-y-1">
                      <label htmlFor="glBusinessName" className="block text-xs font-bold text-accent uppercase">
                        Business Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        id="glBusinessName"
                        name="glBusinessName"
                        required
                        value={glBusinessName}
                        onChange={(e) => setGlBusinessName(e.target.value)}
                        placeholder={dict.glBusinessPlaceholder}
                        className="w-full px-4 py-2.5 text-sm bg-white border border-border-subtle rounded-lg focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all"
                      />
                    </div>
                    <div className="space-y-1">
                      <label htmlFor="glIndustry" className="block text-xs font-bold text-accent uppercase">
                        Industry / Nature of Operations <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        id="glIndustry"
                        name="glIndustry"
                        required
                        value={glIndustry}
                        onChange={(e) => setGlIndustry(e.target.value)}
                        placeholder={dict.glIndustryPlaceholder}
                        className="w-full px-4 py-2.5 text-sm bg-white border border-border-subtle rounded-lg focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all"
                      />
                    </div>
                    <p className="text-xs text-text-secondary leading-normal flex items-start gap-1.5 pt-1">
                      <svg className="w-3.5 h-3.5 text-accent-gold shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                      </svg>
                      <span>{dict.glAnchorDesc}</span>
                    </p>
                  </div>
                )}
              </div>

              {/* Anti-Spam & Confidentiality Guarantee */}
              <div className="p-3.5 bg-emerald-50/90 border border-emerald-200 rounded-xl flex items-start sm:items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center shrink-0 text-emerald-700">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z" />
                  </svg>
                </div>
                <div className="text-xs text-emerald-950 leading-snug">
                  <strong className="font-bold block text-emerald-900">{dict.antiSpamTitle}</strong>
                  <span>{dict.antiSpamDesc}</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => {
                    setCurrentStep(2);
                    setErrorMessage('');
                  }}
                  className="w-1/3 py-4 px-4 text-xs font-bold uppercase tracking-wider text-accent border border-accent/20 hover:bg-bg-secondary rounded-xl transition-all text-center cursor-pointer"
                >
                  {dict.btnBack}
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-2/3 py-4 px-6 text-sm sm:text-base font-bold uppercase tracking-wider text-white bg-accent hover:bg-accent/90 active:scale-[0.99] rounded-xl transition-all shadow-md hover:shadow-lg disabled:opacity-60 flex items-center justify-center gap-2 cursor-pointer"
                >
                  {isSubmitting ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      <span>{dict.submitting}</span>
                    </>
                  ) : (
                    <span>{dict.submitBtn}</span>
                  )}
                </button>
              </div>

              {/* Google reCAPTCHA Notice */}
              <RecaptchaLegalNotice lang={lang} className="pt-1 text-center" />
            </form>
          )}
        </div>
      )}
    </div>
  );
}
