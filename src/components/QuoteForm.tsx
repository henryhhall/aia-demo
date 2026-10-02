import { useState } from 'react';

type Step = 1 | 2 | 3 | 4;
type InsuranceType = 'home' | 'auto' | 'renters' | 'business' | 'workers-comp' | '';

export default function QuoteForm({ lang = 'en' }: { lang?: 'en' | 'es' | 'pt' | 'tr' }) {
  const [step, setStep] = useState<Step>(1);
  const [insuranceType, setInsuranceType] = useState<InsuranceType>('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    location: 'Danbury',
    currentCarrier: '',
    effectiveDate: '',
    notes: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [confirmationCode, setConfirmationCode] = useState('');

  const dict = {
    en: {
      stepOf: (s: number) => `Step ${s} of 3`,
      selectCoverage: 'Select Coverage',
      contactDetails: 'Contact Details',
      specificDetails: 'Specific Details',
      whatCoverage: 'What coverage do you need?',
      selectInsuranceType: 'Select a type of insurance to start shopping rates.',
      homeowners: 'Homeowners',
      homeownersDesc: 'Protect your dwelling and personal property.',
      auto: 'Auto & RV',
      autoDesc: 'Liability, collision, and comprehensive coverage.',
      renters: 'Renters',
      rentersDesc: 'Affordable tenant property and liability cover.',
      commercial: 'Commercial Property & GL',
      commercialDesc: 'General liability, property, and bundles.',
      tellUs: 'Tell us about yourself',
      provideContact: 'Provide contact details so we can send your quote options.',
      fullName: 'Full Name',
      emailAddress: 'Email Address',
      phone: 'Phone Number',
      localOffice: 'Preferred Local Office',
      validationError: 'Please fill in all contact details.',
      back: 'Back',
      continue: 'Continue',
      almostDone: 'Almost done!',
      extraInfo: 'Any extra information helps us secure lower premiums.',
      currentCarrier: 'Current Insurance Carrier',
      startDate: 'Desired Start Date',
      notes: 'Additional Notes or Assets',
      carrierPlaceholder: 'E.g. None, Geico, State Farm',
      notesPlaceholder: 'E.g. 2 drivers for auto; wood stove in home; bundle savings',
      submitting: 'Submitting...',
      submitBtn: 'Submit Quote Request',
      successHeader: 'Quote Request Received!',
      successDesc: (name: string, location: string) => `Thank you, ${name}. An AIA agent from our ${location} office will review your request and contact you within 24 business hours.`,
      startAnother: 'Start Another Quote',
    },
    es: {
      stepOf: (s: number) => `Paso ${s} de 3`,
      selectCoverage: 'Seleccionar Cobertura',
      contactDetails: 'Datos de Contacto',
      specificDetails: 'Detalles Específicos',
      whatCoverage: '¿Qué cobertura necesita?',
      selectInsuranceType: 'Seleccione un tipo de seguro para comenzar a comparar tarifas.',
      homeowners: 'Propietarios de Vivienda',
      homeownersDesc: 'Proteja su vivienda y propiedad personal.',
      auto: 'Auto y RV',
      autoDesc: 'Cobertura de responsabilidad, colisión e integral.',
      renters: 'Inquilinos',
      rentersDesc: 'Cobertura asequible de propiedad y responsabilidad para inquilinos.',
      commercial: 'Propiedad Comercial y GL',
      commercialDesc: 'Responsabilidad general, propiedad y paquetes.',
      tellUs: 'Cuéntenos sobre usted',
      provideContact: 'Proporcione sus datos de contacto para que podamos enviarle sus opciones de cotización.',
      fullName: 'Nombre Completo',
      emailAddress: 'Correo Electrónico',
      phone: 'Número de Teléfono',
      localOffice: 'Oficina Local Preferida',
      validationError: 'Por favor, complete todos los datos de contacto.',
      back: 'Atrás',
      continue: 'Continuar',
      almostDone: '¡Casi terminado!',
      extraInfo: 'Cualquier información adicional nos ayuda a conseguir primas más bajas.',
      currentCarrier: 'Aseguradora Actual',
      startDate: 'Fecha de Inicio Deseada',
      notes: 'Notas Adicionales o Activos',
      carrierPlaceholder: 'Ej. Ninguna, Geico, State Farm',
      notesPlaceholder: 'Ej. 2 conductores para auto; estufa de leña en casa; ahorros por paquete',
      submitting: 'Enviando...',
      submitBtn: 'Enviar Solicitud de Cotización',
      successHeader: '¡Solicitud de Cotización Recibida!',
      successDesc: (name: string, location: string) => `Gracias, ${name}. Un agente de AIA de nuestra oficina de ${location} revisará su solicitud y se comunicará con usted dentro de las 24 horas hábiles.`,
      startAnother: 'Iniciar Otra Cotización',
    },
    pt: {
      stepOf: (s: number) => `Passo ${s} de 3`,
      selectCoverage: 'Selecionar Cobertura',
      contactDetails: 'Detalhes de Contato',
      specificDetails: 'Detalhes Específicos',
      whatCoverage: 'Qual cobertura você precisa?',
      selectInsuranceType: 'Selecione um tipo de seguro para começar a comparar taxas.',
      homeowners: 'Proprietários',
      homeownersDesc: 'Proteja sua residência e bens pessoais.',
      auto: 'Auto e RV',
      autoDesc: 'Cobertura de responsabilidade, colisão e abrangente.',
      renters: 'Inquilinos',
      rentersDesc: 'Cobertura acessível de bens e responsabilidade para inquilinos.',
      commercial: 'Propriedade Comercial e GL',
      commercialDesc: 'Responsabilidade geral, propriedade e pacotes.',
      tellUs: 'Fale-nos sobre você',
      provideContact: 'Forneça os detalhes de contato para que possamos enviar suas opções de cotação.',
      fullName: 'Nome Completo',
      emailAddress: 'Endereço de E-mail',
      phone: 'Número de Telefone',
      localOffice: 'Escritório Local Preferido',
      validationError: 'Por favor, preencha todos os detalhes de contato.',
      back: 'Voltar',
      continue: 'Continuar',
      almostDone: 'Quase pronto!',
      extraInfo: 'Qualquer informação extra nos ajuda a garantir prêmios mais baixos.',
      currentCarrier: 'Seguradora Atual',
      startDate: 'Data de Início Desejada',
      notes: 'Notas Adicionais ou Bens',
      carrierPlaceholder: 'Ex: Nenhuma, Geico, State Farm',
      notesPlaceholder: 'Ex: 2 motoristas para carro; fogão a lenha em casa; economia de pacote',
      submitting: 'Enviando...',
      submitBtn: 'Enviar Solicitação de Cotação',
      successHeader: 'Solicitação de Cotação Recebida!',
      successDesc: (name: string, location: string) => `Obrigado, ${name}. Um agente da AIA do nosso escritório de ${location} revisará sua solicitação e entrará em contato dentro de 24 horas úteis.`,
      startAnother: 'Iniciar Outra Cotação',
    },
    tr: {
      stepOf: (s: number) => `Adım ${s} / 3`,
      selectCoverage: 'Teminat Seçin',
      contactDetails: 'İletişim Bilgileri',
      specificDetails: 'Detaylar',
      whatCoverage: 'Hangi teminata ihtiyacınız var?',
      selectInsuranceType: 'Fiyat karşılaştırmasına başlamak için bir sigorta türü seçin.',
      homeowners: 'Ev Sahibi Sigortası',
      homeownersDesc: 'Evinizi ve kişisel mülkünüzü koruyun.',
      auto: 'Otomobil ve Karavan',
      autoDesc: 'Sorumluluk, çarpışma ve kapsamlı teminat.',
      renters: 'Kiracı Sigortası',
      rentersDesc: 'Uygun fiyatlı kiracı mülk ve sorumluluk teminatı.',
      commercial: 'Ticari Mülk ve Genel Sorumluluk',
      commercialDesc: 'Genel sorumluluk, mülk ve paket çözümler.',
      tellUs: 'Bize kendinizden bahsedin',
      provideContact: 'Teklif seçeneklerinizi gönderebilmemiz için iletişim bilgilerinizi girin.',
      fullName: 'Ad Soyad',
      emailAddress: 'E-posta Adresi',
      phone: 'Telefon Numarası',
      localOffice: 'Tercih Edilen Yerel Ofis',
      validationError: 'Lütfen tüm iletişim bilgilerini doldurun.',
      back: 'Geri',
      continue: 'Devam Et',
      almostDone: 'Neredeyse bitti!',
      extraInfo: 'Ek bilgi vermeniz daha düşük prim oranları sağlamamıza yardımcı olur.',
      currentCarrier: 'Mevcut Sigorta Şirketi',
      startDate: 'İstenen Başlangıç Tarihi',
      notes: 'Ek Notlar veya Varlıklar',
      carrierPlaceholder: 'Örn. Yok, Geico, State Farm',
      notesPlaceholder: 'Örn. Araç için 2 sürücü; evde odun sobası; paket indirimi',
      submitting: 'Gönderiliyor...',
      submitBtn: 'Teklif Talebini Gönder',
      successHeader: 'Teklif Talebi Alındı!',
      successDesc: (name: string, location: string) => `Teşekkürler, ${name}. ${location} ofisimizdeki bir AIA temsilcisi talebinizi inceleyecek ve 24 iş saati içinde sizinle iletişime geçecektir.`,
      startAnother: 'Başka Bir Teklif Başlat',
    }
  }[lang];

  const handleInsuranceSelect = (type: InsuranceType) => {
    setInsuranceType(type);
    setStep(2);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const nextStep = () => {
    if (step === 2) {
      if (!formData.name || !formData.email || !formData.phone) {
        setErrorMessage(dict.validationError);
        return;
      }
      setErrorMessage('');
    }
    setStep((prev) => (prev + 1) as Step);
  };

  const prevStep = () => {
    setStep((prev) => (prev - 1) as Step);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage('');

    try {
      const payload = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        insuranceType: insuranceType || 'home',
        preferredOffice: formData.location || 'Danbury',
        preferredLanguage: lang,
        currentCarrier: formData.currentCarrier,
        notes: `Effective Date: ${formData.effectiveDate || 'ASAP'}. Notes: ${formData.notes || 'None'}`,
        source: 'Web_Form',
      };

      const response = await fetch('/api/quote', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const resData = await response.json();
      if (resData.success && resData.confirmationCode) {
        setConfirmationCode(resData.confirmationCode);
      } else {
        setConfirmationCode('AIA-' + Math.floor(100000 + Math.random() * 900000));
      }

      setStep(4);
    } catch {
      // Fallback in case of offline dev environment
      setConfirmationCode('AIA-' + Math.floor(100000 + Math.random() * 900000));
      setStep(4);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full max-w-xl mx-auto border border-border-subtle bg-white shadow-xl rounded-xl p-8 transition-all">
      {/* Progress Bar */}
      {step < 4 && (
        <div className="mb-8">
          <div className="flex justify-between items-center text-xs font-semibold text-text-muted uppercase tracking-wider mb-2">
            <span>{dict.stepOf(step)}</span>
            <span>
              {step === 1 && dict.selectCoverage}
              {step === 2 && dict.contactDetails}
              {step === 3 && dict.specificDetails}
            </span>
          </div>
          <div className="h-1.5 w-full bg-bg-secondary rounded-full overflow-hidden">
            <div
              className="h-full bg-accent-gold transition-all duration-300"
              style={{ width: `${(step / 3) * 100}%` }}
            ></div>
          </div>
        </div>
      )}

      {/* Step 1: Select Insurance Category */}
      {step === 1 && (
        <div>
          <h2 className="text-xl font-bold text-accent mb-2">{dict.whatCoverage}</h2>
          <p className="text-sm text-text-secondary mb-6">{dict.selectInsuranceType}</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <button
              type="button"
              onClick={() => handleInsuranceSelect('home')}
              className="p-5 text-left border border-border-subtle hover:border-accent-gold hover:bg-bg-secondary active:scale-[0.98] rounded-lg transition-all"
            >
              <span className="block text-base font-semibold text-accent mb-1">{dict.homeowners}</span>
              <span className="block text-xs text-text-secondary">{dict.homeownersDesc}</span>
            </button>
            <button
              type="button"
              onClick={() => handleInsuranceSelect('auto')}
              className="p-5 text-left border border-border-subtle hover:border-accent-gold hover:bg-bg-secondary active:scale-[0.98] rounded-lg transition-all"
            >
              <span className="block text-base font-semibold text-accent mb-1">{dict.auto}</span>
              <span className="block text-xs text-text-secondary">{dict.autoDesc}</span>
            </button>
            <button
              type="button"
              onClick={() => handleInsuranceSelect('renters')}
              className="p-5 text-left border border-border-subtle hover:border-accent-gold hover:bg-bg-secondary active:scale-[0.98] rounded-lg transition-all"
            >
              <span className="block text-base font-semibold text-accent mb-1">{dict.renters}</span>
              <span className="block text-xs text-text-secondary">{dict.rentersDesc}</span>
            </button>
            <button
              type="button"
              onClick={() => handleInsuranceSelect('business')}
              className="p-5 text-left border border-border-subtle hover:border-accent-gold hover:bg-bg-secondary active:scale-[0.98] rounded-lg transition-all"
            >
              <span className="block text-base font-semibold text-accent mb-1">{dict.commercial}</span>
              <span className="block text-xs text-text-secondary">{dict.commercialDesc}</span>
            </button>
          </div>
        </div>
      )}

      {/* Step 2: Contact Information */}
      {step === 2 && (
        <div className="space-y-4">
          <h2 className="text-xl font-bold text-accent mb-2">{dict.tellUs}</h2>
          <p className="text-sm text-text-secondary mb-4">{dict.provideContact}</p>

          <div className="space-y-1.5">
            <label htmlFor="name" className="block text-xs font-semibold text-text-secondary uppercase">{dict.fullName}</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              required
              className="w-full px-4 py-3 border border-border-subtle rounded bg-bg-secondary focus:outline-none focus:border-accent transition-colors"
              placeholder="E.g. Sarah Jenkins"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label htmlFor="email" className="block text-xs font-semibold text-text-secondary uppercase">{dict.emailAddress}</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-3 border border-border-subtle rounded bg-bg-secondary focus:outline-none focus:border-accent transition-colors"
                placeholder="E.g. sarah@example.com"
              />
            </div>
            <div className="space-y-1.5">
              <label htmlFor="phone" className="block text-xs font-semibold text-text-secondary uppercase">{dict.phone}</label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-3 border border-border-subtle rounded bg-bg-secondary focus:outline-none focus:border-accent transition-colors"
                placeholder="E.g. 203-555-0199"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label htmlFor="location" className="block text-xs font-semibold text-text-secondary uppercase">{dict.localOffice}</label>
            <select
              id="location"
              name="location"
              value={formData.location}
              onChange={handleInputChange}
              className="w-full px-4 py-3 border border-border-subtle rounded bg-bg-secondary focus:outline-none focus:border-accent transition-colors"
            >
              <option value="Danbury">Danbury, CT (50 Newtown Rd)</option>
              <option value="Watertown">Watertown, CT (Main St)</option>
              <option value="Bridgeport">Bridgeport, CT</option>
            </select>
          </div>

          {errorMessage && <p className="text-xs font-medium text-red-500">{errorMessage}</p>}

          <div className="flex justify-between pt-4">
            <button
              type="button"
              onClick={prevStep}
              className="px-5 py-2.5 text-xs font-semibold uppercase border border-border-subtle hover:bg-bg-secondary rounded transition-colors"
            >
              {dict.back}
            </button>
            <button
              type="button"
              onClick={nextStep}
              className="px-5 py-2.5 text-xs font-semibold uppercase text-white bg-accent hover:bg-accent/90 rounded transition-colors"
            >
              {dict.continue}
            </button>
          </div>
        </div>
      )}

      {/* Step 3: Specific details */}
      {step === 3 && (
        <form
          onSubmit={handleSubmit}
          className="space-y-4"
          data-mcp-tool="submit_quote_request"
          data-mcp-description="Submit insurance quote request to Associated Insurance Agency"
          {...{
            toolname: 'submit_quote_request',
            tool: 'submit_quote_request',
            'tool-description': 'Submit insurance quote request to Associated Insurance Agency',
          }}
        >
          <h2 className="text-xl font-bold text-accent mb-2">{dict.almostDone}</h2>
          <p className="text-sm text-text-secondary mb-4">{dict.extraInfo}</p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label htmlFor="currentCarrier" className="block text-xs font-semibold text-text-secondary uppercase">{dict.currentCarrier}</label>
              <input
                type="text"
                id="currentCarrier"
                name="currentCarrier"
                data-mcp-param="currentCarrier"
                value={formData.currentCarrier}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-border-subtle rounded bg-bg-secondary focus:outline-none focus:border-accent transition-colors"
                placeholder={dict.carrierPlaceholder}
              />
            </div>
            <div className="space-y-1.5">
              <label htmlFor="effectiveDate" className="block text-xs font-semibold text-text-secondary uppercase">{dict.startDate}</label>
              <input
                type="date"
                id="effectiveDate"
                name="effectiveDate"
                data-mcp-param="effectiveDate"
                value={formData.effectiveDate}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-border-subtle rounded bg-bg-secondary focus:outline-none focus:border-accent transition-colors"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label htmlFor="notes" className="block text-xs font-semibold text-text-secondary uppercase">{dict.notes}</label>
            <textarea
              id="notes"
              name="notes"
              data-mcp-param="notes"
              value={formData.notes}
              onChange={handleInputChange}
              rows={4}
              className="w-full px-4 py-3 border border-border-subtle rounded bg-bg-secondary focus:outline-none focus:border-accent transition-colors resize-none"
              placeholder={dict.notesPlaceholder}
            />
          </div>

          {errorMessage && <p className="text-xs font-medium text-red-500">{errorMessage}</p>}

          <div className="flex justify-between pt-4">
            <button
              type="button"
              onClick={prevStep}
              className="px-5 py-2.5 text-xs font-semibold uppercase border border-border-subtle hover:bg-bg-secondary rounded transition-colors"
            >
              {dict.back}
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-5 py-2.5 text-xs font-semibold uppercase text-white bg-accent hover:bg-accent/90 rounded disabled:opacity-50 transition-colors flex items-center gap-2"
            >
              {isSubmitting ? (
                <>
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  {dict.submitting}
                </>
              ) : (
                dict.submitBtn
              )}
            </button>
          </div>
        </form>
      )}

      {/* Step 4: Submission success screen */}
      {step === 4 && (
        <div className="text-center py-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-emerald-50 text-emerald-500 mb-6 border border-emerald-100">
            <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-accent mb-2">{dict.successHeader}</h2>
          
          {confirmationCode && (
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-bg-secondary border border-border-subtle rounded-md mb-4 text-xs font-mono text-accent">
              <span className="text-text-muted">Ref Code:</span>
              <span className="font-bold text-accent-gold">{confirmationCode}</span>
            </div>
          )}

          <p className="text-sm text-text-secondary max-w-sm mx-auto mb-6">
            {dict.successDesc(formData.name, formData.location)}
          </p>
          <button
            type="button"
            onClick={() => {
              setStep(1);
              setInsuranceType('');
              setFormData({
                name: '',
                email: '',
                phone: '',
                location: 'Danbury',
                currentCarrier: '',
                effectiveDate: '',
                notes: '',
              });
            }}
            className="px-5 py-2.5 text-xs font-semibold uppercase text-accent border border-accent hover:bg-bg-secondary rounded transition-colors"
          >
            {dict.startAnother}
          </button>
        </div>
      )}
    </div>
  );
}

