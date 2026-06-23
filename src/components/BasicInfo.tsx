'use client';

import { useTranslations } from 'next-intl';

export default function BasicInfo() {
  const t = useTranslations('basicInfo');
  const tHero = useTranslations('hero');

  return (
    <section className="section-padding" style={{ background: 'var(--bg-secondary)' }}>
      <div className="max-w-5xl mx-auto">
        <h2
          className="font-display text-3xl sm:text-4xl font-semibold mb-6"
          style={{ color: 'var(--text-primary)' }}
        >
          {t('title')}
        </h2>
        <div className="w-12 h-0.5 mb-10" style={{ background: 'var(--accent)' }} />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <InfoCard title={t('hours')} value={t('hoursValue')} icon="�" />
          <InfoCard title={t('tickets')} value={t('ticketsValue')} icon="🎫" />
          <InfoCard title={t('rating')} value={t('ratingValue')} icon="⭐" />
          <InfoCard title={t('location')} value={t('locationValue')} icon="�" />
        </div>
      </div>
    </section>
  );
}

function InfoCard({ title, value, icon }: { title: string; value: string; icon?: string }) {
  return (
    <div
      className="rounded-xl p-5 flex items-start gap-4 transition-transform hover:-translate-y-1 hover:shadow-md"
      style={{ background: 'var(--bg-tertiary)', border: '1px solid var(--border-color)' }}
    >
      {icon && <div className="text-2xl mt-1">{icon}</div>}
      <div>
        <p className="text-sm mb-1" style={{ color: 'var(--text-muted)' }}>{title}</p>
        <p className="font-medium" style={{ color: 'var(--text-primary)' }}>{value}</p>
      </div>
    </div>
  );
}
