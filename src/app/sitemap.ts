import { MetadataRoute } from 'next';
import {guides} from '@/lib/city-guides';
import { getBaseUrl } from '@/lib/env';

export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = getBaseUrl();

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

  for (const {slug} of guides) {
    const path = '/nearby/' + slug;
    const languages = Object.fromEntries(locales.map(l => [l, baseUrl + '/' + l + path]));
    for (const locale of locales) sitemap.push({url: languages[locale], alternates: {languages: {...languages, 'x-default': languages.es}}});
  }
  return sitemap;
}
