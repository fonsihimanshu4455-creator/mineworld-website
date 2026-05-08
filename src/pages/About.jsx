import { useEffect } from "react";
import FounderSection from "../components/home/FounderSection";
import TeamSection from "../components/home/TeamSection";
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
      <TeamSection />
    </article>
  );
}

export default About;
