import { motion } from "framer-motion";
import { useEffect, useState } from "react";

function CountUp({ end, duration = 1800, suffix = "+" }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const increment = Math.ceil(end / 60);
    const interval = setInterval(() => {
      start += increment;
      if (start >= end) {
        start = end;
        clearInterval(interval);
      }
      setCount(start);
    }, duration / 60);

    return () => clearInterval(interval);
  }, [end, duration]);

  return (
    <span>
      {count}
      {suffix}
    </span>
  );
}

function ResultsSection() {
  const stats = [
    {
      end: 200,
      label: "Videos Edited",
      desc: "Reels, podcasts, ads, YouTube edits and premium content deliverables.",
    },
    {
      end: 25,
      label: "Brands & Creators Supported",
      desc: "Helping businesses and creators improve their digital visual presence.",
    },
    {
      end: 15,
      label: "Content Systems Built",
      desc: "Structured content workflows designed for consistency and growth.",
    },
    {
      end: 10,
      label: "Growth Campaign Supports",
      desc: "Creative, strategy and execution support for content-led digital growth.",
    },
  ];

  return (
    <section
      style={{
        padding: "110px 20px",
        background: "#071226",
        textAlign: "center",
        color: "white",
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
        Results That Build Trust
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
        Mineworld is not just about visuals. It is about systems, consistency,
        execution, and content that actually helps brands move forward.
      </motion.p>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
          gap: "24px",
          maxWidth: "1150px",
          margin: "0 auto",
        }}
      >
        {stats.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            viewport={{ once: true }}
            whileHover={{ y: -6, scale: 1.01 }}
            style={{
              background: "rgba(255,255,255,0.05)",
              border: "1px solid rgba(255,255,255,0.08)",
              borderRadius: "18px",
              padding: "34px 26px",
              boxShadow: "0 8px 24px rgba(0,0,0,0.15)",
            }}
          >
            <h3
              style={{
                fontSize: "42px",
                margin: "0 0 10px",
                color: "#c9a25d",
              }}
            >
              <CountUp end={item.end} />
            </h3>

            <h4
              style={{
                fontSize: "22px",
                margin: "0 0 14px",
                color: "#ffffff",
              }}
            >
              {item.label}
            </h4>

            <p
              style={{
                margin: 0,
                fontSize: "15px",
                lineHeight: "1.7",
                color: "#d1d7e2",
              }}
            >
              {item.desc}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

export default ResultsSection;