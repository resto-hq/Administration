import Header from "@/components/landing/Header";
import Hero from "@/components/landing/Hero";
import StatsBand from "@/components/landing/StatsBand";
import RestaurantsShowcase from "@/components/landing/RestaurantsShowcase";
import SearchCriteria from "@/components/landing/SearchCriteria";
import DetailShowcase from "@/components/landing/DetailShowcase";
import MapShowcase from "@/components/landing/MapShowcase";
import EventsShowcase from "@/components/landing/EventsShowcase";
import AppScreens from "@/components/landing/AppScreens";
import HowItWorks from "@/components/landing/HowItWorks";
import ProCta from "@/components/landing/ProCta";
import Faq from "@/components/landing/Faq";
import FinalCta from "@/components/landing/FinalCta";
import Footer from "@/components/landing/Footer";
import { spaceGrotesk } from "@/lib/fonts";

export default function Home() {
  return (
    <main className={spaceGrotesk.className}>
      <Header />
      <Hero />
      <StatsBand />
      <RestaurantsShowcase />
      <SearchCriteria />
      <DetailShowcase />
      <MapShowcase />
      <EventsShowcase />
      <AppScreens />
      <HowItWorks />
      <ProCta />
      <Faq />
      <FinalCta />
      <Footer />
    </main>
  );
}
