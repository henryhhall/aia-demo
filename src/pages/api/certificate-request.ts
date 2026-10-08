import type { APIRoute } from 'astro';
import { verifyRecaptcha } from '../../lib/recaptchaVerify';

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

    // 2. Google reCAPTCHA v3 verification
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

    // 3. Mandatory field validations
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

    if (!holderName || !holderAddress1 || !holderCity || !holderState || !holderZip) {
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

    if (!agreementAccepted) {
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

    // 4. Generate unique tracking reference
    const randomSuffix = Math.floor(100000 + Math.random() * 900000);
    const confirmationCode = `COI-CT-${new Date().getFullYear()}-${randomSuffix}`;

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
      holderAddress1,
      holderAddress2,
      holderCity,
      holderState,
      holderZip,
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
      specialInstructions,
      jobNumber,
      waiverSubrogationLines,
      primaryNonContributory: Boolean(primaryNonContributory),
      workState,
      jobPayroll,
      attachedFileName,
      attachedFileSize,
      agreementAccepted: Boolean(agreementAccepted),
      preferredLanguage,
      source,
      recaptchaScore: recaptchaResult.score ?? 1.0,
      submittedAt: new Date().toISOString(),
    };

    certificateSubmissions.unshift(submission);
    if (certificateSubmissions.length > 100) certificateSubmissions.pop();

    return new Response(
      JSON.stringify({
        success: true,
        confirmationCode,
        message: `Certificate request registered successfully for ${insuredName}. Reference: ${confirmationCode}`,
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
