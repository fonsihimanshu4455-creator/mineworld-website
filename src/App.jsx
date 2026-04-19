import Navbar from "./components/layout/Navbar";
import Hero from "./components/home/Hero";
import ResultsSection from "./components/home/ResultsSection";
import Services from "./components/home/Services";
import Portfolio from "./components/home/Portfolio";
import FounderSection from "./components/home/FounderSection";
import TeamSection from "./components/home/TeamSection";
import BrandStatement from "./components/home/BrandStatement";
import GrowthSection from "./components/home/GrowthSection";
import EditingShowcase from "./components/home/EditingShowcase";
import CTA from "./components/home/CTA";
import Footer from "./components/layout/Footer";
import ContactModal from "./components/common/ContactModal";
import FloatingWhatsApp from "./components/common/FloatingWhatsApp";
import ScrollProgress from "./components/common/ScrollProgress";

function App() {
  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#111827",
        color: "#fff",
      }}
    >
      <ScrollProgress />
      <Navbar />
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
      <Footer />
      <ContactModal />
      <FloatingWhatsApp />
    </div>
  );
}

export default App;