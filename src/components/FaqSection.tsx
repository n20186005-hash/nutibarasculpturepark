'use client';

import { useTranslations, useMessages } from 'next-intl';

export default function FaqSection() {
  const t = useTranslations('faq');
  const messages = useMessages() as any;
  const items = (messages?.faq?.items || []) as Array<{ question: string; answer: string }>;

  if (items.length === 0) return null;

  return (
    <section id="faq" className="section-padding">
      <div className="max-w-4xl mx-auto">
        <h2
          className="font-display text-3xl sm:text-4xl font-semibold mb-6"
          style={{ color: 'var(--text-primary)' }}
        >
          {t('title')}
        </h2>
        <div className="w-12 h-0.5 mb-8" style={{ background: 'var(--accent)' }} />

        <div className="space-y-3">
          {items.map((item, i) => (
            <details
              key={i}
              className="group rounded-xl overflow-hidden transition-shadow hover:shadow-md"
              style={{
                background: 'var(--bg-tertiary)',
                border: '1px solid var(--border-color)',
              }}
              open={i === 0}
            >
              <summary
                className="cursor-pointer list-none flex items-center justify-between gap-4 px-5 sm:px-6 py-4"
                style={{ color: 'var(--text-primary)' }}
              >
                <span className="font-display text-base sm:text-lg font-semibold leading-snug">
                  {item.question}
                </span>
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="flex-shrink-0 transition-transform group-open:rotate-180"
                  style={{ color: 'var(--accent)' }}
                >
                  <polyline points="6 9 12 15 18 9" />
                </svg>
              </summary>
              <p
                className="px-5 sm:px-6 pb-5 leading-relaxed text-sm sm:text-base"
                style={{ color: 'var(--text-secondary)' }}
              >
                {item.answer}
              </p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
