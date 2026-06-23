'use client';

import { useTranslations, useMessages } from 'next-intl';

export default function RouteSection() {
  const t = useTranslations('route');
  const messages = useMessages() as any;
  const scheduleItems = (messages?.route?.scheduleItems || []) as Array<{
    time: string;
    description: string;
  }>;
  const tipsItems = (messages?.route?.tipsItems || []) as Array<{
    title: string;
    description: string;
  }>;

  return (
    <section id="guide" className="section-padding" style={{ background: 'var(--bg-secondary)' }}>
      <div className="max-w-4xl mx-auto">
        <h2
          className="font-display text-3xl sm:text-4xl font-semibold mb-6"
          style={{ color: 'var(--text-primary)' }}
        >
          {t('title')}
        </h2>
        <div className="w-12 h-0.5 mb-8" style={{ background: 'var(--accent)' }} />

        <p className="text-lg leading-relaxed mb-10" style={{ color: 'var(--text-secondary)' }}>
          {t('scheduleTitle')}
        </p>

        <div className="relative mb-10">
          {/* Timeline line */}
          <div
            className="absolute left-6 top-0 bottom-0 w-0.5"
            style={{ background: 'var(--border-color)' }}
          />

          <div className="space-y-6">
            {scheduleItems.map((item, index) => (
              <RouteStep
                key={index}
                time={item.time}
                description={item.description}
                index={index}
              />
            ))}
          </div>
        </div>

        {/* Supplements */}
        <div
          className="rounded-xl p-6"
          style={{ background: 'var(--bg-tertiary)', border: '1px solid var(--accent)' }}
        >
          <h3 className="font-display text-xl font-semibold mb-4" style={{ color: 'var(--text-primary)' }}>
            {t('tipsTitle')}
          </h3>
          <ul className="space-y-3">
            {tipsItems.map((item, index) => (
              <li key={index} className="flex items-start gap-3">
                <span className="mt-1.5 flex-shrink-0 w-1.5 h-1.5 rounded-full" style={{ background: 'var(--accent)' }} />
                <span style={{ color: 'var(--text-secondary)' }}>
                  <strong style={{ color: 'var(--text-primary)' }}>{item.title}: </strong>
                  {item.description}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

function RouteStep({ time, description, index }: { time: string; description: string; index: number }) {
  const icons = [
    <svg key="1" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s-8-4.5-8-11.8A8 8 0 0 1 12 2a8 8 0 0 1 8 8.2c0 7.3-8 11.8-8 11.8z"/><circle cx="12" cy="10" r="3"/></svg>,
    <svg key="2" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M2 12h20"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>,
    <svg key="3" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 8h1a4 4 0 0 1 0 8h-1"/><path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"/><line x1="6" y1="1" x2="6" y2="4"/><line x1="10" y1="1" x2="10" y2="4"/><line x1="14" y1="1" x2="14" y2="4"/></svg>,
    <svg key="4" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6"/><line x1="8" y1="2" x2="8" y2="18"/><line x1="16" y1="6" x2="16" y2="22"/></svg>
  ];

  return (
    <div className="relative flex gap-4 pl-4">
      {/* Timeline dot */}
      <div
        className="absolute left-4 -translate-x-1/2 w-4 h-4 rounded-full border-2 flex-shrink-0"
        style={{
          background: 'var(--accent)',
          borderColor: 'var(--accent)',
          top: '0.25rem',
        }}
      />

      {/* Step icon */}
      <div
        className="flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center shadow-md"
        style={{ background: 'var(--accent)', color: 'white' }}
      >
        {icons[index % icons.length]}
      </div>

      {/* Content */}
      <div
        className="flex-1 rounded-xl p-4 transition-transform hover:-translate-y-1 hover:shadow-lg"
        style={{ background: 'var(--bg-tertiary)', border: '1px solid var(--border-color)' }}
      >
        <p className="text-base leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
          <span className="font-semibold mr-2" style={{ color: 'var(--text-primary)' }}>{time}</span>
          <br/>
          {description}
        </p>
      </div>
    </div>
  );
}
