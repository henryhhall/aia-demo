import React from 'react';
import type { HomeownersQuoteFormData } from '../../lib/homeownersQuoteSchema';
import { PROPERTY_TYPE_OPTIONS, PRIMARY_USAGE_OPTIONS } from '../../lib/homeownersQuoteSchema';
import type { HomeownersLang } from '../../lib/homeownersQuoteI18n';
import { homeownersTranslations } from '../../lib/homeownersQuoteI18n';
import FieldWrapper from './FieldWrapper';

interface StepLocationProps {
  formData: HomeownersQuoteFormData;
  errors: Record<string, string>;
  touched: Record<string, boolean>;
  onChange: <K extends keyof HomeownersQuoteFormData>(field: K, value: HomeownersQuoteFormData[K]) => void;
  onBlur: (field: keyof HomeownersQuoteFormData) => void;
  lang?: HomeownersLang;
}

const US_STATES = [
  'CT', 'NY', 'MA', 'RI', 'NJ', 'PA', 'VT', 'NH', 'ME',
  'AL', 'AK', 'AZ', 'AR', 'CA', 'CO', 'DE', 'FL', 'GA', 'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY',
  'LA', 'MD', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NM', 'NC', 'ND', 'OH', 'OK', 'OR',
  'SC', 'SD', 'TN', 'TX', 'UT', 'VA', 'WA', 'WV', 'WI', 'WY'
];

export default function StepLocation({
  formData,
  errors,
  touched,
  onChange,
  onBlur,
  lang = 'en',
}: StepLocationProps) {
  const currentYear = new Date().getFullYear();
  const t = homeownersTranslations[lang].step1;

  const historicNotice =
    lang === 'es'
      ? 'Revisión de crédito de construcción histórica aplicada.'
      : lang === 'pt'
        ? 'Revisão de crédito de construção histórica aplicada.'
        : lang === 'tr'
          ? 'Tarihi bina inşaat indirimi incelemesi uygulandı.'
          : 'Historic construction credit review applied.';

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

      {/* Property Address Group */}
      <fieldset className="space-y-4">
        <legend className="text-sm font-bold text-accent uppercase tracking-wider mb-2">
          {t.addressLegend}
        </legend>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="sm:col-span-2">
            <FieldWrapper
              id="streetAddress"
              label={t.streetAddress}
              required
              error={touched.streetAddress ? errors.streetAddress : undefined}
              helperText={t.streetHelper}
            >
              <input
                id="streetAddress"
                type="text"
                autoComplete="street-address"
                placeholder={t.streetPlaceholder}
                value={formData.streetAddress}
                onChange={(e) => onChange('streetAddress', e.target.value)}
                onBlur={() => onBlur('streetAddress')}
                aria-invalid={touched.streetAddress && !!errors.streetAddress}
                aria-describedby={
                  touched.streetAddress && errors.streetAddress
                    ? 'streetAddress-error'
                    : 'streetAddress-helper'
                }
                className={`w-full px-3.5 py-2.5 rounded-xl border text-sm transition-all bg-bg-primary text-text-primary ${
                  touched.streetAddress && errors.streetAddress
                    ? 'border-red-400 ring-2 ring-red-100 focus:border-red-500 focus:outline-hidden'
                    : 'border-border-subtle focus:border-accent focus:ring-2 focus:ring-accent/15 focus:outline-hidden'
                }`}
              />
            </FieldWrapper>
          </div>

          <div>
            <FieldWrapper
              id="unit"
              label={t.unit}
              helperText={t.unitHelper}
            >
              <input
                id="unit"
                type="text"
                placeholder={t.unitPlaceholder}
                value={formData.unit}
                onChange={(e) => onChange('unit', e.target.value)}
                onBlur={() => onBlur('unit')}
                className="w-full px-3.5 py-2.5 rounded-xl border border-border-subtle text-sm transition-all bg-bg-primary text-text-primary focus:border-accent focus:ring-2 focus:ring-accent/15 focus:outline-hidden"
              />
            </FieldWrapper>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-6 gap-4">
          <div className="sm:col-span-3">
            <FieldWrapper
              id="city"
              label={t.city}
              required
              error={touched.city ? errors.city : undefined}
            >
              <input
                id="city"
                type="text"
                autoComplete="address-level2"
                placeholder={t.cityPlaceholder}
                value={formData.city}
                onChange={(e) => onChange('city', e.target.value)}
                onBlur={() => onBlur('city')}
                aria-invalid={touched.city && !!errors.city}
                className={`w-full px-3.5 py-2.5 rounded-xl border text-sm transition-all bg-bg-primary text-text-primary ${
                  touched.city && errors.city
                    ? 'border-red-400 ring-2 ring-red-100 focus:border-red-500 focus:outline-hidden'
                    : 'border-border-subtle focus:border-accent focus:ring-2 focus:ring-accent/15 focus:outline-hidden'
                }`}
              />
            </FieldWrapper>
          </div>

          <div className="sm:col-span-1">
            <FieldWrapper
              id="state"
              label={t.state}
              required
              error={touched.state ? errors.state : undefined}
            >
              <select
                id="state"
                value={formData.state}
                onChange={(e) => onChange('state', e.target.value)}
                onBlur={() => onBlur('state')}
                aria-invalid={touched.state && !!errors.state}
                className="w-full px-3 py-2.5 rounded-xl border border-border-subtle text-sm transition-all bg-bg-primary text-text-primary focus:border-accent focus:ring-2 focus:ring-accent/15 focus:outline-hidden"
              >
                {US_STATES.map((st) => (
                  <option key={st} value={st}>
                    {st}
                  </option>
                ))}
              </select>
            </FieldWrapper>
          </div>

          <div className="sm:col-span-2">
            <FieldWrapper
              id="zipCode"
              label={t.zipCode}
              required
              error={touched.zipCode ? errors.zipCode : undefined}
              helperText={t.zipHelper}
            >
              <input
                id="zipCode"
                type="text"
                autoComplete="postal-code"
                placeholder={t.zipPlaceholder}
                maxLength={10}
                value={formData.zipCode}
                onChange={(e) => onChange('zipCode', e.target.value)}
                onBlur={() => onBlur('zipCode')}
                aria-invalid={touched.zipCode && !!errors.zipCode}
                className={`w-full px-3.5 py-2.5 rounded-xl border text-sm transition-all bg-bg-primary text-text-primary ${
                  touched.zipCode && errors.zipCode
                    ? 'border-red-400 ring-2 ring-red-100 focus:border-red-500 focus:outline-hidden'
                    : 'border-border-subtle focus:border-accent focus:ring-2 focus:ring-accent/15 focus:outline-hidden'
                }`}
              />
            </FieldWrapper>
          </div>
        </div>
      </fieldset>

      {/* Property Type Radio Cards */}
      <fieldset className="space-y-3">
        <div className="flex items-center justify-between">
          <legend className="text-sm font-bold text-accent uppercase tracking-wider">
            {t.propertyType} <span className="text-red-500">*</span>
          </legend>
          {errors.propertyType && touched.propertyType && (
            <span className="text-xs text-red-500 font-medium">{errors.propertyType}</span>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {PROPERTY_TYPE_OPTIONS.map((opt) => {
            const isSelected = formData.propertyType === opt.value;
            const localizedOpt = t.propertyTypeOptions[opt.value] || opt;
            return (
              <label
                key={opt.value}
                className={`flex items-start gap-3 p-3.5 rounded-xl border cursor-pointer transition-all ${
                  isSelected
                    ? 'border-accent bg-accent/5 ring-2 ring-accent/15 shadow-xs'
                    : 'border-border-subtle bg-bg-primary hover:border-accent-gold/60 hover:bg-bg-secondary'
                }`}
              >
                <input
                  type="radio"
                  name="propertyType"
                  value={opt.value}
                  checked={isSelected}
                  onChange={() => onChange('propertyType', opt.value)}
                  onBlur={() => onBlur('propertyType')}
                  className="mt-1 h-4 w-4 text-accent border-border-subtle focus:ring-accent"
                />
                <div className="flex-1">
                  <div className="text-sm font-semibold text-text-primary">{localizedOpt.label}</div>
                  <div className="text-xs text-text-muted mt-0.5">{localizedOpt.desc}</div>
                </div>
              </label>
            );
          })}
        </div>
      </fieldset>

      {/* Primary Usage & Year Built in Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Primary Usage Radio Cards */}
        <fieldset className="md:col-span-2 space-y-3">
          <legend className="text-sm font-bold text-accent uppercase tracking-wider">
            {t.primaryUsage} <span className="text-red-500">*</span>
          </legend>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {PRIMARY_USAGE_OPTIONS.map((opt) => {
              const isSelected = formData.primaryUsage === opt.value;
              const localizedOpt = t.primaryUsageOptions[opt.value] || opt;
              return (
                <label
                  key={opt.value}
                  className={`flex flex-col justify-between p-3.5 rounded-xl border cursor-pointer transition-all ${
                    isSelected
                      ? 'border-accent bg-accent/5 ring-2 ring-accent/15'
                      : 'border-border-subtle bg-bg-primary hover:border-accent-gold/60 hover:bg-bg-secondary'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold text-text-primary">{localizedOpt.label}</span>
                    <input
                      type="radio"
                      name="primaryUsage"
                      value={opt.value}
                      checked={isSelected}
                      onChange={() => onChange('primaryUsage', opt.value)}
                      onBlur={() => onBlur('primaryUsage')}
                      className="h-4 w-4 text-accent border-border-subtle focus:ring-accent"
                    />
                  </div>
                  <span className="text-[11px] text-text-muted leading-tight">{localizedOpt.desc}</span>
                </label>
              );
            })}
          </div>
        </fieldset>

        {/* Year Built */}
        <div className="md:col-span-1">
          <FieldWrapper
            id="yearBuilt"
            label={t.yearBuilt}
            required
            error={touched.yearBuilt ? errors.yearBuilt : undefined}
            helperText={t.yearBuiltHelper(currentYear)}
          >
            <input
              id="yearBuilt"
              type="number"
              min={1700}
              max={currentYear + 1}
              placeholder="1995"
              value={formData.yearBuilt || ''}
              onChange={(e) => {
                const val = parseInt(e.target.value, 10);
                onChange('yearBuilt', isNaN(val) ? 0 : val);
              }}
              onBlur={() => onBlur('yearBuilt')}
              aria-invalid={touched.yearBuilt && !!errors.yearBuilt}
              className={`w-full px-3.5 py-2.5 rounded-xl border text-sm transition-all bg-bg-primary text-text-primary ${
                touched.yearBuilt && errors.yearBuilt
                  ? 'border-red-400 ring-2 ring-red-100 focus:border-red-500 focus:outline-hidden'
                  : 'border-border-subtle focus:border-accent focus:ring-2 focus:ring-accent/15 focus:outline-hidden'
              }`}
            />
            {formData.yearBuilt > 0 && formData.yearBuilt < 1960 && (
              <p className="text-[11px] text-accent-gold mt-1">
                {historicNotice}
              </p>
            )}
          </FieldWrapper>
        </div>
      </div>
    </div>
  );
}
