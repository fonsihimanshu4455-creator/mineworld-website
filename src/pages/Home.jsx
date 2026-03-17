import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import EditingShowcase from "../components/EditingShowcase";
import Services from "../components/Services";
import Portfolio from "../components/Portfolio";
import WhyMineworld from "../components/WhyMineworld";
import TeamSection from "../components/TeamSection";
import ResultsSection from "../components/ResultsSection";
import CTA from "../components/CTA";
import Footer from "../components/Footer";

function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <EditingShowcase />
      <Services />
      <Portfolio />
      <WhyMineworld />
      <TeamSection />
      <ResultsSection />
      <CTA />
      <Footer />
    </>
  );
}

export default Home;