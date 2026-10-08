import React, { useState } from 'react';
import type { HomeownersQuoteFormData } from '../../lib/homeownersQuoteSchema';
import {
  formatRatingApiPayload,
  PROPERTY_TYPE_OPTIONS,
  PRIMARY_USAGE_OPTIONS,
  ROOF_MATERIAL_OPTIONS,
  ROOF_AGE_OPTIONS,
  FOUNDATION_OPTIONS,
  EXTERIOR_WALL_OPTIONS,
  PROTECTIVE_DEVICE_OPTIONS,
  REPLACEMENT_COST_OPTIONS,
} from '../../lib/homeownersQuoteSchema';
import type { HomeownersLang } from '../../lib/homeownersQuoteI18n';
import { homeownersTranslations } from '../../lib/homeownersQuoteI18n';
import { getRecaptchaToken } from '../../lib/recaptcha';
import RecaptchaLegalNotice from '../RecaptchaLegalNotice';

interface ReviewSubmitProps {
  formData: HomeownersQuoteFormData;
  onJumpToStep: (step: number) => void;
  onReset: () => void;
  lang?: HomeownersLang;
}

export default function ReviewSubmit({
  formData,
  onJumpToStep,
  onReset,
  lang = 'en',
}: ReviewSubmitProps) {
  const [consentChecked, setConsentChecked] = useState(true);
  const [consentError, setConsentError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionResult, setSubmissionResult] = useState<{
    success: boolean;
    referenceId: string;
    payload: any;
    submittedAt: string;
  } | null>(null);
  const [copiedPayload, setCopiedPayload] = useState(false);
  const [showJsonInspector, setShowJsonInspector] = useState(false);

  const t = homeownersTranslations[lang].step5;
  const tNav = homeownersTranslations[lang];

  // Label resolvers
  const propertyTypeLabel =
    homeownersTranslations[lang].step1.propertyTypeOptions[formData.propertyType]?.label ||
    PROPERTY_TYPE_OPTIONS.find((o) => o.value === formData.propertyType)?.label ||
    formData.propertyType;

  const primaryUsageLabel =
    homeownersTranslations[lang].step1.primaryUsageOptions[formData.primaryUsage]?.label ||
    PRIMARY_USAGE_OPTIONS.find((o) => o.value === formData.primaryUsage)?.label ||
    formData.primaryUsage;

  const roofMaterialLabel =
    homeownersTranslations[lang].step2.roofMaterialOptions[formData.roofMaterial] ||
    ROOF_MATERIAL_OPTIONS.find((o) => o.value === formData.roofMaterial)?.label ||
    formData.roofMaterial;

  const roofAgeLabel =
    homeownersTranslations[lang].step2.roofAgeOptions[formData.roofAge] ||
    ROOF_AGE_OPTIONS.find((o) => o.value === formData.roofAge)?.label ||
    formData.roofAge;

  const foundationLabel =
    homeownersTranslations[lang].step2.foundationOptions[formData.foundationType] ||
    FOUNDATION_OPTIONS.find((o) => o.value === formData.foundationType)?.label ||
    formData.foundationType;

  const wallLabel =
    homeownersTranslations[lang].step2.exteriorWallOptions[formData.exteriorWallType] ||
    EXTERIOR_WALL_OPTIONS.find((o) => o.value === formData.exteriorWallType)?.label ||
    formData.exteriorWallType;

  const replacementCostObj = REPLACEMENT_COST_OPTIONS.find(
    (o) => o.value === formData.replacementCostPreference
  );
  const replacementCostTitle =
    homeownersTranslations[lang].step4.replacementCostOptions[formData.replacementCostPreference]?.title ||
    replacementCostObj?.title ||
    formData.replacementCostPreference;

  const multiplier = replacementCostObj?.multiplier || 1.0;
  const estimatedCoverageLimit = Math.round(formData.estimatedHomeValue * multiplier);

  // Mock submission handler
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!consentChecked) {
      setConsentError(t.consentRequiredError);
      return;
    }
    setConsentError('');
    setIsSubmitting(true);

    // Format data into structured JSON rating payload
    const structuredPayload = formatRatingApiPayload(formData);

    try {
      // Execute Google reCAPTCHA v3
      const recaptchaToken = await getRecaptchaToken('quote_form');

      // Send to internal API endpoint if available, with graceful fallback
      const response = await fetch('/api/quote', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: `${formData.firstName} ${formData.lastName}`,
          email: formData.email,
          phone: formData.phone,
          insuranceType: 'home',
          preferredOffice: 'Danbury',
          ratingPayload: structuredPayload,
          recaptchaToken,
        }),
      }).catch(() => null);

      let refCode = structuredPayload.meta.quoteReferenceId;
      if (response && response.ok) {
        const json = await response.json().catch(() => null);
        if (json?.confirmationCode) refCode = json.confirmationCode;
      }

      // Simulate network rating latency for authentic agent feel
      await new Promise((resolve) => setTimeout(resolve, 1400));

      setSubmissionResult({
        success: true,
        referenceId: refCode,
        payload: structuredPayload,
        submittedAt: new Date().toLocaleTimeString('en-US', {
          hour: '2-digit',
          minute: '2-digit',
          month: 'short',
          day: 'numeric',
          year: 'numeric',
        }),
      });
    } catch {
      // Fallback to local success with rating payload
      setSubmissionResult({
        success: true,
        referenceId: structuredPayload.meta.quoteReferenceId,
        payload: structuredPayload,
        submittedAt: new Date().toLocaleString(),
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCopyPayload = () => {
    if (!submissionResult) return;
    navigator.clipboard.writeText(JSON.stringify(submissionResult.payload, null, 2));
    setCopiedPayload(true);
    setTimeout(() => setCopiedPayload(false), 2500);
  };

  const handleDownloadPayload = () => {
    if (!submissionResult) return;
    const blob = new Blob([JSON.stringify(submissionResult.payload, null, 2)], {
      type: 'application/json',
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `aia-homeowners-quote-${submissionResult.referenceId}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  // SUCCESS CONFIRMATION VIEW
  if (submissionResult) {
    return (
      <div className="space-y-8 animate-fadeIn">
        {/* Success Header Card */}
        <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-emerald-900 to-[#122b5f] text-white shadow-xl">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-emerald-500/20 border border-emerald-400/40 flex items-center justify-center shrink-0">
              <svg
                className="w-8 h-8 text-emerald-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2.5}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-emerald-300">
                {t.successBadge}
              </span>
              <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight mt-0.5">
                {t.successTitle}
              </h3>
              <p className="text-emerald-100/80 text-xs sm:text-sm mt-1">
                {t.referenceCode}{' '}
                <span className="font-mono font-bold text-white tracking-wider px-2 py-0.5 rounded-md bg-white/10">
                  {submissionResult.referenceId}
                </span>
              </p>
            </div>
          </div>
        </div>

        {/* Next Steps Timeline Card */}
        <div className="p-6 rounded-2xl bg-bg-primary border border-border-subtle shadow-xs space-y-4">
          <h4 className="text-sm font-bold text-accent uppercase tracking-wider">
            {t.whatHappensNext}
          </h4>
          <ol className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs text-text-secondary">
            <li className="p-3.5 rounded-xl bg-bg-secondary/60 border border-border-subtle/60 space-y-1">
              <span className="font-bold text-accent">{t.stepNext1Title}</span>
              <p className="text-text-muted">
                {t.stepNext1Desc}
              </p>
            </li>
            <li className="p-3.5 rounded-xl bg-bg-secondary/60 border border-border-subtle/60 space-y-1">
              <span className="font-bold text-accent">{t.stepNext2Title}</span>
              <p className="text-text-muted">
                {t.stepNext2Desc}
              </p>
            </li>
            <li className="p-3.5 rounded-xl bg-bg-secondary/60 border border-border-subtle/60 space-y-1">
              <span className="font-bold text-accent">{t.stepNext3Title}</span>
              <p className="text-text-muted">
                {t.stepNext3Desc(formData.email)}
              </p>
            </li>
          </ol>
        </div>

        {/* Rating API Payload Developer Inspector */}
        <div className="p-5 rounded-2xl bg-bg-secondary/40 border border-border-subtle space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold uppercase tracking-wider text-accent">
                  {t.payloadBadge}
                </span>
                <span className="text-[10px] font-mono bg-accent/10 text-accent px-2 py-0.5 rounded-full font-bold">
                  ACORD / JSON
                </span>
              </div>
              <p className="text-xs text-text-muted mt-0.5">
                {t.payloadDesc}
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setShowJsonInspector(!showJsonInspector)}
                className="px-3 py-1.5 rounded-lg border border-border-subtle bg-bg-primary text-xs font-bold text-text-primary hover:bg-bg-secondary transition-all"
              >
                {showJsonInspector ? t.collapseJson : t.inspectPayload}
              </button>
              <button
                type="button"
                onClick={handleCopyPayload}
                className="px-3 py-1.5 rounded-lg bg-accent text-white text-xs font-bold hover:bg-accent/90 transition-all flex items-center gap-1.5"
              >
                {copiedPayload ? (
                  <>
                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>{t.copied}</span>
                  </>
                ) : (
                  <>
                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                    <span>{t.copyJson}</span>
                  </>
                )}
              </button>
              <button
                type="button"
                onClick={handleDownloadPayload}
                className="px-3 py-1.5 rounded-lg border border-border-subtle bg-bg-primary text-xs font-bold text-text-primary hover:bg-bg-secondary transition-all flex items-center gap-1.5"
              >
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
                <span>{t.download}</span>
              </button>
            </div>
          </div>

          {showJsonInspector && (
            <div className="relative mt-3">
              <pre className="p-4 rounded-xl bg-slate-950 text-slate-100 font-mono text-[11px] leading-relaxed overflow-x-auto max-h-96 border border-slate-800">
                <code>{JSON.stringify(submissionResult.payload, null, 2)}</code>
              </pre>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-4 border-t border-border-subtle">
          <a
            href="tel:+12037489272"
            className="w-full sm:w-auto px-5 py-3 rounded-xl border border-accent text-accent font-bold text-xs text-center hover:bg-accent/5 transition-all"
          >
            {t.callAgentBtn}
          </a>

          <button
            type="button"
            onClick={onReset}
            className="w-full sm:w-auto px-6 py-3 rounded-xl bg-accent text-white font-bold text-xs hover:bg-accent/90 transition-all shadow-xs"
          >
            {t.startAnotherBtn}
          </button>
        </div>
      </div>
    );
  }

  // REVIEW & SUBMIT SUMMARY VIEW
  return (
    <form onSubmit={handleSubmit} className="space-y-8 animate-fadeIn">
      {/* Section Header */}
      <div className="border-b border-border-subtle pb-4">
        <h3 className="text-xl font-bold text-accent tracking-tight">
          {t.title}
        </h3>
        <p className="text-xs sm:text-sm text-text-secondary mt-1">
          {t.subtitle}
        </p>
      </div>

      {/* Summary Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Step 1 Card */}
        <div className="p-5 rounded-2xl bg-bg-primary border border-border-subtle shadow-xs space-y-3">
          <div className="flex items-center justify-between border-b border-border-subtle/80 pb-2.5">
            <div className="flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-accent text-white text-[10px] font-bold flex items-center justify-center">
                1
              </span>
              <h4 className="text-xs font-bold text-accent uppercase tracking-wider">
                {t.step1Title}
              </h4>
            </div>
            <button
              type="button"
              onClick={() => onJumpToStep(1)}
              className="text-xs font-bold text-accent-gold hover:text-accent-gold-hover transition-colors underline"
            >
              {tNav.edit}
            </button>
          </div>

          <div className="space-y-1.5 text-xs">
            <div className="font-semibold text-text-primary">
              {formData.streetAddress}
              {formData.unit ? `, ${formData.unit}` : ''}
            </div>
            <div className="text-text-muted">
              {formData.city}, {formData.state} {formData.zipCode}
            </div>
            <div className="pt-2 flex flex-wrap gap-2 text-[11px]">
              <span className="px-2.5 py-0.5 rounded-md bg-bg-secondary font-medium text-text-secondary">
                {propertyTypeLabel}
              </span>
              <span className="px-2.5 py-0.5 rounded-md bg-bg-secondary font-medium text-text-secondary">
                {primaryUsageLabel}
              </span>
              <span className="px-2.5 py-0.5 rounded-md bg-bg-secondary font-medium text-text-secondary">
                {formData.yearBuilt}
              </span>
            </div>
          </div>
        </div>

        {/* Step 2 Card */}
        <div className="p-5 rounded-2xl bg-bg-primary border border-border-subtle shadow-xs space-y-3">
          <div className="flex items-center justify-between border-b border-border-subtle/80 pb-2.5">
            <div className="flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-accent text-white text-[10px] font-bold flex items-center justify-center">
                2
              </span>
              <h4 className="text-xs font-bold text-accent uppercase tracking-wider">
                {t.step2Title}
              </h4>
            </div>
            <button
              type="button"
              onClick={() => onJumpToStep(2)}
              className="text-xs font-bold text-accent-gold hover:text-accent-gold-hover transition-colors underline"
            >
              {tNav.edit}
            </button>
          </div>

          <div className="grid grid-cols-2 gap-2 text-xs">
            <div>
              <span className="text-text-muted block text-[11px]">{t.squareFootage}</span>
              <span className="font-semibold text-text-primary">
                {formData.squareFootage.toLocaleString()} sq ft
              </span>
            </div>
            <div>
              <span className="text-text-muted block text-[11px]">{t.stories}</span>
              <span className="font-semibold text-text-primary">{formData.stories}</span>
            </div>
            <div>
              <span className="text-text-muted block text-[11px]">{t.roof}</span>
              <span className="font-semibold text-text-primary truncate block">
                {roofMaterialLabel} ({roofAgeLabel})
              </span>
            </div>
            <div>
              <span className="text-text-muted block text-[11px]">{t.foundation}</span>
              <span className="font-semibold text-text-primary truncate block">
                {foundationLabel}
              </span>
            </div>
          </div>
        </div>

        {/* Step 3 Card */}
        <div className="p-5 rounded-2xl bg-bg-primary border border-border-subtle shadow-xs space-y-3">
          <div className="flex items-center justify-between border-b border-border-subtle/80 pb-2.5">
            <div className="flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-accent text-white text-[10px] font-bold flex items-center justify-center">
                3
              </span>
              <h4 className="text-xs font-bold text-accent uppercase tracking-wider">
                {t.step3Title}
              </h4>
            </div>
            <button
              type="button"
              onClick={() => onJumpToStep(3)}
              className="text-xs font-bold text-accent-gold hover:text-accent-gold-hover transition-colors underline"
            >
              {tNav.edit}
            </button>
          </div>

          <div className="grid grid-cols-2 gap-2 text-xs">
            <div>
              <span className="text-text-muted block text-[11px]">{t.hydrant}</span>
              <span className="font-semibold text-text-primary">
                {formData.distanceToHydrant === 'under_1000'
                  ? '< 1,000 ft'
                  : formData.distanceToHydrant === 'over_1000'
                    ? '> 1,000 ft'
                    : 'Unknown'}
              </span>
            </div>
            <div>
              <span className="text-text-muted block text-[11px]">{t.protectiveDevices}</span>
              <span className="font-semibold text-text-primary">
                {formData.protectiveDevices.length > 0
                  ? `${formData.protectiveDevices.length} Active`
                  : t.noDevices}
              </span>
            </div>
            <div>
              <span className="text-text-muted block text-[11px]">{t.pool} / {t.trampoline}</span>
              <span className="font-semibold text-text-primary">
                {formData.hasPool ? `Pool (${formData.poolFenceStatus})` : 'No Pool'} •{' '}
                {formData.hasTrampolineOrRamp ? 'Ramp/Tramp' : 'None'}
              </span>
            </div>
            <div>
              <span className="text-text-muted block text-[11px]">{t.dog} / {t.claimsLast5Years}</span>
              <span className="font-semibold text-text-primary">
                {formData.hasDog ? 'Dog Present' : t.dogNone} • {formData.priorClaims} Claims
              </span>
            </div>
          </div>
        </div>

        {/* Step 4 Card */}
        <div className="p-5 rounded-2xl bg-bg-primary border border-border-subtle shadow-xs space-y-3">
          <div className="flex items-center justify-between border-b border-border-subtle/80 pb-2.5">
            <div className="flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-accent text-white text-[10px] font-bold flex items-center justify-center">
                4
              </span>
              <h4 className="text-xs font-bold text-accent uppercase tracking-wider">
                {t.step4Title}
              </h4>
            </div>
            <button
              type="button"
              onClick={() => onJumpToStep(4)}
              className="text-xs font-bold text-accent-gold hover:text-accent-gold-hover transition-colors underline"
            >
              {tNav.edit}
            </button>
          </div>

          <div className="grid grid-cols-2 gap-2 text-xs">
            <div>
              <span className="text-text-muted block text-[11px]">{t.applicant}</span>
              <span className="font-semibold text-text-primary">
                {formData.firstName} {formData.lastName}
              </span>
            </div>
            <div>
              <span className="text-text-muted block text-[11px]">{t.effectiveDate}</span>
              <span className="font-semibold text-text-primary">{formData.coverageStartDate}</span>
            </div>
            <div>
              <span className="text-text-muted block text-[11px]">{t.emailPhone}</span>
              <span className="font-semibold text-text-primary truncate block">
                {formData.email}
              </span>
              <span className="text-text-muted block">{formData.phone}</span>
            </div>
            <div>
              <span className="text-text-muted block text-[11px]">{t.deductible}</span>
              <span className="font-semibold text-accent">${formData.deductible}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Coverage Limits Preview Banner */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-accent to-[#1a3d82] text-white">
        <div>
          <span className="text-xs uppercase tracking-wider text-accent-gold font-bold block mb-1">
            {t.previewBadge}
          </span>
          <h4 className="text-xl sm:text-2xl font-bold">
            ${estimatedCoverageLimit.toLocaleString()} {t.estimatedDwellingReplacement}
          </h4>
          <p className="text-xs text-white/80 mt-1">
            {t.basedOnText(replacementCostTitle, formData.deductible)}
          </p>
        </div>
      </div>

      {/* Legal Consent and Disclaimer */}
      <div className="space-y-3 pt-2">
        <label className="flex items-start gap-3 cursor-pointer">
          <input
            type="checkbox"
            checked={consentChecked}
            onChange={(e) => {
              setConsentChecked(e.target.checked);
              if (e.target.checked) setConsentError('');
            }}
            className="mt-1 h-4 w-4 text-accent rounded border-border-subtle focus:ring-accent"
          />
          <span className="text-xs text-text-secondary leading-relaxed">
            {t.legalConsentText}
          </span>
        </label>

        {consentError && (
          <p role="alert" className="text-xs text-red-600 font-medium flex items-center gap-1.5">
            <svg className="w-3.5 h-3.5 shrink-0 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <circle cx="12" cy="12" r="10" stroke="currentColor" />
              <path strokeLinecap="round" d="M12 8v4m0 4h.01" />
            </svg>
            <span>{consentError}</span>
          </p>
        )}
      </div>

      {/* Submission Button */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-border-subtle">
        <button
          type="button"
          onClick={() => onJumpToStep(4)}
          className="w-full sm:w-auto px-6 py-3 rounded-xl border border-border-subtle text-xs font-bold text-text-secondary hover:bg-bg-secondary transition-all"
        >
          {tNav.backToStep4}
        </button>

        <button
          type="submit"
          disabled={isSubmitting}
          className={`w-full sm:w-auto px-8 py-3.5 rounded-xl bg-accent text-white font-extrabold text-sm tracking-wide transition-all shadow-md flex items-center justify-center gap-2 ${
            isSubmitting
              ? 'opacity-70 cursor-not-allowed'
              : 'hover:bg-accent/90 hover:shadow-lg active:scale-98'
          }`}
        >
          {isSubmitting ? (
            <>
              <svg className="animate-spin h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                />
              </svg>
              <span>{tNav.submittingQuoteRequest}</span>
            </>
          ) : (
            <>
              <span>{tNav.submitQuoteRequest}</span>
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </>
          )}
        </button>
      </div>

      {/* Google reCAPTCHA v3 Compliance Notice */}
      <RecaptchaLegalNotice lang={lang} className="pt-2 text-center" />
    </form>
  );
}
