import type { APIRoute } from 'astro';
import { verifyRecaptcha } from '../../lib/recaptchaVerify';
import { sendCertificateEmail, type SendEmailResult } from '../../lib/email';

export const prerender = false;

export interface CertificateSubmission {
  id: string;
  confirmationCode: string;
  requestorName: string;
  companyName?: string;
  requestorEmail: string;
  requestorPhone: string;
  requestorFax?: string;
  relationship: string;
  insuredName: string;
  policyNumber?: string;
  preferredOffice: string;
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
  deliveryMethod: string;
  coverages: string[];
  coverageOtherText?: string;
  isAdditionalInsured: boolean;
  hasWrittenContract: boolean;
  additionalInsuredName?: string;
  additionalInsuredAddress?: string;
  additionalInsuredLines: string[];
  jobStartDate?: string;
  neededByDate?: string;
  specialInstructions?: string;
  jobNumber?: string;
  waiverSubrogationLines: string[];
  primaryNonContributory: boolean;
  workState?: string;
  jobPayroll?: string;
  attachedFileName?: string;
  attachedFileSize?: number;
  agreementAccepted: boolean;
  preferredLanguage: string;
  source: string;
  recaptchaScore: number;
  submittedAt: string;
}

// In-memory submissions store for demo/development
const certificateSubmissions: CertificateSubmission[] = [];

export const POST: APIRoute = async ({ request }) => {
  try {
    const data = await request.json();
    const {
      requestorName,
      companyName = '',
      requestorEmail,
      requestorPhone,
      requestorFax = '',
      relationship = 'I am the named insured',
      insuredName,
      policyNumber = '',
      preferredOffice = 'Danbury',
      holderName,
      attentionOf = '',
      holderAddress = '',
      holderAddress1,
      holderAddress2 = '',
      holderCity,
      holderState = 'CT',
      holderZip,
      holderEmail = '',
      holderPhone = '',
      holderFax = '',
      deliveryMethod = 'Email',
      coverages = ['General Liability'],
      coverageOtherText = '',
      isAdditionalInsured = false,
      hasWrittenContract = false,
      additionalInsuredName = '',
      additionalInsuredAddress = '',
      additionalInsuredLines = [],
      jobStartDate = '',
      neededByDate = '',
      specialInstructions = '',
      jobNumber = '',
      jobNumberOrContract = '',
      waiverSubrogationLines = [],
      primaryNonContributory = false,
      workState = 'CT',
      jobPayroll = '',
      attachedFileName = '',
      attachedFileSize = 0,
      agreementAccepted = false,
      preferredLanguage = 'en',
      source = 'Web_Form',
      recaptchaToken,
      // Honeypots
      hp_website = '',
      hp_company = '',
      form_rendered_at,
    } = data;

    // 1. Honeypot check
    if (hp_website || hp_company) {
      console.warn('[Security / Honeypot] Certificate request blocked via honeypot trap.');
      return new Response(
        JSON.stringify({
          success: false,
          error: 'Automated submission detected.',
        }),
        {
          status: 400,
          headers: { 'Content-Type': 'application/json' },
        }
      );
    }

    // Time-based honeypot: humans take at least 1.2s to fill a certificate form
    if (form_rendered_at) {
      const elapsed = Date.now() - Number(form_rendered_at);
      if (elapsed < 1200) {
        console.warn('[Security / Honeypot] Certificate request blocked via rapid form submission:', {
          elapsedMs: elapsed,
        });
        return new Response(
          JSON.stringify({
            success: false,
            error: 'Submission was too fast. Please verify you are human.',
          }),
          {
            status: 400,
            headers: { 'Content-Type': 'application/json' },
          }
        );
      }
    }

    // 2. Google reCAPTCHA v3 verification
    let recaptchaScore = 1.0;
    const isMcpSource = source === 'WebMCP_Tool' || source === 'WebMCP_JSONRPC_Tool';

    if (isMcpSource) {
      // Programmatic tool calls: verify if client supplied a token, otherwise accept tool attribution
      if (recaptchaToken) {
        const recaptchaResult = await verifyRecaptcha(recaptchaToken, 'certificate_request', 0.5);
        recaptchaScore = recaptchaResult.score ?? 1.0;
      }
    } else {
      const recaptchaResult = await verifyRecaptcha(recaptchaToken, 'certificate_request', 0.5);
      if (!recaptchaResult.success) {
        console.warn('[Security / reCAPTCHA] Certificate submission blocked:', recaptchaResult.error);
        return new Response(
          JSON.stringify({
            success: false,
            error: recaptchaResult.error || 'Security verification failed. Please try again.',
          }),
          {
            status: 400,
            headers: { 'Content-Type': 'application/json' },
          }
        );
      }
      recaptchaScore = recaptchaResult.score ?? 1.0;
    }

    // 3. Resolve holder address from combined holderAddress or granular fields
    let resolvedHolderAddress1 = holderAddress1 || '';
    let resolvedHolderCity = holderCity || '';
    let resolvedHolderState = holderState || 'CT';
    let resolvedHolderZip = holderZip || '';

    if (holderAddress && (!resolvedHolderAddress1 || !resolvedHolderCity || !resolvedHolderZip)) {
      const parts = holderAddress.split(',').map((p: string) => p.trim());
      if (parts.length >= 3) {
        resolvedHolderAddress1 = resolvedHolderAddress1 || parts[0];
        resolvedHolderCity = resolvedHolderCity || parts[1];
        const lastPart = parts.slice(2).join(' ').trim();
        const match = lastPart.match(/^([A-Za-z]{2})\s*(\d{5}(-\d{4})?)?$/);
        if (match) {
          resolvedHolderState = resolvedHolderState || match[1].toUpperCase();
          if (match[2]) resolvedHolderZip = resolvedHolderZip || match[2];
        } else {
          const stateZip = lastPart.split(/\s+/);
          if (stateZip.length >= 2) {
            resolvedHolderState = resolvedHolderState || stateZip[0];
            resolvedHolderZip = resolvedHolderZip || stateZip[1];
          } else {
            resolvedHolderZip = resolvedHolderZip || stateZip[0];
          }
        }
      } else if (parts.length === 2) {
        resolvedHolderAddress1 = resolvedHolderAddress1 || parts[0];
        resolvedHolderCity = resolvedHolderCity || parts[1];
        resolvedHolderZip = resolvedHolderZip || '06810';
      } else {
        resolvedHolderAddress1 = resolvedHolderAddress1 || holderAddress;
        resolvedHolderCity = resolvedHolderCity || 'Danbury';
        resolvedHolderZip = resolvedHolderZip || '06810';
      }
    }

    // 4. Mandatory field validations
    if (!requestorName || !requestorEmail || !requestorPhone) {
      return new Response(
        JSON.stringify({
          success: false,
          error: 'Requestor name, email, and phone number are required.',
        }),
        {
          status: 400,
          headers: { 'Content-Type': 'application/json' },
        }
      );
    }

    if (!insuredName) {
      return new Response(
        JSON.stringify({
          success: false,
          error: 'Name of the insured policyholder is required.',
        }),
        {
          status: 400,
          headers: { 'Content-Type': 'application/json' },
        }
      );
    }

    if (!holderName || !resolvedHolderAddress1 || !resolvedHolderCity || !resolvedHolderState || !resolvedHolderZip) {
      return new Response(
        JSON.stringify({
          success: false,
          error: 'Complete certificate holder name and physical address are required.',
        }),
        {
          status: 400,
          headers: { 'Content-Type': 'application/json' },
        }
      );
    }

    const finalAgreementAccepted = Boolean(agreementAccepted || isMcpSource);
    if (!finalAgreementAccepted) {
      return new Response(
        JSON.stringify({
          success: false,
          error: 'You must accept the legal agreement acknowledgement before submitting.',
        }),
        {
          status: 400,
          headers: { 'Content-Type': 'application/json' },
        }
      );
    }

    // 5. Generate unique tracking reference
    const randomSuffix = Math.floor(100000 + Math.random() * 900000);
    const confirmationCode =
      data.confirmationCode || `COI-CT-${new Date().getFullYear()}-${randomSuffix}`;

    const submission: CertificateSubmission = {
      id: 'cert_' + Math.random().toString(36).substring(2, 9),
      confirmationCode,
      requestorName,
      companyName,
      requestorEmail,
      requestorPhone,
      requestorFax,
      relationship,
      insuredName,
      policyNumber,
      preferredOffice,
      holderName,
      attentionOf,
      holderAddress1: resolvedHolderAddress1,
      holderAddress2,
      holderCity: resolvedHolderCity,
      holderState: resolvedHolderState,
      holderZip: resolvedHolderZip,
      holderEmail,
      holderPhone,
      holderFax,
      deliveryMethod,
      coverages,
      coverageOtherText,
      isAdditionalInsured: Boolean(isAdditionalInsured),
      hasWrittenContract: Boolean(hasWrittenContract),
      additionalInsuredName,
      additionalInsuredAddress,
      additionalInsuredLines,
      jobStartDate,
      neededByDate,
      specialInstructions: specialInstructions || (isMcpSource ? 'Submitted via WebMCP tool request.' : ''),
      jobNumber: jobNumber || jobNumberOrContract || '',
      waiverSubrogationLines,
      primaryNonContributory: Boolean(primaryNonContributory),
      workState,
      jobPayroll,
      attachedFileName,
      attachedFileSize,
      agreementAccepted: finalAgreementAccepted,
      preferredLanguage,
      source,
      recaptchaScore,
      submittedAt: new Date().toISOString(),
    };

    certificateSubmissions.unshift(submission);
    if (certificateSubmissions.length > 100) certificateSubmissions.pop();

    // Dispatch email notifications via Resend & React Email
    let emailResult: SendEmailResult = { success: false };
    try {
      emailResult = await sendCertificateEmail(submission);
    } catch (emailErr: any) {
      console.error('[API /certificate-request] Error during sendCertificateEmail:', emailErr);
    }

    return new Response(
      JSON.stringify({
        success: true,
        confirmationCode,
        message: `Certificate request registered successfully for ${insuredName}. Reference: ${confirmationCode}`,
        emailDispatched: emailResult.success,
        emailDetails: {
          simulated: emailResult.simulated ?? false,
          id: emailResult.id,
          recipient: emailResult.recipient,
        },
        details: {
          confirmationCode,
          insuredName,
          holderName,
          preferredOffice,
          deliveryMethod,
          coverages,
          estimatedTurnaround: '2-4 business hours (Mon-Fri 8:30 AM - 5:00 PM EST)',
        },
      }),
      {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
      }
    );
  } catch (err: any) {
    return new Response(
      JSON.stringify({
        success: false,
        error: err?.message || 'Internal server error processing certificate request.',
      }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }
};

export const GET: APIRoute = async () => {
  return new Response(
    JSON.stringify({
      count: certificateSubmissions.length,
      submissions: certificateSubmissions.slice(0, 10),
    }),
    {
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
    }
  );
};
