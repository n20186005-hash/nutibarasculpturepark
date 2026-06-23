/**
 * Shared environment variable helpers.
 * All site-level URLs must be read dynamically from NEXT_PUBLIC_SITE_URL
 * to prevent hard-coded domain leaks across pSEO sites.
 */

export const getBaseUrl = () => {
  const url = process.env.NEXT_PUBLIC_SITE_URL;
  if (!url || url.trim() === '') {
    if (process.env.NODE_ENV === 'development') return 'http://localhost:3000';
    // Fallback for Vercel or other build environments if not explicitly set
    if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`;
    console.warn('NEXT_PUBLIC_SITE_URL is not set, falling back to default domain');
    return 'https://nutibarasculpturepark.com';
  }
  return url.replace(/\/+$/, '');
};

export const getAdsenseClientId = () => {
  return process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID || 'ca-pub-XXXXXXXXXX';
};
