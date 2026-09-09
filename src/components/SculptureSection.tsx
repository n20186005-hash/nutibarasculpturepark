'use client';

import { useMessages, useTranslations } from 'next-intl';

type Artwork = {
  num: number;
  name: string;
  artist: string;
  country: string;
  year: string;
  material: string;
  note: string;
};

export default function SculptureSection() {
  const t = useTranslations('sculptures');
  const messages = useMessages() as any;
  const works = (messages?.sculptures?.works || []) as Artwork[];

  if (works.length === 0) return null;

  return (
    <section id="parque-de-las-esculturas" className="section-padding">
      <div className="max-w-6xl mx-auto">
        <h2
          className="font-display text-3xl sm:text-4xl font-semibold mb-2"
          style={{ color: 'var(--text-primary)' }}
        >
          {t('title')}
        </h2>
        <div className="w-12 h-0.5 mb-6" style={{ background: 'var(--accent)' }} />
        <p className="text-lg leading-relaxed mb-3" style={{ color: 'var(--text-secondary)' }}>
          {t('subtitle')}
        </p>
        <p className="leading-relaxed mb-10" style={{ color: 'var(--text-secondary)' }}>
          {t('intro')}
        </p>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-10">
          {works.map((work) => (
            <article
              key={`${work.num}-${work.artist}`}
              className="rounded-2xl p-6 flex flex-col transition-transform hover:-translate-y-1 hover:shadow-md"
              style={{ background: 'var(--bg-tertiary)', border: '1px solid var(--border-color)' }}
            >
              <div className="flex items-start justify-between gap-3 mb-4">
                <span
                  className="flex-shrink-0 font-display font-semibold text-sm rounded-lg px-2.5 py-1"
                  style={{ background: 'var(--accent)', color: 'white' }}
                >
                  {String(work.num).padStart(2, '0')}
                </span>
                <span className="text-xs font-medium px-2.5 py-1 rounded-lg" style={{ color: 'var(--accent)', border: '1px solid var(--accent)' }}>
                  {work.year}
                </span>
              </div>

              <h3 className="font-display text-xl font-semibold mb-1" style={{ color: 'var(--text-primary)' }}>
                {work.name}
              </h3>
              <p className="text-sm font-medium mb-3" style={{ color: 'var(--text-secondary)' }}>
                {work.artist} · {work.country}
              </p>
              <p
                className="text-xs font-medium mb-3 rounded-lg px-3 py-1.5 w-fit"
                style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', color: 'var(--text-primary)' }}
              >
                {work.material}
              </p>
              <p className="text-sm leading-relaxed flex-1" style={{ color: 'var(--text-secondary)' }}>
                {work.note}
              </p>
            </article>
          ))}
        </div>

        <div
          className="rounded-2xl p-6 mb-6"
          style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-color)' }}
        >
          <p className="text-sm font-semibold mb-2 flex items-center gap-2" style={{ color: 'var(--text-primary)' }}>
            <span aria-hidden>💡</span>
            {t('tipTitle')}
          </p>
          <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
            {t('tip')}
          </p>
        </div>

        <div className="text-center">
          <p className="text-sm mb-3" style={{ color: 'var(--text-secondary)' }}>
            {t('ctaTitle')}
          </p>
          <a
            href="#visit-plans"
            className="inline-block rounded-full px-7 py-3 font-semibold transition-colors"
            style={{ background: 'var(--accent)', color: 'white' }}
          >
            {t('ctaLabel')} →
          </a>
        </div>
      </div>
    </section>
  );
}
