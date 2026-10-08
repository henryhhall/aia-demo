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
      insuranceType,
      preferredOffice = 'Danbury',
      preferredLanguage = 'en',
      currentCarrier = '',
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

    const confirmationCode =
      data.confirmationCode || 'AIA-' + Math.floor(100000 + Math.random() * 900000);

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
      notes,
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
