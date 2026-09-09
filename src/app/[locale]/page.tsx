import { setRequestLocale } from 'next-intl/server';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Intro from '@/components/Intro';
import SculptureSection from '@/components/SculptureSection';
import BasicInfo from '@/components/BasicInfo';
import WeatherSection from '@/components/WeatherSection';
import SeasonGuide from '@/components/SeasonGuide';
import DeepDive from '@/components/DeepDive';
import HistoryTimeline from '@/components/HistoryTimeline';
import Legends from '@/components/Legends';
import DidYouKnow from '@/components/DidYouKnow';
import RouteSection from '@/components/RouteSection';
import VisitPlans from '@/components/VisitPlans';
import HoursSection from '@/components/HoursSection';
import TicketsSection from '@/components/TicketsSection';
import TransportSection from '@/components/TransportSection';
import FacilitySection from '@/components/FacilitySection';
import Stewardship from '@/components/Stewardship';
import Gallery from '@/components/Gallery';
import Reviews from '@/components/Reviews';
import FaqSection from '@/components/FaqSection';
import SourcesSection from '@/components/SourcesSection';
import MapEmbed from '@/components/MapEmbed';
import Footer from '@/components/Footer';

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <Header />
      <main>
        <Hero />
        <About />
        <Intro />
        <SculptureSection />
        <BasicInfo />
        <WeatherSection />
        <SeasonGuide />
        <DeepDive />
        <HistoryTimeline />
        <Legends />
        <DidYouKnow />
        <RouteSection />
        <VisitPlans />
        <HoursSection />
        <TicketsSection />
        <TransportSection />
        <FacilitySection />
        <Stewardship />
        <Gallery />
        <Reviews />
        <FaqSection />
        <SourcesSection />
        <MapEmbed />
      </main>
      <Footer />
    </>
  );
}
