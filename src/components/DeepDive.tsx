'use client';

import { useTranslations, useMessages } from 'next-intl';

export default function DeepDive() {
  const t = useTranslations('deepDive');
  const messages = useMessages() as any;
  const deepDiveData = messages?.deepDive;

  if (!deepDiveData) return null;

  return (
    <section className="section-padding">
      <div className="max-w-5xl mx-auto">
        <h2
          className="font-display text-3xl sm:text-4xl font-semibold mb-6 text-center"
          style={{ color: 'var(--text-primary)' }}
        >
          {t('title')}
        </h2>
        <div className="w-12 h-0.5 mb-12 mx-auto" style={{ background: 'var(--accent)' }} />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Geology & Ecology */}
          <div className="rounded-xl p-6 shadow-sm transition-transform hover:-translate-y-1 hover:shadow-md" style={{ background: 'var(--bg-tertiary)', border: '1px solid var(--border-color)' }}>
            <div className="w-12 h-12 rounded-full flex items-center justify-center mb-6" style={{ background: 'var(--accent)', color: 'white', fontSize: '24px' }}>
              🌿
            </div>
            <h3 className="text-xl font-bold mb-4" style={{ color: 'var(--text-primary)' }}>
              {t('geology.title')}
            </h3>
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>{t('geology.subtitle1')}</h4>
                <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>{t('geology.desc1')}</p>
              </div>
              <div>
                <h4 className="font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>{t('geology.subtitle2')}</h4>
                <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>{t('geology.desc2')}</p>
              </div>
            </div>
          </div>

          {/* Architecture & Culture */}
          <div className="rounded-xl p-6 shadow-sm transition-transform hover:-translate-y-1 hover:shadow-md" style={{ background: 'var(--bg-tertiary)', border: '1px solid var(--border-color)' }}>
            <div className="w-12 h-12 rounded-full flex items-center justify-center mb-6" style={{ background: 'var(--accent)', color: 'white', fontSize: '24px' }}>
              🏛️
            </div>
            <h3 className="text-xl font-bold mb-4" style={{ color: 'var(--text-primary)' }}>
              {t('architecture.title')}
            </h3>
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>{t('architecture.subtitle1')}</h4>
                <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>{t('architecture.desc1')}</p>
              </div>
              <div>
                <h4 className="font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>{t('architecture.subtitle2')}</h4>
                <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>{t('architecture.desc2')}</p>
              </div>
            </div>
          </div>

          {/* Contemporary Art */}
          <div className="rounded-xl p-6 shadow-sm transition-transform hover:-translate-y-1 hover:shadow-md" style={{ background: 'var(--bg-tertiary)', border: '1px solid var(--border-color)' }}>
            <div className="w-12 h-12 rounded-full flex items-center justify-center mb-6" style={{ background: 'var(--accent)', color: 'white', fontSize: '24px' }}>
              🎨
            </div>
            <h3 className="text-xl font-bold mb-4" style={{ color: 'var(--text-primary)' }}>
              {t('art.title')}
            </h3>
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>{t('art.subtitle1')}</h4>
                <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>{t('art.desc1')}</p>
              </div>
              <div>
                <h4 className="font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>{t('art.subtitle2')}</h4>
                <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>{t('art.desc2')}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}