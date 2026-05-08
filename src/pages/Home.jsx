import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import Hero from "../components/home/Hero";
import ClientLogoWall from "../components/home/ClientLogoWall";
import ResultsSection from "../components/home/ResultsSection";
import Services from "../components/home/Services";
import CapabilitiesBand from "../components/home/CapabilitiesBand";
import TrustStrip from "../components/home/TrustStrip";
import Process from "../components/home/Process";
import Portfolio from "../components/home/Portfolio";
import Testimonials from "../components/home/Testimonials";
import FounderSection from "../components/home/FounderSection";
import TeamSection from "../components/home/TeamSection";
import EditingShowcase from "../components/home/EditingShowcase";
import ReelScoreTool from "../components/home/ReelScoreTool";
import InsightsPreview from "../components/home/InsightsPreview";
import FAQ from "../components/home/FAQ";
import { useSectionVisible } from "../admin/hooks";

function Home() {
  const location = useLocation();

  const showClientLogoWall = useSectionVisible("clientLogoWall");
  const showResultsSection = useSectionVisible("resultsSection");
  const showServices = useSectionVisible("services");
  const showCapabilitiesBand = useSectionVisible("capabilitiesBand");
  const showTrustStrip = useSectionVisible("trustStrip");
  const showProcess = useSectionVisible("process");
  const showPortfolio = useSectionVisible("portfolio");
  const showTestimonials = useSectionVisible("testimonials");
  const showFounderSection = useSectionVisible("founderSection");
  const showTeamSection = useSectionVisible("teamSection");
  const showEditingShowcase = useSectionVisible("editingShowcase");
  const showReelScoreTool = useSectionVisible("reelScoreTool");
  const showInsightsPreview = useSectionVisible("insightsPreview");
  const showFAQ = useSectionVisible("faq");

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
      {showClientLogoWall && <ClientLogoWall />}
      {showResultsSection && <ResultsSection />}
      {showServices && <Services />}
      {showCapabilitiesBand && <CapabilitiesBand />}
      {showTrustStrip && <TrustStrip />}
      {showProcess && <Process />}
      {showPortfolio && <Portfolio />}
      {showTestimonials && <Testimonials />}
      {showFounderSection && <FounderSection />}
      {showTeamSection && <TeamSection />}
      {showEditingShowcase && <EditingShowcase />}
      {showReelScoreTool && <ReelScoreTool />}
      {showInsightsPreview && <InsightsPreview />}
      {showFAQ && <FAQ />}
    </>
  );
}

export default Home;
