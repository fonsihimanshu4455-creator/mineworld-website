import { useEffect } from "react";
import ProcessSection from "../components/home/Process";
import Seo from "../components/common/Seo";

function ProcessPage() {
  useEffect(() => {
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
      <Seo
        title="Process — How we ship"
        path="/process"
        description="Our delivery workflow — from kickoff to ongoing optimisation. How Mineworld Production builds and ships premium content systems."
      />
      <ProcessSection />
    </article>
  );
}

export default ProcessPage;
