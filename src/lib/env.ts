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
    if (process.env.VERCEL_URL) return `https://www.${process.env.VERCEL_URL}`;
    console.warn('NEXT_PUBLIC_SITE_URL is not set, falling back to default domain');
    return 'https://www.nutibarasculpturepark.com';
  }
  // Normalize to the www canonical hostname so canonical/sitemap/hreflang
  // never leak the apex variant (Google must index a single URL set).
  const normalized = url.replace(/\/+$/, '');
  try {
    const parsed = new URL(normalized);
    if (parsed.hostname === 'nutibarasculpturepark.com') {
      parsed.hostname = 'www.nutibarasculpturepark.com';
    }
    return parsed.toString().replace(/\/+$/, '');
  } catch {
    return normalized;
  }
};

export const getAdsenseClientId = () => {
  return process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID || 'ca-pub-XXXXXXXXXX';
};

export const getGa4Id = () => {
  return process.env.NEXT_PUBLIC_GA4_ID || 'G-HXM22WWPKP';
};
