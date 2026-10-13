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
    (typeof import.meta !== 'undefined' && import.meta.env?.QUOTE_NOTIFICATION_EMAIL) ||
    process.env.QUOTE_NOTIFICATION_EMAIL ||
    'danbury@aia-danbury.com';

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
          Assigned Servicing Branch: ${officeInfo.name}
        </div>
        <div style="font-size: 13px; color: #15803d; margin-top: 2px;">
          Direct Branch Phone: ${officeInfo.phone} | Ingested: ${submittedDate}
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
Assigned Office:   ${officeInfo.name} (${officeInfo.phone})
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

/**
 * Builds HTML template for the Customer Confirmation Email
 */
function buildCustomerConfirmationHtml(data: QuoteEmailData, officeInfo: (typeof OFFICE_DIRECTORY)['danbury']): string {
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Quote Request Received - Associated Insurance Agency</title>
</head>
<body style="margin: 0; padding: 24px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #f8fafc; color: #1e293b; line-height: 1.5;">
  <div style="max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 12px; overflow: hidden; border: 1px solid #e2e8f0;">
    
    <div style="background: #0f172a; padding: 28px 32px; color: #ffffff; border-bottom: 3px solid #c5a880;">
      <h1 style="margin: 0; font-size: 22px; font-weight: 700; color: #ffffff;">
        Associated Insurance Agency
      </h1>
      <div style="margin-top: 6px; font-size: 14px; color: #c5a880; font-weight: 600;">
        Quote Request Confirmation
      </div>
    </div>

    <div style="padding: 32px;">
      <p style="font-size: 15px; margin-top: 0;">
        Hello <strong>${data.name}</strong>,
      </p>
      <p style="font-size: 14px; color: #334155; line-height: 1.6;">
        Thank you for choosing Associated Insurance Agency. We have received your request for 
        <strong>${data.insuranceType || 'insurance'} coverage</strong>.
      </p>

      <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 18px; margin: 24px 0;">
        <div style="font-size: 12px; text-transform: uppercase; letter-spacing: 1px; color: #64748b; font-weight: 600;">
          Your Confirmation Code
        </div>
        <div style="font-size: 20px; font-weight: 700; color: #0f172a; font-family: monospace; margin-top: 4px;">
          ${data.confirmationCode}
        </div>
        <div style="margin-top: 12px; font-size: 13px; color: #334155;">
          <strong>Assigned Office:</strong> ${officeInfo.name}<br>
          <strong>Address:</strong> ${officeInfo.address}<br>
          <strong>Direct Line:</strong> <a href="tel:${officeInfo.phone}" style="color: #2563eb; text-decoration: none;">${officeInfo.phone}</a>
        </div>
      </div>

      <p style="font-size: 14px; color: #334155; line-height: 1.6;">
        As an independent brokerage, a licensed producer will compare rates across our network of 11+ premier carriers 
        (including Safeco, Travelers, Progressive, and The Hartford) to find you the best coverage at the most competitive price.
      </p>

      <p style="font-size: 14px; color: #334155; line-height: 1.6;">
        A representative will follow up with you via <strong>${data.reachMethod || 'phone'}</strong> within <strong>24 business hours</strong>.
      </p>

      <div style="margin-top: 28px; padding-top: 20px; border-top: 1px solid #e2e8f0; font-size: 13px; color: #64748b;">
        Need immediate assistance or rush certificate processing? Call our Danbury headquarters directly at <strong>(203) 748-9272</strong>.
      </div>
    </div>

    <div style="background-color: #f1f5f9; padding: 16px 32px; font-size: 12px; color: #64748b; text-align: center;">
      © ${new Date().getFullYear()} Associated Insurance Agency. All rights reserved.
    </div>

  </div>
</body>
</html>
  `.trim();
}

/**
 * Sends a quote request email notification to the assigned AIA branch,
 * and an acknowledgement email to the customer.
 */
export async function sendQuoteEmail(data: QuoteEmailData): Promise<SendEmailResult> {
  const officeKey = (data.preferredOffice || 'danbury').toLowerCase();
  const officeInfo = OFFICE_DIRECTORY[officeKey] || OFFICE_DIRECTORY.danbury;

  const { client, fromEmail, defaultRecipient } = getResendClient();
  const recipient = officeInfo.email || defaultRecipient;

  // 1. Simulation / Local Dev Fallback (when RESEND_API_KEY is not yet populated)
  if (!client) {
    const simId = 'sim_' + Math.random().toString(36).substring(2, 10);
    console.info('\n====================================================');
    console.info('📧 [Resend Email Simulated Dispatch]');
    console.info(`To:              ${recipient} (${officeInfo.name})`);
    console.info(`From:            ${fromEmail}`);
    console.info(`Subject:         [New Quote Request] ${data.insuranceType || 'General'} - ${data.name} (${data.confirmationCode})`);
    console.info(`Applicant Phone: ${data.phone}`);
    console.info(`Applicant Email: ${data.email}`);
    console.info(`Line:            ${data.insuranceType}`);
    console.info(`Notes:           ${data.notes || 'None'}`);
    console.info(`Simulation ID:   ${simId}`);
    console.info('💡 Set RESEND_API_KEY in your .env to send real transactional emails via Resend.');
    console.info('====================================================\n');

    return {
      success: true,
      simulated: true,
      id: simId,
      recipient,
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
        { name: 'office', value: officeKey },
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

    // Optionally dispatch customer acknowledgement email if customer provided a valid email
    if (data.email && data.email.includes('@')) {
      try {
        await client.emails.send({
          from: fromEmail,
          to: [data.email],
          subject: `Quote Request Received - Associated Insurance Agency (${data.confirmationCode})`,
          html: buildCustomerConfirmationHtml(data, officeInfo),
          tags: [{ name: 'category', value: 'customer_acknowledgement' }],
        });
      } catch (custErr) {
        // Log customer notification failure without failing the overall submission
        console.warn('[Resend] Customer confirmation email could not be delivered:', custErr);
      }
    }

    return {
      success: true,
      id: emailResponse.data?.id,
      simulated: false,
      recipient,
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
  const recipient = officeInfo.email || defaultRecipient;

  // Dynamically import React, renderer, and email templates on demand
  const React = await import('react');
  const { render } = await import('@react-email/render');
  const { CertificateRequestEmail } = await import('../emails/CertificateRequestEmail');
  const { CertificateConfirmationEmail } = await import('../emails/CertificateConfirmationEmail');

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
    console.info('💡 Set RESEND_API_KEY in your .env to dispatch live emails via Resend.');
    console.info('====================================================\n');

    return {
      success: true,
      simulated: true,
      id: simId,
      recipient,
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

    // Dispatch customer acknowledgement email
    if (data.requestorEmail && data.requestorEmail.includes('@')) {
      try {
        await client.emails.send({
          from: fromEmail,
          to: [data.requestorEmail],
          subject: `Certificate Request Confirmed - Associated Insurance Agency (${data.confirmationCode})`,
          html: customerHtml,
          text: customerText,
          tags: [{ name: 'category', value: 'certificate_customer_confirmation' }],
        });
      } catch (custErr) {
        console.warn('[Resend] Certificate customer confirmation delivery warning:', custErr);
      }
    }

    return {
      success: true,
      id: emailResponse.data?.id,
      simulated: false,
      recipient,
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

