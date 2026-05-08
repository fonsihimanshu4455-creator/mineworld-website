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
          "radial-gradient(circle at 14% 10%, rgba(184,149,106,0.10), transparent 28%), linear-gradient(180deg, var(--bg-primary) 0%, var(--bg-cream-soft) 50%, var(--bg-primary) 100%)",
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
