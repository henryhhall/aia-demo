import type { APIRoute } from 'astro';

export const prerender = false;

// In-memory submissions store for contact inquiries
const contactSubmissions: any[] = [];

export const POST: APIRoute = async ({ request }) => {
  try {
    const data = await request.json();
    const {
      name,
      email,
      phone,
      preferredOffice = 'Danbury',
      subject = 'General Inquiry',
      message,
      preferredLanguage = 'en',
      // Honeypot fields
      hp_website = '',
      hp_company = '',
      form_rendered_at,
    } = data;

    // Honeypot bot protection: if any honeypot trap field is filled, reject as bot spam
    if (hp_website || hp_company) {
      console.warn('[Security / Honeypot] Bot submission blocked via hidden field trap:', {
        hp_website,
        hp_company,
        ip: request.headers.get('x-forwarded-for') || 'unknown',
      });
      return new Response(
        JSON.stringify({
          success: false,
          error: 'Automated submission detected. Request rejected.',
        }),
        {
          status: 400,
          headers: { 'Content-Type': 'application/json' },
        }
      );
    }

    // Time-based honeypot: humans take at least 1.5s to fill a contact form
    if (form_rendered_at) {
      const elapsed = Date.now() - Number(form_rendered_at);
      if (elapsed < 1200) {
        console.warn('[Security / Honeypot] Bot submission blocked via rapid form submission:', {
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

    // Standard required field validation
    if (!name || !email || !message) {
      return new Response(
        JSON.stringify({
          success: false,
          error: 'Missing required fields: Name, Email, and Message are required.',
        }),
        {
          status: 400,
          headers: { 'Content-Type': 'application/json' },
        }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return new Response(
        JSON.stringify({
          success: false,
          error: 'Please provide a valid email address.',
        }),
        {
          status: 400,
          headers: { 'Content-Type': 'application/json' },
        }
      );
    }

    const inquiryId = 'inq_' + Math.random().toString(36).substring(2, 9);
    const submission = {
      id: inquiryId,
      name,
      email,
      phone: phone || 'N/A',
      preferredOffice,
      subject,
      message,
      preferredLanguage,
      submittedAt: new Date().toISOString(),
    };

    contactSubmissions.unshift(submission);
    if (contactSubmissions.length > 100) contactSubmissions.pop();

    return new Response(
      JSON.stringify({
        success: true,
        id: inquiryId,
        message: 'Your message has been received. A licensed AIA agent will contact you shortly.',
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
        error: err?.message || 'Server error processing contact inquiry.',
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
      count: contactSubmissions.length,
      submissions: contactSubmissions.slice(0, 10),
    }),
    {
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
    }
  );
};
