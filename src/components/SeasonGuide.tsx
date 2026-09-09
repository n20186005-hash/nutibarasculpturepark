'use client';

import { useMessages, useTranslations } from 'next-intl';

const COLUMN_KEYS = ['period', 'climate', 'rain', 'nature', 'advice'] as const;

export default function SeasonGuide() {
  const t = useTranslations('seasonal');
  const messages = useMessages() as any;
  const cols = (messages?.seasonal?.cols || {}) as Record<string, string>;
  const rows = (messages?.seasonal?.rows || []) as Array<{
    period: string;
    climate: string;
    rain: string;
    nature: string;
    advice: string;
  }>;

  return (
    <section id="season-guide" className="section-padding" style={{ background: 'var(--bg-secondary)' }}>
      <div className="max-w-5xl mx-auto">
        <h2
          className="font-display text-3xl sm:text-4xl font-semibold mb-2"
          style={{ color: 'var(--text-primary)' }}
        >
          {t('title')}
        </h2>
        <div className="w-12 h-0.5 mb-6" style={{ background: 'var(--accent)' }} />

        <p className="text-lg leading-relaxed mb-8" style={{ color: 'var(--text-secondary)' }}>
          {t('subtitle')}
        </p>

        <div className="overflow-x-auto rounded-2xl" style={{ border: '1px solid var(--border-color)' }}>
          <table className="w-full min-w-[880px] border-collapse text-sm">
            <thead>
              <tr style={{ background: 'var(--bg-tertiary)' }}>
                {COLUMN_KEYS.map((key) => (
                  <th
                    key={key}
                    className="text-left font-semibold px-4 py-3 align-bottom"
                    style={{ color: 'var(--text-primary)' }}
                  >
                    {cols[key] || key}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((row, i) => (
                <tr
                  key={i}
                  style={{
                    background: 'var(--bg-primary)',
                    borderTop: '1px solid var(--border-color)',
                  }}
                >
                  <td
                    className="px-4 py-3 font-semibold whitespace-nowrap align-top"
                    style={{ color: 'var(--accent)' }}
                  >
                    {row.period}
                  </td>
                  <td className="px-4 py-3 align-top" style={{ color: 'var(--text-secondary)' }}>
                    {row.climate}
                  </td>
                  <td className="px-4 py-3 align-top" style={{ color: 'var(--text-secondary)' }}>
                    {row.rain}
                  </td>
                  <td className="px-4 py-3 align-top" style={{ color: 'var(--text-secondary)' }}>
                    {row.nature}
                  </td>
                  <td className="px-4 py-3 align-top" style={{ color: 'var(--text-secondary)' }}>
                    {row.advice}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <p className="text-xs mt-3 italic" style={{ color: 'var(--text-secondary)' }}>
          {t('note')}
        </p>
      </div>
    </section>
  );
}
