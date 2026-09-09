'use client';

import { useTranslations, useMessages } from 'next-intl';

export default function SourcesSection() {
  const t = useTranslations('sources');
  const messages = useMessages() as any;
  const items = (messages?.sources?.items || []) as Array<{
    name: string;
    url: string;
    description?: string;
  }>;

  return (
    <section id="sources" className="section-padding" style={{ background: 'var(--bg-secondary)' }}>
      <div className="max-w-5xl mx-auto">
        <h2
          className="font-display text-3xl sm:text-4xl font-semibold mb-6"
          style={{ color: 'var(--text-primary)' }}
        >
          {t('title')}
        </h2>
        <div className="w-12 h-0.5 mb-8" style={{ background: 'var(--accent)' }} />

        {/* Government tourism portal entry point */}
        <p
          className="text-sm sm:text-base leading-relaxed mb-8 max-w-3xl"
          style={{ color: 'var(--text-muted)' }}
        >
          {t('intro')}{' '}
          <a
            href={t('portalUrl')}
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium hover:underline"
            style={{ color: 'var(--accent)' }}
          >
            {t('portalLabel')}
          </a>
          {t('introTail')}
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {items.map((source, i) => (
            <a
              key={i}
              href={source.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group rounded-xl p-5 transition-transform hover:-translate-y-1 hover:shadow-md flex flex-col gap-2"
              style={{
                background: 'var(--bg-tertiary)',
                border: '1px solid var(--border-color)',
              }}
            >
              <span className="flex items-center justify-between gap-2 font-medium text-sm sm:text-base" style={{ color: 'var(--text-primary)' }}>
                <span className="leading-snug">{source.name}</span>
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  className="flex-shrink-0 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  style={{ color: 'var(--accent)' }}
                >
                  <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                  <polyline points="15 3 21 3 21 9" />
                  <line x1="10" y1="14" x2="21" y2="3" />
                </svg>
              </span>
              {source.description && (
                <span className="text-xs leading-relaxed" style={{ color: 'var(--text-muted)' }}>
                  {source.description}
                </span>
              )}
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
