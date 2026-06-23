'use client';

import { useTranslations } from 'next-intl';

export default function About() {
  const t = useTranslations('about');

  return (
    <section className="section-padding pt-16 sm:pt-24 pb-8 sm:pb-12" style={{ background: 'var(--bg-primary)' }}>
      <div className="max-w-4xl mx-auto text-center px-4">
        <h2 className="font-display text-3xl sm:text-4xl font-semibold mb-6" style={{ color: 'var(--text-primary)' }}>
          {t('title')}
        </h2>
        <div className="w-12 h-0.5 mb-8 mx-auto" style={{ background: 'var(--accent)' }} />
        <p 
          className="text-lg sm:text-xl leading-relaxed font-light" 
          style={{ color: 'var(--text-secondary)' }} 
          dangerouslySetInnerHTML={{
            __html: t('description').replace(/\*\*(.*?)\*\*/g, '<strong style="color: var(--text-primary); font-weight: 600;">$1</strong>')
          }} 
        />
      </div>
    </section>
  );
}