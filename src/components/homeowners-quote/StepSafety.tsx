import React from 'react';
import type { HomeownersQuoteFormData } from '../../lib/homeownersQuoteSchema';
import {
  HYDRANT_OPTIONS,
  PROTECTIVE_DEVICE_OPTIONS,
} from '../../lib/homeownersQuoteSchema';
import type { HomeownersLang } from '../../lib/homeownersQuoteI18n';
import { homeownersTranslations } from '../../lib/homeownersQuoteI18n';
import FieldWrapper from './FieldWrapper';

interface StepSafetyProps {
  formData: HomeownersQuoteFormData;
  errors: Record<string, string>;
  touched: Record<string, boolean>;
  onChange: <K extends keyof HomeownersQuoteFormData>(field: K, value: HomeownersQuoteFormData[K]) => void;
  onBlur: (field: keyof HomeownersQuoteFormData) => void;
  lang?: HomeownersLang;
}

export default function StepSafety({
  formData,
  errors,
  touched,
  onChange,
  onBlur,
  lang = 'en',
}: StepSafetyProps) {
  const t = homeownersTranslations[lang].step3;

  const toggleProtectiveDevice = (deviceValue: any) => {
    const current = [...formData.protectiveDevices];
    const index = current.indexOf(deviceValue);
    if (index > -1) {
      current.splice(index, 1);
    } else {
      current.push(deviceValue);
    }
    onChange('protectiveDevices', current);
  };

  const yesLabel = lang === 'es' ? 'Sí' : lang === 'pt' ? 'Sim' : lang === 'tr' ? 'Evet' : 'Yes';
  const noLabel = lang === 'es' ? 'No' : lang === 'pt' ? 'Não' : lang === 'tr' ? 'Hayır' : 'No';
  const creditsActiveLabel =
    lang === 'es'
      ? `${formData.protectiveDevices.length} Créditos Activos`
      : lang === 'pt'
        ? `${formData.protectiveDevices.length} Créditos Ativos`
        : lang === 'tr'
          ? `${formData.protectiveDevices.length} Aktif İndirim`
          : `${formData.protectiveDevices.length} Credits Active`;

  const riskFactorsSub =
    lang === 'es'
      ? 'La total transparencia garantiza que no haya disputas en reclamaciones y que los límites de responsabilidad protejan sus activos.'
      : lang === 'pt'
        ? 'A total transparência garante que não haja disputas em sinistros e assegura que limites adequados protejam seu patrimônio.'
        : lang === 'tr'
          ? 'Tam şeffaflık hasar anında ihtilafları önler ve sorumluluk limitlerinin varlıklarınızı korumasını sağlar.'
          : 'Full transparency ensures no claim disputes and guarantees that appropriate liability limits protect your assets.';

  const dogSubNotice =
    lang === 'es'
      ? 'El estatuto § 22-357 de responsabilidad estricta de Connecticut aplica a la tenencia de caninos.'
      : lang === 'pt'
        ? 'A legislação de responsabilidade objetiva de Connecticut (§ 22-357) aplica-se à posse de cães.'
        : lang === 'tr'
          ? 'Connecticut katı sorumluluk kanunu Madde § 22-357 köpek sahipliği için geçerlidir.'
          : 'Connecticut strict liability statute § 22-357 applies to canine ownership.';

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

      {/* Distance to Nearest Fire Hydrant */}
      <fieldset className="space-y-3">
        <div className="flex items-center justify-between">
          <legend className="text-sm font-bold text-accent uppercase tracking-wider">
            {t.hydrant} <span className="text-red-500">*</span>
          </legend>
          {errors.distanceToHydrant && touched.distanceToHydrant && (
            <span className="text-xs text-red-500 font-medium">{errors.distanceToHydrant}</span>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {HYDRANT_OPTIONS.map((opt) => {
            const isSelected = formData.distanceToHydrant === opt.value;
            const localizedOpt = t.hydrantOptions[opt.value] || opt;
            return (
              <label
                key={opt.value}
                className={`flex flex-col justify-between p-3.5 rounded-xl border cursor-pointer transition-all ${
                  isSelected
                    ? 'border-accent bg-accent/5 ring-2 ring-accent/15 shadow-xs font-semibold'
                    : 'border-border-subtle bg-bg-primary hover:border-accent-gold/60 hover:bg-bg-secondary'
                }`}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-sm text-text-primary">{localizedOpt.label}</span>
                  <input
                    type="radio"
                    name="distanceToHydrant"
                    value={opt.value}
                    checked={isSelected}
                    onChange={() => onChange('distanceToHydrant', opt.value)}
                    onBlur={() => onBlur('distanceToHydrant')}
                    className="h-4 w-4 text-accent border-border-subtle focus:ring-accent"
                  />
                </div>
                <span className="text-xs text-text-muted">{localizedOpt.desc}</span>
              </label>
            );
          })}
        </div>
      </fieldset>

      {/* Protective Devices Multi-Checkbox */}
      <fieldset className="space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <legend className="text-sm font-bold text-accent uppercase tracking-wider">
              {t.protectiveSystemsLegend}
            </legend>
            <p className="text-xs text-text-muted mt-0.5">
              {t.protectiveSystemsSub}
            </p>
          </div>
          <span className="text-xs font-medium text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
            {creditsActiveLabel}
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {PROTECTIVE_DEVICE_OPTIONS.map((device) => {
            const isChecked = formData.protectiveDevices.includes(device.value as any);
            const localizedDevice = t.protectiveDeviceOptions[device.value] || device;
            return (
              <label
                key={device.value}
                className={`flex items-start gap-3 p-3.5 rounded-xl border cursor-pointer transition-all ${
                  isChecked
                    ? 'border-emerald-600 bg-emerald-50/50 ring-1 ring-emerald-500/20 shadow-xs'
                    : 'border-border-subtle bg-bg-primary hover:border-accent-gold/60 hover:bg-bg-secondary'
                }`}
              >
                <input
                  type="checkbox"
                  value={device.value}
                  checked={isChecked}
                  onChange={() => toggleProtectiveDevice(device.value)}
                  className="mt-1 h-4 w-4 text-emerald-600 rounded border-border-subtle focus:ring-emerald-500"
                />
                <div className="flex-1">
                  <div className="text-xs font-bold text-text-primary">{localizedDevice.label}</div>
                  <span className="inline-block mt-1 text-[11px] font-semibold text-emerald-700 bg-emerald-100/70 px-2 py-0.5 rounded-md">
                    {localizedDevice.discount}
                  </span>
                </div>
              </label>
            );
          })}
        </div>
      </fieldset>

      {/* Additional Features & Risk Exposures Card */}
      <div className="p-5 rounded-2xl bg-bg-secondary/40 border border-border-subtle space-y-6">
        <div>
          <h4 className="text-sm font-bold text-accent uppercase tracking-wider">
            {t.riskFactorsLegend}
          </h4>
          <p className="text-xs text-text-muted mt-0.5">
            {riskFactorsSub}
          </p>
        </div>

        {/* Swimming Pool Toggle */}
        <div className="space-y-3 border-b border-border-subtle/80 pb-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-text-primary">
                {t.poolLabel}
              </span>
              <p className="text-xs text-text-muted">{t.poolSub}</p>
            </div>

            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => {
                  onChange('hasPool', true);
                  if (formData.poolFenceStatus === 'none') {
                    onChange('poolFenceStatus', 'fenced');
                  }
                }}
                className={`px-4 py-1.5 rounded-xl text-xs font-bold border transition-all ${
                  formData.hasPool
                    ? 'border-accent bg-accent text-white shadow-xs'
                    : 'border-border-subtle bg-bg-primary text-text-primary hover:bg-bg-secondary'
                }`}
              >
                {yesLabel}
              </button>
              <button
                type="button"
                onClick={() => {
                  onChange('hasPool', false);
                  onChange('poolFenceStatus', 'none');
                }}
                className={`px-4 py-1.5 rounded-xl text-xs font-bold border transition-all ${
                  !formData.hasPool
                    ? 'border-accent bg-accent text-white shadow-xs'
                    : 'border-border-subtle bg-bg-primary text-text-primary hover:bg-bg-secondary'
                }`}
              >
                {noLabel}
              </button>
            </div>
          </div>

          {/* Conditional Fenced / Unfenced selector */}
          {formData.hasPool && (
            <div className="mt-3 p-3.5 bg-bg-primary rounded-xl border border-accent/20 space-y-2 animate-fadeIn">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-accent">
                  {t.poolFence} <span className="text-red-500">*</span>
                </span>
                {errors.poolFenceStatus && (
                  <span className="text-xs text-red-500 font-medium">{errors.poolFenceStatus}</span>
                )}
              </div>

              <div className="grid grid-cols-2 gap-3 pt-1">
                <label
                  className={`flex items-center gap-2 p-2.5 rounded-lg border text-xs cursor-pointer font-medium ${
                    formData.poolFenceStatus === 'fenced'
                      ? 'border-emerald-600 bg-emerald-50 text-emerald-900 ring-1 ring-emerald-500/20'
                      : 'border-border-subtle hover:bg-bg-secondary'
                  }`}
                >
                  <input
                    type="radio"
                    name="poolFenceStatus"
                    value="fenced"
                    checked={formData.poolFenceStatus === 'fenced'}
                    onChange={() => onChange('poolFenceStatus', 'fenced')}
                    className="h-3.5 w-3.5 text-emerald-600 focus:ring-emerald-500"
                  />
                  <span>{t.poolFenceOptions.fenced}</span>
                </label>

                <label
                  className={`flex items-center gap-2 p-2.5 rounded-lg border text-xs cursor-pointer font-medium ${
                    formData.poolFenceStatus === 'unfenced'
                      ? 'border-amber-600 bg-amber-50 text-amber-900 ring-1 ring-amber-500/20'
                      : 'border-border-subtle hover:bg-bg-secondary'
                  }`}
                >
                  <input
                    type="radio"
                    name="poolFenceStatus"
                    value="unfenced"
                    checked={formData.poolFenceStatus === 'unfenced'}
                    onChange={() => onChange('poolFenceStatus', 'unfenced')}
                    className="h-3.5 w-3.5 text-amber-600 focus:ring-amber-500"
                  />
                  <span>{t.poolFenceOptions.unfenced}</span>
                </label>
              </div>
            </div>
          )}
        </div>

        {/* Trampoline or Skateboard Ramp */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-border-subtle/80 pb-5">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-text-primary">
              {t.trampolineLabel}
            </span>
            <p className="text-xs text-text-muted">
              {t.trampolineSub}
            </p>
          </div>

          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => onChange('hasTrampolineOrRamp', true)}
              className={`px-4 py-1.5 rounded-xl text-xs font-bold border transition-all ${
                formData.hasTrampolineOrRamp
                  ? 'border-accent bg-accent text-white shadow-xs'
                  : 'border-border-subtle bg-bg-primary text-text-primary hover:bg-bg-secondary'
              }`}
            >
              {yesLabel}
            </button>
            <button
              type="button"
              onClick={() => onChange('hasTrampolineOrRamp', false)}
              className={`px-4 py-1.5 rounded-xl text-xs font-bold border transition-all ${
                !formData.hasTrampolineOrRamp
                  ? 'border-accent bg-accent text-white shadow-xs'
                  : 'border-border-subtle bg-bg-primary text-text-primary hover:bg-bg-secondary'
              }`}
            >
              {noLabel}
            </button>
          </div>
        </div>

        {/* Dog on Premises */}
        <div className="space-y-3 border-b border-border-subtle/80 pb-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-text-primary">
                {t.dogLabel}
              </span>
              <p className="text-xs text-text-muted">
                {dogSubNotice}
              </p>
            </div>

            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => onChange('hasDog', true)}
                className={`px-4 py-1.5 rounded-xl text-xs font-bold border transition-all ${
                  formData.hasDog
                    ? 'border-accent bg-accent text-white shadow-xs'
                    : 'border-border-subtle bg-bg-primary text-text-primary hover:bg-bg-secondary'
                }`}
              >
                {yesLabel}
              </button>
              <button
                type="button"
                onClick={() => {
                  onChange('hasDog', false);
                  onChange('dogBreed', '');
                }}
                className={`px-4 py-1.5 rounded-xl text-xs font-bold border transition-all ${
                  !formData.hasDog
                    ? 'border-accent bg-accent text-white shadow-xs'
                    : 'border-border-subtle bg-bg-primary text-text-primary hover:bg-bg-secondary'
                }`}
              >
                {noLabel}
              </button>
            </div>
          </div>

          {formData.hasDog && (
            <div className="pt-2 animate-fadeIn">
              <FieldWrapper
                id="dogBreed"
                label={t.dogBreed}
                helperText={t.dogBreedPlaceholder}
              >
                <input
                  id="dogBreed"
                  type="text"
                  placeholder={t.dogBreedPlaceholder}
                  value={formData.dogBreed}
                  onChange={(e) => onChange('dogBreed', e.target.value)}
                  onBlur={() => onBlur('dogBreed')}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-border-subtle text-sm transition-all bg-bg-primary text-text-primary focus:border-accent focus:ring-2 focus:ring-accent/15 focus:outline-hidden"
                />
              </FieldWrapper>
            </div>
          )}
        </div>

        {/* Prior Claims in the Last 5 Years */}
        <fieldset className="space-y-2">
          <div className="flex items-center justify-between">
            <legend className="text-xs font-bold uppercase tracking-wider text-text-primary">
              {t.claimsLegend} <span className="text-red-500">*</span>
            </legend>
            {errors.priorClaims && touched.priorClaims && (
              <span className="text-xs text-red-500 font-medium">{errors.priorClaims}</span>
            )}
          </div>
          <p className="text-xs text-text-muted">
            {t.claimsHelper}
          </p>

          <div className="grid grid-cols-4 gap-3 pt-1">
            {(['0', '1', '2', '3+'] as const).map((num) => {
              const isSelected = formData.priorClaims === num;
              const localizedLabel = t.claimsOptions[num] || num;
              return (
                <button
                  key={num}
                  type="button"
                  onClick={() => onChange('priorClaims', num)}
                  onBlur={() => onBlur('priorClaims')}
                  className={`py-2.5 rounded-xl text-xs font-bold border transition-all text-center ${
                    isSelected
                      ? 'border-accent bg-accent text-white shadow-xs'
                      : 'border-border-subtle bg-bg-primary text-text-primary hover:border-accent-gold hover:bg-bg-secondary'
                  }`}
                >
                  {localizedLabel}
                </button>
              );
            })}
          </div>
        </fieldset>
      </div>
    </div>
  );
}
