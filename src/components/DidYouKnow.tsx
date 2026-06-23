'use client';

import { useTranslations } from 'next-intl';

export default function DidYouKnow() {
  const t = useTranslations('didYouKnow');

  return (
    <section className="section-padding pt-0 pb-16">
      <div className="max-w-4xl mx-auto">
        <div 
          className="rounded-xl p-6 md:p-8 flex flex-col md:flex-row items-center md:items-start gap-6 shadow-sm transition-transform hover:-translate-y-1 hover:shadow-md"
          style={{ background: 'var(--bg-tertiary)', border: '2px solid var(--accent)' }}
        >
          <div className="flex-shrink-0 w-16 h-16 rounded-full flex items-center justify-center bg-yellow-100 text-yellow-600 text-3xl">
            💡
          </div>
          <div className="text-center md:text-left">
            <h3 className="text-xl font-bold mb-3" style={{ color: 'var(--text-primary)' }}>
              {t('title')}
            </h3>
            <p className="text-base leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
              {t('description')}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}