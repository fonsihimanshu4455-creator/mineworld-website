import Hero from "../components/home/Hero";
import ResultsSection from "../components/home/ResultsSection";
import Services from "../components/home/Services";
import Portfolio from "../components/home/Portfolio";
import FounderSection from "../components/home/FounderSection";
import TeamSection from "../components/home/TeamSection";
import BrandStatement from "../components/home/BrandStatement";
import GrowthSection from "../components/home/GrowthSection";
import EditingShowcase from "../components/home/EditingShowcase";
import CTA from "../components/home/CTA";

export default function HomePage() {
  return (
    <>
      <Hero />
      <ResultsSection />
      <Services />
      <Portfolio />
      <FounderSection />
      <TeamSection />
      <BrandStatement />
      <GrowthSection />
      <EditingShowcase />
      <CTA />
    </>
  );
}
