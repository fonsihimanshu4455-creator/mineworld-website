import Hero from "../components/home/Hero";
import ClientsMarquee from "../components/home/ClientsMarquee";
import Services from "../components/home/Services";
import Portfolio from "../components/home/Portfolio";
import ResultsSection from "../components/home/ResultsSection";
import Reviews from "../components/home/Reviews";
import FAQ from "../components/home/FAQ";
import CTA from "../components/home/CTA";

export default function HomePage() {
  return (
    <>
      <Hero />
      <ClientsMarquee />
      <Services />
      <Portfolio />
      <ResultsSection />
      <Reviews />
      <FAQ />
      <CTA />
    </>
  );
}
