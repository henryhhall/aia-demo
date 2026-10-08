import React from 'react';
import type { HomeownersLang } from '../../lib/homeownersQuoteI18n';
import { homeownersTranslations } from '../../lib/homeownersQuoteI18n';

export interface StepItem {
  id: number;
  label: string;
  shortLabel: string;
  description: string;
}

interface StepNavigationProps {
  currentStep: number;
  completedSteps: number[];
  onStepClick: (stepId: number) => void;
  lang?: HomeownersLang;
}

export default function StepNavigation({
  currentStep,
  completedSteps,
  onStepClick,
  lang = 'en',
}: StepNavigationProps) {
  const t = homeownersTranslations[lang];

  const steps: StepItem[] = [
    {
      id: 1,
      label: t.steps.location.label,
      shortLabel: t.steps.location.short,
      description: t.steps.location.desc,
    },
    {
      id: 2,
      label: t.steps.construction.label,
      shortLabel: t.steps.construction.short,
      description: t.steps.construction.desc,
    },
    {
      id: 3,
      label: t.steps.safety.label,
      shortLabel: t.steps.safety.short,
      description: t.steps.safety.desc,
    },
    {
      id: 4,
      label: t.steps.coverage.label,
      shortLabel: t.steps.coverage.short,
      description: t.steps.coverage.desc,
    },
    {
      id: 5,
      label: t.steps.review.label,
      shortLabel: t.steps.review.short,
      description: t.steps.review.desc,
    },
  ];

  const progressPercent = Math.round(((currentStep - 1) / (steps.length - 1)) * 100);

  const doneLabel = lang === 'es' ? 'Listo' : lang === 'pt' ? 'Feito' : lang === 'tr' ? 'Tamam' : 'Done';
  const currentLabel = lang === 'es' ? 'Actual' : lang === 'pt' ? 'Atual' : lang === 'tr' ? 'Mevcut' : 'Current';
  const progressText = lang === 'es' ? 'Progreso' : lang === 'pt' ? 'Progresso' : lang === 'tr' ? 'İlerleme' : 'Progress';

  return (
    <nav
      aria-label="Quote progress navigation"
      className="bg-bg-primary border border-border-subtle rounded-2xl p-4 sm:p-6 shadow-xs"
    >
      {/* Top Mobile/Header Bar */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <span className="text-xs font-semibold uppercase tracking-wider text-accent-gold">
            {t.stepOf(currentStep, steps.length)}
          </span>
          <h2 className="text-lg sm:text-xl font-bold text-accent">
            {steps[currentStep - 1]?.label}
          </h2>
          <p className="text-xs text-text-secondary hidden sm:block">
            {steps[currentStep - 1]?.description}
          </p>
        </div>

        <div className="text-right">
          <span className="text-xs font-semibold text-text-secondary">{progressText}</span>
          <div className="text-base font-bold text-accent">{progressPercent}%</div>
        </div>
      </div>

      {/* Progress Bar Track */}
      <div
        className="w-full bg-bg-secondary h-2 rounded-full overflow-hidden mb-6"
        role="progressbar"
        aria-valuenow={progressPercent}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label="Quote form completion percentage"
      >
        <div
          className="bg-gradient-to-r from-accent via-accent to-accent-gold h-full rounded-full transition-all duration-300 ease-out"
          style={{ width: `${progressPercent}%` }}
        />
      </div>

      {/* Desktop Step Pills / Breadcrumbs */}
      <ol className="grid grid-cols-2 sm:grid-cols-5 gap-2 sm:gap-3" role="list">
        {steps.map((step) => {
          const isCurrent = step.id === currentStep;
          const isCompleted = completedSteps.includes(step.id);
          const isClickable = isCompleted || step.id <= currentStep;

          return (
            <li key={step.id}>
              <button
                type="button"
                onClick={() => isClickable && onStepClick(step.id)}
                disabled={!isClickable}
                aria-current={isCurrent ? 'step' : undefined}
                className={`w-full text-left p-2.5 rounded-xl border transition-all text-xs flex flex-col justify-between ${
                  isCurrent
                    ? 'border-accent bg-accent/5 ring-2 ring-accent/15 text-accent font-semibold shadow-xs'
                    : isCompleted
                      ? 'border-border-subtle bg-bg-primary hover:border-accent-gold hover:bg-bg-secondary text-text-primary cursor-pointer'
                      : 'border-border-subtle/50 bg-bg-secondary/40 text-text-muted cursor-not-allowed opacity-60'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span
                    className={`inline-flex items-center justify-center w-5 h-5 rounded-full text-[11px] font-bold ${
                      isCurrent
                        ? 'bg-accent text-white'
                        : isCompleted
                          ? 'bg-emerald-600 text-white'
                          : 'bg-bg-tertiary text-text-secondary'
                    }`}
                  >
                    {isCompleted ? (
                      <svg
                        className="w-3 h-3"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={3}
                        aria-hidden="true"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    ) : (
                      step.id
                    )}
                  </span>

                  {isCompleted && !isCurrent && (
                    <span className="text-[10px] text-emerald-700 font-medium">{doneLabel}</span>
                  )}
                  {isCurrent && (
                    <span className="text-[10px] text-accent font-bold uppercase tracking-wider">
                      {currentLabel}
                    </span>
                  )}
                </div>

                <div className="font-semibold truncate">{step.shortLabel}</div>
                <div className="text-[10px] text-text-muted truncate hidden lg:block">
                  {step.description}
                </div>
              </button>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
