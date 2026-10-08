import React from 'react';

interface FieldWrapperProps {
  id: string;
  label: string;
  required?: boolean;
  error?: string;
  helperText?: string;
  badge?: string;
  children: React.ReactNode;
  className?: string;
}

export default function FieldWrapper({
  id,
  label,
  required = false,
  error,
  helperText,
  badge,
  children,
  className = '',
}: FieldWrapperProps) {
  const errorId = `${id}-error`;
  const helperId = `${id}-helper`;

  return (
    <div className={`space-y-1.5 ${className}`}>
      <div className="flex items-center justify-between">
        <label
          htmlFor={id}
          className="block text-xs font-semibold uppercase tracking-wider text-text-primary"
        >
          {label}
          {required && <span className="text-red-500 ml-1" aria-hidden="true">*</span>}
        </label>
        {badge && (
          <span className="text-[11px] font-medium px-2 py-0.5 rounded-full bg-[#122b5f]/10 text-[#122b5f] border border-[#122b5f]/20">
            {badge}
          </span>
        )}
      </div>

      <div>{children}</div>

      {helperText && !error && (
        <p id={helperId} className="text-xs text-text-muted">
          {helperText}
        </p>
      )}

      {error && (
        <p
          id={errorId}
          role="alert"
          className="text-xs text-red-600 font-medium flex items-center gap-1.5 mt-1"
        >
          <svg
            className="w-3.5 h-3.5 shrink-0 text-red-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2.5}
            aria-hidden="true"
          >
            <circle cx="12" cy="12" r="10" stroke="currentColor" />
            <path strokeLinecap="round" d="M12 8v4m0 4h.01" />
          </svg>
          <span>{error}</span>
        </p>
      )}
    </div>
  );
}
