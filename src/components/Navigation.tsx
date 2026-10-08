import { useState, useRef, useEffect } from 'react';
import { getLocalizedPath } from '../i18n/utils';

export interface SubLink {
  href: string;
  label: string;
  description?: string;
}

export interface NavLink {
  href: string;
  label: string;
  children?: SubLink[];
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
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [mobileExpanded, setMobileExpanded] = useState<Record<string, boolean>>({
    commercial: true, // Default open for ease of access
  });

  const toggleMobileSub = (label: string) => {
    setMobileExpanded((prev) => ({
      ...prev,
      [label]: !prev[label],
    }));
  };

  const normalizePath = (p: string) => (p ? p.replace(/\/$/, '') || '/' : '');

  return (
    <div className="flex items-center">
      {/* Desktop Navigation */}
      <nav className="hidden lg:flex items-center gap-2.5 xl:gap-5">
        {navLinks.map((link) => {
          const hasChildren = Boolean(link.children && link.children.length > 0);
          const currentNorm = normalizePath(currentPath);
          const linkNorm = normalizePath(link.href);
          const isDropdownActive =
            hasChildren &&
            (currentNorm === linkNorm ||
              (linkNorm !== '/' && currentNorm.startsWith(`${linkNorm}/`)) ||
              link.children?.some((child) => currentNorm === normalizePath(child.href)));

          if (!hasChildren) {
            return (
              <a
                key={link.href}
                href={link.href}
                className={`text-sm font-medium transition-colors duration-200 relative group py-2 ${
                  currentNorm === linkNorm ? 'text-accent font-semibold' : 'text-text-secondary hover:text-accent'
                }`}
              >
                {link.label}
                <span
                  className={`absolute bottom-0 left-0 h-[2px] bg-accent-gold transition-all duration-300 ${
                    currentNorm === linkNorm ? 'w-full' : 'w-0 group-hover:w-full'
                  }`}
                ></span>
              </a>
            );
          }

          return (
            <div
              key={link.href}
              className="relative group py-2"
              onMouseEnter={() => setOpenDropdown(link.label)}
              onMouseLeave={() => setOpenDropdown(null)}
            >
              {/* Trigger Link */}
              <a
                href={link.href}
                className={`inline-flex items-center gap-1.5 text-sm font-medium transition-colors duration-200 py-1 ${
                  isDropdownActive ? 'text-accent font-semibold' : 'text-text-secondary hover:text-accent'
                }`}
                aria-haspopup="true"
                aria-expanded={openDropdown === link.label}
              >
                <span>{link.label}</span>
                {/* Subtle Chevron */}
                <svg
                  className="w-3.5 h-3.5 text-text-muted group-hover:text-accent transition-transform duration-200 group-hover:rotate-180"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                </svg>
                <span
                  className={`absolute bottom-0 left-0 h-[2px] bg-accent-gold transition-all duration-300 ${
                    isDropdownActive ? 'w-full' : 'w-0 group-hover:w-full'
                  }`}
                ></span>
              </a>

              {/* Hover bridge & Dropdown container */}
              <div
                className="absolute top-full left-1/2 -translate-x-1/2 pt-2 z-50 w-80 transition-all duration-200 opacity-0 invisible translate-y-2 pointer-events-none group-hover:opacity-100 group-hover:visible group-hover:translate-y-0 group-hover:pointer-events-auto focus-within:opacity-100 focus-within:visible focus-within:translate-y-0 focus-within:pointer-events-auto"
              >
                <div className="bg-white/95 backdrop-blur-md rounded-xl shadow-2xl border border-border-subtle p-2 space-y-1">
                  {link.children?.map((child, idx) => {
                    const isChildActive = normalizePath(currentPath) === normalizePath(child.href);
                    const isFirst = idx === 0;

                    return (
                      <a
                        key={child.href}
                        href={child.href}
                        className={`group/item block p-3 rounded-lg transition-colors ${
                          isChildActive
                            ? 'bg-accent/10 border-l-2 border-accent-gold'
                            : 'hover:bg-accent/5'
                        } ${isFirst ? 'border-b border-border-subtle mb-1' : ''}`}
                      >
                        <div className="flex items-center justify-between">
                          <span
                            className={`text-sm font-semibold transition-colors ${
                              isChildActive
                                ? 'text-accent'
                                : 'text-text-primary group-hover/item:text-accent'
                            }`}
                          >
                            {child.label}
                          </span>
                          <svg
                            className="w-3.5 h-3.5 text-text-muted opacity-0 -translate-x-1 group-hover/item:opacity-100 group-hover/item:translate-x-0 transition-all duration-200"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={2}
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                          </svg>
                        </div>
                        {child.description && (
                          <p className="text-xs text-text-secondary mt-0.5 leading-snug">
                            {child.description}
                          </p>
                        )}
                      </a>
                    );
                  })}
                </div>
              </div>
            </div>
          );
        })}

        {/* Quote Button */}
        <a
          href={quoteHref}
          className="inline-flex items-center justify-center px-5 py-2.5 text-xs font-semibold tracking-wider uppercase text-white bg-accent hover:bg-accent/90 active:scale-[0.98] rounded transition-all duration-200 shadow-sm"
        >
          {quoteLabel}
        </a>

        {/* Desktop Language Switcher */}
        <div className="flex items-center gap-1.5 xl:gap-2 border-l border-zinc-200 pl-3 xl:pl-4 py-1 ml-1 xl:ml-2">
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
      <div className="lg:hidden flex items-center">
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
        <div className="absolute top-full left-0 right-0 w-full bg-white/95 backdrop-blur-md border-b border-border-subtle shadow-lg z-50 transition-all duration-300 ease-in-out lg:hidden max-h-[85vh] overflow-y-auto">
          <nav className="flex flex-col p-6 gap-2">
            {navLinks.map((link) => {
              const hasChildren = Boolean(link.children && link.children.length > 0);
              const isExpanded = mobileExpanded[link.label] ?? false;

              if (!hasChildren) {
                return (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className="text-base font-semibold text-text-secondary hover:text-accent py-2.5 transition-colors border-b border-zinc-100 last:border-0"
                  >
                    {link.label}
                  </a>
                );
              }

              return (
                <div key={link.href} className="border-b border-zinc-100 py-1">
                  <div className="flex items-center justify-between py-2">
                    <a
                      href={link.href}
                      onClick={() => setIsOpen(false)}
                      className="text-base font-semibold text-text-primary hover:text-accent"
                    >
                      {link.label}
                    </a>
                    <button
                      type="button"
                      onClick={() => toggleMobileSub(link.label)}
                      className="p-1 text-text-muted hover:text-accent"
                      aria-label={`Toggle ${link.label} sub-pages`}
                    >
                      <svg
                        className={`w-5 h-5 transition-transform duration-200 ${
                          isExpanded ? 'rotate-180 text-accent' : ''
                        }`}
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                      </svg>
                    </button>
                  </div>

                  {isExpanded && (
                    <div className="pl-3 pr-1 pb-2 space-y-1 border-l-2 border-accent-gold/40 ml-2 mt-1">
                      {link.children?.map((child) => {
                        const isChildActive = normalizePath(currentPath) === normalizePath(child.href);
                        return (
                          <a
                            key={child.href}
                            href={child.href}
                            onClick={() => setIsOpen(false)}
                            className={`block py-2 px-2 rounded transition-colors ${
                              isChildActive ? 'bg-accent/10 font-semibold' : 'hover:bg-accent/5'
                            }`}
                          >
                            <span
                              className={`block text-sm font-semibold ${
                                isChildActive ? 'text-accent' : 'text-text-primary'
                              }`}
                            >
                              {child.label}
                            </span>
                            {child.description && (
                              <span className="block text-xs text-text-muted mt-0.5">
                                {child.description}
                              </span>
                            )}
                          </a>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })}

            {/* Mobile Quote Button */}
            <a
              href={quoteHref}
              onClick={() => setIsOpen(false)}
              className="inline-flex items-center justify-center w-full px-5 py-3 text-sm font-semibold tracking-wider uppercase text-white bg-accent hover:bg-accent/90 rounded mt-3 transition-all"
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
