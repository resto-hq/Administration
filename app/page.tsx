import Hero from "@/components/landing/Hero";
import Benefits from "@/components/landing/Benefits";
import HowItWorks from "@/components/landing/HowItWorks";
import DashboardPreview from "@/components/landing/DashboardPreview";
import FinalCta from "@/components/landing/FinalCta";
import Footer from "@/components/landing/Footer";

export default function Home() {
  return (
    <main>
      <Hero />
      <Benefits />
      <HowItWorks />
      <DashboardPreview />
      <FinalCta />
      <Footer />
    </main>
  );
}
