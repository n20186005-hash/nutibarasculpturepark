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
    '@type': ['TouristAttraction', 'Park'],
    '@id': `${baseUrl}/#attraction`,
    name: s.attractionFullName,
    alternateName: [
      s.attractionShortName,
      s.attractionEsName,
      'Parque de las Esculturas - Cerro Nutibara',
      'Cerro Nutibara Sculpture Park Medellín',
    ],
    description: `Comprehensive visitor guide to ${s.attractionFullName} in ${s.city}, ${s.stateProvince}, ${s.country} — an open-air sculpture park with free entry, beside Pueblito Paisa.`,
    url: baseUrl,
    image: [`${baseUrl}${s.heroImagePath}`],
    isAccessibleForFree: true,
    publicAccess: true,
    keywords: [
      'Cerro Nutibara',
      'Parque de las Esculturas',
      'Pueblito Paisa',
      'Medellín',
      'parque de esculturas Medellín',
      'outdoor sculpture park Medellín',
      'qué hacer en Medellín',
    ],
    additionalType: 'https://schema.org/Park',
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
 * Pueblito Paisa entity — the emblematic replica town located on the summit
 * of Cerro Nutibara. Declaring it as its own TouristAttraction contained in
 * the main hill park strengthens entity resolution for "dónde queda el
 * Pueblito Paisa" style queries.
 */
export function buildPueblitoJsonLd(baseUrl: string) {
  const s = siteConfig;
  return {
    '@context': 'https://schema.org',
    '@type': 'TouristAttraction',
    '@id': `${baseUrl}/#pueblito-paisa`,
    name: s.nearbyLandmark1,
    alternateName: ['Pueblito Paisa Medellín', 'Pueblito Paisa Cerro Nutibara'],
    url: baseUrl,
    isAccessibleForFree: true,
    containedInPlace: {
      '@type': ['TouristAttraction', 'Park'],
      '@id': `${baseUrl}/#attraction`,
      name: s.attractionFullName,
      url: baseUrl,
    },
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
