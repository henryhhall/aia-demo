import React from 'react';
import type { HomeownersQuoteFormData } from '../../lib/homeownersQuoteSchema';
import {
  REPLACEMENT_COST_OPTIONS,
  DEDUCTIBLE_OPTIONS,
  INSURANCE_STATUS_OPTIONS,
} from '../../lib/homeownersQuoteSchema';
import type { HomeownersLang } from '../../lib/homeownersQuoteI18n';
import { homeownersTranslations } from '../../lib/homeownersQuoteI18n';
import FieldWrapper from './FieldWrapper';

interface StepContactProps {
  formData: HomeownersQuoteFormData;
  errors: Record<string, string>;
  touched: Record<string, boolean>;
  onChange: <K extends keyof HomeownersQuoteFormData>(field: K, value: HomeownersQuoteFormData[K]) => void;
  onBlur: (field: keyof HomeownersQuoteFormData) => void;
  lang?: HomeownersLang;
}

export default function StepContact({
  formData,
  errors,
  touched,
  onChange,
  onBlur,
  lang = 'en',
}: StepContactProps) {
  const t = homeownersTranslations[lang].step4;
  const todayIso = new Date().toISOString().split('T')[0];

  // Format phone number utility
  const handlePhoneChange = (value: string) => {
    const cleaned = value.replace(/\D/g, '');
    let formatted = cleaned;
    if (cleaned.length > 6) {
      formatted = `(${cleaned.slice(0, 3)}) ${cleaned.slice(3, 6)}-${cleaned.slice(6, 10)}`;
    } else if (cleaned.length > 3) {
      formatted = `(${cleaned.slice(0, 3)}) ${cleaned.slice(3)}`;
    }
    onChange('phone', formatted);
  };

  const mostSelectedBadge =
    lang === 'es'
      ? 'Más Elegido'
      : lang === 'pt'
        ? 'Mais Escolhido'
        : lang === 'tr'
          ? 'En Çok Tercih Edilen'
          : 'Most Selected';

  const estCoverageLimitLabel =
    lang === 'es'
      ? 'Límite Estimado de Cobertura:'
      : lang === 'pt'
        ? 'Limite Estimado de Cobertura:'
        : lang === 'tr'
          ? 'Tahmini Teminat Limiti:'
          : 'Est. Coverage Limit:';

  const emailHelperText =
    lang === 'es'
      ? 'Enviamos los desgloses comparativos en PDF a esta dirección.'
      : lang === 'pt'
        ? 'Enviaremos os comparativos em PDF para este endereço.'
        : lang === 'tr'
          ? 'Karşılaştırmalı PDF raporunu bu adrese gönderiyoruz.'
          : 'We send comparative carrier breakdown PDFs to this address.';

  const phoneHelperText =
    lang === 'es'
      ? 'Línea directa para confirmación de cotización y revisión de tarifas.'
      : lang === 'pt'
        ? 'Linha direta para confirmação de cotação e revisão de tarifas.'
        : lang === 'tr'
          ? 'Teklif teyidi ve oran karşılaştırma incelemesi için doğrudan hat.'
          : 'Direct line for quote confirmation and rate comparison review.';

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Section Header */}
      <div className="border-b border-border-subtle pb-4">
        <h3 className="text-xl font-bold text-accent tracking-tight">
          {t.title}
        </h3>
        <p className="text-xs sm:text-sm text-text-secondary mt-1">
          {t.subtitle}
        </p>
      </div>

      {/* Coverage Preferences Card */}
      <div className="p-5 rounded-2xl bg-bg-secondary/40 border border-border-subtle space-y-6">
        <h4 className="text-sm font-bold text-accent uppercase tracking-wider">
          {t.coverageLegend}
        </h4>

        {/* Coverage Start Date & Home Value */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Desired Start Date */}
          <FieldWrapper
            id="coverageStartDate"
            label={t.startDate}
            required
            error={touched.coverageStartDate ? errors.coverageStartDate : undefined}
            helperText={t.startDateHelper}
          >
            <input
              id="coverageStartDate"
              type="date"
              min={todayIso}
              value={formData.coverageStartDate}
              onChange={(e) => onChange('coverageStartDate', e.target.value)}
              onBlur={() => onBlur('coverageStartDate')}
              aria-invalid={touched.coverageStartDate && !!errors.coverageStartDate}
              className={`w-full px-3.5 py-2.5 rounded-xl border text-sm transition-all bg-bg-primary text-text-primary ${
                touched.coverageStartDate && errors.coverageStartDate
                  ? 'border-red-400 ring-2 ring-red-100 focus:border-red-500 focus:outline-hidden'
                  : 'border-border-subtle focus:border-accent focus:ring-2 focus:ring-accent/15 focus:outline-hidden'
              }`}
            />
          </FieldWrapper>

          {/* Estimated Home Value */}
          <FieldWrapper
            id="estimatedHomeValue"
            label={t.homeValue}
            required
            error={touched.estimatedHomeValue ? errors.estimatedHomeValue : undefined}
            helperText={t.homeValueHelper}
            badge={`$${formData.estimatedHomeValue.toLocaleString()}`}
          >
            <div className="space-y-2">
              <div className="relative">
                <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-text-muted text-sm font-medium">
                  $
                </span>
                <input
                  id="estimatedHomeValue"
                  type="number"
                  min={50000}
                  max={25000000}
                  step={10000}
                  value={formData.estimatedHomeValue || ''}
                  onChange={(e) => {
                    const val = parseInt(e.target.value, 10);
                    onChange('estimatedHomeValue', isNaN(val) ? 0 : val);
                  }}
                  onBlur={() => onBlur('estimatedHomeValue')}
                  aria-invalid={touched.estimatedHomeValue && !!errors.estimatedHomeValue}
                  className={`w-full pl-8 pr-3.5 py-2.5 rounded-xl border text-sm transition-all bg-bg-primary text-text-primary ${
                    touched.estimatedHomeValue && errors.estimatedHomeValue
                      ? 'border-red-400 ring-2 ring-red-100 focus:border-red-500 focus:outline-hidden'
                      : 'border-border-subtle focus:border-accent focus:ring-2 focus:ring-accent/15 focus:outline-hidden'
                  }`}
                />
              </div>

              {/* Slider for quick adjustment */}
              <input
                type="range"
                min={150000}
                max={2000000}
                step={25000}
                value={Math.min(Math.max(formData.estimatedHomeValue, 150000), 2000000)}
                onChange={(e) => onChange('estimatedHomeValue', parseInt(e.target.value, 10))}
                className="w-full accent-accent cursor-pointer h-1.5 bg-bg-secondary rounded-lg"
                aria-label="Adjust home value slider"
              />
              <div className="flex justify-between text-[11px] text-text-muted">
                <span>$150,000</span>
                <span>$1,000,000</span>
                <span>$2,000,000+</span>
              </div>
            </div>
          </FieldWrapper>
        </div>

        {/* Replacement Cost Preference Radio Bands */}
        <fieldset className="space-y-3">
          <div className="flex items-center justify-between">
            <legend className="text-xs font-bold uppercase tracking-wider text-text-primary">
              {t.replacementCost} <span className="text-red-500">*</span>
            </legend>
            {errors.replacementCostPreference && touched.replacementCostPreference && (
              <span className="text-xs text-red-500 font-medium">
                {errors.replacementCostPreference}
              </span>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {REPLACEMENT_COST_OPTIONS.map((opt) => {
              const isSelected = formData.replacementCostPreference === opt.value;
              const localizedOpt = t.replacementCostOptions[opt.value] || opt;
              return (
                <label
                  key={opt.value}
                  className={`relative flex flex-col justify-between p-4 rounded-xl border cursor-pointer transition-all ${
                    isSelected
                      ? 'border-accent bg-accent/5 ring-2 ring-accent/15 shadow-xs'
                      : 'border-border-subtle bg-bg-primary hover:border-accent-gold/60 hover:bg-bg-secondary'
                  }`}
                >
                  {'popular' in localizedOpt && localizedOpt.popular && (
                    <span className="absolute -top-2.5 right-3 text-[10px] font-bold bg-accent-gold text-white px-2 py-0.5 rounded-full uppercase tracking-wider shadow-xs">
                      {mostSelectedBadge}
                    </span>
                  )}

                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-bold text-accent">{localizedOpt.title}</span>
                      <input
                        type="radio"
                        name="replacementCostPreference"
                        value={opt.value}
                        checked={isSelected}
                        onChange={() => onChange('replacementCostPreference', opt.value)}
                        onBlur={() => onBlur('replacementCostPreference')}
                        className="h-4 w-4 text-accent border-border-subtle focus:ring-accent"
                      />
                    </div>
                    <p className="text-xs text-text-secondary leading-relaxed">{localizedOpt.desc}</p>
                  </div>

                  <div className="mt-3 pt-2 border-t border-border-subtle/60 text-[11px] font-medium text-text-muted">
                    {estCoverageLimitLabel}{' '}
                    <span className="font-bold text-text-primary">
                      ${Math.round(formData.estimatedHomeValue * opt.multiplier).toLocaleString()}
                    </span>
                  </div>
                </label>
              );
            })}
          </div>
        </fieldset>

        {/* Deductible Preference */}
        <fieldset className="space-y-3">
          <div className="flex items-center justify-between">
            <legend className="text-xs font-bold uppercase tracking-wider text-text-primary">
              {t.deductible} <span className="text-red-500">*</span>
            </legend>
            {errors.deductible && touched.deductible && (
              <span className="text-xs text-red-500 font-medium">{errors.deductible}</span>
            )}
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {DEDUCTIBLE_OPTIONS.map((opt) => {
              const isSelected = formData.deductible === opt.value;
              const localizedOpt = t.deductibleOptions[opt.value] || opt;
              return (
                <label
                  key={opt.value}
                  className={`flex flex-col justify-between p-3.5 rounded-xl border cursor-pointer transition-all ${
                    isSelected
                      ? 'border-accent bg-accent/5 ring-2 ring-accent/15 shadow-xs font-bold text-accent'
                      : 'border-border-subtle bg-bg-primary hover:border-accent-gold/60 hover:bg-bg-secondary text-text-primary'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-base font-extrabold">{localizedOpt.label}</span>
                    <input
                      type="radio"
                      name="deductible"
                      value={opt.value}
                      checked={isSelected}
                      onChange={() => onChange('deductible', opt.value)}
                      onBlur={() => onBlur('deductible')}
                      className="h-4 w-4 text-accent border-border-subtle focus:ring-accent"
                    />
                  </div>
                  <span className="text-[11px] text-text-muted leading-tight font-normal">
                    {localizedOpt.note}
                  </span>
                </label>
              );
            })}
          </div>
        </fieldset>
      </div>

      {/* Applicant Information */}
      <fieldset className="space-y-5">
        <legend className="text-sm font-bold text-accent uppercase tracking-wider">
          {t.contactLegend}
        </legend>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <FieldWrapper
            id="firstName"
            label={t.firstName}
            required
            error={touched.firstName ? errors.firstName : undefined}
          >
            <input
              id="firstName"
              type="text"
              autoComplete="given-name"
              placeholder="Jane"
              value={formData.firstName}
              onChange={(e) => onChange('firstName', e.target.value)}
              onBlur={() => onBlur('firstName')}
              aria-invalid={touched.firstName && !!errors.firstName}
              className={`w-full px-3.5 py-2.5 rounded-xl border text-sm transition-all bg-bg-primary text-text-primary ${
                touched.firstName && errors.firstName
                  ? 'border-red-400 ring-2 ring-red-100 focus:border-red-500 focus:outline-hidden'
                  : 'border-border-subtle focus:border-accent focus:ring-2 focus:ring-accent/15 focus:outline-hidden'
              }`}
            />
          </FieldWrapper>

          <FieldWrapper
            id="lastName"
            label={t.lastName}
            required
            error={touched.lastName ? errors.lastName : undefined}
          >
            <input
              id="lastName"
              type="text"
              autoComplete="family-name"
              placeholder="Smith"
              value={formData.lastName}
              onChange={(e) => onChange('lastName', e.target.value)}
              onBlur={() => onBlur('lastName')}
              aria-invalid={touched.lastName && !!errors.lastName}
              className={`w-full px-3.5 py-2.5 rounded-xl border text-sm transition-all bg-bg-primary text-text-primary ${
                touched.lastName && errors.lastName
                  ? 'border-red-400 ring-2 ring-red-100 focus:border-red-500 focus:outline-hidden'
                  : 'border-border-subtle focus:border-accent focus:ring-2 focus:ring-accent/15 focus:outline-hidden'
              }`}
            />
          </FieldWrapper>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <FieldWrapper
            id="email"
            label={t.email}
            required
            error={touched.email ? errors.email : undefined}
            helperText={emailHelperText}
          >
            <input
              id="email"
              type="email"
              autoComplete="email"
              placeholder="jane.smith@example.com"
              value={formData.email}
              onChange={(e) => onChange('email', e.target.value)}
              onBlur={() => onBlur('email')}
              aria-invalid={touched.email && !!errors.email}
              className={`w-full px-3.5 py-2.5 rounded-xl border text-sm transition-all bg-bg-primary text-text-primary ${
                touched.email && errors.email
                  ? 'border-red-400 ring-2 ring-red-100 focus:border-red-500 focus:outline-hidden'
                  : 'border-border-subtle focus:border-accent focus:ring-2 focus:ring-accent/15 focus:outline-hidden'
              }`}
            />
          </FieldWrapper>

          <FieldWrapper
            id="phone"
            label={t.phone}
            required
            error={touched.phone ? errors.phone : undefined}
            helperText={phoneHelperText}
          >
            <input
              id="phone"
              type="tel"
              autoComplete="tel"
              placeholder="(203) 748-9272"
              maxLength={14}
              value={formData.phone}
              onChange={(e) => handlePhoneChange(e.target.value)}
              onBlur={() => onBlur('phone')}
              aria-invalid={touched.phone && !!errors.phone}
              className={`w-full px-3.5 py-2.5 rounded-xl border text-sm transition-all bg-bg-primary text-text-primary ${
                touched.phone && errors.phone
                  ? 'border-red-400 ring-2 ring-red-100 focus:border-red-500 focus:outline-hidden'
                  : 'border-border-subtle focus:border-accent focus:ring-2 focus:ring-accent/15 focus:outline-hidden'
              }`}
            />
          </FieldWrapper>
        </div>

        {/* Current Insurance Status */}
        <fieldset className="space-y-3">
          <div className="flex items-center justify-between">
            <legend className="text-xs font-bold uppercase tracking-wider text-text-primary">
              {t.insuranceStatus} <span className="text-red-500">*</span>
            </legend>
            {errors.insuranceStatus && touched.insuranceStatus && (
              <span className="text-xs text-red-500 font-medium">{errors.insuranceStatus}</span>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {INSURANCE_STATUS_OPTIONS.map((opt) => {
              const isSelected = formData.insuranceStatus === opt.value;
              const localizedOpt = t.insuranceStatusOptions[opt.value] || opt;
              return (
                <label
                  key={opt.value}
                  className={`flex flex-col justify-between p-3.5 rounded-xl border cursor-pointer transition-all ${
                    isSelected
                      ? 'border-accent bg-accent/5 ring-2 ring-accent/15 shadow-xs'
                      : 'border-border-subtle bg-bg-primary hover:border-accent-gold/60 hover:bg-bg-secondary'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-xs font-bold text-text-primary">{localizedOpt.label}</span>
                    <input
                      type="radio"
                      name="insuranceStatus"
                      value={opt.value}
                      checked={isSelected}
                      onChange={() => onChange('insuranceStatus', opt.value)}
                      onBlur={() => onBlur('insuranceStatus')}
                      className="h-4 w-4 text-accent border-border-subtle focus:ring-accent"
                    />
                  </div>
                  <span className="text-[11px] text-text-muted">{localizedOpt.desc}</span>
                </label>
              );
            })}
          </div>
        </fieldset>
      </fieldset>
    </div>
  );
}
