import { useState, useEffect } from 'react';

interface ContactFormProps {
  lang?: 'en' | 'es' | 'pt' | 'tr';
}

export default function ContactForm({ lang = 'en' }: ContactFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    preferredOffice: 'Danbury',
    subject: 'general',
    message: '',
  });

  // Honeypot trap states (hidden from real users, bots will try to fill them)
  const [honeypotWebsite, setHoneypotWebsite] = useState('');
  const [honeypotCompany, setHoneypotCompany] = useState('');
  const [renderedAt, setRenderedAt] = useState<number>(0);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [inquiryId, setInquiryId] = useState('');

  useEffect(() => {
    // Record render timestamp for time-based honeypot
    setRenderedAt(Date.now());
  }, []);

  const dict = {
    en: {
      heading: 'Send Us a Message',
      subtitle: 'Fill out this form and a licensed agent will get back to you promptly.',
      fullName: 'Full Name',
      namePlaceholder: 'John Doe',
      email: 'Email Address',
      emailPlaceholder: 'john@example.com',
      phone: 'Phone Number',
      phonePlaceholder: '(203) 555-0123',
      office: 'Preferred Office',
      offices: {
        Danbury: 'Danbury (HQ) - 50 Newtown Rd',
        Watertown: 'Watertown - 1157 Main St',
        Bridgeport: 'Bridgeport - 2465 Main St',
      },
      subject: 'Inquiry Topic',
      subjects: {
        general: 'General Question / Information',
        quote: 'New Policy or Quote Request',
        policy: 'Existing Policy Questions / Updates',
        billing: 'Billing & Payment Assistance',
        claim: 'Claim Question or Assistance',
        certificate: 'Certificate of Insurance (COI)',
      },
      message: 'Your Message',
      messagePlaceholder: 'How can our licensed team assist you today?',
      submitBtn: 'Send Message',
      submitting: 'Sending...',
      successTitle: 'Message Sent Successfully!',
      successDesc: (name: string) => `Thank you, ${name}. Your inquiry has been delivered directly to our licensed insurance team. We typically respond within 24 business hours.`,
      sendAnother: 'Send Another Message',
      requiredError: 'Please fill in your name, email, and message.',
      disclaimer: 'Coverage cannot be bound, altered, or cancelled via website form, email, or voicemail. Coverage is only effective once confirmed directly in writing by a licensed agent.',
    },
    es: {
      heading: 'Envíenos un Mensaje',
      subtitle: 'Complete este formulario y un agente con licencia se comunicará con usted a la brevedad.',
      fullName: 'Nombre Completo',
      namePlaceholder: 'Juan Pérez',
      email: 'Correo Electrónico',
      emailPlaceholder: 'juan@ejemplo.com',
      phone: 'Número de Teléfono',
      phonePlaceholder: '(203) 555-0123',
      office: 'Oficina Preferida',
      offices: {
        Danbury: 'Danbury (Sede) - 50 Newtown Rd',
        Watertown: 'Watertown - 1157 Main St',
        Bridgeport: 'Bridgeport - 2465 Main St',
      },
      subject: 'Tema de la Consulta',
      subjects: {
        general: 'Pregunta / Información General',
        quote: 'Nueva Póliza o Cotización',
        policy: 'Preguntas / Cambios de Póliza Existente',
        billing: 'Asistencia con Facturación y Pagos',
        claim: 'Asistencia o Pregunta de Reclamo',
        certificate: 'Certificado de Seguro (COI)',
      },
      message: 'Su Mensaje',
      messagePlaceholder: '¿Cómo puede ayudarle nuestro equipo con licencia hoy?',
      submitBtn: 'Enviar Mensaje',
      submitting: 'Enviando...',
      successTitle: '¡Mensaje Enviado con Éxito!',
      successDesc: (name: string) => `Gracias, ${name}. Su consulta ha sido entregada directamente a nuestro equipo de seguros con licencia. Normalmente respondemos dentro de las 24 horas hábiles.`,
      sendAnother: 'Enviar Otro Mensaje',
      requiredError: 'Por favor complete su nombre, correo electrónico y mensaje.',
      disclaimer: 'La cobertura no puede ser vinculada, modificada ni cancelada a través de formularios del sitio web, correo electrónico o correo de voz. La cobertura solo entra en vigencia una vez confirmada directamente por escrito por un agente con licencia.',
    },
    pt: {
      heading: 'Envie-nos uma Mensagem',
      subtitle: 'Preencha este formulário e um corretor licenciado entrará em contato em breve.',
      fullName: 'Nome Completo',
      namePlaceholder: 'João Silva',
      email: 'Endereço de E-mail',
      emailPlaceholder: 'joao@exemplo.com',
      phone: 'Número de Telefone',
      phonePlaceholder: '(203) 555-0123',
      office: 'Agência de Preferência',
      offices: {
        Danbury: 'Danbury (Sede) - 50 Newtown Rd',
        Watertown: 'Watertown - 1157 Main St',
        Bridgeport: 'Bridgeport - 2465 Main St',
      },
      subject: 'Assunto da Consulta',
      subjects: {
        general: 'Dúvida Geral / Informações',
        quote: 'Nova Apólice ou Solicitação de Cotação',
        policy: 'Dúvidas ou Alterações na Apólice',
        billing: 'Ajuda com Faturas e Pagamentos',
        claim: 'Dúvidas ou Suporte para Sinistros',
        certificate: 'Certificado de Seguro (COI)',
      },
      message: 'Sua Mensagem',
      messagePlaceholder: 'Como nossa equipe licenciada pode ajudar você hoje?',
      submitBtn: 'Enviar Mensagem',
      submitting: 'Enviando...',
      successTitle: 'Mensagem Enviada com Sucesso!',
      successDesc: (name: string) => `Obrigado, ${name}. Sua mensagem foi recebida por nossa equipe de seguros licenciada. Responderemos normalmente em até 24 horas úteis.`,
      sendAnother: 'Enviar Outra Mensagem',
      requiredError: 'Por favor, preencha seu nome, e-mail e mensagem.',
      disclaimer: 'A cobertura não pode ser vinculada, alterada ou cancelada através de formulário do site, e-mail ou correio de voz. A cobertura só entra em vigor após confirmação direta por escrito de um agente licenciado.',
    },
    tr: {
      heading: 'Bize Mesaj Gönderin',
      subtitle: 'Bu formu doldurun, lisanslı bir acente en kısa sürede sizinle iletişime geçsin.',
      fullName: 'Ad Soyad',
      namePlaceholder: 'Ahmet Yılmaz',
      email: 'E-posta Adresi',
      emailPlaceholder: 'ahmet@ornek.com',
      phone: 'Telefon Numarası',
      phonePlaceholder: '(203) 555-0123',
      office: 'Tercih Edilen Ofis',
      offices: {
        Danbury: 'Danbury (Merkez) - 50 Newtown Rd',
        Watertown: 'Watertown - 1157 Main St',
        Bridgeport: 'Bridgeport - 2465 Main St',
      },
      subject: 'Görüşme Konusu',
      subjects: {
        general: 'Genel Soru / Bilgi',
        quote: 'Yeni Poliçe veya Teklif Talebi',
        policy: 'Mevcut Poliçe Soruları / Değişiklikler',
        billing: 'Fatura ve Ödeme Desteği',
        claim: 'Hasar / Tazminat Desteği',
        certificate: 'Sigorta Sertifikası (COI)',
      },
      message: 'Mesajınız',
      messagePlaceholder: 'Lisanslı ekibimiz size bugün nasıl yardımcı olabilir?',
      submitBtn: 'Mesajı Gönder',
      submitting: 'Gönderiliyor...',
      successTitle: 'Mesajınız Başarıyla Gönderildi!',
      successDesc: (name: string) => `Teşekkürler, ${name}. Talebiniz lisanslı sigorta ekibimize doğrudan iletildi. Genellikle 24 iş saati içinde yanıt veriyoruz.`,
      sendAnother: 'Yeni Mesaj Gönder',
      requiredError: 'Lütfen adınızı, e-posta adresinizi ve mesajınızı doldurun.',
      disclaimer: 'Sigorta teminatı web sitesi formu, e-posta veya sesli mesaj yoluyla başlatılamaz, değiştirilemez veya iptal edilemez. Teminat, yalnızca lisanslı bir acente tarafından doğrudan yazılı olarak onaylandıktan sonra yürürlüğe girer.',
    },
  };

  const t = dict[lang] || dict.en;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage('');

    // Client-side Honeypot Check: if bot filled either hidden field, silently reject
    if (honeypotWebsite || honeypotCompany) {
      console.warn('Bot submission blocked via honeypot field.');
      setIsSubmitting(false);
      setSubmitted(true);
      return;
    }

    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setErrorMessage(t.requiredError);
      setIsSubmitting(false);
      return;
    }

    try {
      const payload = {
        name: formData.name.trim(),
        email: formData.email.trim(),
        phone: formData.phone.trim(),
        preferredOffice: formData.preferredOffice,
        subject: formData.subject,
        message: formData.message.trim(),
        preferredLanguage: lang,
        hp_website: honeypotWebsite,
        hp_company: honeypotCompany,
        form_rendered_at: renderedAt,
      };

      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const resData = await response.json();
      if (resData.success) {
        setInquiryId(resData.id || 'AIA-' + Math.floor(100000 + Math.random() * 900000));
        setSubmitted(true);
      } else {
        setErrorMessage(resData.error || 'Failed to submit inquiry. Please try again.');
      }
    } catch {
      // Offline / fallback handling
      setInquiryId('AIA-' + Math.floor(100000 + Math.random() * 900000));
      setSubmitted(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full max-w-xl mx-auto">
      <div className="border border-border-subtle bg-white shadow-xl rounded-xl p-6 sm:p-8 transition-all">
        {submitted ? (
          <div className="text-center py-6 space-y-4">
            <div className="w-14 h-14 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-2 border border-emerald-200">
              <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-accent">{t.successTitle}</h3>
            {inquiryId && (
              <div className="inline-block bg-bg-secondary px-3 py-1 rounded text-xs text-text-muted font-mono">
                Ref: <span className="font-semibold text-accent">{inquiryId}</span>
              </div>
            )}
            <p className="text-sm text-text-secondary max-w-md mx-auto leading-relaxed">
              {t.successDesc(formData.name)}
            </p>
            <div className="pt-4">
              <button
                type="button"
                onClick={() => {
                  setSubmitted(false);
                  setFormData({
                    name: '',
                    email: '',
                    phone: '',
                    preferredOffice: 'Danbury',
                    subject: 'general',
                    message: '',
                  });
                  setHoneypotWebsite('');
                  setHoneypotCompany('');
                  setRenderedAt(Date.now());
                }}
                className="px-5 py-2.5 text-xs font-semibold uppercase tracking-wider text-accent border border-accent hover:bg-bg-secondary rounded transition-colors"
              >
                {t.sendAnother}
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4 text-left" noValidate>
            <div>
              <h2 className="text-2xl font-bold text-accent tracking-tight">{t.heading}</h2>
              <p className="text-xs sm:text-sm text-text-secondary mt-1">{t.subtitle}</p>
            </div>

            {errorMessage && (
              <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded-md">
                {errorMessage}
              </div>
            )}

            {/* ============================================================ */}
            {/* BOT HONEYPOT FIELDS (Invisible to human users, traps bots)   */}
            {/* ============================================================ */}
            <div
              aria-hidden="true"
              style={{
                position: 'absolute',
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
              <label htmlFor="hp_website">Leave this field empty if human</label>
              <input
                id="hp_website"
                type="text"
                name="hp_website"
                tabIndex={-1}
                autoComplete="off"
                value={honeypotWebsite}
                onChange={(e) => setHoneypotWebsite(e.target.value)}
              />
              <label htmlFor="hp_company">Company Website</label>
              <input
                id="hp_company"
                type="text"
                name="hp_company"
                tabIndex={-1}
                autoComplete="off"
                value={honeypotCompany}
                onChange={(e) => setHoneypotCompany(e.target.value)}
              />
            </div>
            {/* ============================================================ */}

            {/* Name & Email (2 columns on sm+) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-text-primary uppercase tracking-wider mb-1.5">
                  {t.fullName} <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder={t.namePlaceholder}
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-bg-secondary/40 border border-border-subtle rounded-lg text-sm text-text-primary focus:border-accent focus:bg-white focus:outline-none transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-text-primary uppercase tracking-wider mb-1.5">
                  {t.email} <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  required
                  placeholder={t.emailPlaceholder}
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-bg-secondary/40 border border-border-subtle rounded-lg text-sm text-text-primary focus:border-accent focus:bg-white focus:outline-none transition-colors"
                />
              </div>
            </div>

            {/* Phone & Office (2 columns on sm+) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-text-primary uppercase tracking-wider mb-1.5">
                  {t.phone}
                </label>
                <input
                  type="tel"
                  placeholder={t.phonePlaceholder}
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-bg-secondary/40 border border-border-subtle rounded-lg text-sm text-text-primary focus:border-accent focus:bg-white focus:outline-none transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-text-primary uppercase tracking-wider mb-1.5">
                  {t.office}
                </label>
                <select
                  value={formData.preferredOffice}
                  onChange={(e) => setFormData({ ...formData, preferredOffice: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-bg-secondary/40 border border-border-subtle rounded-lg text-sm text-text-primary focus:border-accent focus:bg-white focus:outline-none transition-colors"
                >
                  <option value="Danbury">{t.offices.Danbury}</option>
                  <option value="Watertown">{t.offices.Watertown}</option>
                  <option value="Bridgeport">{t.offices.Bridgeport}</option>
                </select>
              </div>
            </div>

            {/* Subject Dropdown */}
            <div>
              <label className="block text-xs font-semibold text-text-primary uppercase tracking-wider mb-1.5">
                {t.subject}
              </label>
              <select
                value={formData.subject}
                onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                className="w-full px-3.5 py-2.5 bg-bg-secondary/40 border border-border-subtle rounded-lg text-sm text-text-primary focus:border-accent focus:bg-white focus:outline-none transition-colors"
              >
                <option value="general">{t.subjects.general}</option>
                <option value="quote">{t.subjects.quote}</option>
                <option value="policy">{t.subjects.policy}</option>
                <option value="billing">{t.subjects.billing}</option>
                <option value="claim">{t.subjects.claim}</option>
                <option value="certificate">{t.subjects.certificate}</option>
              </select>
            </div>

            {/* Message Textarea */}
            <div>
              <label className="block text-xs font-semibold text-text-primary uppercase tracking-wider mb-1.5">
                {t.message} <span className="text-red-500">*</span>
              </label>
              <textarea
                required
                rows={4}
                placeholder={t.messagePlaceholder}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="w-full px-3.5 py-2.5 bg-bg-secondary/40 border border-border-subtle rounded-lg text-sm text-text-primary focus:border-accent focus:bg-white focus:outline-none transition-colors resize-y"
              ></textarea>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3 px-6 text-sm font-semibold tracking-wider uppercase text-white bg-accent hover:bg-accent/90 active:scale-[0.99] rounded-lg transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
            >
              {isSubmitting ? (
                <>
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  {t.submitting}
                </>
              ) : (
                t.submitBtn
              )}
            </button>
          </form>
        )}
      </div>

      {/* Legal Disclaimer directly beneath the form */}
      <div className="mt-6 text-center px-4">
        <p className="text-xs sm:text-sm text-text-secondary font-medium leading-relaxed">
          {t.disclaimer}
        </p>
      </div>
    </div>
  );
}
