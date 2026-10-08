import React, { useState, useEffect, useRef } from 'react';
import type { HomeownersQuoteFormData } from '../../lib/homeownersQuoteSchema';
import {
  defaultHomeownersFormData,
  step1LocationSchema,
  step2ConstructionSchema,
  step3SafetySchema,
  step4ContactSchema,
  homeownersQuoteRootSchema,
} from '../../lib/homeownersQuoteSchema';
import type { HomeownersLang } from '../../lib/homeownersQuoteI18n';
import {
  homeownersTranslations,
  localizedValidationErrors,
} from '../../lib/homeownersQuoteI18n';
import StepNavigation from './StepNavigation';
import StepLocation from './StepLocation';
import StepConstruction from './StepConstruction';
import StepSafety from './StepSafety';
import StepContact from './StepContact';
import ReviewSubmit from './ReviewSubmit';

const STORAGE_KEY = 'aia_homeowners_quote_draft_v1';

interface HomeownersQuoteWizardProps {
  lang?: HomeownersLang;
}

export default function HomeownersQuoteWizard({ lang = 'en' }: HomeownersQuoteWizardProps) {
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  const [formData, setFormData] = useState<HomeownersQuoteFormData>(defaultHomeownersFormData);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [draftSavedToast, setDraftSavedToast] = useState(false);
  const formTopRef = useRef<HTMLDivElement>(null);

  const t = homeownersTranslations[lang];

  // Helper to get localized error message
  const getFieldErrorMessage = (field: string, defaultMsg: string): string => {
    return localizedValidationErrors[lang]?.[field] || defaultMsg;
  };

  // Load saved draft on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed && typeof parsed === 'object') {
          setFormData((prev) => ({ ...prev, ...parsed.data }));
          if (Array.isArray(parsed.completedSteps)) {
            setCompletedSteps(parsed.completedSteps);
          }
          if (typeof parsed.step === 'number' && parsed.step >= 1 && parsed.step <= 5) {
            setCurrentStep(parsed.step);
          }
        }
      }
    } catch {
      // LocalStorage access failure gracefully ignored
    }
  }, []);

  // Save draft whenever formData or step changes
  useEffect(() => {
    try {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({
          data: formData,
          step: currentStep,
          completedSteps,
          lastUpdated: new Date().toISOString(),
        })
      );
    } catch {
      // QuotaExceeded or disabled localStorage handled silently
    }
  }, [formData, currentStep, completedSteps]);

  // Field change handler
  const handleFieldChange = <K extends keyof HomeownersQuoteFormData>(
    field: K,
    value: HomeownersQuoteFormData[K]
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));

    // Clear error for field if already touched
    if (errors[field]) {
      setErrors((prev) => {
        const updated = { ...prev };
        delete updated[field];
        return updated;
      });
    }
  };

  // Blur handler: Validate specific field
  const handleFieldBlur = (field: keyof HomeownersQuoteFormData) => {
    setTouched((prev) => ({ ...prev, [field]: true }));

    // Perform partial validation for field on blur
    try {
      homeownersQuoteRootSchema.parse(formData);
      // If root schema passes, field is valid
      setErrors((prev) => {
        const updated = { ...prev };
        delete updated[field];
        return updated;
      });
    } catch (err: any) {
      if (err.issues) {
        const fieldIssue = err.issues.find((issue: any) => issue.path[0] === field);
        if (fieldIssue) {
          setErrors((prev) => ({
            ...prev,
            [field]: getFieldErrorMessage(field, fieldIssue.message),
          }));
        } else {
          setErrors((prev) => {
            const updated = { ...prev };
            delete updated[field];
            return updated;
          });
        }
      }
    }
  };

  // Validate the active step before advancing
  const validateCurrentStep = (stepNumber: number): boolean => {
    let schema: any;
    let relevantFields: (keyof HomeownersQuoteFormData)[] = [];

    switch (stepNumber) {
      case 1:
        schema = step1LocationSchema;
        relevantFields = [
          'streetAddress',
          'city',
          'state',
          'zipCode',
          'propertyType',
          'primaryUsage',
          'yearBuilt',
        ];
        break;
      case 2:
        schema = step2ConstructionSchema;
        relevantFields = [
          'squareFootage',
          'stories',
          'roofMaterial',
          'roofAge',
          'foundationType',
          'exteriorWallType',
        ];
        break;
      case 3:
        schema = step3SafetySchema;
        relevantFields = [
          'distanceToHydrant',
          'protectiveDevices',
          'hasPool',
          'poolFenceStatus',
          'hasTrampolineOrRamp',
          'hasDog',
          'dogBreed',
          'priorClaims',
        ];
        break;
      case 4:
        schema = step4ContactSchema;
        relevantFields = [
          'coverageStartDate',
          'estimatedHomeValue',
          'replacementCostPreference',
          'deductible',
          'firstName',
          'lastName',
          'email',
          'phone',
          'insuranceStatus',
        ];
        break;
      default:
        return true;
    }

    try {
      schema.parse(formData);
      // If valid, clear relevant field errors
      setErrors((prev) => {
        const updated = { ...prev };
        relevantFields.forEach((f) => delete updated[f]);
        return updated;
      });
      return true;
    } catch (err: any) {
      if (err.issues) {
        const newStepErrors: Record<string, string> = {};
        const newTouched: Record<string, boolean> = {};

        err.issues.forEach((issue: any) => {
          const fieldKey = issue.path[0] as string;
          newStepErrors[fieldKey] = getFieldErrorMessage(fieldKey, issue.message);
          newTouched[fieldKey] = true;
        });

        setErrors((prev) => ({ ...prev, ...newStepErrors }));
        setTouched((prev) => ({ ...prev, ...newTouched }));
      }
      return false;
    }
  };

  // Step advancement handler
  const handleNext = () => {
    const isValid = validateCurrentStep(currentStep);
    if (!isValid) {
      // Scroll to top of wizard to see errors
      if (formTopRef.current) {
        formTopRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
      return;
    }

    // Mark current step completed
    if (!completedSteps.includes(currentStep)) {
      setCompletedSteps((prev) => [...prev, currentStep]);
    }

    if (currentStep < 5) {
      const nextStep = currentStep + 1;
      setCurrentStep(nextStep);
      if (formTopRef.current) {
        formTopRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  };

  // Step backwards handler
  const handlePrev = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
      if (formTopRef.current) {
        formTopRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  };

  // Jump to specific step via progress bar
  const handleJumpToStep = (stepId: number) => {
    // Only allow jump if step is completed or is current or previous
    if (completedSteps.includes(stepId) || stepId <= currentStep) {
      setCurrentStep(stepId);
      if (formTopRef.current) {
        formTopRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  };

  // Save draft action
  const handleSaveDraft = () => {
    try {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({
          data: formData,
          step: currentStep,
          completedSteps,
          lastUpdated: new Date().toISOString(),
        })
      );
      setDraftSavedToast(true);
      setTimeout(() => setDraftSavedToast(false), 4000);
    } catch {
      // Graceful error
    }
  };

  // Reset form handler
  const handleResetForm = () => {
    const confirmReset = window.confirm(
      lang === 'es'
        ? '¿Está seguro de que desea reiniciar el formulario de cotización? Se borrarán todos los datos ingresados.'
        : lang === 'pt'
          ? 'Tem certeza de que deseja reiniciar o formulário de cotação? Todos os dados digitados serão perdidos.'
          : lang === 'tr'
            ? 'Teklif formunu sıfırlamak istediğinizden emin misiniz? Girilen tüm veriler temizlenecektir.'
            : 'Are you sure you want to reset the quote form? All progress will be cleared.'
    );

    if (confirmReset) {
      localStorage.removeItem(STORAGE_KEY);
      setFormData(defaultHomeownersFormData);
      setCurrentStep(1);
      setCompletedSteps([]);
      setErrors({});
      setTouched({});
      if (formTopRef.current) {
        formTopRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  };

  const hasStepErrors = Object.keys(errors).length > 0;

  return (
    <div ref={formTopRef} className="max-w-4xl mx-auto space-y-6">
      {/* Top Banner & Quick Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-text-muted">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className="font-semibold text-text-secondary">
            {t.worksheetTitle}
          </span>
          <span className="hidden sm:inline text-text-muted">• ISO HO-3 / HO-5 Standard</span>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={handleSaveDraft}
            className="hover:text-accent font-medium transition-colors flex items-center gap-1 cursor-pointer"
          >
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" />
            </svg>
            <span>{t.saveDraft}</span>
          </button>

          <span className="text-border-subtle">|</span>

          <button
            type="button"
            onClick={handleResetForm}
            className="hover:text-red-600 font-medium transition-colors cursor-pointer"
          >
            {t.resetForm}
          </button>
        </div>
      </div>

      {/* Draft Saved Notification Toast */}
      {draftSavedToast && (
        <div
          role="status"
          aria-live="polite"
          className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl text-xs font-semibold flex items-center justify-between animate-fadeIn shadow-xs"
        >
          <div className="flex items-center gap-2">
            <svg className="w-4 h-4 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
            </svg>
            <span>{t.draftSavedToast}</span>
          </div>
          <button
            type="button"
            onClick={() => setDraftSavedToast(false)}
            className="text-emerald-700 hover:text-emerald-900 cursor-pointer"
          >
            ✕
          </button>
        </div>
      )}

      {/* Step Navigation Bar */}
      <StepNavigation
        currentStep={currentStep}
        completedSteps={completedSteps}
        onStepClick={handleJumpToStep}
        lang={lang}
      />

      {/* Active Step Error Alert Banner (if any) */}
      {hasStepErrors && (
        <div
          role="alert"
          className="p-4 bg-red-50/90 border border-red-200 rounded-2xl text-xs text-red-800 space-y-1 animate-fadeIn"
        >
          <div className="flex items-center gap-2 font-bold text-red-900">
            <svg className="w-4 h-4 text-red-600 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            <span>{t.hasErrorsAlert}</span>
          </div>
          <ul className="list-disc list-inside space-y-0.5 text-[11px] text-red-700 pl-6">
            {Object.values(errors).slice(0, 3).map((msg, i) => (
              <li key={i}>{msg}</li>
            ))}
            {Object.values(errors).length > 3 && (
              <li>{t.otherErrors(Object.values(errors).length - 3)}</li>
            )}
          </ul>
        </div>
      )}

      {/* Wizard Step Body */}
      <div className="bg-bg-primary border border-border-subtle rounded-3xl p-6 sm:p-10 shadow-sm transition-all">
        {currentStep === 1 && (
          <StepLocation
            formData={formData}
            errors={errors}
            touched={touched}
            onChange={handleFieldChange}
            onBlur={handleFieldBlur}
            lang={lang}
          />
        )}

        {currentStep === 2 && (
          <StepConstruction
            formData={formData}
            errors={errors}
            touched={touched}
            onChange={handleFieldChange}
            onBlur={handleFieldBlur}
            lang={lang}
          />
        )}

        {currentStep === 3 && (
          <StepSafety
            formData={formData}
            errors={errors}
            touched={touched}
            onChange={handleFieldChange}
            onBlur={handleFieldBlur}
            lang={lang}
          />
        )}

        {currentStep === 4 && (
          <StepContact
            formData={formData}
            errors={errors}
            touched={touched}
            onChange={handleFieldChange}
            onBlur={handleFieldBlur}
            lang={lang}
          />
        )}

        {currentStep === 5 && (
          <ReviewSubmit
            formData={formData}
            onJumpToStep={handleJumpToStep}
            onReset={handleResetForm}
            lang={lang}
          />
        )}

        {/* Wizard Bottom Navigation Buttons (Steps 1 to 4) */}
        {currentStep < 5 && (
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8 mt-8 border-t border-border-subtle">
            {currentStep > 1 ? (
              <button
                type="button"
                onClick={handlePrev}
                className="w-full sm:w-auto px-6 py-3 rounded-xl border border-border-subtle text-xs font-bold text-text-secondary hover:bg-bg-secondary hover:text-text-primary transition-all flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
                </svg>
                <span>{t.back}</span>
              </button>
            ) : (
              <div />
            )}

            <button
              type="button"
              onClick={handleNext}
              className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-accent text-white font-extrabold text-xs tracking-wider uppercase transition-all shadow-md hover:bg-accent/90 hover:shadow-lg active:scale-98 flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>{currentStep === 4 ? t.reviewAndSubmit : t.continueToNext}</span>
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        )}
      </div>

      {/* Trust & Underwriting Guarantee Footer */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center text-xs text-text-muted pt-2">
        <div className="p-3 rounded-xl bg-bg-secondary/40 border border-border-subtle/50">
          <span className="font-bold text-accent block text-sm">{t.trustCarriersTitle}</span>
          <span className="text-[11px]">{t.trustCarriersSub}</span>
        </div>
        <div className="p-3 rounded-xl bg-bg-secondary/40 border border-border-subtle/50">
          <span className="font-bold text-accent block text-sm">{t.trustObligationTitle}</span>
          <span className="text-[11px]">{t.trustObligationSub}</span>
        </div>
        <div className="p-3 rounded-xl bg-bg-secondary/40 border border-border-subtle/50">
          <span className="font-bold text-accent block text-sm">{t.trustSecurityTitle}</span>
          <span className="text-[11px]">{t.trustSecuritySub}</span>
        </div>
        <div className="p-3 rounded-xl bg-bg-secondary/40 border border-border-subtle/50">
          <span className="font-bold text-accent block text-sm">{t.trustHqTitle}</span>
          <span className="text-[11px]">{t.trustHqSub}</span>
        </div>
      </div>
    </div>
  );
}
