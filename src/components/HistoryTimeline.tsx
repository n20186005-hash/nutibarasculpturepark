'use client';

import { useTranslations, useMessages } from 'next-intl';

export default function HistoryTimeline() {
  const t = useTranslations('historyTimeline');
  const messages = useMessages() as any;
  const items = (messages?.historyTimeline?.items || []) as Array<{
    year: string;
    title: string;
    plaque: string;
    description: string;
  }>;

  return (
    <section className="section-padding" style={{ background: 'var(--bg-primary)' }}>
      <div className="max-w-4xl mx-auto">
        <h2
          className="font-display text-3xl sm:text-4xl font-semibold mb-6 text-center"
          style={{ color: 'var(--text-primary)' }}
        >
          {t('title')}
        </h2>
        <div className="w-12 h-0.5 mb-12 mx-auto" style={{ background: 'var(--accent)' }} />

        <div className="relative border-l-2 border-dashed ml-4 md:ml-8 mb-12" style={{ borderColor: 'var(--border-color)' }}>
          {items.map((item, index) => (
            <div key={index} className="mb-10 ml-6 md:ml-10 relative group">
              {/* Timeline dot */}
              <div 
                className="absolute w-4 h-4 rounded-full -left-[33px] md:-left-[49px] top-1.5 transition-transform group-hover:scale-125"
                style={{ background: 'var(--accent)', border: '4px solid var(--bg-primary)' }}
              />
              
              <div className="bg-opacity-50 rounded-xl p-6 shadow-sm transition-transform group-hover:-translate-y-1 group-hover:shadow-md" style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-color)' }}>
                <span className="text-sm font-bold tracking-wider uppercase mb-2 block" style={{ color: 'var(--accent)' }}>
                  {item.year}
                </span>
                <h3 className="text-xl font-bold mb-2" style={{ color: 'var(--text-primary)' }}>
                  {item.title}
                </h3>
                <div className="text-sm font-medium mb-3 py-1 px-3 inline-block rounded-full" style={{ background: 'var(--bg-tertiary)', color: 'var(--text-secondary)' }}>
                  📍 {item.plaque}
                </div>
                <p className="leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
