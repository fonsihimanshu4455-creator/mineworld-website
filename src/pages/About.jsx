import { useEffect } from "react";
import FounderSection from "../components/home/FounderSection";
import TeamSection from "../components/home/TeamSection";
import NavyBand from "../components/common/NavyBand";
import Seo from "../components/common/Seo";

function About() {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "auto" });
  }, []);

  return (
    <article
      style={{
        background:
          "radial-gradient(circle at 14% 10%, rgba(184,149,106,0.10), transparent 28%), linear-gradient(180deg, var(--bg-primary) 0%, var(--bg-cream-soft) 50%, var(--bg-primary) 100%)",
        paddingTop: "92px",
      }}
    >
      <Seo
        title="About — Founder & Team"
        path="/about"
        description="Meet the founder and team behind Mineworld Production — Delhi-based studio building content systems, websites, and ad campaigns for serious brands."
      />
      <FounderSection />
      <NavyBand
        eyebrow="Studio philosophy"
        title="The goal isn't more content. It's shaping perception."
        body="Every section, every frame, every output is intentional — not generic. Mineworld is built for clients and brands who want to look stronger, sharper, and harder to ignore."
      />
      <TeamSection />
    </article>
  );
}

export default About;
