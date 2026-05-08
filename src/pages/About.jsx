import { useEffect } from "react";
import FounderSection from "../components/home/FounderSection";
import TeamSection from "../components/home/TeamSection";

function About() {
  useEffect(() => {
    document.title = "About | Mineworld Production";
    window.scrollTo({ top: 0, behavior: "auto" });
  }, []);

  return (
    <article
      style={{
        background:
          "radial-gradient(circle at 14% 10%, rgba(214,176,96,0.08), transparent 22%), linear-gradient(180deg, #0b0f1a 0%, #141c2f 50%, #0b0f1a 100%)",
        paddingTop: "92px",
      }}
    >
      <FounderSection />
      <TeamSection />
    </article>
  );
}

export default About;
