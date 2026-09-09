'use client';

import { useMessages, useTranslations } from 'next-intl';

export default function Legends() {
  const t = useTranslations('legends');
  const messages = useMessages() as any;
  const items = (messages?.legends?.items || []) as Array<{ title: string; text: string }>;

  return (
    <section id="legends" className="section-padding" style={{ background: 'var(--bg-secondary)' }}>
      <div className="max-w-4xl mx-auto">
        <h2
          className="font-display text-3xl sm:text-4xl font-semibold mb-2"
          style={{ color: 'var(--text-primary)' }}
        >
          {t('title')}
        </h2>
        <div className="w-12 h-0.5 mb-6" style={{ background: 'var(--accent)' }} />
        <p className="text-lg leading-relaxed mb-4" style={{ color: 'var(--text-secondary)' }}>
          {t('subtitle')}
        </p>
        <p className="text-sm italic mb-10" style={{ color: 'var(--text-secondary)' }}>
          {t('intro')}
        </p>

        <div className="space-y-6">
          {items.map((item, i) => (
            <article
              key={i}
              className="flex gap-4 rounded-2xl p-6"
              style={{ background: 'var(--bg-tertiary)', border: '1px solid var(--border-color)' }}
            >
              <span
                className="flex-shrink-0 font-display text-2xl font-bold leading-none mt-1"
                style={{ color: 'var(--accent)' }}
              >
                {String(i + 1).padStart(2, '0')}
              </span>
              <div>
                <h3 className="font-display text-xl font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>
                  {item.title}
                </h3>
                <p className="text-base leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                  {item.text}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
