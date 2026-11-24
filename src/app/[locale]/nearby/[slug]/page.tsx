import type {Metadata} from 'next';
import {notFound} from 'next/navigation';
import {setRequestLocale} from 'next-intl/server';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import {getBaseUrl} from '@/lib/env';
import {guides, labels, locales, type GuideLocale} from '@/lib/city-guides';

type Props = {params: Promise<{locale: GuideLocale; slug: string}>};
export function generateStaticParams() {
  return guides.map(({slug}) => ({slug}));
}
export async function generateMetadata({params}: Props): Promise<Metadata> {
  const {locale, slug} = await params;
  const place = guides.find(p => p.slug === slug);
  if (!place || !locales.includes(locale)) notFound();
  const text = place.locales[locale];
  const canonical = getBaseUrl() + '/' + locale + '/nearby/' + slug;
  const languages = Object.fromEntries(locales.map(l => [l, getBaseUrl() + '/' + l + '/nearby/' + slug]));
  return {
    title: text.title + ' · Medellín', description: text.history,
    alternates: {canonical, languages: {...languages, 'x-default': languages.es}},
    openGraph: {type: 'article', url: canonical, title: text.title, description: text.history, images: [place.photo]},
    twitter: {card: 'summary_large_image', title: text.title, description: text.history, images: [place.photo]},
  };
}
export default async function CityGuide({params}: Props) {
  const {locale, slug} = await params;
  const index = guides.findIndex(p => p.slug === slug);
  if (index < 0 || !locales.includes(locale)) notFound();
  setRequestLocale(locale);
  const place = guides[index];
  const text = place.locales[locale];
  const t = labels[locale];
  const next = guides[(index + 1) % guides.length];
  const map = 'https://www.google.com/maps/search/?api=1&query=' + encodeURIComponent(place.name + ', Medellín, Colombia');
  const faqs = [[text.question,text.answer],[t.arrival,text.walk],[t.access,text.manager]];
  return <>
    <Header solid />
    <main className="max-w-4xl mx-auto px-4 sm:px-6 pt-24 pb-16" style={{color:'var(--text-primary)'}}>
      <nav className="mb-5 flex flex-wrap gap-4 text-sm"><a href={'/'+locale+'/#nearby'}>← {t.nearby}</a>
        {locales.map((l,i)=><a key={l} href={'/'+l+'/nearby/'+slug} hrefLang={l} aria-current={locale===l ? 'page' : undefined}>{['Español','English','中文'][i]}</a>)}
      </nav>
      <h1 className="font-display text-3xl sm:text-5xl font-semibold mb-6">{text.title}</h1>
      <figure className="mb-8"><img src={place.photo} alt={text.title} className="w-full max-h-[480px] object-contain rounded-xl"/><figcaption className="mt-2 text-sm"><a href={place.source}>{t.source}</a></figcaption></figure>
      {[[t.history,text.history],[t.route,text.walk],[t.manager,text.manager]].map(([heading,body])=><section key={heading} className="mb-6"><h2 className="font-display text-2xl font-semibold mb-2">{heading}</h2><p className="leading-relaxed">{body}</p></section>)}
      <p className="mb-8"><a className="underline" href={map}>{t.map} ↗</a></p>
      <section><h2 className="font-display text-2xl font-semibold mb-3">{t.faq}</h2><dl className="space-y-4">{faqs.map(([q,a])=><div key={q}><dt className="font-semibold">{q}</dt><dd>{a}</dd></div>)}</dl></section>
      <p className="mt-8">{t.next} · <a className="underline" href={'/'+locale+'/nearby/'+next.slug}>{next.locales[locale].title}</a></p>
    </main><Footer/>
  </>;
}
