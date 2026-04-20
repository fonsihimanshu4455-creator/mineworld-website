import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import Hero from "../components/home/Hero";
import ClientLogoWall from "../components/home/ClientLogoWall";
import ResultsSection from "../components/home/ResultsSection";
import Services from "../components/home/Services";
import Portfolio from "../components/home/Portfolio";
import Testimonials from "../components/home/Testimonials";
import FounderSection from "../components/home/FounderSection";
import TeamSection from "../components/home/TeamSection";
import BrandStatement from "../components/home/BrandStatement";
import GrowthSection from "../components/home/GrowthSection";
import EditingShowcase from "../components/home/EditingShowcase";
import ReelScoreTool from "../components/home/ReelScoreTool";
import Pricing from "../components/home/Pricing";
import FAQ from "../components/home/FAQ";
import CTA from "../components/home/CTA";

function Home() {
  const location = useLocation();

  useEffect(() => {
    if (!location.hash) return;
    const id = location.hash.replace("#", "");
    const el = document.getElementById(id);
    if (!el) return;
    const top =
      el.getBoundingClientRect().top + window.pageYOffset - 110;
    window.scrollTo({ top, behavior: "smooth" });
  }, [location.hash]);

  return (
    <>
      <Hero />
      <ClientLogoWall />
      <ResultsSection />
      <Services />
      <Portfolio />
      <Testimonials />
      <FounderSection />
      <TeamSection />
      <BrandStatement />
      <GrowthSection />
      <EditingShowcase />
      <ReelScoreTool />
      <Pricing />
      <FAQ />
      <CTA />
    </>
  );
}

export default Home;
