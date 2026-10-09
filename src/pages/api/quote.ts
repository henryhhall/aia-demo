import type { APIRoute } from 'astro';
import { verifyRecaptcha } from '../../lib/recaptchaVerify';

export const prerender = false;

// In-memory submissions store for demo/development
const quoteSubmissions: any[] = [];

export const POST: APIRoute = async ({ request }) => {
  try {
    const data = await request.json();
    const {
      name,
      email,
      phone,
      insuranceType = 'Home',
      preferredOffice = 'Danbury',
      preferredLanguage = 'en',
      currentCarrier = '',
      reachMethod = 'Call',
      reachTime = 'Anytime',
      smsConsent = false,
      anchorData = {},
      producerPrepRationale = '',
      notes = '',
      source = 'Web_Form',
      recaptchaToken,
      // Optional Honeypots
      hp_website = '',
      hp_company = '',
    } = data;

    // Honeypot trap check
    if (hp_website || hp_company) {
      console.warn('[Security / Honeypot] Quote submission blocked via honeypot trap.');
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

    // Google reCAPTCHA v3 verification
    const recaptchaResult = await verifyRecaptcha(recaptchaToken, 'quote_form', 0.5);
    if (!recaptchaResult.success) {
      console.warn('[Security / reCAPTCHA] Quote submission blocked:', recaptchaResult.error);
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

    if (!name || !email || !phone) {
      return new Response(
        JSON.stringify({
          success: false,
          error: 'Missing required fields: name, email, phone are mandatory.',
        }),
        {
          status: 400,
          headers: { 'Content-Type': 'application/json' },
        }
      );
    }

    // Generate formatted prefix per insurance line
    const typePrefix = (insuranceType || 'GEN').substring(0, 3).toUpperCase();
    const confirmationCode =
      data.confirmationCode ||
      `AIA-${typePrefix}-${Math.floor(100000 + Math.random() * 900000)}`;

    // Build synthesized prep brief for the producer if manual notes aren't provided
    let synthesizedNotes = notes;
    if (!synthesizedNotes && anchorData && Object.keys(anchorData).length > 0) {
      const anchorSummaries: string[] = [];
      if (anchorData.propertyAddress) {
        anchorSummaries.push(`Property Address: ${anchorData.propertyAddress}`);
      }
      if (anchorData.vehicles) {
        anchorSummaries.push(`Vehicles / VIN: ${anchorData.vehicles}`);
      }
      if (anchorData.businessName) {
        anchorSummaries.push(`Business Name: ${anchorData.businessName}`);
      }
      if (anchorData.vehicleCount) {
        anchorSummaries.push(`Commercial Vehicles: ${anchorData.vehicleCount}`);
      }
      if (anchorData.underlyingCoverageStatus) {
        anchorSummaries.push(`Underlying Coverage: ${anchorData.underlyingCoverageStatus}`);
      }
      if (anchorData.natureOfBusiness) {
        anchorSummaries.push(`Industry / Trade: ${anchorData.natureOfBusiness}`);
      }
      if (producerPrepRationale) {
        anchorSummaries.push(`Producer Prep Focus: ${producerPrepRationale}`);
      }
      anchorSummaries.push(
        `Contact Preference: Reach via ${reachMethod} (${reachTime}) | SMS Consent: ${
          smsConsent ? 'Granted' : 'Not Granted'
        }`
      );
      synthesizedNotes = anchorSummaries.join(' | ');
    }

    const submission = {
      id: 'sub_' + Math.random().toString(36).substring(2, 9),
      confirmationCode,
      name,
      email,
      phone,
      insuranceType: insuranceType || 'General',
      preferredOffice,
      preferredLanguage,
      currentCarrier,
      reachMethod,
      reachTime,
      smsConsent: Boolean(smsConsent),
      anchorData,
      producerPrepRationale,
      notes: synthesizedNotes || 'No additional notes provided.',
      source,
      ratingPayload: data.ratingPayload || null,
      recaptchaScore: recaptchaResult.score ?? 1.0,
      submittedAt: new Date().toISOString(),
    };

    quoteSubmissions.unshift(submission);
    if (quoteSubmissions.length > 100) quoteSubmissions.pop();

    return new Response(
      JSON.stringify({
        success: true,
        confirmationCode,
        message: `Quote request successfully registered for ${name}.`,
        details: submission,
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
        error: err?.message || 'Internal server error processing quote request.',
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
      count: quoteSubmissions.length,
      submissions: quoteSubmissions.slice(0, 10),
    }),
    {
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
    }
  );
};
