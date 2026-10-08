/**
 * Server-side Google reCAPTCHA v3 verification utility
 * Verifies the submission token against Google's verification API.
 */

export interface RecaptchaVerifyResult {
  success: boolean;
  score?: number;
  action?: string;
  hostname?: string;
  error?: string;
  bypassed?: boolean;
}

export async function verifyRecaptcha(
  token: string | undefined | null,
  expectedAction?: string,
  minScore: number = 0.5
): Promise<RecaptchaVerifyResult> {
  const secretKey =
    (typeof import.meta !== 'undefined' && import.meta.env?.RECAPTCHA_SECRET_KEY) ||
    process.env.RECAPTCHA_SECRET_KEY;

  // Development fallback: If no secret key is configured, allow gracefully
  if (!secretKey) {
    console.info(
      '[reCAPTCHA v3] RECAPTCHA_SECRET_KEY is not defined. Bypassing verification for local development.'
    );
    return {
      success: true,
      score: 1.0,
      bypassed: true,
    };
  }

  // Token is required when secret is provided
  if (!token || typeof token !== 'string' || token.trim().length === 0) {
    return {
      success: false,
      error: 'reCAPTCHA verification token missing.',
    };
  }

  try {
    const params = new URLSearchParams({
      secret: secretKey,
      response: token,
    });

    const response = await fetch('https://www.google.com/recaptcha/api/siteverify', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: params.toString(),
    });

    if (!response.ok) {
      console.error(
        `[reCAPTCHA v3] Google API returned HTTP ${response.status}: ${response.statusText}`
      );
      // Graceful fail-open for network/Google outage so leads are not lost
      return {
        success: true,
        bypassed: true,
        error: `reCAPTCHA service error (HTTP ${response.status})`,
      };
    }

    const data = await response.json();

    if (!data.success) {
      const errorCodes = Array.isArray(data['error-codes'])
        ? data['error-codes'].join(', ')
        : 'verification_failed';

      console.warn('[reCAPTCHA v3] Verification rejected by Google:', errorCodes);
      return {
        success: false,
        error: `reCAPTCHA validation failed (${errorCodes}).`,
      };
    }

    const score = typeof data.score === 'number' ? data.score : 1.0;

    // Check score against threshold (Google default recommendation is 0.5)
    if (score < minScore) {
      console.warn(
        `[reCAPTCHA v3] Low score detected: ${score.toFixed(2)} (threshold: ${minScore}) for action: ${data.action}`
      );
      return {
        success: false,
        score,
        action: data.action,
        error: `Automated traffic detected. Score ${score.toFixed(2)} below acceptable threshold.`,
      };
    }

    // Verify action match if specified
    if (expectedAction && data.action && data.action !== expectedAction) {
      console.warn(
        `[reCAPTCHA v3] Action mismatch. Expected '${expectedAction}', received '${data.action}'`
      );
      return {
        success: false,
        score,
        action: data.action,
        error: `reCAPTCHA action mismatch.`,
      };
    }

    return {
      success: true,
      score,
      action: data.action,
      hostname: data.hostname,
    };
  } catch (err: any) {
    console.error('[reCAPTCHA v3] Unexpected verification error:', err);
    // Graceful fallback to avoid rejecting legitimate leads during network failure
    return {
      success: true,
      bypassed: true,
      error: 'reCAPTCHA verification unavailable.',
    };
  }
}
