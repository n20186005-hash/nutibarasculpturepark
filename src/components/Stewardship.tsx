'use client';

import { useMessages, useTranslations } from 'next-intl';

export default function Stewardship() {
  const t = useTranslations('stewardship');
  const messages = useMessages() as any;
  const science = (messages?.stewardship?.science || []) as Array<{
    title: string;
    text: string;
  }>;
  const dos = (messages?.stewardship?.dos || []) as string[];
  const donts = (messages?.stewardship?.donts || []) as string[];

  return (
    <section id="stewardship" className="section-padding">
      <div className="max-w-5xl mx-auto">
        <h2
          className="font-display text-3xl sm:text-4xl font-semibold mb-2"
          style={{ color: 'var(--text-primary)' }}
        >
          {t('title')}
        </h2>
        <div className="w-12 h-0.5 mb-6" style={{ background: 'var(--accent)' }} />
        <p className="text-lg leading-relaxed mb-10" style={{ color: 'var(--text-secondary)' }}>
          {t('subtitle')}
        </p>

        <h3 className="font-display text-2xl font-semibold mb-6" style={{ color: 'var(--text-primary)' }}>
          {t('scienceTitle')}
        </h3>
        <div className="grid gap-6 md:grid-cols-3 mb-12">
          {science.map((item, i) => (
            <div
              key={i}
              className="rounded-2xl p-6"
              style={{ background: 'var(--bg-tertiary)', border: '1px solid var(--border-color)' }}
            >
              <p className="text-xs font-semibold uppercase tracking-wide mb-2" style={{ color: 'var(--accent)' }}>
                {String(i + 1).padStart(2, '0')}
              </p>
              <h4 className="font-display text-lg font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>
                {item.title}
              </h4>
              <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                {item.text}
              </p>
            </div>
          ))}
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <RuleList
            title={t('dosTitle')}
            tone="positive"
            rules={dos}
          />
          <RuleList
            title={t('dontsTitle')}
            tone="negative"
            rules={donts}
          />
        </div>
      </div>
    </section>
  );
}

function RuleList({ title, rules, tone }: { title: string; rules: string[]; tone: 'positive' | 'negative' }) {
  const mark = tone === 'positive' ? '✓' : '✕';
  const markColor = tone === 'positive' ? 'var(--accent)' : '#c0564a';
  return (
    <div
      className="rounded-2xl p-6"
      style={{ background: 'var(--bg-tertiary)', border: '1px solid var(--border-color)' }}
    >
      <h4 className="font-display text-xl font-semibold mb-4" style={{ color: 'var(--text-primary)' }}>
        {title}
      </h4>
      <ul className="space-y-3">
        {rules.map((rule, i) => (
          <li key={i} className="flex items-start gap-3 text-sm leading-relaxed">
            <span className="mt-0.5 flex-shrink-0 font-bold" style={{ color: markColor }} aria-hidden>
              {mark}
            </span>
            <span style={{ color: 'var(--text-secondary)' }}>{rule}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
