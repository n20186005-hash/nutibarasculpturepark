/**
 * Single-attraction SEO entity binding configuration.
 *
 * Fill in the variables below with the concrete data of the attraction.
 * They are consumed by the JSON-LD / TDK / Open Graph / semantic content
 * builders across the site. All absolute URLs are assembled at runtime via
 * `getBaseUrl()` so no hard-coded domain leaks into sibling pSEO sites.
 */
export const siteConfig = {
  // {{DOMAIN_NAME}}
  domainName: 'nutibarasculpturepark.com',

  // {{ATTRACTION_FULL_NAME}} — official full name
  attractionFullName: 'Cerro de Nutibara Sculpture Park',

  // Spanish official listing name (used for es alternates / sameAs)
  attractionEsName: 'Parque de Las Esculturas - Cerro Nutibara',

  // {{ATTRACTION_SHORT_NAME}} — common alias / domain-meaning
  attractionShortName: 'Cerro Nutibara',

  // {{CITY_NAME}} / {{STATE_PROVINCE}} / {{COUNTRY_NAME}} / {{COUNTRY_CODE_2LETTER}}
  city: 'Medellín',
  stateProvince: 'Antioquia',
  country: 'Colombia',
  countryCode: 'CO',

  // {{POSTAL_CODE}}
  postalCode: '050001',

  // {{LATITUDE}} / {{LONGITUDE}} (decimal degrees, WGS84)
  latitude: 6.236384,
  longitude: -75.5790979,

  // {{MAPS_SHARE_URL}}
  mapsShareUrl: 'https://maps.app.goo.gl/T35wBB8jhEUL2pxL6',

  // {{MAPS_EMBED_SRC}}
  mapsEmbedSrc:
    'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d6878.89078686602!2d-75.5790979!3d6.236384!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8e4429b19fce4b47%3A0xd7611371e8013c89!2sCerro%20de%20Nutibara%20Sculpture%20Park!5e1!3m2!1sen!2s!4v1788965384543!5m2!1sen!2s',

  // {{NEARBY_LANDMARK_1}} / {{NEARBY_LANDMARK_2}}
  nearbyLandmark1: 'Pueblito Paisa',
  nearbyLandmark2: 'Museo de Arte Moderno de Medellín (MAMM)',

  // {{GOVT_TOURISM_URL}} — government / official tourism portal
  govtTourismUrl: 'https://www.medellin.travel/',

  // Official municipal page for this exact attraction (E-E-A-T reference)
  govtAttractionPage:
    'https://www.medellin.gov.co/es/secretaria-medio-ambiente/medellin-biodiversa/cerro-nutibara/',

  // Google review snapshot shown on the page
  rating: '4.6',
  reviewCount: '5,868',

  // GA4 Measurement ID
  ga4Id: 'G-HXM22WWPKP',

  // Social / schema image paths (served from /public)
  heroImagePath: '/images/hero.jpg',
} as const;

export type SiteConfig = typeof siteConfig;
