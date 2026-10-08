import { z } from 'zod';

/**
 * Step 1: Property Location & Basics Schema
 */
export const step1LocationSchema = z.object({
  streetAddress: z
    .string()
    .trim()
    .min(3, { message: 'Street address is required (at least 3 characters).' })
    .max(120, { message: 'Street address cannot exceed 120 characters.' }),
  unit: z
    .string()
    .trim()
    .max(20, { message: 'Apt/Unit cannot exceed 20 characters.' })
    .default(''),
  city: z
    .string()
    .trim()
    .min(2, { message: 'City is required.' })
    .max(60, { message: 'City name is too long.' }),
  state: z
    .string()
    .trim()
    .length(2, { message: 'Please select a valid 2-letter state code.' })
    .default('CT'),
  zipCode: z
    .string()
    .trim()
    .regex(/^\d{5}(-\d{4})?$/, { message: 'Enter a valid 5-digit US ZIP code (e.g. 06810).' }),
  propertyType: z.enum(['single_family', 'condo_townhouse', 'multi_family', 'mobile_home'], {
    message: 'Please select a property type.',
  }),
  primaryUsage: z.enum(['primary', 'secondary_vacation', 'rental'], {
    message: 'Please select primary usage of this property.',
  }),
  yearBuilt: z
    .number({ message: 'Year built must be a 4-digit number.' })
    .int({ message: 'Year built must be a whole integer.' })
    .min(1700, { message: 'Year built cannot be earlier than 1700.' })
    .max(new Date().getFullYear() + 1, {
      message: `Year built cannot exceed ${new Date().getFullYear() + 1}.`,
    }),
});

/**
 * Step 2: Construction & Structural Details Schema
 */
export const step2ConstructionSchema = z.object({
  squareFootage: z
    .number({ message: 'Square footage is required.' })
    .int({ message: 'Square footage must be an integer.' })
    .min(250, { message: 'Square footage must be at least 250 sq ft.' })
    .max(30000, { message: 'Square footage exceeds standard residential limit (30,000 sq ft).' }),
  stories: z.enum(['1', '1.5', '2', '2.5', '3+'], {
    message: 'Please specify the number of stories.',
  }),
  roofMaterial: z.enum(['asphalt_shingle', 'metal', 'tile', 'slate', 'flat_rubber'], {
    message: 'Please select the roof material/type.',
  }),
  roofAge: z.enum(['0-5', '6-10', '11-20', '20+', 'unknown'], {
    message: 'Please select the estimated roof age.',
  }),
  foundationType: z.enum(['basement_finished', 'basement_unfinished', 'crawlspace', 'slab'], {
    message: 'Please select the foundation type.',
  }),
  exteriorWallType: z.enum(['vinyl_siding', 'brick_veneer', 'stucco', 'wood', 'stone'], {
    message: 'Please select the exterior wall material.',
  }),
});

/**
 * Step 3: Safety, Features & Risk Factors Schema Base
 */
export const step3SafetyBaseSchema = z.object({
  distanceToHydrant: z.enum(['under_1000', 'over_1000', 'unknown'], {
    message: 'Please select distance to the nearest fire hydrant.',
  }),
  protectiveDevices: z
    .array(
      z.enum([
        'smoke_detectors',
        'burglar_alarm',
        'central_station_fire',
        'sprinkler_system',
        'deadbolts',
      ])
    )
    .default([]),
  hasPool: z.boolean().default(false),
  poolFenceStatus: z.enum(['fenced', 'unfenced', 'none']).default('none'),
  hasTrampolineOrRamp: z.boolean().default(false),
  hasDog: z.boolean().default(false),
  dogBreed: z.string().trim().max(80, { message: 'Dog breed description is too long.' }).default(''),
  priorClaims: z.enum(['0', '1', '2', '3+'], {
    message: 'Please specify prior claims in the last 5 years.',
  }),
});

export const step3SafetySchema = step3SafetyBaseSchema.superRefine((data, ctx) => {
  if (data.hasPool) {
    if (data.poolFenceStatus !== 'fenced' && data.poolFenceStatus !== 'unfenced') {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['poolFenceStatus'],
        message: 'Because a pool is present, please indicate if it is fenced or unfenced.',
      });
    }
  }
});

/**
 * Step 4: Contact & Coverage Preferences Schema
 */
export const step4ContactSchema = z.object({
  coverageStartDate: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, { message: 'Please select a valid date in YYYY-MM-DD format.' })
    .refine(
      (dateStr) => {
        const selected = new Date(dateStr + 'T00:00:00');
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        return selected >= today;
      },
      { message: 'Desired start date cannot be in the past.' }
    ),
  estimatedHomeValue: z
    .number({ message: 'Estimated home value is required.' })
    .min(50000, { message: 'Estimated home value must be at least $50,000.' })
    .max(25000000, { message: 'Home value exceeds online quote limit ($25,000,000).' }),
  replacementCostPreference: z.enum(['standard_100', 'extended_125', 'guaranteed'], {
    message: 'Please choose a replacement cost preference.',
  }),
  deductible: z.enum(['500', '1000', '2500', '5000'], {
    message: 'Please select your deductible preference.',
  }),
  firstName: z
    .string()
    .trim()
    .min(2, { message: 'First name must be at least 2 characters.' })
    .max(50, { message: 'First name is too long.' }),
  lastName: z
    .string()
    .trim()
    .min(2, { message: 'Last name must be at least 2 characters.' })
    .max(50, { message: 'Last name is too long.' }),
  email: z
    .string()
    .trim()
    .email({ message: 'Please enter a valid email address (e.g. name@example.com).' }),
  phone: z
    .string()
    .trim()
    .regex(/^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/, {
      message: 'Enter a valid 10-digit phone number (e.g. 203-748-9272).',
    }),
  insuranceStatus: z.enum(['currently_insured', 'renewal_lapse', 'first_time_homebuyer'], {
    message: 'Please select your current insurance status.',
  }),
});

/**
 * Root Schema: Combines all four steps with cross-field validation
 */
export const homeownersQuoteRootSchema = z
  .object({
    // Step 1
    streetAddress: step1LocationSchema.shape.streetAddress,
    unit: step1LocationSchema.shape.unit,
    city: step1LocationSchema.shape.city,
    state: step1LocationSchema.shape.state,
    zipCode: step1LocationSchema.shape.zipCode,
    propertyType: step1LocationSchema.shape.propertyType,
    primaryUsage: step1LocationSchema.shape.primaryUsage,
    yearBuilt: step1LocationSchema.shape.yearBuilt,

    // Step 2
    squareFootage: step2ConstructionSchema.shape.squareFootage,
    stories: step2ConstructionSchema.shape.stories,
    roofMaterial: step2ConstructionSchema.shape.roofMaterial,
    roofAge: step2ConstructionSchema.shape.roofAge,
    foundationType: step2ConstructionSchema.shape.foundationType,
    exteriorWallType: step2ConstructionSchema.shape.exteriorWallType,

    // Step 3
    distanceToHydrant: step3SafetyBaseSchema.shape.distanceToHydrant,
    protectiveDevices: step3SafetyBaseSchema.shape.protectiveDevices,
    hasPool: step3SafetyBaseSchema.shape.hasPool,
    poolFenceStatus: step3SafetyBaseSchema.shape.poolFenceStatus,
    hasTrampolineOrRamp: step3SafetyBaseSchema.shape.hasTrampolineOrRamp,
    hasDog: step3SafetyBaseSchema.shape.hasDog,
    dogBreed: step3SafetyBaseSchema.shape.dogBreed,
    priorClaims: step3SafetyBaseSchema.shape.priorClaims,

    // Step 4
    coverageStartDate: step4ContactSchema.shape.coverageStartDate,
    estimatedHomeValue: step4ContactSchema.shape.estimatedHomeValue,
    replacementCostPreference: step4ContactSchema.shape.replacementCostPreference,
    deductible: step4ContactSchema.shape.deductible,
    firstName: step4ContactSchema.shape.firstName,
    lastName: step4ContactSchema.shape.lastName,
    email: step4ContactSchema.shape.email,
    phone: step4ContactSchema.shape.phone,
    insuranceStatus: step4ContactSchema.shape.insuranceStatus,
  }).superRefine((data, ctx) => {
  if (data.hasPool && data.poolFenceStatus !== 'fenced' && data.poolFenceStatus !== 'unfenced') {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      path: ['poolFenceStatus'],
      message: 'Pool is present; please specify if it is fenced or unfenced.',
    });
  }
});

// Inferred TypeScript Types
export type Step1LocationData = z.infer<typeof step1LocationSchema>;
export type Step2ConstructionData = z.infer<typeof step2ConstructionSchema>;
export type Step3SafetyData = z.infer<typeof step3SafetySchema>;
export type Step4ContactData = z.infer<typeof step4ContactSchema>;
export type HomeownersQuoteFormData = z.infer<typeof homeownersQuoteRootSchema>;

/**
 * Initial Form State
 */
export const defaultHomeownersFormData: HomeownersQuoteFormData = {
  // Step 1
  streetAddress: '',
  unit: '',
  city: '',
  state: 'CT',
  zipCode: '',
  propertyType: 'single_family',
  primaryUsage: 'primary',
  yearBuilt: 1995,

  // Step 2
  squareFootage: 2200,
  stories: '2',
  roofMaterial: 'asphalt_shingle',
  roofAge: '6-10',
  foundationType: 'basement_finished',
  exteriorWallType: 'vinyl_siding',

  // Step 3
  distanceToHydrant: 'under_1000',
  protectiveDevices: ['smoke_detectors', 'deadbolts'],
  hasPool: false,
  poolFenceStatus: 'none',
  hasTrampolineOrRamp: false,
  hasDog: false,
  dogBreed: '',
  priorClaims: '0',

  // Step 4
  coverageStartDate: new Date(Date.now() + 86400000 * 7).toISOString().split('T')[0],
  estimatedHomeValue: 450000,
  replacementCostPreference: 'extended_125',
  deductible: '1000',
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  insuranceStatus: 'currently_insured',
};

/**
 * Display Option Labels & Enums
 */
export const PROPERTY_TYPE_OPTIONS = [
  { value: 'single_family', label: 'Single-family Home', desc: 'Detached standalone residential house' },
  { value: 'condo_townhouse', label: 'Condo / Townhouse', desc: 'Attached unit or condominium development' },
  { value: 'multi_family', label: 'Multi-family (2-4 Units)', desc: 'Duplex, triplex, or 4-unit residential building' },
  { value: 'mobile_home', label: 'Mobile / Manufactured', desc: 'Prefabricated manufactured home structure' },
] as const;

export const PRIMARY_USAGE_OPTIONS = [
  { value: 'primary', label: 'Primary Residence', desc: 'You live here most of the year' },
  { value: 'secondary_vacation', label: 'Secondary / Vacation', desc: 'Seasonal retreat or weekend getaway' },
  { value: 'rental', label: 'Rental Property', desc: 'Tenant-occupied investment property' },
] as const;

export const STORIES_OPTIONS = [
  { value: '1', label: '1 Story' },
  { value: '1.5', label: '1.5 Stories' },
  { value: '2', label: '2 Stories' },
  { value: '2.5', label: '2.5 Stories' },
  { value: '3+', label: '3+ Stories' },
] as const;

export const ROOF_MATERIAL_OPTIONS = [
  { value: 'asphalt_shingle', label: 'Asphalt Shingle' },
  { value: 'metal', label: 'Metal (Standing Seam)' },
  { value: 'tile', label: 'Clay / Concrete Tile' },
  { value: 'slate', label: 'Natural Slate' },
  { value: 'flat_rubber', label: 'Flat / Rubber Membrane' },
] as const;

export const ROOF_AGE_OPTIONS = [
  { value: '0-5', label: '0–5 years (Newer)' },
  { value: '6-10', label: '6–10 years' },
  { value: '11-20', label: '11–20 years' },
  { value: '20+', label: '20+ years (Aging)' },
  { value: 'unknown', label: 'Unknown / Not sure' },
] as const;

export const FOUNDATION_OPTIONS = [
  { value: 'basement_finished', label: 'Basement - Finished' },
  { value: 'basement_unfinished', label: 'Basement - Unfinished' },
  { value: 'crawlspace', label: 'Crawlspace' },
  { value: 'slab', label: 'Concrete Slab' },
] as const;

export const EXTERIOR_WALL_OPTIONS = [
  { value: 'vinyl_siding', label: 'Vinyl Siding' },
  { value: 'brick_veneer', label: 'Brick Veneer' },
  { value: 'stucco', label: 'Stucco' },
  { value: 'wood', label: 'Wood / Cedar Shake' },
  { value: 'stone', label: 'Natural Stone / Masonry' },
] as const;

export const HYDRANT_OPTIONS = [
  { value: 'under_1000', label: '< 1,000 feet', desc: 'Optimal fire protection credit' },
  { value: 'over_1000', label: '> 1,000 feet', desc: 'Extended distance rating' },
  { value: 'unknown', label: 'Unknown', desc: 'Agent will verify Town GIS records' },
] as const;

export const PROTECTIVE_DEVICE_OPTIONS = [
  { value: 'smoke_detectors', label: 'Smoke Detectors', discount: 'Base Credit' },
  { value: 'deadbolts', label: 'Deadbolts on Exterior Doors', discount: 'Up to 2% off' },
  { value: 'burglar_alarm', label: 'Local Burglar Alarm', discount: 'Up to 5% off' },
  { value: 'central_station_fire', label: 'Central Station Monitored Fire/Burglary', discount: 'Up to 10% off' },
  { value: 'sprinkler_system', label: 'Interior Fire Sprinkler System', discount: 'Up to 15% off' },
] as const;

export const REPLACEMENT_COST_OPTIONS = [
  {
    value: 'standard_100',
    title: 'Standard (100%)',
    desc: 'Covers calculated dwelling replacement cost at policy renewal limit.',
    multiplier: 1.0,
  },
  {
    value: 'extended_125',
    title: 'Extended Replacement (125%)',
    desc: 'Provides up to an extra 25% buffer if construction materials or labor spike after a catastrophe.',
    multiplier: 1.25,
    popular: true,
  },
  {
    value: 'guaranteed',
    title: 'Guaranteed Replacement',
    desc: 'Pays whatever it costs to rebuild your dwelling back to original condition without cap.',
    multiplier: 1.5,
  },
] as const;

export const DEDUCTIBLE_OPTIONS = [
  { value: '500', label: '$500', note: 'Higher premium, minimal out-of-pocket' },
  { value: '1000', label: '$1,000', note: 'Most popular balanced choice', recommended: true },
  { value: '2500', label: '$2,500', note: 'Moderate premium savings' },
  { value: '5000', label: '$5,000', note: 'Maximum upfront discount' },
] as const;

export const INSURANCE_STATUS_OPTIONS = [
  { value: 'currently_insured', label: 'Currently Insured (Shopping / Expiring)', desc: 'Qualifies for prior coverage discount' },
  { value: 'renewal_lapse', label: 'Lapse in Coverage', desc: 'Currently uninsured or recently expired' },
  { value: 'first_time_homebuyer', label: 'First-Time Homebuyer / Closing Escrow', desc: 'Binder needed for mortgage closing' },
] as const;

/**
 * Formats user quote data into a structured JSON payload ready for an
 * insurance rating engine API or CRM webhook (e.g. Applied Systems, EZLynx, HawkSoft).
 */
export function formatRatingApiPayload(data: HomeownersQuoteFormData) {
  const quoteReferenceId = `HO-${Date.now().toString(36).toUpperCase()}-${Math.floor(1000 + Math.random() * 9000)}`;

  // Calculate replacement endorsement limit
  const multiplier =
    data.replacementCostPreference === 'extended_125'
      ? 1.25
      : data.replacementCostPreference === 'guaranteed'
        ? 1.5
        : 1.0;
  const dwellingCoverageLimit = Math.round(data.estimatedHomeValue * multiplier);

  return {
    meta: {
      schemaVersion: '2026.1.0',
      system: 'AIA-Connecticut-Rating-Engine',
      quoteReferenceId,
      submissionTimestamp: new Date().toISOString(),
      agentOffice: 'Danbury-Corporate',
      agencyNPN: '18492041',
    },
    applicant: {
      firstName: data.firstName,
      lastName: data.lastName,
      fullName: `${data.firstName} ${data.lastName}`,
      email: data.email,
      phone: data.phone,
      insuranceStatus: data.insuranceStatus,
      isFirstTimeBuyer: data.insuranceStatus === 'first_time_homebuyer',
      hasContinuousCoverage: data.insuranceStatus === 'currently_insured',
    },
    riskLocation: {
      streetAddress: data.streetAddress,
      unit: data.unit || null,
      city: data.city,
      state: data.state,
      zipCode: data.zipCode,
      country: 'USA',
      territory: `${data.city}, ${data.state} ${data.zipCode}`,
    },
    propertyCharacteristics: {
      propertyType: data.propertyType,
      primaryUsage: data.primaryUsage,
      yearBuilt: data.yearBuilt,
      structureAgeYears: new Date().getFullYear() - data.yearBuilt,
      squareFootage: data.squareFootage,
      stories: data.stories,
      construction: {
        foundation: data.foundationType,
        exteriorWalls: data.exteriorWallType,
        roof: {
          material: data.roofMaterial,
          estimatedAgeCategory: data.roofAge,
        },
      },
    },
    safetyAndUnderwriting: {
      fireProtection: {
        hydrantDistanceCategory: data.distanceToHydrant,
        isHydrantWithin1000Ft: data.distanceToHydrant === 'under_1000',
        installedProtectiveDevices: data.protectiveDevices,
        discountCreditsApplied: data.protectiveDevices.length,
      },
      liabilityHazards: {
        swimmingPool: {
          hasPool: data.hasPool,
          fenceStatus: data.hasPool ? data.poolFenceStatus : 'none',
        },
        trampolineOrSkateboardRamp: data.hasTrampolineOrRamp,
        dogOnPremises: {
          hasDog: data.hasDog,
          breed: data.hasDog && data.dogBreed ? data.dogBreed : null,
        },
      },
      lossHistory: {
        priorClaimsLast5Years: data.priorClaims,
        hasPriorLosses: data.priorClaims !== '0',
      },
    },
    coveragePreferences: {
      policyForm: 'HO-3-Special-Form',
      coverageStartDate: data.coverageStartDate,
      estimatedHomeValue: data.estimatedHomeValue,
      replacementCostPreference: data.replacementCostPreference,
      dwellingCoverageLimitA: dwellingCoverageLimit,
      personalPropertyLimitC: Math.round(dwellingCoverageLimit * 0.5), // Standard 50%
      lossOfUseLimitD: Math.round(dwellingCoverageLimit * 0.2), // Standard 20%
      personalLiabilityLimitE: 500000, // Standard AIA recommended
      medicalPaymentsLimitF: 5000,
      deductible: parseInt(data.deductible, 10),
    },
  };
}
