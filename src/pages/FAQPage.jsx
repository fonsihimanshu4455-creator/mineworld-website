import { useEffect } from "react";
import FAQ from "../components/home/FAQ";

function FAQPage() {
  useEffect(() => {
    document.title = "FAQ | Mineworld Production";
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
      <FAQ />
    </article>
  );
}

export default FAQPage;
