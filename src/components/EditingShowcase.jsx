import { motion } from "framer-motion";
import reelsImage from "../assets/reels-showcase.jpg";
import podcastImage from "../assets/podcast-showcase.jpg";
import adsImage from "../assets/ads-showcase.jpg";

function EditingShowcase() {
  const showcaseItems = [
    {
      tag: "Reels Editing",
      title: "Fast-Paced Short Form Content",
      desc: "Hook-driven edits designed for retention, premium pacing, captions, and stronger social media impact.",
      image: reelsImage,
    },
    {
      tag: "Podcast Editing",
      title: "Clean Long-Form & Clip Systems",
      desc: "Podcast edits structured for clarity, audience attention, premium delivery, and short-form repurposing.",
      image: podcastImage,
    },
    {
      tag: "Ad Creative Editing",
      title: "Conversion-Focused Visual Cuts",
      desc: "Sharp ad edits with better openings, tighter rhythm, message clarity, and stronger brand presentation.",
      image: adsImage,
    },
  ];

  return (
    <section
      style={{
        padding: "110px 20px",
        background: "#050d1a",
        color: "white",
        textAlign: "center",
      }}
    >
      <motion.h2
        initial={{ opacity: 0, y: 35 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        style={{
          fontSize: "44px",
          marginBottom: "18px",
        }}
      >
        Editing Showcase
      </motion.h2>

      <motion.p
        initial={{ opacity: 0, y: 35 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        viewport={{ once: true }}
        style={{
          maxWidth: "860px",
          margin: "0 auto 60px",
          fontSize: "18px",
          lineHeight: "1.7",
          color: "#d1d7e2",
        }}
      >
        Video editing is the core of Mineworld. From short-form reels to podcasts
        and ad creatives, we build edits that do not just look premium — they
        make content perform better.
      </motion.p>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
          gap: "28px",
          maxWidth: "1180px",
          margin: "0 auto",
        }}
      >
        {showcaseItems.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.12 }}
            viewport={{ once: true }}
            whileHover={{ y: -8, scale: 1.01 }}
            style={{
              position: "relative",
              minHeight: "420px",
              borderRadius: "22px",
              overflow: "hidden",
              boxShadow: "0 10px 30px rgba(0,0,0,0.24)",
              cursor: "pointer",
              background: "#071226",
            }}
          >
            <img
              src={item.image}
              alt={item.title}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                display: "block",
              }}
            />

            <div
              style={{
                position: "absolute",
                inset: 0,
                background:
                  "linear-gradient(to top, rgba(5,13,26,0.96) 14%, rgba(5,13,26,0.52) 52%, rgba(5,13,26,0.10) 100%)",
              }}
            />

            <div
              style={{
                position: "absolute",
                left: "24px",
                right: "24px",
                bottom: "24px",
                textAlign: "left",
                zIndex: 2,
              }}
            >
              <div
                style={{
                  display: "inline-block",
                  marginBottom: "14px",
                  padding: "7px 12px",
                  borderRadius: "999px",
                  background: "rgba(201,162,93,0.15)",
                  color: "#d8b067",
                  fontSize: "13px",
                  fontWeight: "bold",
                }}
              >
                {item.tag}
              </div>

              <h3
                style={{
                  fontSize: "30px",
                  lineHeight: "1.2",
                  margin: "0 0 12px",
                  color: "#ffffff",
                }}
              >
                {item.title}
              </h3>

              <p
                style={{
                  margin: 0,
                  color: "#d1d7e2",
                  lineHeight: "1.8",
                  fontSize: "15px",
                  maxWidth: "92%",
                }}
              >
                {item.desc}
              </p>

              <div
                style={{
                  marginTop: "18px",
                  color: "#c9a25d",
                  fontWeight: "bold",
                  fontSize: "14px",
                }}
              >
                Watch Visual Style →
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

export default EditingShowcase;