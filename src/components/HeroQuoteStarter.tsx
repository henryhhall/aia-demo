import React, { useState } from 'react';
import { getRecaptchaToken } from '../lib/recaptcha';
import RecaptchaLegalNotice from './RecaptchaLegalNotice';

type LineKey = 'auto' | 'home' | 'business' | 'bundle';

interface HeroQuoteStarterProps {
  lang?: 'en' | 'es' | 'pt' | 'tr';
}

const DICT = {
  en: {
    badge: 'Instant Rate Comparison',
    carriersCount: '20+ Carriers',
    title: 'Compare Connecticut Rates',
    subtitle: 'Select your insurance line and enter your ZIP to benchmark local rates.',
    zipLabel: 'Your Connecticut ZIP Code',
    zipPlaceholder: 'E.g. 06810 (Danbury) or 06795',
    ctaBtn: 'Compare Local Rates',
    guaranteeTitle: 'AIA Anti-Spam Guarantee',
    guaranteeText: 'Your information is never sold to third-party telemarketers. Speak only with our licensed Connecticut staff.',
    errorZip: 'Please enter a valid 5-digit ZIP code.',
    danburyArea: 'Danbury HQ Coverage Area',
    watertownArea: 'Watertown Branch Coverage Area',
    bridgeportArea: 'Bridgeport Branch Coverage Area',
    ctLicensedArea: 'Connecticut Licensed Service Area',
    quoteBasePath: '/quote',
    lines: {
      auto: { label: 'Auto & RV', sub: 'Liability & Collision', query: 'auto' },
      home: { label: 'Homeowners', sub: 'Dwelling & Property', query: 'home' },
      business: { label: 'Commercial', sub: 'General Liability & Comp', query: 'business' },
      bundle: { label: 'Bundle & Save', sub: 'Home + Auto Discount', query: 'auto' },
    },
  },
  es: {
    badge: 'Comparación Inmediata de Tarifas',
    carriersCount: '20+ Aseguradoras',
    title: 'Compare Tarifas en Connecticut',
    subtitle: 'Seleccione su tipo de seguro e ingrese su código postal para cotizar.',
    zipLabel: 'Su Código Postal en Connecticut',
    zipPlaceholder: 'Ej. 06810 (Danbury) o 06606',
    ctaBtn: 'Comparar Tarifas Locales',
    guaranteeTitle: 'Garantía Anti-Spam de AIA',
    guaranteeText: 'Su información nunca se vende a telemercaderistas ni intermediarios. Hable solo con nuestro equipo licenciado en CT.',
    errorZip: 'Por favor ingrese un código postal de 5 dígitos válido.',
    danburyArea: 'Área de Cobertura Sede Danbury',
    watertownArea: 'Área de Cobertura Sucursal Watertown',
    bridgeportArea: 'Área de Cobertura Sucursal Bridgeport',
    ctLicensedArea: 'Área de Servicio Licenciada en CT',
    quoteBasePath: '/es/quote',
    lines: {
      auto: { label: 'Auto y RV', sub: 'Responsabilidad y Colisión', query: 'auto' },
      home: { label: 'Propietarios', sub: 'Vivienda y Propiedad', query: 'home' },
      business: { label: 'Comercial', sub: 'Responsabilidad y Compensación', query: 'business' },
      bundle: { label: 'Paquete Combinado', sub: 'Descuento Auto + Hogar', query: 'auto' },
    },
  },
  pt: {
    badge: 'Comparação Instantânea de Tarifas',
    carriersCount: '20+ Seguradoras',
    title: 'Compare Tarifas em Connecticut',
    subtitle: 'Selecione sua modalidade de seguro e digite seu CEP para comparar.',
    zipLabel: 'Seu Código Postal (ZIP) em Connecticut',
    zipPlaceholder: 'Ex: 06810 (Danbury) ou 06795',
    ctaBtn: 'Comparar Tarifas Locais',
    guaranteeTitle: 'Garantia Anti-Spam da AIA',
    guaranteeText: 'Seus dados nunca são vendidos a empresas de telemarketing. Fale exclusivamente com nossos corretores licenciados em CT.',
    errorZip: 'Por favor, insira um código postal válido de 5 dígitos.',
    danburyArea: 'Área de Atendimento Danbury HQ',
    watertownArea: 'Área de Atendimento Filial Watertown',
    bridgeportArea: 'Área de Atendimento Filial Bridgeport',
    ctLicensedArea: 'Área com Licença Oficial em CT',
    quoteBasePath: '/pt/quote',
    lines: {
      auto: { label: 'Auto e RV', sub: 'Responsabilidade e Colisão', query: 'auto' },
      home: { label: 'Proprietários', sub: 'Imóveis e Residências', query: 'home' },
      business: { label: 'Comercial', sub: 'Responsabilidade e Acidentes', query: 'business' },
      bundle: { label: 'Combo & Economia', sub: 'Desconto Auto + Residência', query: 'auto' },
    },
  },
  tr: {
    badge: 'Anında Oran Karşılaştırması',
    carriersCount: '20+ Şirket',
    title: "Connecticut Oranlarını Karşılaştırın",
    subtitle: 'Yerel fiyatları incelemek için sigorta branşınızı ve posta kodunuzu girin.',
    zipLabel: 'Connecticut Posta Kodunuz (ZIP)',
    zipPlaceholder: 'Örn. 06810 (Danbury) veya 06795',
    ctaBtn: 'Yerel Fiyatları Karşılaştır',
    guaranteeTitle: 'AIA İstenmeyen Mesaj Garantisi',
    guaranteeText: 'Bilgileriniz asla üçüncü şahıslara veya pazarlamacılara satılmaz. Yalnızca lisanslı Connecticut ekibimizle görüşürsünüz.',
    errorZip: 'Lütfen geçerli 5 haneli bir posta kodu girin.',
    danburyArea: 'Danbury Genel Merkez Hizmet Alanı',
    watertownArea: 'Watertown Şubesi Hizmet Alanı',
    bridgeportArea: 'Bridgeport Şubesi Hizmet Alanı',
    ctLicensedArea: 'Connecticut Lisanslı Hizmet Alanı',
    quoteBasePath: '/tr/quote',
    lines: {
      auto: { label: 'Otomobil ve Karavan', sub: 'Sorumluluk ve Kasko', query: 'auto' },
      home: { label: 'Konut / Ev Sahibi', sub: 'Bina ve Eşya Teminatı', query: 'home' },
      business: { label: 'Ticari Sigorta', sub: 'Genel Sorumluluk ve Tazminat', query: 'business' },
      bundle: { label: 'Paket İndirimi', sub: 'Ev + Araç Birleşik İndirim', query: 'auto' },
    },
  },
};

export default function HeroQuoteStarter({ lang = 'en' }: HeroQuoteStarterProps) {
  const [selectedLine, setSelectedLine] = useState<LineKey>('auto');
  const [zipCode, setZipCode] = useState('');
  const [inputError, setInputError] = useState('');

  // Honeypot trap states for automated bot mitigation
  const [hpWebsite, setHpWebsite] = useState('');
  const [hpCompany, setHpCompany] = useState('');

  const t = DICT[lang] || DICT.en;

  const lineOptions = [
    { key: 'auto' as LineKey, icon: '🚗', ...t.lines.auto },
    { key: 'home' as LineKey, icon: '🏠', ...t.lines.home },
    { key: 'business' as LineKey, icon: '🏢', ...t.lines.business },
    { key: 'bundle' as LineKey, icon: '📦', ...t.lines.bundle },
  ];

  // Helper to suggest nearest office or validation
  const getZipBadge = () => {
    const clean = zipCode.trim();
    if (!clean) return null;
    if (clean.startsWith('068')) {
      return { text: t.danburyArea, color: 'text-emerald-700 bg-emerald-50 border-emerald-200' };
    }
    if (clean.startsWith('067')) {
      return { text: t.watertownArea, color: 'text-emerald-700 bg-emerald-50 border-emerald-200' };
    }
    if (clean.startsWith('066')) {
      return { text: t.bridgeportArea, color: 'text-emerald-700 bg-emerald-50 border-emerald-200' };
    }
    if (clean.length === 5 && (clean.startsWith('06') || clean.startsWith('10') || clean.startsWith('01'))) {
      return { text: t.ctLicensedArea, color: 'text-blue-700 bg-blue-50 border-blue-200' };
    }
    return null;
  };

  const badge = getZipBadge();

  const handleStartQuote = async (e: React.FormEvent) => {
    e.preventDefault();

    // Client-side Honeypot Check: if bot filled either hidden decoy field, silently abort
    if (hpWebsite || hpCompany) {
      console.warn('[Security / Honeypot] Bot submission blocked in HeroQuoteStarter.');
      return;
    }

    const cleanZip = zipCode.trim();

    if (cleanZip && !/^\d{5}$/.test(cleanZip)) {
      setInputError(t.errorZip);
      return;
    }

    // Google reCAPTCHA v3 verification token retrieval
    await getRecaptchaToken('hero_quote_starter').catch(() => null);

    const currentOption = lineOptions.find((o) => o.key === selectedLine);
    const targetType = currentOption ? currentOption.query : 'auto';
    const zipParam = cleanZip ? `&zip=${encodeURIComponent(cleanZip)}` : '';
    const bundleParam = selectedLine === 'bundle' ? '&bundle=1' : '';

    window.location.href = `${t.quoteBasePath}?type=${targetType}${zipParam}${bundleParam}`;
  };

  return (
    <div className="relative bg-white border border-border-subtle rounded-2xl p-6 sm:p-7 shadow-xl space-y-5">
      {/* Header */}
      <div className="space-y-1">
        <div className="flex items-center justify-between">
          <span className="text-[11px] font-bold uppercase tracking-wider text-accent-gold bg-accent/5 px-2.5 py-1 rounded-full border border-accent/10">
            {t.badge}
          </span>
          <span className="text-xs font-semibold text-emerald-700 flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            {t.carriersCount}
          </span>
        </div>
        <h3 className="text-xl font-bold text-accent tracking-tight">
          {t.title}
        </h3>
        <p className="text-xs text-text-secondary">
          {t.subtitle}
        </p>
      </div>

      {/* Line Selector Pills */}
      <div className="grid grid-cols-2 gap-2">
        {lineOptions.map((opt) => {
          const isSelected = selectedLine === opt.key;
          return (
            <button
              key={opt.key}
              type="button"
              onClick={() => {
                setSelectedLine(opt.key);
                setInputError('');
              }}
              className={`p-3 rounded-xl border text-left transition-all duration-200 cursor-pointer flex flex-col justify-between ${
                isSelected
                  ? 'border-accent bg-accent/5 ring-1 ring-accent text-accent shadow-xs'
                  : 'border-border-subtle hover:border-accent/30 hover:bg-bg-secondary text-text-primary'
              }`}
            >
              <div className="flex items-center gap-1.5 mb-1">
                <span className="text-base">{opt.icon}</span>
                <span className="text-xs font-bold leading-tight">{opt.label}</span>
              </div>
              <span className="text-[10px] text-text-secondary font-medium leading-tight">{opt.sub}</span>
            </button>
          );
        })}
      </div>

      {/* ZIP Code Input & Action Form */}
      <form onSubmit={handleStartQuote} className="space-y-3 pt-1">
        {/* ============================================================ */}
        {/* BOT HONEYPOT FIELDS (Invisible to human users, traps bots)   */}
        {/* ============================================================ */}
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            left: '-9999px',
            top: '-9999px',
            opacity: 0,
            zIndex: -1,
            width: 0,
            height: 0,
            overflow: 'hidden',
            pointerEvents: 'none',
            margin: 0,
            padding: 0,
          }}
        >
          <label htmlFor={`hero_hp_website_${lang}`}>Leave this field empty if human</label>
          <input
            id={`hero_hp_website_${lang}`}
            type="text"
            name="hp_website"
            tabIndex={-1}
            autoComplete="off"
            value={hpWebsite}
            onChange={(e) => setHpWebsite(e.target.value)}
          />
          <label htmlFor={`hero_hp_company_${lang}`}>Company Website</label>
          <input
            id={`hero_hp_company_${lang}`}
            type="text"
            name="hp_company"
            tabIndex={-1}
            autoComplete="off"
            value={hpCompany}
            onChange={(e) => setHpCompany(e.target.value)}
          />
        </div>
        {/* ============================================================ */}

        <div className="space-y-1.5">
          <label htmlFor={`hero-zip-${lang}`} className="block text-xs font-bold uppercase tracking-wider text-text-secondary">
            {t.zipLabel}
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-text-muted">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
              </svg>
            </div>
            <input
              id={`hero-zip-${lang}`}
              type="text"
              inputMode="numeric"
              maxLength={5}
              placeholder={t.zipPlaceholder}
              value={zipCode}
              onChange={(e) => {
                setZipCode(e.target.value.replace(/\D/g, ''));
                setInputError('');
              }}
              className="w-full pl-10 pr-4 py-3 rounded-xl border border-border-subtle bg-bg-primary text-sm font-semibold text-text-primary placeholder:text-text-muted/70 focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/10 transition-all"
            />
          </div>
          {badge && (
            <p className={`text-[11px] font-semibold px-2.5 py-1 rounded-md border inline-flex items-center gap-1.5 ${badge.color}`}>
              <svg className="w-3 h-3 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              <span>{badge.text}</span>
            </p>
          )}
          {inputError && (
            <p className="text-[11px] font-semibold text-rose-600">{inputError}</p>
          )}
        </div>

        <button
          type="submit"
          className="w-full py-3.5 px-5 rounded-xl bg-accent hover:bg-accent/90 active:scale-[0.99] text-white font-bold text-xs uppercase tracking-wider transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer group"
        >
          <span>{t.ctaBtn}</span>
          <svg className="w-4 h-4 text-accent-gold group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
          </svg>
        </button>

        {/* Google reCAPTCHA v3 Compliance Notice */}
        <RecaptchaLegalNotice lang={lang} className="pt-2 text-center" />
      </form>

      {/* Post-Hack Reassurance & Anti-Spam Guarantee */}
      <div className="pt-3 border-t border-border-subtle/60 space-y-1.5 text-center">
        <div className="flex items-center justify-center gap-1.5 text-[11px] font-medium text-emerald-700">
          <svg className="w-3.5 h-3.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z" />
          </svg>
          <span className="font-semibold">{t.guaranteeTitle}</span>
        </div>
        <p className="text-[11px] text-text-muted leading-relaxed">
          {t.guaranteeText}
        </p>
      </div>
    </div>
  );
}
