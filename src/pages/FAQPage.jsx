import { useEffect } from "react";
import FAQ from "../components/home/FAQ";
import NavyBand from "../components/common/NavyBand";
import Seo from "../components/common/Seo";
import { openContactModal } from "../utils/contactActions";

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

      <NavyBand
        eyebrow="Still have questions?"
        title="Let's talk through your project."
        body="A 20-minute strategy call is the fastest way to get specifics — pricing, timeline, and whether we're the right fit for what you're building."
      >
        <div style={{ marginTop: "28px" }}>
          <button
            type="button"
            onClick={() => openContactModal("faq-cta-band")}
            style={{
              padding: "14px 28px",
              borderRadius: "999px",
              border: "none",
              background: "var(--accent-gold)",
              color: "#18140F",
              fontSize: "14px",
              fontWeight: 700,
              letterSpacing: "0.3px",
              cursor: "pointer",
              boxShadow: "0 14px 30px rgba(184,149,106,0.28)",
              transition: "transform 0.3s ease, background 0.3s ease",
            }}
          >
            Book a Strategy Call →
          </button>
        </div>
      </NavyBand>
    </article>
  );
}

export default FAQPage;
