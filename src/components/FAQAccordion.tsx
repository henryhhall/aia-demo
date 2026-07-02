import { useState } from 'react';

interface FAQItem {
  question: string;
  answer: string;
}

export default function FAQAccordion({ items }: { items: FAQItem[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleIndex = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="space-y-4 max-w-3xl mx-auto">
      {items.map((item, index) => {
        const isOpen = openIndex === index;
        return (
          <div
            key={index}
            className="border border-border-subtle bg-bg-secondary rounded-lg overflow-hidden transition-all duration-300"
          >
            <button
              onClick={() => toggleIndex(index)}
              className="w-full flex items-center justify-between p-5 text-left text-text-primary hover:text-accent transition-colors focus:outline-none"
              aria-expanded={isOpen}
            >
              <span className="text-base font-semibold">{item.question}</span>
              <svg
                className={`w-5 h-5 shrink-0 text-text-muted transition-transform duration-300 ${isOpen ? 'rotate-180 text-accent-gold' : ''}`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
              </svg>
            </button>
            <div
              className={`transition-all duration-300 ease-in-out overflow-hidden ${
                isOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'
              }`}
            >
              <div className="p-5 pt-0 text-sm leading-relaxed text-text-secondary border-t border-border-subtle/50">
                {item.answer}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
