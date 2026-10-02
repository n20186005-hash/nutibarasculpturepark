import { MetadataRoute } from 'next';
import { getBaseUrl } from '@/lib/env';

export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = getBaseUrl();

  // Only the three canonical visitor-guide homepages are submitted. Legal and
  // cookie pages are intentionally excluded (they carry noindex,follow).
  const locales = ['es', 'en', 'zh'];

  const sitemap: MetadataRoute.Sitemap = locales.map((locale) => ({
    url: `${baseUrl}/${locale}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: locale === 'es' ? 1 : 0.8,
    alternates: {
      languages: {
        es: `${baseUrl}/es`,
        en: `${baseUrl}/en`,
        zh: `${baseUrl}/zh`,
        'x-default': `${baseUrl}/es`,
      },
    },
  }));

  return sitemap;
}
