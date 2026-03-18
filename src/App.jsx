import Navbar from "./components/layout/Navbar";
import Hero from "./components/home/Hero";
import GrowthSection from "./components/home/GrowthSection";
import BrandStatement from "./components/home/BrandStatement";
import EditingShowcase from "./components/home/EditingShowcase";
import Services from "./components/home/Services";
import FounderSection from "./components/home/FounderSection";
import TeamSection from "./components/home/TeamSection";
import ResultsSection from "./components/home/ResultsSection";
import Portfolio from "./components/home/Portfolio";
import CTA from "./components/home/CTA";
import Footer from "./components/layout/Footer";

function App() {
  return (
    <>
      <Navbar />
      <Hero />
      <GrowthSection />
      <BrandStatement />
      <EditingShowcase />
      <Services />
      <FounderSection />
      <TeamSection />
      <ResultsSection />
      <Portfolio />
      <CTA />
      <Footer />
    </>
  );
}

export default App;