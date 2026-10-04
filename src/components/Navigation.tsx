import { useState } from 'react';
import { getLocalizedPath } from '../i18n/utils';

interface NavLink {
  href: string;
  label: string;
}

interface NavigationProps {
  navLinks: NavLink[];
  currentLang: string;
  currentPath: string;
  quoteLabel: string;
  quoteHref: string;
}

const languages = [
  { code: 'en', label: 'EN' },
  { code: 'es', label: 'ES' },
  { code: 'pt', label: 'PT' },
  { code: 'tr', label: 'TR' },
];

export default function Navigation({
  navLinks,
  currentLang,
  currentPath,
  quoteLabel,
  quoteHref,
}: NavigationProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex items-center">
      {/* Desktop Navigation */}
      <nav className="hidden md:flex items-center gap-8">
        {navLinks.map((link) => (
          <a
            key={link.href}
            href={link.href}
            className="text-sm font-medium text-text-secondary hover:text-accent transition-colors duration-200 relative group py-2"
          >
            {link.label}
            <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-accent-gold transition-all duration-300 group-hover:w-full"></span>
          </a>
        ))}
        <a
          href={quoteHref}
          className="inline-flex items-center justify-center px-5 py-2.5 text-xs font-semibold tracking-wider uppercase text-white bg-accent hover:bg-accent/90 active:scale-[0.98] rounded transition-all duration-200 shadow-sm"
        >
          {quoteLabel}
        </a>

        {/* Desktop Language Switcher */}
        <div className="flex items-center gap-2 border-l border-zinc-200 pl-4 py-1 ml-2">
          {languages.map((l, index) => (
            <span key={l.code} className="flex items-center gap-2">
              <a
                href={getLocalizedPath(currentPath, l.code)}
                className={`text-xs font-bold transition-colors duration-200 ${
                  currentLang === l.code
                    ? 'text-accent-gold pointer-events-none'
                    : 'text-text-secondary hover:text-accent'
                }`}
              >
                {l.label}
              </a>
              {index < languages.length - 1 && (
                <span className="text-[10px] text-zinc-300 select-none">|</span>
              )}
            </span>
          ))}
        </div>
      </nav>

      {/* Mobile Menu Button */}
      <div className="md:hidden flex items-center">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="p-2 text-text-primary hover:text-accent focus:outline-none"
          aria-label="Toggle menu"
          aria-expanded={isOpen}
        >
          <svg
            className="w-6 h-6 transition-transform duration-200"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            {isOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      {isOpen && (
        <div className="absolute top-full left-0 right-0 w-full bg-white/95 backdrop-blur-md border-b border-border-subtle shadow-lg z-50 transition-all duration-300 ease-in-out md:hidden">
          <nav className="flex flex-col p-6 gap-4">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="text-base font-semibold text-text-secondary hover:text-accent py-2 transition-colors border-b border-zinc-100 last:border-0"
              >
                {link.label}
              </a>
            ))}
            <a
              href={quoteHref}
              onClick={() => setIsOpen(false)}
              className="inline-flex items-center justify-center w-full px-5 py-3 text-sm font-semibold tracking-wider uppercase text-white bg-accent hover:bg-accent/90 rounded mt-2 transition-all"
            >
              {quoteLabel}
            </a>

            {/* Mobile Language Switcher */}
            <div className="flex items-center justify-center gap-4 pt-4 mt-2 border-t border-zinc-100">
              {languages.map((l) => (
                <a
                  key={l.code}
                  href={getLocalizedPath(currentPath, l.code)}
                  onClick={() => setIsOpen(false)}
                  className={`text-sm font-bold px-3 py-1.5 rounded transition-colors ${
                    currentLang === l.code
                      ? 'bg-accent/5 text-accent-gold pointer-events-none'
                      : 'text-text-secondary hover:text-accent'
                  }`}
                >
                  {l.label}
                </a>
              ))}
            </div>
          </nav>
        </div>
      )}
    </div>
  );
}

