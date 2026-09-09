import { siteConfig } from './site-config';

export type FaqItem = { question: string; answer: string };

/**
 * TouristAttraction structured data.
 * Anchors the geographic entity behind the whole site (Knowledge Graph + rich card).
 */
export function buildTouristAttractionJsonLd(baseUrl: string) {
  const s = siteConfig;
  return {
    '@context': 'https://schema.org',
    '@type': 'TouristAttraction',
    '@id': `${baseUrl}/#attraction`,
    name: s.attractionFullName,
    alternateName: [
      s.attractionShortName,
      `${s.city} ${s.attractionFullName}`,
      s.attractionEsName,
    ],
    description: `Comprehensive visitor guide to ${s.attractionFullName} in ${s.city}, ${s.stateProvince}, ${s.country}.`,
    url: baseUrl,
    image: [`${baseUrl}${s.heroImagePath}`],
    isAccessibleForFree: true,
    publicAccess: true,
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Cerro De Nutibara, Pueblito Paisa',
      addressLocality: s.city,
      addressRegion: s.stateProvince,
      postalCode: s.postalCode,
      addressCountry: s.countryCode,
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: s.latitude,
      longitude: s.longitude,
    },
    hasMap: s.mapsShareUrl,
    sameAs: [s.mapsShareUrl, s.govtAttractionPage, s.govtTourismUrl],
  };
}

/**
 * FAQPage structured data (Featured Snippet / AI Overview card).
 * Items must mirror the visible FAQ section content.
 */
export function buildFaqJsonLd(faqs: FaqItem[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: f.answer,
      },
    })),
  };
}
