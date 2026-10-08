/**
 * Client-side Google reCAPTCHA v3 utility
 * Dynamically loads the reCAPTCHA v3 script and generates action tokens.
 */

// Google official test site key (always returns score 1.0) used as fallback if env not configured
export const DEFAULT_RECAPTCHA_SITE_KEY = '6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI';

export const RECAPTCHA_SITE_KEY =
  (typeof import.meta !== 'undefined' && import.meta.env?.PUBLIC_RECAPTCHA_SITE_KEY) ||
  DEFAULT_RECAPTCHA_SITE_KEY;

let scriptPromise: Promise<boolean> | null = null;

/**
 * Dynamically loads the Google reCAPTCHA v3 script once on demand.
 */
export function loadRecaptchaScript(siteKey: string = RECAPTCHA_SITE_KEY): Promise<boolean> {
  if (typeof window === 'undefined') return Promise.resolve(false);

  // If already loaded
  if ((window as any).grecaptcha?.execute) {
    return Promise.resolve(true);
  }

  if (scriptPromise) return scriptPromise;

  scriptPromise = new Promise((resolve) => {
    // Check if script tag already exists
    const existing = document.getElementById('google-recaptcha-v3');
    if (existing) {
      if ((window as any).grecaptcha?.ready) {
        (window as any).grecaptcha.ready(() => resolve(true));
      } else {
        resolve(true);
      }
      return;
    }

    const script = document.createElement('script');
    script.id = 'google-recaptcha-v3';
    script.src = `https://www.google.com/recaptcha/api.js?render=${encodeURIComponent(siteKey)}`;
    script.async = true;
    script.defer = true;

    script.onload = () => {
      if ((window as any).grecaptcha?.ready) {
        (window as any).grecaptcha.ready(() => resolve(true));
      } else {
        resolve(true);
      }
    };

    script.onerror = () => {
      console.warn('[reCAPTCHA v3] Script failed to load (blocked by adblocker or offline).');
      resolve(false);
    };

    document.head.appendChild(script);
  });

  return scriptPromise;
}

/**
 * Executes reCAPTCHA v3 and resolves with the token, or null if unvailable / failed.
 *
 * @param action - semantic action name, e.g. 'contact_submit', 'quote_submit'
 */
export async function getRecaptchaToken(action: string): Promise<string | null> {
  if (typeof window === 'undefined') return null;

  try {
    const loaded = await loadRecaptchaScript();
    if (!loaded) return null;

    const grecaptcha = (window as any).grecaptcha;
    if (!grecaptcha || typeof grecaptcha.execute !== 'function') {
      return null;
    }

    return await new Promise((resolve) => {
      grecaptcha.ready(async () => {
        try {
          const token = await grecaptcha.execute(RECAPTCHA_SITE_KEY, { action });
          resolve(token);
        } catch (err) {
          console.warn('[reCAPTCHA v3] Failed to execute token retrieval:', err);
          resolve(null);
        }
      });
    });
  } catch (err) {
    console.warn('[reCAPTCHA v3] Unexpected error getting token:', err);
    return null;
  }
}
