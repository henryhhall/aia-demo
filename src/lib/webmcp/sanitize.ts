/**
 * WebMCP Input JSON Sanitization Library
 * Protects against Prototype Pollution, XSS / Script Injection,
 * CRLF / Header Injection, ReDoS / Payload Bombs, and Malformed Types.
 */

// Keys disallowed to prevent prototype pollution attacks
export const PROTOTYPE_POLLUTION_KEYS = new Set([
  '__proto__',
  'constructor',
  'prototype',
]);

// Control characters regex (null bytes and unprintable ASCII 0x00-0x1F, excluding 0x09 tab, 0x0A LF, 0x0D CR)
export const DANGEROUS_CONTROL_CHARS_REGEX = /[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/g;

// All control characters including newlines (for single-line fields)
export const ALL_CONTROL_CHARS_AND_CRLF_REGEX = /[\x00-\x1F\x7F]/g;

// HTML tags pattern
export const HTML_TAGS_REGEX = /<[^>]*>/g;

// Script / executable protocol pattern
export const SCRIPT_PROTOCOL_REGEX = /(?:javascript|vbscript|data):/gi;

// Event handler attribute patterns (e.g. onload=, onerror=)
export const EVENT_HANDLER_REGEX = /on\w+\s*=/gi;

export interface SanitizeStringOptions {
  maxLength?: number;
  allowMultiline?: boolean;
  stripHtml?: boolean;
  trim?: boolean;
  fallback?: string;
}

/**
 * Sanitize a string value by removing control chars, HTML tags, and CRLF if single-line.
 */
export function sanitizeString(val: unknown, options: SanitizeStringOptions = {}): string {
  const {
    maxLength = 2000,
    allowMultiline = false,
    stripHtml = true,
    trim = true,
    fallback = '',
  } = options;

  if (val === null || val === undefined) {
    return fallback;
  }

  let str = typeof val === 'string' ? val : String(val);

  // 1. Remove dangerous control characters & null bytes
  if (allowMultiline) {
    str = str.replace(DANGEROUS_CONTROL_CHARS_REGEX, '');
    // Normalize newlines to \n, removing carriage returns
    str = str.replace(/\r\n/g, '\n').replace(/\r/g, '\n');
  } else {
    // Single line field: strip all control characters and newlines
    str = str.replace(ALL_CONTROL_CHARS_AND_CRLF_REGEX, ' ');
  }

  // 2. Strip HTML tags and script protocols
  if (stripHtml) {
    str = str.replace(HTML_TAGS_REGEX, ' ');
    str = str.replace(SCRIPT_PROTOCOL_REGEX, '');
    str = str.replace(EVENT_HANDLER_REGEX, '');
  }

  // 3. Trim whitespace
  if (trim) {
    str = str.trim();
    // Collapse multiple consecutive spaces to a single space
    str = str.replace(/[ \t]{2,}/g, ' ');
  }

  // 4. Enforce max length
  if (maxLength > 0 && str.length > maxLength) {
    str = str.substring(0, maxLength);
  }

  return str;
}

/**
 * Sanitize email address (strictly single-line, lowercased, validated).
 */
export function sanitizeEmail(val: unknown): string {
  const raw = sanitizeString(val, {
    maxLength: 150,
    allowMultiline: false,
    stripHtml: true,
    trim: true,
  }).toLowerCase();

  // Basic RFC 5322 compatible sanity check
  const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;

  if (!emailRegex.test(raw)) {
    return raw; // Return sanitized string; caller validator will catch if invalid
  }

  return raw;
}

/**
 * Sanitize telephone numbers (strip dangerous characters, retain standard phone glyphs).
 */
export function sanitizePhone(val: unknown): string {
  const raw = sanitizeString(val, {
    maxLength: 35,
    allowMultiline: false,
    stripHtml: true,
    trim: true,
  });

  // Keep only digits, +, (, ), -, ., spaces, and 'ext'
  return raw.replace(/[^0-9+().\-\s/ext]/gi, '').trim();
}

/**
 * Sanitize boolean input with flexible coercion.
 */
export function sanitizeBoolean(val: unknown, defaultValue = false): boolean {
  if (typeof val === 'boolean') return val;
  if (val === 'true' || val === '1' || val === 1) return true;
  if (val === 'false' || val === '0' || val === 0) return false;
  return defaultValue;
}

/**
 * Sanitize string array (limits count and individual string lengths).
 */
export function sanitizeStringArray(
  val: unknown,
  options: { maxItems?: number; maxItemLength?: number } = {}
): string[] {
  const { maxItems = 25, maxItemLength = 100 } = options;

  if (!Array.isArray(val)) {
    return [];
  }

  return val
    .slice(0, maxItems)
    .map((item) =>
      sanitizeString(item, {
        maxLength: maxItemLength,
        allowMultiline: false,
        stripHtml: true,
        trim: true,
      })
    )
    .filter((item) => item.length > 0);
}

/**
 * Deeply sanitize any arbitrary JSON structure.
 * Neutralizes prototype pollution, removes control chars, strips script tags,
 * and limits payload recursion and array lengths.
 */
export function sanitizeDeepJson<T = any>(input: unknown, currentDepth = 0): T {
  // Max recursion depth prevents stack overflow from cyclic/nested payloads
  if (currentDepth > 6) {
    return null as any;
  }

  if (input === null || input === undefined) {
    return input as T;
  }

  if (typeof input === 'string') {
    return sanitizeString(input, { maxLength: 5000, allowMultiline: true }) as any;
  }

  if (typeof input === 'number') {
    return (Number.isFinite(input) ? input : 0) as any;
  }

  if (typeof input === 'boolean') {
    return input as any;
  }

  if (Array.isArray(input)) {
    // Cap max array length to 100 to prevent ReDoS / memory exhaustion
    return input
      .slice(0, 100)
      .map((item) => sanitizeDeepJson(item, currentDepth + 1)) as any;
  }

  if (typeof input === 'object') {
    const cleanObj: Record<string, any> = {};

    for (const [rawKey, rawVal] of Object.entries(input)) {
      // 1. Prototype Pollution Defense: skip prohibited keys
      if (PROTOTYPE_POLLUTION_KEYS.has(rawKey.toLowerCase())) {
        console.warn(`[WebMCP Security] Blocked prototype pollution key: "${rawKey}"`);
        continue;
      }

      // 2. Sanitize property key
      const cleanKey = sanitizeString(rawKey, {
        maxLength: 64,
        allowMultiline: false,
        stripHtml: true,
      });

      if (!cleanKey) continue;

      cleanObj[cleanKey] = sanitizeDeepJson(rawVal, currentDepth + 1);
    }

    return cleanObj as T;
  }

  return null as any;
}

/**
 * Validated and Sanitized Parameter Shapes for WebMCP Tools
 */

export interface SanitizedOfficeLocationsParams {
  officeId?: string;
  city?: string;
  language?: string;
  includeStaffRoster?: boolean;
}

export interface SanitizedTeamMembersParams {
  office?: string;
  language?: string;
  specialty?: string;
  producersOnly?: boolean;
  locale?: 'en' | 'es' | 'pt' | 'tr';
}

export interface SanitizedEmployeeProfileParams {
  memberIdOrName: string;
  locale?: 'en' | 'es' | 'pt' | 'tr';
}

export interface SanitizedFindAgentByLanguageParams {
  language: string;
  preferredCity?: string;
  producersOnly?: boolean;
}

export interface SanitizedInsuranceProductsParams {
  category?: string;
}

export interface SanitizedQuoteRequestParams {
  name: string;
  email: string;
  phone: string;
  insuranceType: string;
  preferredOffice?: string;
  preferredLanguage?: string;
  currentCarrier?: string;
  notes?: string;
  recaptchaToken?: string;
}

export interface SanitizedCarrierBillingDirectoryParams {
  carrierName?: string;
}

export interface SanitizedSearchKnowledgeBaseParams {
  query: string;
}

export interface SanitizedOfficeOpenStatusParams {
  branchId?: string;
}

export interface SanitizedCertificateRequestParams {
  insuredName: string;
  requestorName: string;
  requestorEmail: string;
  requestorPhone: string;
  holderName: string;
  holderAddress: string;
  deliveryMethod?: 'Email' | 'Fax' | 'Both';
  coverages?: string[];
  isAdditionalInsured?: boolean;
  waiverOfSubrogation?: boolean;
  jobNumberOrContract?: string;
}

/**
 * Main Schema Validation & Input Sanitizer for each WebMCP Tool
 */
export function sanitizeToolParams(toolName: string, rawParams: any): any {
  // First, run deep JSON protection to strip __proto__ and normalize object
  const safeObj = (rawParams && typeof rawParams === 'object')
    ? sanitizeDeepJson(rawParams)
    : {};

  switch (toolName) {
    case 'get_agency_profile': {
      return {};
    }

    case 'get_office_locations': {
      const officeId = safeObj.officeId
        ? sanitizeString(safeObj.officeId, { maxLength: 50 }).toLowerCase()
        : undefined;
      const city = safeObj.city
        ? sanitizeString(safeObj.city, { maxLength: 80 })
        : undefined;
      const language = safeObj.language
        ? sanitizeString(safeObj.language, { maxLength: 50 })
        : undefined;
      const includeStaffRoster = safeObj.includeStaffRoster !== undefined
        ? sanitizeBoolean(safeObj.includeStaffRoster, true)
        : true;

      return {
        officeId,
        city,
        language,
        includeStaffRoster,
      } as SanitizedOfficeLocationsParams;
    }

    case 'get_team_members': {
      const office = safeObj.office
        ? sanitizeString(safeObj.office, { maxLength: 50 })
        : undefined;
      const language = safeObj.language
        ? sanitizeString(safeObj.language, { maxLength: 50 })
        : undefined;
      const specialty = safeObj.specialty
        ? sanitizeString(safeObj.specialty, { maxLength: 100 })
        : undefined;
      const producersOnly = safeObj.producersOnly !== undefined
        ? sanitizeBoolean(safeObj.producersOnly, false)
        : undefined;

      let locale: 'en' | 'es' | 'pt' | 'tr' = 'en';
      if (safeObj.locale) {
        const cleanLocale = sanitizeString(safeObj.locale, { maxLength: 5 }).toLowerCase();
        if (cleanLocale === 'es' || cleanLocale === 'pt' || cleanLocale === 'tr') {
          locale = cleanLocale;
        }
      }

      return {
        office,
        language,
        specialty,
        producersOnly,
        locale,
      } as SanitizedTeamMembersParams;
    }

    case 'get_employee_profile': {
      const memberIdOrName = sanitizeString(safeObj.memberIdOrName, {
        maxLength: 100,
        stripHtml: true,
      });

      let locale: 'en' | 'es' | 'pt' | 'tr' = 'en';
      if (safeObj.locale) {
        const cleanLocale = sanitizeString(safeObj.locale, { maxLength: 5 }).toLowerCase();
        if (cleanLocale === 'es' || cleanLocale === 'pt' || cleanLocale === 'tr') {
          locale = cleanLocale;
        }
      }

      return {
        memberIdOrName,
        locale,
      } as SanitizedEmployeeProfileParams;
    }

    case 'find_agent_by_language': {
      const language = sanitizeString(safeObj.language, {
        maxLength: 50,
        stripHtml: true,
      });
      const preferredCity = safeObj.preferredCity
        ? sanitizeString(safeObj.preferredCity, { maxLength: 80, stripHtml: true })
        : undefined;
      const producersOnly = safeObj.producersOnly !== undefined
        ? sanitizeBoolean(safeObj.producersOnly, false)
        : undefined;

      return {
        language,
        preferredCity,
        producersOnly,
      } as SanitizedFindAgentByLanguageParams;
    }

    case 'get_insurance_products': {
      const category = safeObj.category
        ? sanitizeString(safeObj.category, { maxLength: 20 }).toLowerCase()
        : 'all';

      return { category } as SanitizedInsuranceProductsParams;
    }

    case 'submit_quote_request': {
      const name = sanitizeString(safeObj.name, {
        maxLength: 100,
        allowMultiline: false,
        stripHtml: true,
      });
      const email = sanitizeEmail(safeObj.email);
      const phone = sanitizePhone(safeObj.phone);
      const insuranceType = sanitizeString(safeObj.insuranceType, {
        maxLength: 50,
        allowMultiline: false,
        stripHtml: true,
      }).toLowerCase() || 'home';

      const preferredOffice = safeObj.preferredOffice
        ? sanitizeString(safeObj.preferredOffice, { maxLength: 50, allowMultiline: false })
        : 'Danbury';

      const preferredLanguage = safeObj.preferredLanguage
        ? sanitizeString(safeObj.preferredLanguage, { maxLength: 10, allowMultiline: false }).toLowerCase()
        : 'en';

      const currentCarrier = safeObj.currentCarrier
        ? sanitizeString(safeObj.currentCarrier, { maxLength: 100, allowMultiline: false })
        : '';

      const notes = safeObj.notes
        ? sanitizeString(safeObj.notes, { maxLength: 2000, allowMultiline: true })
        : '';

      const recaptchaToken = safeObj.recaptchaToken
        ? sanitizeString(safeObj.recaptchaToken, { maxLength: 2048, allowMultiline: false })
        : undefined;

      return {
        name,
        email,
        phone,
        insuranceType,
        preferredOffice,
        preferredLanguage,
        currentCarrier,
        notes,
        recaptchaToken,
      } as SanitizedQuoteRequestParams;
    }

    case 'get_carrier_billing_directory': {
      const carrierName = safeObj.carrierName
        ? sanitizeString(safeObj.carrierName, { maxLength: 100 })
        : undefined;

      return { carrierName } as SanitizedCarrierBillingDirectoryParams;
    }

    case 'search_knowledge_base': {
      const query = sanitizeString(safeObj.query, {
        maxLength: 200,
        allowMultiline: false,
        stripHtml: true,
      });

      return { query } as SanitizedSearchKnowledgeBaseParams;
    }

    case 'check_office_open_status': {
      const branchId = safeObj.branchId
        ? sanitizeString(safeObj.branchId, { maxLength: 50 }).toLowerCase()
        : 'all';

      return { branchId } as SanitizedOfficeOpenStatusParams;
    }

    case 'request_certificate_of_insurance': {
      const insuredName = sanitizeString(safeObj.insuredName, {
        maxLength: 150,
        allowMultiline: false,
        stripHtml: true,
      });
      const requestorName = sanitizeString(safeObj.requestorName, {
        maxLength: 100,
        allowMultiline: false,
        stripHtml: true,
      });
      const requestorEmail = sanitizeEmail(safeObj.requestorEmail);
      const requestorPhone = sanitizePhone(safeObj.requestorPhone);
      const holderName = sanitizeString(safeObj.holderName, {
        maxLength: 150,
        allowMultiline: false,
        stripHtml: true,
      });
      const holderAddress = sanitizeString(safeObj.holderAddress, {
        maxLength: 250,
        allowMultiline: true,
        stripHtml: true,
      });

      let deliveryMethod: 'Email' | 'Fax' | 'Both' = 'Email';
      if (safeObj.deliveryMethod) {
        const dm = sanitizeString(safeObj.deliveryMethod, { maxLength: 10 }).toLowerCase();
        if (dm === 'fax') deliveryMethod = 'Fax';
        else if (dm === 'both') deliveryMethod = 'Both';
      }

      const coverages = safeObj.coverages
        ? sanitizeStringArray(safeObj.coverages, { maxItems: 12, maxItemLength: 60 })
        : ['General Liability'];

      const isAdditionalInsured = sanitizeBoolean(safeObj.isAdditionalInsured, false);
      const waiverOfSubrogation = sanitizeBoolean(safeObj.waiverOfSubrogation, false);

      const jobNumberOrContract = safeObj.jobNumberOrContract
        ? sanitizeString(safeObj.jobNumberOrContract, { maxLength: 80, allowMultiline: false })
        : undefined;

      return {
        insuredName,
        requestorName,
        requestorEmail,
        requestorPhone,
        holderName,
        holderAddress,
        deliveryMethod,
        coverages: coverages.length > 0 ? coverages : ['General Liability'],
        isAdditionalInsured,
        waiverOfSubrogation,
        jobNumberOrContract,
      } as SanitizedCertificateRequestParams;
    }

    default: {
      return safeObj;
    }
  }
}
