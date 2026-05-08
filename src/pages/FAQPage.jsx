import { useEffect } from "react";
import FAQ from "../components/home/FAQ";
import Seo from "../components/common/Seo";

function FAQPage() {
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
        title="FAQ — Frequently Asked Questions"
        path="/faq"
        description="Common questions about working with Mineworld Production — pricing, timelines, deliverables, revisions, and how we measure success."
      />
      <FAQ />
    </article>
  );
}

export default FAQPage;
