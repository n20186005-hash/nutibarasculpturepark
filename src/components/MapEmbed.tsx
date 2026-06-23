import { useTranslations } from 'next-intl';

export default function MapEmbed() {
  const t = useTranslations('mapSection');
  const mapsUrl = "https://maps.app.goo.gl/T35wBB8jhEUL2pxL6";

  return (
    <section id="map" className="section-padding" style={{ background: 'var(--bg-secondary)' }}>
      <div className="max-w-5xl mx-auto">
        <h2
          className="font-display text-3xl sm:text-4xl font-semibold mb-2"
          style={{ color: 'var(--text-primary)' }}
        >
          {t('title')}
        </h2>
        <p className="mb-8 text-sm" style={{ color: 'var(--text-muted)' }}>{t('subtitle')}</p>
        <div className="w-12 h-0.5 mb-10" style={{ background: 'var(--accent)' }} />

        {/* Map */}
        <div
          className="map-container relative rounded-xl overflow-hidden"
          style={{ border: '1px solid var(--map-border)' }}
        >
          {/*
            NOTE: Google Maps attribution is hidden via CSS (.gm-style-cc, .gmnoprint).
            This is for visual cleanliness only. Google's Terms of Service apply.
          */}
          <iframe
            src="https://maps.google.com/maps?q=Cerro+De+Nutibara,+Pueblito+Paisa,+Medell%C3%ADn,+Bel%C3%A9n,+Medell%C3%ADn,+Antioquia,+Colombia&t=&z=15&ie=UTF8&iwloc=&output=embed"
            width="100%"
            height="450"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Google Maps - Cerro de Nutibara Sculpture Park"
          />
        </div>

        {/* Open in Google Maps */}
        <div className="mt-6 flex justify-center mb-10">
          <a
            href={mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium text-white hover:opacity-90 transition-opacity"
            style={{ background: 'var(--accent)' }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
              <circle cx="12" cy="10" r="3" />
            </svg>
            {t('openMaps')}
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
              <polyline points="15 3 21 3 21 9" />
              <line x1="10" y1="14" x2="21" y2="3" />
            </svg>
          </a>
        </div>

        {/* Nearby Recommendations */}
        <div className="mt-12">
          <h3 className="font-display text-xl sm:text-2xl font-semibold mb-6" style={{ color: 'var(--text-primary)' }}>
            {t('nearbyTitle') || 'Nearby Recommendations'}
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl flex items-start gap-4 transition-transform hover:-translate-y-1 hover:shadow-md" style={{ background: 'var(--bg-tertiary)', border: '1px solid var(--border-color)' }}>
              <div className="flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z"/><circle cx="12" cy="13" r="3"/></svg>
              </div>
              <div>
                <h3 className="font-medium mb-1" style={{ color: 'var(--text-primary)' }}>{t('nearby1Name')}</h3>
                <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>{t('nearby1Desc')}</p>
              </div>
            </div>
            <div className="p-4 rounded-xl flex items-start gap-4 transition-transform hover:-translate-y-1 hover:shadow-md" style={{ background: 'var(--bg-tertiary)', border: '1px solid var(--border-color)' }}>
              <div className="flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
              </div>
              <div>
                <h3 className="font-medium mb-1" style={{ color: 'var(--text-primary)' }}>{t('nearby2Name')}</h3>
                <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>{t('nearby2Desc')}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
