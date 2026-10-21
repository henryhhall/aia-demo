/**
 * Resend Email Dispatch Service
 * Handles transactional email notifications for insurance quote requests and ACORD 25 certificates.
 */

import { Resend } from 'resend';

export interface CertificateEmailData {
  confirmationCode: string;
  requestorName: string;
  companyName?: string;
  requestorEmail: string;
  requestorPhone: string;
  requestorFax?: string;
  relationship?: string;
  insuredName: string;
  policyNumber?: string;
  preferredOffice?: string;

  holderName: string;
  attentionOf?: string;
  holderAddress1: string;
  holderAddress2?: string;
  holderCity: string;
  holderState: string;
  holderZip: string;
  holderEmail?: string;
  holderPhone?: string;
  holderFax?: string;
  deliveryMethod?: string;
  coverages?: string[];
  coverageOtherText?: string;

  isAdditionalInsured?: boolean;
  hasWrittenContract?: boolean;
  additionalInsuredName?: string;
  additionalInsuredAddress?: string;
  additionalInsuredLines?: string[];
  waiverSubrogationLines?: string[];
  primaryNonContributory?: boolean;
  jobNumber?: string;
  workState?: string;
  jobPayroll?: string;
  jobStartDate?: string;
  neededByDate?: string;

  specialInstructions?: string;
  attachedFileName?: string;
  attachedFileSize?: number;
  agreementAccepted?: boolean;
  preferredLanguage?: string;
  source?: string;
  recaptchaScore?: number;
  submittedAt?: string;
  logoUrl?: string;
}

export interface QuoteEmailData {
  confirmationCode: string;
  name: string;
  email: string;
  phone: string;
  insuranceType?: string;
  preferredOffice?: string;
  preferredLanguage?: string;
  currentCarrier?: string;
  reachMethod?: string;
  reachTime?: string;
  smsConsent?: boolean;
  anchorData?: Record<string, any>;
  producerPrepRationale?: string;
  notes?: string;
  source?: string;
  recaptchaScore?: number;
  submittedAt?: string;
  ratingPayload?: Record<string, any> | null;
}

export interface SendEmailResult {
  success: boolean;
  id?: string;
  simulated?: boolean;
  error?: string;
  recipient?: string;
  customerAcknowledgementDispatched?: boolean;
  customerAcknowledgementId?: string;
}

// Office contact directory mapping
const OFFICE_DIRECTORY: Record<string, { name: string; email: string; phone: string; address: string }> = {
  danbury: {
    name: 'Danbury Corporate Office (HQ)',
    email: 'danbury@aia-danbury.com',
    phone: '(203) 748-9272',
    address: '50 Newtown Road, Suite 1, Danbury, CT 06810',
  },
  watertown: {
    name: 'Watertown Branch Office',
    email: 'watertown@aia-danbury.com',
    phone: '(203) 748-9272',
    address: '51 Depot St Ste 112, Watertown, CT 06795',
  },
  bridgeport: {
    name: 'Bridgeport Community Branch',
    email: 'bridgeport@aia-danbury.com',
    phone: '(203) 748-9272',
    address: '2465 Main Street, Bridgeport, CT 06606',
  },
};

function getResendClient(): { client: Resend | null; fromEmail: string; defaultRecipient: string } {
  const apiKey =
    (typeof import.meta !== 'undefined' && import.meta.env?.RESEND_API_KEY) ||
    process.env.RESEND_API_KEY;

  const fromEmail =
    (typeof import.meta !== 'undefined' && import.meta.env?.RESEND_FROM_EMAIL) ||
    process.env.RESEND_FROM_EMAIL ||
    'Associated Insurance Agency <onboarding@resend.dev>';

  const defaultRecipient =
    (typeof import.meta !== 'undefined' &&
      (import.meta.env?.AGENCY_NOTIFICATION_EMAIL || import.meta.env?.QUOTE_NOTIFICATION_EMAIL)) ||
    process.env.AGENCY_NOTIFICATION_EMAIL ||
    process.env.QUOTE_NOTIFICATION_EMAIL ||
    'ron@aia-danbury.com';

  if (!apiKey || apiKey.trim() === '' || apiKey.startsWith('re_placeholder') || apiKey === 'your_resend_api_key_here') {
    return { client: null, fromEmail, defaultRecipient };
  }

  return { client: new Resend(apiKey.trim()), fromEmail, defaultRecipient };
}

/**
 * Builds HTML template for the Agency Producer Notification
 */
function buildAgencyNotificationHtml(data: QuoteEmailData, officeInfo: (typeof OFFICE_DIRECTORY)['danbury']): string {
  const submittedDate = data.submittedAt
    ? new Date(data.submittedAt).toLocaleString('en-US', { timeZone: 'America/New_York' }) + ' EST'
    : new Date().toLocaleString('en-US', { timeZone: 'America/New_York' }) + ' EST';

  const anchorItems: string[] = [];
  if (data.anchorData) {
    for (const [key, val] of Object.entries(data.anchorData)) {
      if (val !== undefined && val !== null && val !== '') {
        const readableKey = key.replace(/([A-Z])/g, ' $1').replace(/^./, (s) => s.toUpperCase());
        anchorItems.push(`<tr><td style="padding: 6px 12px; color: #64748b; font-weight: 500; font-size: 13px;">${readableKey}:</td><td style="padding: 6px 12px; color: #1e293b; font-size: 13px;">${String(val)}</td></tr>`);
      }
    }
  }

  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>New Quote Request - ${data.confirmationCode}</title>
</head>
<body style="margin: 0; padding: 24px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #f8fafc; color: #1e293b; line-height: 1.5;">
  <div style="max-width: 650px; margin: 0 auto; background: #ffffff; border-radius: 12px; overflow: hidden; border: 1px solid #e2e8f0; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);">
    
    <!-- Header -->
    <div style="background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%); padding: 28px 32px; color: #ffffff; border-bottom: 3px solid #c5a880;">
      <div style="font-size: 11px; text-transform: uppercase; letter-spacing: 1.5px; color: #c5a880; font-weight: 700; margin-bottom: 6px;">
        Associated Insurance Agency — Producer Dispatch
      </div>
      <h1 style="margin: 0; font-size: 24px; font-weight: 700; color: #ffffff;">
        New Quote Request: ${data.insuranceType || 'General'}
      </h1>
      <div style="margin-top: 8px; font-size: 14px; color: #94a3b8;">
        Confirmation Code: <strong style="color: #ffffff; font-family: monospace; font-size: 15px; letter-spacing: 0.5px;">${data.confirmationCode}</strong>
      </div>
    </div>

    <!-- Main Content -->
    <div style="padding: 32px;">
      
      <!-- Alert Banner -->
      <div style="background-color: #f0fdf4; border: 1px solid #bbf7d0; border-radius: 8px; padding: 14px 18px; margin-bottom: 24px;">
        <div style="font-size: 14px; color: #166534; font-weight: 600;">
          Central Agency Quote Intake
        </div>
        <div style="font-size: 13px; color: #15803d; margin-top: 2px;">
          Incoming Lead Notification • Ingested: ${submittedDate}
        </div>
      </div>

      <!-- Applicant Contact Information Table -->
      <h2 style="font-size: 16px; font-weight: 700; color: #0f172a; margin: 0 0 12px 0; border-bottom: 1px solid #e2e8f0; padding-bottom: 8px;">
        👤 Customer Details
      </h2>
      <table style="width: 100%; border-collapse: collapse; margin-bottom: 24px; background: #f8fafc; border-radius: 8px; overflow: hidden;">
        <tr>
          <td style="padding: 10px 14px; width: 35%; color: #64748b; font-size: 13px; font-weight: 600;">Full Name:</td>
          <td style="padding: 10px 14px; color: #0f172a; font-size: 14px; font-weight: 600;">${data.name}</td>
        </tr>
        <tr style="border-top: 1px solid #f1f5f9;">
          <td style="padding: 10px 14px; color: #64748b; font-size: 13px; font-weight: 600;">Email Address:</td>
          <td style="padding: 10px 14px; color: #0f172a; font-size: 14px;">
            <a href="mailto:${data.email}" style="color: #2563eb; text-decoration: none; font-weight: 500;">${data.email}</a>
          </td>
        </tr>
        <tr style="border-top: 1px solid #f1f5f9;">
          <td style="padding: 10px 14px; color: #64748b; font-size: 13px; font-weight: 600;">Phone Number:</td>
          <td style="padding: 10px 14px; color: #0f172a; font-size: 14px;">
            <a href="tel:${data.phone}" style="color: #2563eb; text-decoration: none; font-weight: 500;">${data.phone}</a>
          </td>
        </tr>
        <tr style="border-top: 1px solid #f1f5f9;">
          <td style="padding: 10px 14px; color: #64748b; font-size: 13px; font-weight: 600;">Preferred Language:</td>
          <td style="padding: 10px 14px; color: #0f172a; font-size: 14px; text-transform: uppercase; font-weight: 600;">${data.preferredLanguage || 'en'}</td>
        </tr>
        <tr style="border-top: 1px solid #f1f5f9;">
          <td style="padding: 10px 14px; color: #64748b; font-size: 13px; font-weight: 600;">Contact Preference:</td>
          <td style="padding: 10px 14px; color: #0f172a; font-size: 13px;">Reach via <strong>${data.reachMethod || 'Call'}</strong> (${data.reachTime || 'Anytime'})</td>
        </tr>
        <tr style="border-top: 1px solid #f1f5f9;">
          <td style="padding: 10px 14px; color: #64748b; font-size: 13px; font-weight: 600;">SMS Consent:</td>
          <td style="padding: 10px 14px; color: #0f172a; font-size: 13px;">${data.smsConsent ? '✅ Consent Granted' : '❌ Not Granted'}</td>
        </tr>
      </table>

      <!-- Policy & Coverage Details -->
      <h2 style="font-size: 16px; font-weight: 700; color: #0f172a; margin: 0 0 12px 0; border-bottom: 1px solid #e2e8f0; padding-bottom: 8px;">
        🛡️ Coverage Requested
      </h2>
      <table style="width: 100%; border-collapse: collapse; margin-bottom: 24px; background: #f8fafc; border-radius: 8px; overflow: hidden;">
        <tr>
          <td style="padding: 10px 14px; width: 35%; color: #64748b; font-size: 13px; font-weight: 600;">Line of Insurance:</td>
          <td style="padding: 10px 14px; color: #0f172a; font-size: 14px; font-weight: 700;">${data.insuranceType || 'General'}</td>
        </tr>
        <tr style="border-top: 1px solid #f1f5f9;">
          <td style="padding: 10px 14px; color: #64748b; font-size: 13px; font-weight: 600;">Current Carrier:</td>
          <td style="padding: 10px 14px; color: #0f172a; font-size: 13px;">${data.currentCarrier || 'None / Not Provided'}</td>
        </tr>
        <tr style="border-top: 1px solid #f1f5f9;">
          <td style="padding: 10px 14px; color: #64748b; font-size: 13px; font-weight: 600;">Submission Source:</td>
          <td style="padding: 10px 14px; color: #0f172a; font-size: 13px;">
            <code style="background: #e2e8f0; padding: 2px 6px; border-radius: 4px; font-size: 12px;">${data.source || 'Web_Form'}</code>
          </td>
        </tr>
        <tr style="border-top: 1px solid #f1f5f9;">
          <td style="padding: 10px 14px; color: #64748b; font-size: 13px; font-weight: 600;">reCAPTCHA v3 Score:</td>
          <td style="padding: 10px 14px; color: #0f172a; font-size: 13px;">
            <span style="display: inline-block; padding: 2px 8px; border-radius: 9999px; font-size: 12px; font-weight: 600; background-color: ${(data.recaptchaScore ?? 1.0) >= 0.5 ? '#dcfce7' : '#fee2e2'}; color: ${(data.recaptchaScore ?? 1.0) >= 0.5 ? '#15803d' : '#b91c1c'};">
              ${(data.recaptchaScore ?? 1.0).toFixed(2)} (${(data.recaptchaScore ?? 1.0) >= 0.5 ? 'Legitimate' : 'Suspicious'})
            </span>
          </td>
        </tr>
      </table>

      ${
        anchorItems.length > 0
          ? `
      <!-- Anchor Data Specifications -->
      <h2 style="font-size: 16px; font-weight: 700; color: #0f172a; margin: 0 0 12px 0; border-bottom: 1px solid #e2e8f0; padding-bottom: 8px;">
        📋 Property & Risk Details
      </h2>
      <table style="width: 100%; border-collapse: collapse; margin-bottom: 24px; background: #f8fafc; border-radius: 8px; overflow: hidden;">
        ${anchorItems.join('')}
      </table>
      `
          : ''
      }

      <!-- Producer Notes -->
      <h2 style="font-size: 16px; font-weight: 700; color: #0f172a; margin: 0 0 12px 0; border-bottom: 1px solid #e2e8f0; padding-bottom: 8px;">
        📝 Notes & Synthesis
      </h2>
      <div style="background-color: #f1f5f9; border-left: 4px solid #c5a880; padding: 14px 18px; border-radius: 0 8px 8px 0; font-size: 13px; color: #334155; line-height: 1.6; margin-bottom: 24px;">
        ${data.notes || 'No customer notes provided.'}
      </div>

      <!-- Quick Action Buttons -->
      <div style="text-align: center; margin-top: 32px; padding-top: 24px; border-top: 1px solid #e2e8f0;">
        <a href="mailto:${data.email}?subject=Regarding%20Your%20Insurance%20Quote%20Request%20(${encodeURIComponent(data.confirmationCode)})" 
           style="display: inline-block; background-color: #0f172a; color: #ffffff; text-decoration: none; font-weight: 600; font-size: 14px; padding: 12px 24px; border-radius: 8px; margin-right: 12px;">
          ✉️ Reply to Customer
        </a>
        <a href="tel:${data.phone}" 
           style="display: inline-block; background-color: #c5a880; color: #0f172a; text-decoration: none; font-weight: 600; font-size: 14px; padding: 12px 24px; border-radius: 8px;">
          📞 Call Customer
        </a>
      </div>

    </div>

    <!-- Footer -->
    <div style="background-color: #f1f5f9; padding: 20px 32px; font-size: 12px; color: #64748b; text-align: center; border-top: 1px solid #e2e8f0;">
      Associated Insurance Agency • Danbury HQ: 203-748-9272 • Watertown: 203-748-9272 • Bridgeport: 203-748-9272<br>
      Licensed in CT, NY, NJ, MA • Independent Agency representing 11+ premier carriers
    </div>

  </div>
</body>
</html>
  `.trim();
}

/**
 * Builds Plain Text version for the Agency Producer Notification
 */
function buildAgencyNotificationText(data: QuoteEmailData, officeInfo: (typeof OFFICE_DIRECTORY)['danbury']): string {
  return `
====================================================
ASSOCIATED INSURANCE AGENCY — NEW QUOTE REQUEST
====================================================
Confirmation Code: ${data.confirmationCode}
Intake:            Centralized Agency Quote Funnel
Submitted At:      ${data.submittedAt || new Date().toISOString()}

CUSTOMER CONTACT:
----------------------------------------------------
Name:              ${data.name}
Email:             ${data.email}
Phone:             ${data.phone}
Language:          ${data.preferredLanguage || 'en'}
Contact Method:    ${data.reachMethod || 'Call'} (${data.reachTime || 'Anytime'})
SMS Consent:       ${data.smsConsent ? 'Yes' : 'No'}

COVERAGE DETAILS:
----------------------------------------------------
Line of Insurance: ${data.insuranceType || 'General'}
Current Carrier:   ${data.currentCarrier || 'None / Not Provided'}
Submission Source: ${data.source || 'Web_Form'}
reCAPTCHA Score:   ${(data.recaptchaScore ?? 1.0).toFixed(2)}

NOTES / SYNTHESIS:
----------------------------------------------------
${data.notes || 'No customer notes provided.'}

====================================================
AIA Producer Portal — https://aia-danbury.com
====================================================
  `.trim();
}

const QUOTE_CONFIRMATION_I18N: Record<string, {
  subject: (code: string) => string;
  title: string;
  greeting: (name: string) => string;
  received: (type: string) => string;
  codeLabel: string;
  servicing: string;
  offices: string;
  directLine: string;
  brokerageText: string;
  followUp: (method: string) => string;
  rushNotice: string;
  disclaimer: string;
}> = {
  en: {
    subject: (code: string) => `Quote Request Received - Associated Insurance Agency (${code})`,
    title: 'Quote Request Confirmation',
    greeting: (name: string) => `Hello ${name},`,
    received: (type: string) => `Thank you for choosing Associated Insurance Agency. We have received your request for <strong>${type} insurance coverage</strong>.`,
    codeLabel: 'Your Confirmation Code',
    servicing: 'Servicing Agency:',
    offices: 'Offices:',
    directLine: 'Direct Line:',
    brokerageText: 'As an independent brokerage, a licensed producer will compare rates across our network of 11+ premier carriers (including Safeco, Travelers, Progressive, and The Hartford) to find you the best coverage at the most competitive price.',
    followUp: (method: string) => `A licensed representative will follow up with you via <strong>${method}</strong> within <strong>24 business hours</strong>.`,
    rushNotice: 'Need immediate assistance or rush certificate processing? Call our Danbury headquarters directly at <strong>(203) 748-9272</strong>.',
    disclaimer: 'Insurance coverage cannot be bound, altered, or cancelled via website form, email, or voicemail until directly confirmed in writing by a licensed insurance agent.',
  },
  es: {
    subject: (code: string) => `Solicitud de Cotización Recibida - Associated Insurance Agency (${code})`,
    title: 'Confirmación de Solicitud de Cotización',
    greeting: (name: string) => `Hola ${name},`,
    received: (type: string) => `Gracias por elegir Associated Insurance Agency. Hemos recibido su solicitud de cotización para seguro de <strong>${type}</strong>.`,
    codeLabel: 'Su Código de Confirmación',
    servicing: 'Agencia de Servicio:',
    offices: 'Oficinas:',
    directLine: 'Línea Directa:',
    brokerageText: 'Como agencia independiente, un agente con licencia comparará tarifas en nuestra red de más de 11 aseguradoras líderes (incluidas Safeco, Travelers, Progressive y The Hartford) para encontrar la mejor cobertura al precio más competitivo.',
    followUp: (method: string) => `Un representante con licencia se comunicará con usted por <strong>${method}</strong> dentro de las próximas <strong>24 horas hábiles</strong>.`,
    rushNotice: '¿Necesita asistencia inmediata o emisión urgente? Llame a nuestra sede en Danbury al <strong>(203) 748-9272</strong>.',
    disclaimer: 'La cobertura no puede ser vinculada, modificada o cancelada mediante formularios web, correo electrónico o mensaje de voz hasta ser confirmada por escrito por un agente con licencia.',
  },
  pt: {
    subject: (code: string) => `Solicitação de Cotação Recebida - Associated Insurance Agency (${code})`,
    title: 'Confirmação de Solicitação de Cotação',
    greeting: (name: string) => `Olá ${name},`,
    received: (type: string) => `Obrigado por escolher a Associated Insurance Agency. Recebemos sua solicitação de cotação para seguro de <strong>${type}</strong>.`,
    codeLabel: 'Seu Código de Confirmação',
    servicing: 'Agência de Atendimento:',
    offices: 'Escritórios:',
    directLine: 'Linha Direta:',
    brokerageText: 'Como corretora independente, um corretor licenciado comparará cotações em nossa rede com mais de 11 seguradoras líderes (incluindo Safeco, Travelers, Progressive e The Hartford) para encontrar a melhor proteção pelo valor mais vantajoso.',
    followUp: (method: string) => `Um corretor licenciado entrará em contato com você via <strong>${method}</strong> dentro de <strong>24 horas úteis</strong>.`,
    rushNotice: 'Precisa de assistência urgente ou emissão rápida? Ligue para nossa sede em Danbury no número <strong>(203) 748-9272</strong>.',
    disclaimer: 'A cobertura não pode ser vinculada, alterada ou cancelada através de formulário do site, e-mail ou correio de voz até confirmação por escrito de um corretor licenciado.',
  },
  tr: {
    subject: (code: string) => `Fiyat Teklifi Talebiniz Alındı - Associated Insurance Agency (${code})`,
    title: 'Fiyat Teklifi Talebi Onayı',
    greeting: (name: string) => `Merhaba ${name},`,
    received: (type: string) => `Associated Insurance Agency'yi tercih ettiğiniz için teşekkür ederiz. <strong>${type} sigortası</strong> teminatı teklif talebiniz tarafımıza ulaştı.`,
    codeLabel: 'Takip Onay Kodunuz',
    servicing: 'Hizmet Veren Acente:',
    offices: 'Ofisler:',
    directLine: 'Doğrudan Hat:',
    brokerageText: 'Bağımsız bir acente olarak lisanslı temsilcimiz, 11\'den fazla lider sigorta şirketi (Safeco, Travelers, Progressive ve The Hartford dahil) genelinde fiyatları karşılaştırarak size en uygun teklifi sunacaktır.',
    followUp: (method: string) => `Lisanslı bir temsilcimiz <strong>24 iş saati</strong> içinde sizinle <strong>${method}</strong> yoluyla iletişime geçecektir.`,
    rushNotice: 'Acil yardıma veya hızlı sertifika işlemine mi ihtiyacınız var? Doğrudan Danbury merkezimizi arayın: <strong>(203) 748-9272</strong>.',
    disclaimer: 'Sigorta teminatı web formu, e-posta veya sesli mesaj yoluyla başlatılamaz, değiştirilemez veya iptal edilemez. Teminat, yalnızca lisanslı bir acente tarafından doğrudan yazılı olarak onaylandıktan sonra yürürlüğe girer.',
  },
};

/**
 * Builds HTML template for the Customer Quote Acknowledgement Email
 */
function buildCustomerConfirmationHtml(data: QuoteEmailData, officeInfo: (typeof OFFICE_DIRECTORY)['danbury']): string {
  const lang = (data.preferredLanguage || 'en').toLowerCase();
  const t = QUOTE_CONFIRMATION_I18N[lang] || QUOTE_CONFIRMATION_I18N.en;
  const insuranceType = data.insuranceType || 'insurance';

  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${t.title} - Associated Insurance Agency</title>
</head>
<body style="margin: 0; padding: 24px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #f8fafc; color: #1e293b; line-height: 1.5;">
  <div style="max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 12px; overflow: hidden; border: 1px solid #e2e8f0; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);">
    
    <div style="background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%); padding: 28px 32px; color: #ffffff; border-bottom: 3px solid #c5a880;">
      <div style="font-size: 11px; text-transform: uppercase; letter-spacing: 1.5px; color: #c5a880; font-weight: 700; margin-bottom: 6px;">
        Associated Insurance Agency
      </div>
      <h1 style="margin: 0; font-size: 22px; font-weight: 700; color: #ffffff;">
        ${t.title}
      </h1>
      <div style="margin-top: 6px; font-size: 13px; color: #94a3b8;">
        Reference: <strong style="color: #ffffff; font-family: monospace;">${data.confirmationCode}</strong>
      </div>
    </div>

    <div style="padding: 32px;">
      <p style="font-size: 15px; margin-top: 0; color: #0f172a;">
        ${t.greeting(data.name)}
      </p>
      <p style="font-size: 14px; color: #334155; line-height: 1.6;">
        ${t.received(insuranceType)}
      </p>

      <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 18px; margin: 24px 0;">
        <div style="font-size: 12px; text-transform: uppercase; letter-spacing: 1px; color: #64748b; font-weight: 600;">
          ${t.codeLabel}
        </div>
        <div style="font-size: 20px; font-weight: 700; color: #0f172a; font-family: monospace; margin-top: 4px;">
          ${data.confirmationCode}
        </div>
        <div style="margin-top: 12px; font-size: 13px; color: #334155; line-height: 1.6;">
          <strong>${t.servicing}</strong> Associated Insurance Agency<br>
          <strong>${t.offices}</strong> Danbury HQ • Watertown • Bridgeport<br>
          <strong>${t.directLine}</strong> <a href="tel:(203) 748-9272" style="color: #2563eb; text-decoration: none; font-weight: 600;">(203) 748-9272</a>
        </div>
      </div>

      <p style="font-size: 14px; color: #334155; line-height: 1.6;">
        ${t.brokerageText}
      </p>

      <p style="font-size: 14px; color: #334155; line-height: 1.6;">
        ${t.followUp(data.reachMethod || 'phone')}
      </p>

      <div style="margin-top: 24px; padding: 14px 16px; background-color: #f1f5f9; border-radius: 6px; font-size: 13px; color: #475569;">
        ${t.rushNotice}
      </div>

      <div style="margin-top: 24px; padding-top: 18px; border-top: 1px solid #e2e8f0; font-size: 11px; color: #94a3b8; line-height: 1.5;">
        ${t.disclaimer}
      </div>
    </div>

    <div style="background-color: #f1f5f9; padding: 16px 32px; font-size: 12px; color: #64748b; text-align: center; border-top: 1px solid #e2e8f0;">
      © ${new Date().getFullYear()} Associated Insurance Agency LLC • CT License #002377312 • Licensed in CT, NY, NJ, MA
    </div>

  </div>
</body>
</html>
  `.trim();
}

/**
 * Builds Plain Text version for the Customer Quote Acknowledgement Email
 */
function buildCustomerConfirmationText(data: QuoteEmailData, officeInfo: (typeof OFFICE_DIRECTORY)['danbury']): string {
  const lang = (data.preferredLanguage || 'en').toLowerCase();
  const t = QUOTE_CONFIRMATION_I18N[lang] || QUOTE_CONFIRMATION_I18N.en;
  const insuranceType = data.insuranceType || 'insurance';

  return `
====================================================
ASSOCIATED INSURANCE AGENCY — ${t.title.toUpperCase()}
====================================================
${t.codeLabel}: ${data.confirmationCode}

${t.greeting(data.name)}

${t.received(insuranceType).replace(/<[^>]+>/g, '')}

${t.brokerageText}

${t.followUp(data.reachMethod || 'phone').replace(/<[^>]+>/g, '')}

${t.servicing} Associated Insurance Agency
${t.offices} Danbury HQ • Watertown • Bridgeport
${t.directLine} (203) 748-9272
Website: https://aia-danbury.com

${t.rushNotice.replace(/<[^>]+>/g, '')}

----------------------------------------------------
${t.disclaimer.replace(/<[^>]+>/g, '')}
====================================================
  `.trim();
}

/**
 * Sends a quote request email notification to the assigned AIA branch,
 * and an acknowledgement email to the customer.
 */
export async function sendQuoteEmail(data: QuoteEmailData): Promise<SendEmailResult> {
  const officeInfo = OFFICE_DIRECTORY.danbury;

  const { client, fromEmail, defaultRecipient } = getResendClient();
  const recipient = defaultRecipient;

  // 1. Simulation / Local Dev Fallback (when RESEND_API_KEY is not yet populated)
  if (!client) {
    const simId = 'sim_quote_' + Math.random().toString(36).substring(2, 10);
    const simAckId = 'sim_quote_ack_' + Math.random().toString(36).substring(2, 10);

    console.info('\n====================================================');
    console.info('📧 [Resend Simulated Dispatch - Agency Quote Intake]');
    console.info(`To:              ${recipient} (Centralized Quote Inbox)`);
    console.info(`From:            ${fromEmail}`);
    console.info(`Subject:         [New Quote Request] ${data.insuranceType || 'General'} - ${data.name} (${data.confirmationCode})`);
    console.info(`Applicant Phone: ${data.phone}`);
    console.info(`Applicant Email: ${data.email}`);
    console.info(`Line:            ${data.insuranceType}`);
    console.info(`Language:        ${data.preferredLanguage || 'en'}`);
    console.info(`Simulation ID:   ${simId}`);
    if (data.email && data.email.includes('@')) {
      console.info('----------------------------------------------------');
      console.info('📧 [Resend Simulated Dispatch - Customer Acknowledgement Receipt]');
      console.info(`To:              ${data.email}`);
      console.info(`Subject:         ${(QUOTE_CONFIRMATION_I18N[(data.preferredLanguage || 'en').toLowerCase()] || QUOTE_CONFIRMATION_I18N.en).subject(data.confirmationCode)}`);
      console.info(`Simulation ID:   ${simAckId}`);
    }
    console.info('💡 Set RESEND_API_KEY in your .env to send real transactional emails via Resend.');
    console.info('====================================================\n');

    return {
      success: true,
      simulated: true,
      id: simId,
      recipient,
      customerAcknowledgementDispatched: Boolean(data.email && data.email.includes('@')),
      customerAcknowledgementId: simAckId,
    };
  }

  // 2. Real Resend Dispatch
  try {
    const subject = `[New Quote Request] ${data.insuranceType || 'General'} - ${data.name} (${data.confirmationCode})`;

    const emailResponse = await client.emails.send({
      from: fromEmail,
      to: [recipient],
      replyTo: `${data.name} <${data.email}>`,
      subject,
      html: buildAgencyNotificationHtml(data, officeInfo),
      text: buildAgencyNotificationText(data, officeInfo),
      tags: [
        { name: 'category', value: 'quote_request' },
        { name: 'line', value: (data.insuranceType || 'general').toLowerCase() },
      ],
    });

    if (emailResponse.error) {
      console.error('[Resend Error] Agency notification dispatch failed:', emailResponse.error);
      return {
        success: false,
        error: emailResponse.error.message,
        recipient,
      };
    }

    console.info(`[Resend Success] Agency quote notification dispatched! ID: ${emailResponse.data?.id}`);

    // Dispatch customer acknowledgement email
    let custAckDispatched = false;
    let custAckId: string | undefined;
    if (data.email && data.email.includes('@')) {
      try {
        const lang = (data.preferredLanguage || 'en').toLowerCase();
        const t = QUOTE_CONFIRMATION_I18N[lang] || QUOTE_CONFIRMATION_I18N.en;
        const custResp = await client.emails.send({
          from: fromEmail,
          to: [data.email],
          subject: t.subject(data.confirmationCode),
          html: buildCustomerConfirmationHtml(data, officeInfo),
          text: buildCustomerConfirmationText(data, officeInfo),
          tags: [{ name: 'category', value: 'customer_acknowledgement' }],
        });

        if (!custResp.error) {
          custAckDispatched = true;
          custAckId = custResp.data?.id;
          console.info(`[Resend Success] Customer quote acknowledgement dispatched! ID: ${custAckId}`);
        } else {
          console.warn('[Resend Warning] Customer quote acknowledgement error:', custResp.error);
        }
      } catch (custErr) {
        console.warn('[Resend] Customer confirmation email could not be delivered:', custErr);
      }
    }

    return {
      success: true,
      id: emailResponse.data?.id,
      simulated: false,
      recipient,
      customerAcknowledgementDispatched: custAckDispatched,
      customerAcknowledgementId: custAckId,
    };
  } catch (err: any) {
    console.error('[Resend Exception] Unexpected error during quote email dispatch:', err);
    return {
      success: false,
      error: err?.message || 'Failed to dispatch quote email via Resend.',
      recipient,
    };
  }
}

/**
 * Sends ACORD 25 Certificate of Insurance email notifications using React Email templates:
 * 1. An operational dispatch email to the assigned branch office producers.
 * 2. An acknowledgement confirmation email to the requesting party.
 */
export async function sendCertificateEmail(data: CertificateEmailData): Promise<SendEmailResult> {
  const officeKey = (data.preferredOffice || 'danbury').toLowerCase();
  const officeInfo = OFFICE_DIRECTORY[officeKey] || OFFICE_DIRECTORY.danbury;

  const { client, fromEmail, defaultRecipient } = getResendClient();
  // When Associated Insurance Agency is sent an email from this site, use ron@aia-danbury.com
  const recipient = defaultRecipient;

  // Dynamically import React, renderer, and email templates on demand
  const React = await import('react');
  const { render } = await import('@react-email/render');
  const { CertificateRequestEmail } = await import('../emails/CertificateRequestEmail.tsx');
  const { CertificateConfirmationEmail } = await import('../emails/CertificateConfirmationEmail.tsx');

  // Prepare template props
  const logoUrl = data.logoUrl || 'https://aia-danbury.com/images/logo.png';
  const emailProps = {
    ...data,
    preferredOffice: officeInfo.name,
    logoUrl,
  };

  // Render Agency Producer Dispatch with React Email
  const agencyElement = React.createElement(CertificateRequestEmail, emailProps);
  const agencyHtml = await render(agencyElement);
  const agencyText = await render(agencyElement, { plainText: true });

  // Render Customer Confirmation Receipt with React Email
  const customerProps = {
    confirmationCode: data.confirmationCode,
    requestorName: data.requestorName,
    insuredName: data.insuredName,
    holderName: data.holderName,
    deliveryMethod: data.deliveryMethod,
    coverages: data.coverages,
    neededByDate: data.neededByDate,
    preferredOffice: officeInfo.name,
    officePhone: officeInfo.phone,
    officeEmail: officeInfo.email,
    officeAddress: officeInfo.address,
    submittedAt: data.submittedAt,
    logoUrl,
  };
  const customerElement = React.createElement(CertificateConfirmationEmail, customerProps);
  const customerHtml = await render(customerElement);
  const customerText = await render(customerElement, { plainText: true });

  // 1. Simulation / Local Dev Fallback (when RESEND_API_KEY is not yet populated)
  if (!client) {
    const simId = 'sim_cert_' + Math.random().toString(36).substring(2, 10);
    const simAckId = 'sim_cert_ack_' + Math.random().toString(36).substring(2, 10);

    console.info('\n====================================================');
    console.info('📧 [Resend React Email Simulated Dispatch - ACORD 25 Certificate]');
    console.info(`To:                 ${recipient} (${officeInfo.name})`);
    console.info(`From:               ${fromEmail}`);
    console.info(`Subject:            [ACORD 25 Certificate Request] ${data.insuredName} -> ${data.holderName} (${data.confirmationCode})`);
    console.info(`Insured:            ${data.insuredName}`);
    console.info(`Certificate Holder: ${data.holderName}`);
    console.info(`Requestor:          ${data.requestorName} (${data.requestorEmail}, ${data.requestorPhone})`);
    console.info(`Coverages:          ${(data.coverages || []).join(', ')}`);
    console.info(`Addl Insured:       ${data.isAdditionalInsured ? 'Yes' : 'No'}`);
    console.info(`Waiver Subrogation: ${(data.waiverSubrogationLines || []).join(', ') || 'None'}`);
    console.info(`Turnaround SLA:     2-4 business hours`);
    console.info(`Simulation ID:      ${simId}`);
    console.info(`HTML Length:        ${agencyHtml.length} characters (React Email rendered)`);

    if (data.requestorEmail && data.requestorEmail.includes('@')) {
      console.info('----------------------------------------------------');
      console.info('📧 [Resend Simulated Dispatch - Certificate Customer Receipt]');
      console.info(`To:                 ${data.requestorEmail}`);
      console.info(`Subject:            Certificate Request Confirmed - Associated Insurance Agency (${data.confirmationCode})`);
      console.info(`Simulation ID:      ${simAckId}`);
    }
    console.info('💡 Set RESEND_API_KEY in your .env to dispatch live emails via Resend.');
    console.info('====================================================\n');

    return {
      success: true,
      simulated: true,
      id: simId,
      recipient,
      customerAcknowledgementDispatched: Boolean(data.requestorEmail && data.requestorEmail.includes('@')),
      customerAcknowledgementId: simAckId,
    };
  }

  // 2. Real Resend Dispatch
  try {
    const subject = `[ACORD 25 Certificate Request] ${data.insuredName} -> ${data.holderName} (${data.confirmationCode})`;

    const emailResponse = await client.emails.send({
      from: fromEmail,
      to: [recipient],
      replyTo: `${data.requestorName} <${data.requestorEmail}>`,
      subject,
      html: agencyHtml,
      text: agencyText,
      tags: [
        { name: 'category', value: 'certificate_request' },
        { name: 'office', value: officeKey },
        { name: 'insured', value: data.insuredName.substring(0, 50) },
      ],
    });

    if (emailResponse.error) {
      console.error('[Resend Error] Certificate agency dispatch failed:', emailResponse.error);
      return {
        success: false,
        error: emailResponse.error.message,
        recipient,
      };
    }

    console.info(`[Resend Success] ACORD 25 Certificate notification dispatched! ID: ${emailResponse.data?.id}`);

    // Dispatch customer acknowledgement receipt email
    let custAckDispatched = false;
    let custAckId: string | undefined;
    if (data.requestorEmail && data.requestorEmail.includes('@')) {
      try {
        const custResp = await client.emails.send({
          from: fromEmail,
          to: [data.requestorEmail],
          subject: `Certificate Request Confirmed - Associated Insurance Agency (${data.confirmationCode})`,
          html: customerHtml,
          text: customerText,
          tags: [{ name: 'category', value: 'certificate_customer_confirmation' }],
        });

        if (!custResp.error) {
          custAckDispatched = true;
          custAckId = custResp.data?.id;
          console.info(`[Resend Success] Certificate customer confirmation dispatched! ID: ${custAckId}`);
        } else {
          console.warn('[Resend Warning] Certificate customer confirmation error:', custResp.error);
        }
      } catch (custErr) {
        console.warn('[Resend] Certificate customer confirmation delivery warning:', custErr);
      }
    }

    return {
      success: true,
      id: emailResponse.data?.id,
      simulated: false,
      recipient,
      customerAcknowledgementDispatched: custAckDispatched,
      customerAcknowledgementId: custAckId,
    };
  } catch (err: any) {
    console.error('[Resend Exception] Unexpected error during certificate email dispatch:', err);
    return {
      success: false,
      error: err?.message || 'Failed to dispatch certificate email via Resend.',
      recipient,
    };
  }
}

export interface ContactEmailData {
  id: string;
  name: string;
  email: string;
  phone?: string;
  preferredOffice?: string;
  subject?: string;
  message: string;
  preferredLanguage?: string;
  recaptchaScore?: number;
  submittedAt?: string;
}

const CONTACT_ACKNOWLEDGEMENT_I18N: Record<string, {
  subject: (id: string) => string;
  title: string;
  greeting: (name: string) => string;
  intro: (subject: string) => string;
  refLabel: string;
  assignedOffice: string;
  directPhone: string;
  summaryTitle: string;
  topicLabel: string;
  messageLabel: string;
  nextSteps: string;
  rushNotice: string;
  disclaimer: string;
}> = {
  en: {
    subject: (id: string) => `We Received Your Message - Associated Insurance Agency (${id})`,
    title: 'Customer Inquiry Confirmation',
    greeting: (name: string) => `Hello ${name},`,
    intro: (subject: string) => `Thank you for reaching out to Associated Insurance Agency. We have received your inquiry regarding <strong>${subject}</strong>.`,
    refLabel: 'Tracking Reference Number',
    assignedOffice: 'Assigned Branch Office:',
    directPhone: 'Direct Phone:',
    summaryTitle: 'Summary of Your Inquiry',
    topicLabel: 'Topic:',
    messageLabel: 'Your Message:',
    nextSteps: 'A licensed agent fluent in your preferred language will review your message and respond within <strong>24 business hours</strong> (Monday – Friday, 8:30 AM – 5:00 PM EST).',
    rushNotice: 'Need immediate assistance? Call our Danbury headquarters directly at <strong>(203) 748-9272</strong>.',
    disclaimer: 'Insurance coverage cannot be bound, altered, or cancelled via website message, email, or voicemail until directly confirmed in writing by a licensed insurance agent.',
  },
  es: {
    subject: (id: string) => `Hemos Recibido Su Mensaje - Associated Insurance Agency (${id})`,
    title: 'Confirmación de Consulta',
    greeting: (name: string) => `Hola ${name},`,
    intro: (subject: string) => `Gracias por comunicarse con Associated Insurance Agency. Hemos recibido su consulta sobre <strong>${subject}</strong>.`,
    refLabel: 'Número de Referencia de Seguimiento',
    assignedOffice: 'Oficina Asignada:',
    directPhone: 'Teléfono Directo:',
    summaryTitle: 'Resumen de Su Mensaje',
    topicLabel: 'Tema:',
    messageLabel: 'Su Mensaje:',
    nextSteps: 'Un agente con licencia que habla español revisará su mensaje y le responderá dentro de las próximas <strong>24 horas hábiles</strong> (lunes a viernes de 8:30 a. m. a 5:00 p. m. EST).',
    rushNotice: '¿Necesita asistencia inmediata? Llame directamente a nuestra sede de Danbury al <strong>(203) 748-9272</strong>.',
    disclaimer: 'La cobertura no puede ser vinculada, modificada o cancelada mediante formularios web, correo electrónico o mensaje de voz hasta ser confirmada por escrito por un agente con licencia.',
  },
  pt: {
    subject: (id: string) => `Recebemos Sua Mensagem - Associated Insurance Agency (${id})`,
    title: 'Confirmação de Atendimento',
    greeting: (name: string) => `Olá ${name},`,
    intro: (subject: string) => `Obrigado por entrar em contato com a Associated Insurance Agency. Recebemos sua mensagem sobre <strong>${subject}</strong>.`,
    refLabel: 'Número de Referência de Rastreamento',
    assignedOffice: 'Escritório de Atendimento:',
    directPhone: 'Telefone Direto:',
    summaryTitle: 'Resumo da Mensagem',
    topicLabel: 'Assunto:',
    messageLabel: 'Sua Mensagem:',
    nextSteps: 'Um corretor licenciado fluente em português analisará sua mensagem e responderá dentro de <strong>24 horas úteis</strong> (segunda a sexta, das 8h30 às 17h00 EST).',
    rushNotice: 'Precisa de atendimento urgente? Ligue diretamente para nossa sede em Danbury no número <strong>(203) 748-9272</strong>.',
    disclaimer: 'A cobertura não pode ser vinculada, alterada ou cancelada através de formulário do site, e-mail ou correio de voz até confirmação por escrito de um corretor licenciado.',
  },
  tr: {
    subject: (id: string) => `Mesajınız Alındı - Associated Insurance Agency (${id})`,
    title: 'İletişim Talebi Onayı',
    greeting: (name: string) => `Merhaba ${name},`,
    intro: (subject: string) => `Associated Insurance Agency ile iletişime geçtiğiniz için teşekkür ederiz. <strong>${subject}</strong> konulu mesajınız tarafımıza ulaştı.`,
    refLabel: 'Takip Referans Numarası',
    assignedOffice: 'Atanan Şube Ofisi:',
    directPhone: 'Doğrudan Hat:',
    summaryTitle: 'İlettiğiniz Mesajın Özeti',
    topicLabel: 'Konu:',
    messageLabel: 'Mesajınız:',
    nextSteps: 'Türkçe bilen lisanslı ekibimiz mesajınızı inceleyecek ve <strong>24 iş saati</strong> içinde sizinle iletişime geçecektir (Pazartesi - Cuma, 08:30 - 17:00 EST).',
    rushNotice: 'Acil yardıma mı ihtiyacınız var? Doğrudan Danbury merkezimizi arayın: <strong>(203) 748-9272</strong>.',
    disclaimer: 'Sigorta teminatı web formu, e-posta veya sesli mesaj yoluyla başlatılamaz, değiştirilemez veya iptal edilemez. Teminat, yalnızca lisanslı bir acente tarafından doğrudan yazılı olarak onaylandıktan sonra yürürlüğe girer.',
  },
};

/**
 * Builds HTML template for the Customer Contact Acknowledgement Email
 */
function buildContactAcknowledgementHtml(data: ContactEmailData, officeInfo: (typeof OFFICE_DIRECTORY)['danbury']): string {
  const lang = (data.preferredLanguage || 'en').toLowerCase();
  const t = CONTACT_ACKNOWLEDGEMENT_I18N[lang] || CONTACT_ACKNOWLEDGEMENT_I18N.en;
  const topic = data.subject || 'General Inquiry';
  const submittedDate = data.submittedAt
    ? new Date(data.submittedAt).toLocaleString('en-US', { timeZone: 'America/New_York' }) + ' EST'
    : new Date().toLocaleString('en-US', { timeZone: 'America/New_York' }) + ' EST';

  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${t.title} - Associated Insurance Agency</title>
</head>
<body style="margin: 0; padding: 24px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #f8fafc; color: #1e293b; line-height: 1.5;">
  <div style="max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 12px; overflow: hidden; border: 1px solid #e2e8f0; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);">
    
    <div style="background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%); padding: 28px 32px; color: #ffffff; border-bottom: 3px solid #c5a880;">
      <div style="font-size: 11px; text-transform: uppercase; letter-spacing: 1.5px; color: #c5a880; font-weight: 700; margin-bottom: 6px;">
        Associated Insurance Agency
      </div>
      <h1 style="margin: 0; font-size: 22px; font-weight: 700; color: #ffffff;">
        ${t.title}
      </h1>
      <div style="margin-top: 6px; font-size: 13px; color: #94a3b8;">
        Reference: <strong style="color: #ffffff; font-family: monospace;">${data.id}</strong>
      </div>
    </div>

    <div style="padding: 32px;">
      <p style="font-size: 15px; margin-top: 0; color: #0f172a;">
        ${t.greeting(data.name)}
      </p>
      <p style="font-size: 14px; color: #334155; line-height: 1.6;">
        ${t.intro(topic)}
      </p>

      <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 18px; margin: 24px 0;">
        <div style="font-size: 12px; text-transform: uppercase; letter-spacing: 1px; color: #64748b; font-weight: 600;">
          ${t.refLabel}
        </div>
        <div style="font-size: 20px; font-weight: 700; color: #0f172a; font-family: monospace; margin-top: 4px;">
          ${data.id}
        </div>
        <div style="margin-top: 12px; font-size: 13px; color: #334155; line-height: 1.6;">
          <strong>${t.assignedOffice}</strong> ${officeInfo.name}<br>
          <strong>Address:</strong> ${officeInfo.address}<br>
          <strong>${t.directPhone}</strong> <a href="tel:(203) 748-9272" style="color: #2563eb; text-decoration: none; font-weight: 600;">(203) 748-9272</a><br>
          <strong>Submitted:</strong> ${submittedDate}
        </div>
      </div>

      <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 18px; margin: 24px 0;">
        <div style="font-size: 12px; text-transform: uppercase; letter-spacing: 1px; color: #64748b; font-weight: 700; margin-bottom: 8px;">
          ${t.summaryTitle}
        </div>
        <div style="font-size: 13px; color: #334155; margin-bottom: 8px;">
          <strong>${t.topicLabel}</strong> ${topic}
        </div>
        <div style="background: #ffffff; border-left: 3px solid #c5a880; border-radius: 4px; padding: 12px 14px; font-size: 13px; color: #1e293b; white-space: pre-wrap; line-height: 1.6;">
          ${data.message}
        </div>
      </div>

      <p style="font-size: 14px; color: #334155; line-height: 1.6;">
        ${t.nextSteps}
      </p>

      <div style="margin-top: 24px; padding: 14px 16px; background-color: #f1f5f9; border-radius: 6px; font-size: 13px; color: #475569;">
        ${t.rushNotice}
      </div>

      <div style="margin-top: 24px; padding-top: 18px; border-top: 1px solid #e2e8f0; font-size: 11px; color: #94a3b8; line-height: 1.5;">
        ${t.disclaimer}
      </div>
    </div>

    <div style="background-color: #f1f5f9; padding: 16px 32px; font-size: 12px; color: #64748b; text-align: center; border-top: 1px solid #e2e8f0;">
      © ${new Date().getFullYear()} Associated Insurance Agency LLC • CT License #002377312 • Danbury HQ • Watertown • Bridgeport
    </div>

  </div>
</body>
</html>
  `.trim();
}

/**
 * Builds Plain Text version for the Customer Contact Acknowledgement Email
 */
function buildContactAcknowledgementText(data: ContactEmailData, officeInfo: (typeof OFFICE_DIRECTORY)['danbury']): string {
  const lang = (data.preferredLanguage || 'en').toLowerCase();
  const t = CONTACT_ACKNOWLEDGEMENT_I18N[lang] || CONTACT_ACKNOWLEDGEMENT_I18N.en;
  const topic = data.subject || 'General Inquiry';
  const submittedDate = data.submittedAt
    ? new Date(data.submittedAt).toLocaleString('en-US', { timeZone: 'America/New_York' }) + ' EST'
    : new Date().toLocaleString('en-US', { timeZone: 'America/New_York' }) + ' EST';

  return `
====================================================
ASSOCIATED INSURANCE AGENCY — ${t.title.toUpperCase()}
====================================================
${t.refLabel}: ${data.id}
Date: ${submittedDate}

${t.greeting(data.name)}

${t.intro(topic).replace(/<[^>]+>/g, '')}

${t.summaryTitle.toUpperCase()}:
----------------------------------------------------
${t.topicLabel} ${topic}
${t.messageLabel}
${data.message}

${t.nextSteps.replace(/<[^>]+>/g, '')}

${t.assignedOffice} ${officeInfo.name}
Address: ${officeInfo.address}
${t.directPhone} (203) 748-9272
Website: https://aia-danbury.com

${t.rushNotice.replace(/<[^>]+>/g, '')}

----------------------------------------------------
${t.disclaimer.replace(/<[^>]+>/g, '')}
====================================================
  `.trim();
}

/**
 * Sends a contact form notification to the agency recipient (ron@aia-danbury.com),
 * and an acknowledgement confirmation email to the customer.
 */
export async function sendContactEmail(data: ContactEmailData): Promise<SendEmailResult> {
  const officeKey = (data.preferredOffice || 'danbury').toLowerCase();
  const officeInfo = OFFICE_DIRECTORY[officeKey] || OFFICE_DIRECTORY.danbury;

  const { client, fromEmail, defaultRecipient } = getResendClient();
  const recipient = defaultRecipient;

  const submittedDate = data.submittedAt
    ? new Date(data.submittedAt).toLocaleString('en-US', { timeZone: 'America/New_York' }) + ' EST'
    : new Date().toLocaleString('en-US', { timeZone: 'America/New_York' }) + ' EST';

  // 1. Simulation / Local Dev Fallback (when RESEND_API_KEY is not yet populated)
  if (!client) {
    const simId = 'sim_contact_' + Math.random().toString(36).substring(2, 10);
    const simAckId = 'sim_contact_ack_' + Math.random().toString(36).substring(2, 10);

    console.info('\n====================================================');
    console.info('📧 [Resend Simulated Dispatch - Agency Contact Notification]');
    console.info(`To:              ${recipient} (Agency Notification Inbox)`);
    console.info(`From:            ${fromEmail}`);
    console.info(`Subject:         [Website Contact Inquiry] ${data.subject || 'General'} - ${data.name} (${data.id})`);
    console.info(`Sender Name:     ${data.name}`);
    console.info(`Sender Email:    ${data.email}`);
    console.info(`Sender Phone:    ${data.phone || 'N/A'}`);
    console.info(`Office Interest: ${officeInfo.name}`);
    console.info(`Language:        ${data.preferredLanguage || 'en'}`);
    console.info(`Message:         ${data.message}`);
    console.info(`Simulation ID:   ${simId}`);

    if (data.email && data.email.includes('@')) {
      const lang = (data.preferredLanguage || 'en').toLowerCase();
      const t = CONTACT_ACKNOWLEDGEMENT_I18N[lang] || CONTACT_ACKNOWLEDGEMENT_I18N.en;
      console.info('----------------------------------------------------');
      console.info('📧 [Resend Simulated Dispatch - Customer Contact Acknowledgement]');
      console.info(`To:              ${data.email}`);
      console.info(`Subject:         ${t.subject(data.id)}`);
      console.info(`Simulation ID:   ${simAckId}`);
    }
    console.info('💡 Set RESEND_API_KEY in your .env to send real transactional emails via Resend.');
    console.info('====================================================\n');

    return {
      success: true,
      simulated: true,
      id: simId,
      recipient,
      customerAcknowledgementDispatched: Boolean(data.email && data.email.includes('@')),
      customerAcknowledgementId: simAckId,
    };
  }

  // 2. Real Resend Dispatch
  try {
    const subject = `[Website Contact Inquiry] ${data.subject || 'General'} - ${data.name} (${data.id})`;
    const html = `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"></head>
<body style="margin: 0; padding: 24px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #f8fafc; color: #1e293b;">
  <div style="max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 12px; overflow: hidden; border: 1px solid #e2e8f0; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);">
    <div style="background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%); padding: 24px 28px; color: #ffffff; border-bottom: 3px solid #c5a880;">
      <div style="font-size: 11px; text-transform: uppercase; letter-spacing: 1.5px; color: #c5a880; font-weight: 700; margin-bottom: 4px;">Associated Insurance Agency — Direct Inquiry</div>
      <h2 style="margin: 0; font-size: 20px; font-weight: 700; color: #ffffff;">New Contact Inquiry: ${data.subject || 'General'}</h2>
      <div style="margin-top: 6px; font-size: 13px; color: #94a3b8;">Reference: <strong style="color: #ffffff; font-family: monospace;">${data.id}</strong></div>
    </div>
    <div style="padding: 24px;">
      <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px; background: #f8fafc; border-radius: 8px;">
        <tr><td style="padding: 10px 14px; width: 35%; color: #64748b; font-size: 13px; font-weight: 600;">Sender:</td><td style="padding: 10px 14px; font-size: 14px; font-weight: 600; color: #0f172a;">${data.name}</td></tr>
        <tr style="border-top: 1px solid #f1f5f9;"><td style="padding: 10px 14px; color: #64748b; font-size: 13px; font-weight: 600;">Email:</td><td style="padding: 10px 14px; font-size: 14px;"><a href="mailto:${data.email}" style="color: #2563eb; text-decoration: none;">${data.email}</a></td></tr>
        <tr style="border-top: 1px solid #f1f5f9;"><td style="padding: 10px 14px; color: #64748b; font-size: 13px; font-weight: 600;">Phone:</td><td style="padding: 10px 14px; font-size: 14px;"><a href="tel:${data.phone || ''}" style="color: #2563eb; text-decoration: none;">${data.phone || 'N/A'}</a></td></tr>
        <tr style="border-top: 1px solid #f1f5f9;"><td style="padding: 10px 14px; color: #64748b; font-size: 13px; font-weight: 600;">Preferred Office:</td><td style="padding: 10px 14px; font-size: 14px; color: #0f172a;">${officeInfo.name}</td></tr>
        <tr style="border-top: 1px solid #f1f5f9;"><td style="padding: 10px 14px; color: #64748b; font-size: 13px; font-weight: 600;">Language:</td><td style="padding: 10px 14px; font-size: 14px; color: #0f172a; text-transform: uppercase;">${data.preferredLanguage || 'en'}</td></tr>
        <tr style="border-top: 1px solid #f1f5f9;"><td style="padding: 10px 14px; color: #64748b; font-size: 13px; font-weight: 600;">Submitted:</td><td style="padding: 10px 14px; font-size: 14px; color: #0f172a;">${submittedDate}</td></tr>
      </table>
      <div style="background: #f1f5f9; border-left: 4px solid #c5a880; border-radius: 4px; padding: 14px 16px; margin-bottom: 20px;">
        <div style="font-size: 12px; text-transform: uppercase; font-weight: 700; color: #64748b; margin-bottom: 6px;">Message</div>
        <div style="font-size: 14px; color: #0f172a; white-space: pre-wrap; line-height: 1.6;">${data.message}</div>
      </div>
    </div>
  </div>
</body>
</html>
    `.trim();

    const text = `
New Contact Inquiry - Associated Insurance Agency
Reference: ${data.id}
Date: ${submittedDate}

Sender: ${data.name}
Email: ${data.email}
Phone: ${data.phone || 'N/A'}
Preferred Office: ${officeInfo.name}
Language: ${data.preferredLanguage || 'en'}
Subject: ${data.subject || 'General'}

Message:
${data.message}
    `.trim();

    const emailResponse = await client.emails.send({
      from: fromEmail,
      to: [recipient],
      replyTo: `${data.name} <${data.email}>`,
      subject,
      html,
      text,
      tags: [
        { name: 'category', value: 'contact_inquiry' },
        { name: 'office', value: officeKey },
      ],
    });

    if (emailResponse.error) {
      console.error('[Resend Error] Contact inquiry dispatch failed:', emailResponse.error);
      return { success: false, error: emailResponse.error.message, recipient };
    }

    console.info(`[Resend Success] Contact inquiry notification dispatched! ID: ${emailResponse.data?.id}`);

    // Dispatch customer acknowledgement email
    let custAckDispatched = false;
    let custAckId: string | undefined;
    if (data.email && data.email.includes('@')) {
      try {
        const lang = (data.preferredLanguage || 'en').toLowerCase();
        const t = CONTACT_ACKNOWLEDGEMENT_I18N[lang] || CONTACT_ACKNOWLEDGEMENT_I18N.en;
        const custResp = await client.emails.send({
          from: fromEmail,
          to: [data.email],
          subject: t.subject(data.id),
          html: buildContactAcknowledgementHtml(data, officeInfo),
          text: buildContactAcknowledgementText(data, officeInfo),
          tags: [{ name: 'category', value: 'contact_customer_acknowledgement' }],
        });

        if (!custResp.error) {
          custAckDispatched = true;
          custAckId = custResp.data?.id;
          console.info(`[Resend Success] Customer contact acknowledgement dispatched! ID: ${custAckId}`);
        } else {
          console.warn('[Resend Warning] Customer contact acknowledgement error:', custResp.error);
        }
      } catch (custErr) {
        console.warn('[Resend] Customer contact acknowledgement delivery warning:', custErr);
      }
    }

    return {
      success: true,
      id: emailResponse.data?.id,
      recipient,
      customerAcknowledgementDispatched: custAckDispatched,
      customerAcknowledgementId: custAckId,
    };
  } catch (err: any) {
    console.error('[Resend Exception] Error during contact email dispatch:', err);
    return { success: false, error: err?.message || 'Failed to dispatch contact email.', recipient };
  }
}


