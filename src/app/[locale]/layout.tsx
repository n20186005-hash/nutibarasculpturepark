import { NextIntlClientProvider } from 'next-intl';
import { getMessages, setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import type { Metadata, Viewport } from 'next';
import { getBaseUrl, getAdsenseClientId, getGa4Id } from '@/lib/env';
import { siteConfig } from '@/lib/site-config';
import { buildTouristAttractionJsonLd, buildFaqJsonLd, buildPueblitoJsonLd } from '@/lib/seo';
import PwaRegister from '@/components/PwaRegister';

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export const viewport: Viewport = {
  themeColor: '#142d1c',
  width: 'device-width',
  initialScale: 1,
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const messages = (await import(`@/messages/${locale}.json`)).default;
  const baseUrl = getBaseUrl();

  const zhUrl = `${baseUrl}/zh`;
  const enUrl = `${baseUrl}/en`;
  const esUrl = `${baseUrl}/es`;

  let selfUrl = zhUrl;
  if (locale === 'en') selfUrl = enUrl;
  else if (locale === 'es') selfUrl = esUrl;

  const localeMap: Record<string, string> = {
    'zh': 'zh_CN',
    'en': 'en_US',
    'es': 'es_ES',
  };

  const ogImage = `${baseUrl}${siteConfig.heroImagePath}`;

  return {
    metadataBase: new URL(baseUrl),
    title: messages.meta.title,
    description: messages.meta.description,
    alternates: {
      canonical: selfUrl,
      languages: {
        'zh': zhUrl,
        'en': enUrl,
        'es': esUrl,
        'x-default': esUrl,
      } as Record<string, string>,
    },
    manifest: '/manifest.webmanifest',
    icons: {
      icon: [
        { url: '/icons/icon-192.png', sizes: '192x192', type: 'image/png' },
        { url: '/icons/icon-512.png', sizes: '512x512', type: 'image/png' },
      ],
      apple: [{ url: '/icons/apple-touch-icon.png', sizes: '180x180', type: 'image/png' }],
    },
    appleWebApp: {
      capable: true,
      title: messages.header.siteName,
      statusBarStyle: 'default',
    },
    openGraph: {
      title: messages.meta.title,
      description: messages.meta.description,
      url: selfUrl,
      siteName: messages.header.siteName,
      locale: localeMap[locale] || 'en_US',
      type: 'website',
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: `${siteConfig.attractionFullName} in ${siteConfig.city}`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: messages.meta.title,
      description: messages.meta.description,
      images: [ogImage],
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as any)) {
    notFound();
  }

  setRequestLocale(locale);
  const messages = await getMessages();

  const langMap: Record<string, string> = {
    'zh': 'zh-CN',
    'en': 'en',
    'es': 'es',
  };

  const baseUrl = getBaseUrl();
  const ga4Id = getGa4Id();
  const adsenseClientId = getAdsenseClientId();

  // Localized FAQ items -> FAQPage JSON-LD must mirror the visible FAQ section
  const faqItems = (messages as any)?.faq?.items as Array<{ question: string; answer: string }> | undefined;
  const faqJsonLd = Array.isArray(faqItems) && faqItems.length > 0
    ? buildFaqJsonLd(faqItems)
    : null;

  return (
    <html lang={langMap[locale] || 'zh-CN'} suppressHydrationWarning>
      <head>
        {/* Google AdSense */}
        <script async src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${adsenseClientId}`} crossOrigin="anonymous" />
        <meta name="google-adsense-account" content={adsenseClientId} />

        {/* GA4 */}
        <script async src={`https://www.googletagmanager.com/gtag/js?id=${ga4Id}`} />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${ga4Id}', { anonymize_ip: true });
            `,
          }}
        />

        {/* PWA meta (manifest + apple tags are injected by metadata above) */}
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="format-detection" content="telephone=no" />

        {/* Geo hint for search engines */}
        <meta name="geo.region" content={`${siteConfig.countryCode}-${siteConfig.city}`} />
        <meta name="geo.placename" content={`${siteConfig.attractionFullName}, ${siteConfig.city}, ${siteConfig.stateProvince}`} />
        <meta name="geo.position" content={`${siteConfig.latitude};${siteConfig.longitude}`} />
        <meta name="ICBM" content={`${siteConfig.latitude}, ${siteConfig.longitude}`} />

        {/* Schema.org — BreadcrumbList (geographic hierarchy) */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "BreadcrumbList",
              "itemListElement": [
                {
                  "@type": "ListItem",
                  "position": 1,
                  "name": siteConfig.country,
                  "item": `${baseUrl}/`
                },
                {
                  "@type": "ListItem",
                  "position": 2,
                  "name": siteConfig.stateProvince,
                  "item": `${baseUrl}/`
                },
                {
                  "@type": "ListItem",
                  "position": 3,
                  "name": siteConfig.city,
                  "item": `${baseUrl}/`
                }
              ]
            })
          }}
        />

        {/* Schema.org — TouristAttraction entity binding */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(buildTouristAttractionJsonLd(baseUrl)),
          }}
        />

        {/* Schema.org — Pueblito Paisa (contained landmark entity) */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(buildPueblitoJsonLd(baseUrl)),
          }}
        />

        {/* Schema.org — FAQPage */}
        {faqJsonLd && (
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify(faqJsonLd),
            }}
          />
        )}

        {/* Inline theme bootstrap (avoids dark-mode flash) */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var theme = localStorage.getItem('theme');
                  if (theme === 'dark') {
                    document.documentElement.setAttribute('data-theme', 'dark');
                  }
                } catch(e) {}
              })();
            `,
          }}
        />
      </head>
      <body className="min-h-screen">
        <NextIntlClientProvider messages={messages}>
          {children}
        </NextIntlClientProvider>
        <PwaRegister />
      </body>
    </html>
  );
}
