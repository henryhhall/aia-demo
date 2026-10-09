import { useState } from 'react';
import { getRecaptchaToken } from '../lib/recaptcha';
import RecaptchaLegalNotice from './RecaptchaLegalNotice';

export type LineOfBusiness = 'home' | 'auto' | 'commercial-auto' | 'umbrella' | 'business';
export type ReachMethod = 'call' | 'text' | 'email';
export type ReachTime = 'anytime' | 'morning' | 'afternoon' | 'evening';

interface QuoteFormProps {
  lang?: 'en' | 'es' | 'pt' | 'tr';
  initialLine?: LineOfBusiness;
}

export default function QuoteForm({ lang = 'en', initialLine = 'home' }: QuoteFormProps) {
  const [lineOfBusiness, setLineOfBusiness] = useState<LineOfBusiness>(initialLine);

  // Contact Information
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [reachMethod, setReachMethod] = useState<ReachMethod>('call');
  const [reachTime, setReachTime] = useState<ReachTime>('anytime');
  const [smsConsent, setSmsConsent] = useState(false);
  const [preferredOffice, setPreferredOffice] = useState('Danbury');

  // Coverage Details Fields
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

  // State handling
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [confirmationCode, setConfirmationCode] = useState('');
  const [submittedData, setSubmittedData] = useState<{
    name: string;
    lineName: string;
    office: string;
    reachMethod: string;
  } | null>(null);

  const dict = {
    en: {
      headline: 'Request an Insurance Quote',
      subheadline: 'Select your insurance line, provide your contact details, and share a few specifics so our agents can find your best rate.',
      formBadge: 'Free Rate Review',
      formBadgeSub: 'Fast & Confidential',
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
        'commercial-auto': 'Work Vans & Commercial Fleets',
        umbrella: 'Excess Liability ($1M - $10M)',
        business: 'General Liability & Property',
      },
      contactSectionTitle: 'Contact Information',
      contactSectionDesc: 'We respect your privacy and will never share or sell your information.',
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
      preferredOffice: 'Assigned Local Branch',
      officeDanbury: 'Danbury Corporate HQ (50 Newtown Rd)',
      officeWatertown: 'Watertown Branch (51 Depot St)',
      officeBridgeport: 'Bridgeport Branch (2465 Main St)',
      coverageSectionTitle: 'Coverage Details',
      coverageSectionDesc: 'A few details about your property, vehicle, or business to help us prepare your quote.',
      producerNeedBadge: 'Why We Ask This',
      // Detail Fields
      homeAnchorTitle: 'Property Address',
      homeAnchorDesc: 'Allows instant lookup of tax assessor / GIS records (square footage, year built, roof type, distance to hydrant).',
      homeAnchorPlaceholder: 'E.g. 50 Newtown Road, Danbury, CT 06810',
      homeLongFormNotice: 'Looking for our comprehensive 4-step rating wizard with itemized building specs and instant replacement calculations?',
      homeLongFormLink: 'Launch Full Homeowners Wizard →',
      autoAnchorTitle: 'Current Vehicles (Year / Make / Model or VIN)',
      autoAnchorDesc: 'Lets the producer understand risk tier, vehicle mix, and ADAS safety equipment immediately.',
      autoAnchorPlaceholder: 'E.g. 2022 Subaru Outback & 2019 Toyota RAV4 (or VIN if handy)',
      commAutoAnchorTitle: 'Business Name & Number of Commercial Vehicles',
      commAutoAnchorDesc: 'Identifies whether this is a 2-van trade contractor or a 15-truck fleet requiring DOT filings.',
      commBusinessPlaceholder: 'E.g. Danbury Heating & Air LLC',
      commVehicleCountPlaceholder: 'E.g. 3 service vans, 1 dump truck',
      umbrellaAnchorTitle: 'Underlying Coverage Status & Liability Limits',
      umbrellaAnchorDesc: 'Umbrella cannot be written in a vacuum; it requires underlying auto/home liability limits (e.g. $250k/$500k auto, $300k home).',
      umbrellaPlaceholder: 'E.g. Auto & Home currently with Travelers ($250k/$500k limits), or policies elsewhere',
      glAnchorTitle: 'Business Name & Nature of Business / Industry',
      glAnchorDesc: 'Determines NAICS/SIC category, risk profile, and carrier appetite before the first conversation.',
      glBusinessPlaceholder: 'E.g. Northeast Electrical Contractors LLC',
      glIndustryPlaceholder: 'E.g. Commercial & residential electrical wiring, licensed CT contractor',
      submitBtn: 'Request My Review & Quote',
      submitting: 'Preparing Your Quote Review...',
      validationError: 'Please complete the required contact and coverage fields.',
      smsError: 'Please check the SMS consent checkbox to allow text message updates.',
      successTitle: 'Quote Review Request Registered!',
      successDesc: (name: string, line: string, office: string, method: string) =>
        `Thank you, ${name}. Your ${line} review has been assigned to our ${office} branch. A licensed CT producer is reviewing assessor and carrier data and will reach out via ${method}.`,
      refLabel: 'Confirmation Reference',
      anotherBtn: 'Request Another Quote',
    },
    es: {
      headline: 'Solicitar una Cotización de Seguro',
      subheadline: 'Seleccione su línea de seguro, proporcione sus datos de contacto y comparta algunos detalles para que nuestros agentes encuentren su mejor tarifa.',
      formBadge: 'Comparación Gratuita',
      formBadgeSub: 'Rápido y Confidencial',
      selectLine: 'Seleccione Línea de Seguro',
      lines: {
        home: 'Hogar',
        auto: 'Auto',
        'commercial-auto': 'Auto Comercial',
        umbrella: 'Paraguas',
        business: 'Negocio / GL',
      },
      linesSub: {
        home: 'Propietarios e Inmuebles',
        auto: 'Auto Personal y RV',
        'commercial-auto': 'Furgonetas y Flotas Comerciales',
        umbrella: 'Exceso de Responsabilidad ($1M - $10M)',
        business: 'Responsabilidad General y Comercio',
      },
      contactSectionTitle: 'Información de Contacto',
      contactSectionDesc: 'Respetamos su privacidad y nunca compartiremos ni venderemos su información.',
      fullName: 'Nombre Completo',
      fullNamePlaceholder: 'Ej. María Rodríguez',
      email: 'Correo Electrónico',
      emailPlaceholder: 'Ej. maria@example.com',
      phone: 'Número de Teléfono',
      phonePlaceholder: 'Ej. (203) 555-0199',
      reachPreference: 'Mejor Momento / Método de Contacto',
      methodCall: 'Llamada Telefónica',
      methodText: 'Mensaje de Texto (SMS)',
      methodEmail: 'Solo Correo Electrónico',
      timeAnytime: 'En cualquier momento laboral',
      timeMorning: 'Mañana (8:30 AM - 12:00 PM)',
      timeAfternoon: 'Tarde (12:00 PM - 5:00 PM)',
      timeEvening: 'Tarde/Noche (Llamada prioritaria)',
      smsConsentLabel: 'Acepto recibir mensajes de texto SMS sobre esta cotización de Associated Insurance Agency al número provisto. Pueden aplicar tarifas. Responda STOP para cancelar.',
      preferredOffice: 'Sucursal Local Asignada',
      officeDanbury: 'Sede Central Danbury (50 Newtown Rd)',
      officeWatertown: 'Sucursal Watertown (51 Depot St)',
      officeBridgeport: 'Sucursal Bridgeport (2465 Main St)',
      coverageSectionTitle: 'Detalles de la Cobertura',
      coverageSectionDesc: 'Algunos detalles sobre su propiedad, vehículo o negocio para ayudarnos a preparar su cotización.',
      producerNeedBadge: 'Por Qué Solicitamos Esto',
      homeAnchorTitle: 'Dirección de la Propiedad',
      homeAnchorDesc: 'Permite la búsqueda inmediata en registros de catastro/GIS (metros cuadrados, año de construcción, tipo de techo, hidrantes).',
      homeAnchorPlaceholder: 'Ej. 50 Newtown Road, Danbury, CT 06810',
      homeLongFormNotice: '¿Prefiere nuestro cotizador detallado de 4 pasos con especificaciones de construcción y costos de reemplazo?',
      homeLongFormLink: 'Abrir Cotizador Completo de Hogar →',
      autoAnchorTitle: 'Vehículos Actuales (Año / Marca / Modelo o VIN)',
      autoAnchorDesc: 'Permite al agente determinar el nivel de riesgo, créditos de seguridad y mezcla de vehículos de inmediato.',
      autoAnchorPlaceholder: 'Ej. 2022 Subaru Outback y 2019 Toyota RAV4 (o VIN si lo tiene)',
      commAutoAnchorTitle: 'Nombre del Negocio y Número de Vehículos',
      commAutoAnchorDesc: 'Identifica si es un contratista de 2 furgonetas o una flota de 15 camiones que requiere registros DOT.',
      commBusinessPlaceholder: 'Ej. Danbury Heating & Air LLC',
      commVehicleCountPlaceholder: 'Ej. 3 furgonetas de servicio, 1 camión de carga',
      umbrellaAnchorTitle: 'Pólizas Actuales y Límites de Responsabilidad',
      umbrellaAnchorDesc: 'El paraguas requiere límites subyacentes de auto/hogar (ej. $250k/$500k auto, $300k hogar).',
      umbrellaPlaceholder: 'Ej. Auto y Hogar con Travelers ($250k/$500k), o pólizas en otra aseguradora',
      glAnchorTitle: 'Nombre del Negocio y Actividad / Industria',
      glAnchorDesc: 'Determina la categoría NAICS/SIC, perfil de riesgo y apetito de las aseguradoras antes de la primera llamada.',
      glBusinessPlaceholder: 'Ej. Northeast Electrical Contractors LLC',
      glIndustryPlaceholder: 'Ej. Contratista electricista comercial y residencial con licencia de CT',
      submitBtn: 'Solicitar Mi Revisión y Cotización',
      submitting: 'Preparando Su Revisión...',
      validationError: 'Por favor complete los campos obligatorios de contacto y cobertura.',
      smsError: 'Por favor marque la casilla de consentimiento de SMS para permitir mensajes.',
      successTitle: '¡Solicitud de Cotización Registrada!',
      successDesc: (name: string, line: string, office: string, method: string) =>
        `Gracias, ${name}. Su solicitud para ${line} fue asignada a nuestra sucursal de ${office}. Un agente revisará los registros y se comunicará vía ${method}.`,
      refLabel: 'Código de Referencia',
      anotherBtn: 'Solicitar Otra Cotización',
    },
    pt: {
      headline: 'Solicitar uma Cotação de Seguro',
      subheadline: 'Selecione sua linha de seguro, forneça seus dados de contato e compartilhe alguns detalhes para que nossos corretores encontrem sua melhor tarifa.',
      formBadge: 'Cotação Gratuita',
      formBadgeSub: 'Rápido e Confidencial',
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
      contactSectionTitle: 'Informações de Contato',
      contactSectionDesc: 'Respeitamos sua privacidade e nunca compartilharemos ou venderemos suas informações.',
      fullName: 'Nome Completo',
      fullNamePlaceholder: 'Ex: Carlos Silva',
      email: 'Endereço de E-mail',
      emailPlaceholder: 'Ex: carlos@example.com',
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
      preferredOffice: 'Escritório Local Designado',
      officeDanbury: 'Sede Danbury (50 Newtown Rd)',
      officeWatertown: 'Filial Watertown (51 Depot St)',
      officeBridgeport: 'Filial Bridgeport (2465 Main St)',
      coverageSectionTitle: 'Detalhes da Cobertura',
      coverageSectionDesc: 'Alguns detalhes sobre seu imóvel, veículo ou empresa para nos ajudar a preparar sua cotação.',
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
      umbrellaPlaceholder: 'Ex: Auto e Residência na Travelers ($250k/$500k), ou apólices em outra seguradora',
      glAnchorTitle: 'Nome da Empresa e Ramo de Atividade',
      glAnchorDesc: 'Determina a classificação NAICS/SIC e apetite das seguradoras antes da primeira conversa.',
      glBusinessPlaceholder: 'Ex: Northeast Electrical Contractors LLC',
      glIndustryPlaceholder: 'Ex: Prestador de serviços elétricos comerciais e residenciais com licença em CT',
      submitBtn: 'Solicitar Minha Revisão e Cotação',
      submitting: 'Preparando Sua Revisão...',
      validationError: 'Por favor, preencha os campos obrigatórios de contato e cobertura.',
      smsError: 'Por favor, marque a caixa de consentimento de SMS para permitir mensagens de texto.',
      successTitle: 'Solicitação de Cotação Recebida!',
      successDesc: (name: string, line: string, office: string, method: string) =>
        `Obrigado, ${name}. Sua solicitação de ${line} foi encaminhada para a filial de ${office}. Um corretor licenciado entrará em contato via ${method}.`,
      refLabel: 'Código de Confirmação',
      anotherBtn: 'Solicitar Outra Cotação',
    },
    tr: {
      headline: 'Sigorta Teklifi İsteyin',
      subheadline: 'Sigorta branşınızı seçin, iletişim bilgilerinizi girin ve temsilcilerimizin en iyi oranı bulması için birkaç detayı paylaşın.',
      formBadge: 'Ücretsiz Fiyat İncelemesi',
      formBadgeSub: 'Hızlı ve Gizli',
      selectLine: 'Sigorta Branşını Seçin',
      lines: {
        home: 'Konut',
        auto: 'Araç',
        'commercial-auto': 'Ticari Araç',
        umbrella: 'Şemsiye',
        business: 'İşyeri / GL',
      },
      linesSub: {
        home: 'Ev Sahibi ve Mülk Sigortası',
        auto: 'Bireysel Otomobil ve Karavan',
        'commercial-auto': 'Hizmet Araçları ve Filolar',
        umbrella: 'Ek Sorumluluk Sigortası ($1M - $10M)',
        business: 'Genel Sorumluluk ve Ticari Mülk',
      },
      contactSectionTitle: 'İletişim Bilgileri',
      contactSectionDesc: 'Gizliliğinize saygı duyuyoruz ve bilgilerinizi asla paylaşmıyor veya satmıyoruz.',
      fullName: 'Ad Soyad',
      fullNamePlaceholder: 'Örn. Ahmet Yılmaz',
      email: 'E-posta Adresi',
      emailPlaceholder: 'Örn. ahmet@example.com',
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
      preferredOffice: 'Atanan Yerel Şube',
      officeDanbury: 'Danbury Genel Merkez (50 Newtown Rd)',
      officeWatertown: 'Watertown Şubesi (51 Depot St)',
      officeBridgeport: 'Bridgeport Şubesi (2465 Main St)',
      coverageSectionTitle: 'Teminat Detayları',
      coverageSectionDesc: 'Teklifinizi hazırlamamıza yardımcı olacak mülkünüz, aracınız veya işinizle ilgili birkaç ayrıntı.',
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
      umbrellaAnchorDesc: 'Şemsiye sigortası bağımsız yapılamaz; mevcut araç/konut sorumluluk limitlerini gerektirir.',
      umbrellaPlaceholder: 'Örn. Travelers poliçesinde araç ve konut ($250k/$500k limit)',
      glAnchorTitle: 'Firma Adı ve Faaliyet Alanı / Sektör',
      glAnchorDesc: 'İlk görüşmeden önce NAICS/SIC kodunu ve sigorta şirketlerinin kabul kriterlerini belirler.',
      glBusinessPlaceholder: 'Örn. Northeast Electrical Contractors LLC',
      glIndustryPlaceholder: 'Örn. Ticari ve konut elektrik tesisatı, CT lisanslı müteahhit',
      submitBtn: 'Teklif ve İnceleme Talebini Gönder',
      submitting: 'İnceleme Hazırlanıyor...',
      validationError: 'Lütfen gerekli iletişim ve teminat alanlarını doldurun.',
      smsError: 'Kısa mesajla bilgilendirme için lütfen SMS onay kutusunu işaretleyin.',
      successTitle: 'Teklif Talebiniz Alındı!',
      successDesc: (name: string, line: string, office: string, method: string) =>
        `Teşekkürler, ${name}. ${line} talebiniz ${office} şubemize atandı. Lisanslı temsilcimiz detayları inceleyip sizinle ${method} ile iletişime geçecektir.`,
      refLabel: 'Onay Kodu',
      anotherBtn: 'Başka Bir Teklif Başlat',
    },
  }[lang];

  // Helper to get localized homeowners URL
  const getHomeownersWizardUrl = () => {
    if (lang === 'es') return '/es/quote/homeowners';
    if (lang === 'pt') return '/pt/quote/homeowners';
    if (lang === 'tr') return '/tr/quote/homeowners';
    return '/quote/homeowners';
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

  const validateForm = (): boolean => {
    if (!fullName.trim() || !email.trim() || !phone.trim()) {
      setErrorMessage(dict.validationError);
      return false;
    }

    if (reachMethod === 'text' && !smsConsent) {
      setErrorMessage(dict.smsError);
      return false;
    }

    // Validate active anchor
    if (lineOfBusiness === 'home' && !propertyAddress.trim()) {
      setErrorMessage(dict.validationError);
      return false;
    }
    if (lineOfBusiness === 'auto' && !vehicleDetails.trim()) {
      setErrorMessage(dict.validationError);
      return false;
    }
    if (
      lineOfBusiness === 'commercial-auto' &&
      (!commBusinessName.trim() || !vehicleCount.trim())
    ) {
      setErrorMessage(dict.validationError);
      return false;
    }
    if (lineOfBusiness === 'umbrella' && !underlyingCoverage.trim()) {
      setErrorMessage(dict.validationError);
      return false;
    }
    if (
      lineOfBusiness === 'business' &&
      (!glBusinessName.trim() || !glIndustry.trim())
    ) {
      setErrorMessage(dict.validationError);
      return false;
    }

    setErrorMessage('');
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
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
        source: 'Unified_Foundation_Form',
        recaptchaToken,
        // Honeypot fields
        hp_website: hpWebsite,
        hp_company: hpCompany,
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
        setErrorMessage(resData.error || dict.validationError);
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
  };

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
              <span>Next Producer Steps:</span>
            </div>
            <p className="text-xs text-text-secondary leading-normal">
              Our licensed CT producers are now pulling assessor data, GIS ratings, or industry appetites
              to prepare a competitive comparison across Travelers, Safeco, The Hartford, and regional carriers.
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
        /* Single Form: Contact Info & Coverage Details */
        <form
          onSubmit={handleSubmit}
          className="bg-white border border-border-subtle shadow-xl rounded-2xl p-6 sm:p-10 transition-all space-y-8"
          data-mcp-tool="submit_quote_request"
          data-mcp-description="Submit an insurance quote request to Associated Insurance Agency"
        >
          {/* Honeypot traps for bot protection */}
          <div className="hidden" aria-hidden="true">
            <input
              type="text"
              name="hp_website"
              tabIndex={-1}
              autoComplete="off"
              value={hpWebsite}
              onChange={(e) => setHpWebsite(e.target.value)}
            />
            <input
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
              <span className="text-xs font-bold uppercase tracking-wider text-accent-gold">
                {dict.formBadge}
              </span>
              <span className="text-[11px] font-semibold text-text-muted bg-bg-secondary px-2.5 py-1 rounded-full border border-border-subtle">
                {dict.formBadgeSub}
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-accent tracking-tight">
              {dict.headline}
            </h2>
            <p className="text-xs sm:text-sm text-text-secondary mt-1 leading-relaxed">
              {dict.subheadline}
            </p>
          </div>

          {/* 1. Line of Business Selector */}
          <div>
            <label className="block text-xs font-bold text-accent uppercase tracking-wider mb-3">
              1. {dict.selectLine}
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

          {/* 2. Contact Information */}
          <div className="bg-bg-secondary/40 border border-border-subtle rounded-xl p-5 sm:p-6 space-y-5">
            <div className="border-b border-border-subtle/70 pb-3">
              <h3 className="text-sm font-bold text-accent uppercase tracking-wider">
                2. {dict.contactSectionTitle}
              </h3>
              <p className="text-xs text-text-muted mt-0.5">
                {dict.contactSectionDesc}
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
              <div className="space-y-1.5">
                <label htmlFor="reachMethod" className="block text-xs font-semibold text-text-secondary uppercase">
                  {dict.reachPreference}
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <select
                    id="reachMethod"
                    name="reachMethod"
                    value={reachMethod}
                    onChange={(e) => setReachMethod(e.target.value as ReachMethod)}
                    className="w-full px-3 py-2 text-xs bg-white border border-border-subtle rounded-lg focus:outline-none focus:border-accent transition-all"
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
                    className="w-full px-3 py-2 text-xs bg-white border border-border-subtle rounded-lg focus:outline-none focus:border-accent transition-all"
                  >
                    <option value="anytime">{dict.timeAnytime}</option>
                    <option value="morning">{dict.timeMorning}</option>
                    <option value="afternoon">{dict.timeAfternoon}</option>
                    <option value="evening">{dict.timeEvening}</option>
                  </select>
                </div>
              </div>

              {/* Local Office Routing */}
              <div className="space-y-1.5">
                <label htmlFor="preferredOffice" className="block text-xs font-semibold text-text-secondary uppercase">
                  {dict.preferredOffice}
                </label>
                <select
                  id="preferredOffice"
                  name="preferredOffice"
                  value={preferredOffice}
                  onChange={(e) => setPreferredOffice(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-white border border-border-subtle rounded-lg focus:outline-none focus:border-accent transition-all"
                >
                  <option value="Danbury">{dict.officeDanbury}</option>
                  <option value="Watertown">{dict.officeWatertown}</option>
                  <option value="Bridgeport">{dict.officeBridgeport}</option>
                </select>
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
          </div>

          {/* 3. Coverage Details */}
          <div className="bg-gradient-to-br from-accent/5 via-white to-accent-gold/5 border border-accent/20 rounded-xl p-5 sm:p-6 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-accent/15 pb-3">
              <div>
                <h3 className="text-sm font-bold text-accent uppercase tracking-wider">
                  3. {dict.coverageSectionTitle}: <span className="text-accent-gold">{dict.lines[lineOfBusiness]}</span>
                </h3>
                <p className="text-xs text-text-secondary mt-0.5">
                  {dict.coverageSectionDesc}
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

                {/* Option to switch to the long 4-step wizard if client prefers */}
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
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
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
                </div>
                <p className="text-xs text-text-secondary leading-normal flex items-start gap-1.5 pt-1">
                  <svg className="w-3.5 h-3.5 text-accent-gold shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                  </svg>
                  <span>{dict.commAutoAnchorDesc}</span>
                </p>
              </div>
            )}

            {/* Line Anchor: Umbrella */}
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

            {/* Line Anchor: Business / General Liability */}
            {lineOfBusiness === 'business' && (
              <div className="space-y-3">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
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

          {/* Validation Error Banner */}
          {errorMessage && (
            <div className="p-3.5 bg-red-50 border border-red-200 rounded-xl flex items-center gap-2.5 text-xs text-red-700">
              <svg className="w-4 h-4 text-red-500 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>{errorMessage}</span>
            </div>
          )}

          {/* Action Button */}
          <div className="pt-2">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-4 px-6 text-sm sm:text-base font-bold uppercase tracking-wider text-white bg-accent hover:bg-accent/90 rounded-xl transition-all shadow-md hover:shadow-lg disabled:opacity-60 flex items-center justify-center gap-2 cursor-pointer"
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
  );
}
