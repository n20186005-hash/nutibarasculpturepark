'use client';

import { useMessages, useTranslations } from 'next-intl';

export default function FacilitySection() {
  const t = useTranslations('facilities');
  const messages = useMessages() as any;
  const items = (messages?.facilities?.items || []) as Array<{
    icon: string;
    title: string;
    desc: string;
    tip: string;
  }>;

  return (
    <section id="facilities" className="section-padding" style={{ background: 'var(--bg-secondary)' }}>
      <div className="max-w-5xl mx-auto">
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
        <p
          className="text-sm mb-10 px-4 py-3 rounded-lg"
          style={{ background: 'var(--bg-tertiary)', border: '1px solid var(--border-color)' }}
        >
          {t('note')}
        </p>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item, i) => (
            <div
              key={i}
              className="rounded-2xl p-6 flex flex-col transition-transform hover:-translate-y-1 hover:shadow-md"
              style={{ background: 'var(--bg-tertiary)', border: '1px solid var(--border-color)' }}
            >
              <span className="text-4xl mb-3" aria-hidden>
                {item.icon}
              </span>
              <h3 className="font-display text-lg font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>
                {item.title}
              </h3>
              <p className="text-sm leading-relaxed flex-1" style={{ color: 'var(--text-secondary)' }}>
                {item.desc}
              </p>
              <p
                className="mt-4 text-xs leading-relaxed rounded-lg px-3 py-2"
                style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-color)' }}
              >
                <span className="font-semibold" style={{ color: 'var(--text-primary)' }}>
                  💡
                </span>{' '}
                {item.tip}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
