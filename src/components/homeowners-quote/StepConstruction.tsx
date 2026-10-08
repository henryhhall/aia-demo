import React from 'react';
import type { HomeownersQuoteFormData } from '../../lib/homeownersQuoteSchema';
import {
  STORIES_OPTIONS,
  ROOF_MATERIAL_OPTIONS,
  ROOF_AGE_OPTIONS,
  FOUNDATION_OPTIONS,
  EXTERIOR_WALL_OPTIONS,
} from '../../lib/homeownersQuoteSchema';
import type { HomeownersLang } from '../../lib/homeownersQuoteI18n';
import { homeownersTranslations } from '../../lib/homeownersQuoteI18n';
import FieldWrapper from './FieldWrapper';

interface StepConstructionProps {
  formData: HomeownersQuoteFormData;
  errors: Record<string, string>;
  touched: Record<string, boolean>;
  onChange: <K extends keyof HomeownersQuoteFormData>(field: K, value: HomeownersQuoteFormData[K]) => void;
  onBlur: (field: keyof HomeownersQuoteFormData) => void;
  lang?: HomeownersLang;
}

export default function StepConstruction({
  formData,
  errors,
  touched,
  onChange,
  onBlur,
  lang = 'en',
}: StepConstructionProps) {
  const t = homeownersTranslations[lang].step2;

  const storiesSubtitle =
    lang === 'es'
      ? 'Niveles habitables sobre el suelo'
      : lang === 'pt'
        ? 'Níveis habitáveis acima do solo'
        : lang === 'tr'
          ? 'Zemin üstü yaşam katları'
          : 'Above-ground habitable levels';

  const roofBoxTitle =
    lang === 'es'
      ? 'Características del Techo'
      : lang === 'pt'
        ? 'Características do Telhado'
        : lang === 'tr'
          ? 'Çatı Özellikleri'
          : 'Roof Characteristics';

  const roofBoxDesc =
    lang === 'es'
      ? 'Factor crítico para granizo, tormentas de viento y represas de hielo en Connecticut.'
      : lang === 'pt'
        ? 'Fator crítico para granizo, tempestades de vento e gelo em Connecticut.'
        : lang === 'tr'
          ? 'Connecticut\'ta dolu, fırtına ve buz birikmesi tarifeleri için kritik faktör.'
          : 'Critical factor for hail, windstorm, and ice-dam rating in Connecticut.';

  const roofAgeHelper =
    lang === 'es'
      ? 'Los techos más nuevos suelen calificar para importantes descuentos.'
      : lang === 'pt'
        ? 'Telhados mais novos geralmente se qualificam para descontos significativos.'
        : lang === 'tr'
          ? 'Daha yeni çatılar genellikle önemli indirimler sağlar.'
          : 'Newer roofs often qualify for significant discounts.';

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

      {/* Living Square Footage & Number of Stories */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Square Footage */}
        <div className="space-y-3">
          <FieldWrapper
            id="squareFootage"
            label={t.squareFootage}
            required
            error={touched.squareFootage ? errors.squareFootage : undefined}
            helperText={t.squareFootageHelper}
            badge={`${formData.squareFootage.toLocaleString()} sq ft`}
          >
            <div className="space-y-2">
              <input
                id="squareFootage"
                type="number"
                min={250}
                max={30000}
                step={50}
                value={formData.squareFootage || ''}
                onChange={(e) => {
                  const val = parseInt(e.target.value, 10);
                  onChange('squareFootage', isNaN(val) ? 0 : val);
                }}
                onBlur={() => onBlur('squareFootage')}
                aria-invalid={touched.squareFootage && !!errors.squareFootage}
                className={`w-full px-3.5 py-2.5 rounded-xl border text-sm transition-all bg-bg-primary text-text-primary ${
                  touched.squareFootage && errors.squareFootage
                    ? 'border-red-400 ring-2 ring-red-100 focus:border-red-500 focus:outline-hidden'
                    : 'border-border-subtle focus:border-accent focus:ring-2 focus:ring-accent/15 focus:outline-hidden'
                }`}
              />

              {/* Range Slider for convenience */}
              <input
                type="range"
                min={500}
                max={8000}
                step={50}
                value={Math.min(Math.max(formData.squareFootage, 500), 8000)}
                onChange={(e) => onChange('squareFootage', parseInt(e.target.value, 10))}
                className="w-full accent-accent cursor-pointer h-1.5 bg-bg-secondary rounded-lg"
                aria-label="Adjust square footage slider"
              />
              <div className="flex justify-between text-[11px] text-text-muted">
                <span>500 sq ft</span>
                <span>4,000 sq ft</span>
                <span>8,000+ sq ft</span>
              </div>
            </div>
          </FieldWrapper>
        </div>

        {/* Number of Stories */}
        <fieldset className="space-y-2">
          <div className="flex items-center justify-between">
            <legend className="text-xs font-semibold uppercase tracking-wider text-text-primary">
              {t.stories} <span className="text-red-500">*</span>
            </legend>
            {errors.stories && touched.stories && (
              <span className="text-xs text-red-500 font-medium">{errors.stories}</span>
            )}
          </div>
          <p className="text-xs text-text-muted">{storiesSubtitle}</p>

          <div className="grid grid-cols-5 gap-2 pt-1">
            {STORIES_OPTIONS.map((opt) => {
              const isSelected = formData.stories === opt.value;
              const localizedLabel = t.storiesOptions[opt.value] || opt.label;
              return (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => onChange('stories', opt.value)}
                  onBlur={() => onBlur('stories')}
                  className={`py-3 px-1 rounded-xl text-xs font-bold border transition-all text-center ${
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

      {/* Roof Details Box */}
      <div className="p-5 rounded-2xl bg-bg-secondary/40 border border-border-subtle space-y-5">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-lg bg-accent/10 text-accent">
            <svg
              className="w-4 h-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
              aria-hidden="true"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l9-9 9 9M5 10v10a1 1 0 001 1h3a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1h3a1 1 0 001-1V10" />
            </svg>
          </div>
          <div>
            <h4 className="text-sm font-bold text-accent uppercase tracking-wider">
              {roofBoxTitle}
            </h4>
            <p className="text-xs text-text-muted">
              {roofBoxDesc}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* Roof Material */}
          <FieldWrapper
            id="roofMaterial"
            label={t.roofMaterial}
            required
            error={touched.roofMaterial ? errors.roofMaterial : undefined}
          >
            <select
              id="roofMaterial"
              value={formData.roofMaterial}
              onChange={(e) => onChange('roofMaterial', e.target.value as any)}
              onBlur={() => onBlur('roofMaterial')}
              aria-invalid={touched.roofMaterial && !!errors.roofMaterial}
              className="w-full px-3.5 py-2.5 rounded-xl border border-border-subtle text-sm transition-all bg-bg-primary text-text-primary focus:border-accent focus:ring-2 focus:ring-accent/15 focus:outline-hidden"
            >
              {ROOF_MATERIAL_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {t.roofMaterialOptions[opt.value] || opt.label}
                </option>
              ))}
            </select>
          </FieldWrapper>

          {/* Roof Age */}
          <FieldWrapper
            id="roofAge"
            label={t.roofAge}
            required
            error={touched.roofAge ? errors.roofAge : undefined}
            helperText={roofAgeHelper}
          >
            <select
              id="roofAge"
              value={formData.roofAge}
              onChange={(e) => onChange('roofAge', e.target.value as any)}
              onBlur={() => onBlur('roofAge')}
              aria-invalid={touched.roofAge && !!errors.roofAge}
              className="w-full px-3.5 py-2.5 rounded-xl border border-border-subtle text-sm transition-all bg-bg-primary text-text-primary focus:border-accent focus:ring-2 focus:ring-accent/15 focus:outline-hidden"
            >
              {ROOF_AGE_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {t.roofAgeOptions[opt.value] || opt.label}
                </option>
              ))}
            </select>
          </FieldWrapper>
        </div>
      </div>

      {/* Foundation & Exterior Wall Types */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Foundation Type */}
        <fieldset className="space-y-3">
          <legend className="text-xs font-semibold uppercase tracking-wider text-text-primary">
            {t.foundation} <span className="text-red-500">*</span>
          </legend>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {FOUNDATION_OPTIONS.map((opt) => {
              const isSelected = formData.foundationType === opt.value;
              const localizedLabel = t.foundationOptions[opt.value] || opt.label;
              return (
                <label
                  key={opt.value}
                  className={`flex items-center gap-2.5 p-3 rounded-xl border cursor-pointer transition-all ${
                    isSelected
                      ? 'border-accent bg-accent/5 ring-2 ring-accent/15 font-semibold text-accent shadow-xs'
                      : 'border-border-subtle bg-bg-primary text-text-primary hover:border-accent-gold/60 hover:bg-bg-secondary'
                  }`}
                >
                  <input
                    type="radio"
                    name="foundationType"
                    value={opt.value}
                    checked={isSelected}
                    onChange={() => onChange('foundationType', opt.value)}
                    onBlur={() => onBlur('foundationType')}
                    className="h-4 w-4 text-accent border-border-subtle focus:ring-accent"
                  />
                  <span className="text-xs">{localizedLabel}</span>
                </label>
              );
            })}
          </div>
        </fieldset>

        {/* Exterior Wall Type */}
        <fieldset className="space-y-3">
          <legend className="text-xs font-semibold uppercase tracking-wider text-text-primary">
            {t.exteriorWall} <span className="text-red-500">*</span>
          </legend>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {EXTERIOR_WALL_OPTIONS.map((opt) => {
              const isSelected = formData.exteriorWallType === opt.value;
              const localizedLabel = t.exteriorWallOptions[opt.value] || opt.label;
              return (
                <label
                  key={opt.value}
                  className={`flex items-center gap-2.5 p-3 rounded-xl border cursor-pointer transition-all ${
                    isSelected
                      ? 'border-accent bg-accent/5 ring-2 ring-accent/15 font-semibold text-accent shadow-xs'
                      : 'border-border-subtle bg-bg-primary text-text-primary hover:border-accent-gold/60 hover:bg-bg-secondary'
                  }`}
                >
                  <input
                    type="radio"
                    name="exteriorWallType"
                    value={opt.value}
                    checked={isSelected}
                    onChange={() => onChange('exteriorWallType', opt.value)}
                    onBlur={() => onBlur('exteriorWallType')}
                    className="h-4 w-4 text-accent border-border-subtle focus:ring-accent"
                  />
                  <span className="text-xs">{localizedLabel}</span>
                </label>
              );
            })}
          </div>
        </fieldset>
      </div>
    </div>
  );
}
