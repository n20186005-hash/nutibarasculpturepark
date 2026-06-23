'use client';

import { useTranslations, useMessages } from 'next-intl';
import type { ReactNode } from 'react';

export default function TransportSection() {
  const t = useTranslations('transport');
  const messages = useMessages() as any;
  const airportItems = (messages?.transport?.airportItems || []) as Array<{
    name: string;
    desc: string;
  }>;

  return (
    <section className="section-padding">
      <div className="max-w-5xl mx-auto">
        <h2
          className="font-display text-3xl sm:text-4xl font-semibold mb-6"
          style={{ color: 'var(--text-primary)' }}
        >
          {t('title')}
        </h2>
        <div className="w-12 h-0.5 mb-10" style={{ background: 'var(--accent)' }} />

        <div className="space-y-6">
          <TransportCard
            icon={<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>}
            title={t('addressTitle')}
            description={t('addressValue')}
          />
          <TransportCard
            icon={<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="1" y="3" width="15" height="13"/><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></svg>}
            title={t('taxiTitle')}
            description={t('taxiDesc')}
          />
          <TransportCard
            icon={<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="4" y="3" width="16" height="16" rx="2"/><path d="M4 11h16"/><path d="M12 3v8"/><path d="M8 19l-2 3"/><path d="M18 22l-2-3"/><circle cx="8" cy="15" r="1"/><circle cx="16" cy="15" r="1"/></svg>}
            title={t('metroTitle')}
            description={t('metroDesc')}
          />
          <TransportCard
            icon={<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 2L11 13"/><path d="M22 2L15 22 11 13 2 9 22 2z"/></svg>}
            title={t('airportTitle')}
            description={
              <ul className="space-y-2 mt-2">
                {airportItems.map((item, i) => (
                  <li key={i}>
                    <strong style={{ color: 'var(--text-primary)' }}>{item.name}: </strong>
                    {item.desc}
                  </li>
                ))}
              </ul>
            }
          />
        </div>
      </div>
    </section>
  );
}

function TransportCard({ icon, title, description }: { icon: ReactNode; title: string; description: ReactNode }) {
  return (
    <div
      className="rounded-xl p-5 flex gap-4"
      style={{ background: 'var(--bg-tertiary)', border: '1px solid var(--border-color)' }}
    >
      <div
        className="flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center"
        style={{ background: 'var(--accent)', color: 'white' }}
      >
        {icon}
      </div>
      <div>
        <h3 className="font-semibold mb-1" style={{ color: 'var(--text-primary)' }}>{title}</h3>
        <div className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>{description}</div>
      </div>
    </div>
  );
}
