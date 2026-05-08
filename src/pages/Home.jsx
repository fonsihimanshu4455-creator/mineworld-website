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
import Seo from "../components/common/Seo";
import { useSiteSettings, useSectionOrder } from "../admin/hooks";
import { siteConfig as defaultSiteConfig } from "../data/siteConfig";

const SECTION_COMPONENTS = {
  clientLogoWall: ClientLogoWall,
  resultsSection: ResultsSection,
  services: Services,
  capabilitiesBand: CapabilitiesBand,
  trustStrip: TrustStrip,
  process: Process,
  portfolio: Portfolio,
  testimonials: Testimonials,
  founderSection: FounderSection,
  teamSection: TeamSection,
  editingShowcase: EditingShowcase,
  reelScoreTool: ReelScoreTool,
  insightsPreview: InsightsPreview,
  faq: FAQ,
};

function Home() {
  const location = useLocation();
  const settings = useSiteSettings(defaultSiteConfig);
  const order = useSectionOrder(defaultSiteConfig.sectionOrder);
  const visibility = settings.sectionVisibility || {};

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
      <Seo path="/" />
      <Hero />
      {order.map((key) => {
        const Component = SECTION_COMPONENTS[key];
        if (!Component) return null;
        if (visibility[key] === false) return null;
        return <Component key={key} />;
      })}
    </>
  );
}

export default Home;
