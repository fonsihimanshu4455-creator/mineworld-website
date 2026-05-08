import { useEffect } from "react";
import { Link } from "react-router-dom";
import ProcessSection from "../components/home/Process";
import NavyBand from "../components/common/NavyBand";
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

      <NavyBand
        eyebrow="Why this works"
        title="Built around outcomes — not deliverables."
        body="Most agencies sell hours and assets. We engineer a system that compounds — every reel, ad, and post stacks toward a clearer result month over month. No black box, no surprise invoices."
      >
        <div style={{ marginTop: "28px" }}>
          <Link
            to="/packages"
            style={{
              display: "inline-block",
              padding: "14px 28px",
              borderRadius: "999px",
              background: "var(--accent-gold)",
              color: "#18140F",
              fontSize: "14px",
              fontWeight: 700,
              letterSpacing: "0.3px",
              textDecoration: "none",
              boxShadow: "0 14px 30px rgba(184,149,106,0.28)",
              transition: "transform 0.3s ease, background 0.3s ease",
            }}
          >
            See how it's priced →
          </Link>
        </div>
      </NavyBand>
    </article>
  );
}

export default ProcessPage;
