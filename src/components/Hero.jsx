import { Link } from "react-router-dom";
import { motion } from "framer-motion";

function Hero() {
  return (
    <section
      style={{
        background: "#071226",
        color: "white",
        padding: "140px 20px 120px",
        textAlign: "center",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          position: "absolute",
          width: "420px",
          height: "420px",
          borderRadius: "50%",
          background: "rgba(201,162,93,0.10)",
          filter: "blur(80px)",
          top: "-80px",
          left: "-80px",
        }}
      />
      <div
        style={{
          position: "absolute",
          width: "320px",
          height: "320px",
          borderRadius: "50%",
          background: "rgba(255,255,255,0.05)",
          filter: "blur(90px)",
          bottom: "-60px",
          right: "-40px",
        }}
      />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        style={{
          display: "inline-block",
          marginBottom: "18px",
          padding: "8px 14px",
          borderRadius: "999px",
          background: "rgba(201,162,93,0.12)",
          color: "#c9a25d",
          fontSize: "14px",
          fontWeight: "bold",
          letterSpacing: "0.5px",
          position: "relative",
          zIndex: 2,
        }}
      >
        NEW-AGE VIDEO EDITING & DIGITAL GROWTH
      </motion.div>

      <motion.h1
        initial={{ opacity: 0, y: 45 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.75, delay: 0.1 }}
        style={{
          fontSize: "68px",
          lineHeight: "1.05",
          maxWidth: "1080px",
          margin: "0 auto 24px",
          fontWeight: "bold",
          position: "relative",
          zIndex: 2,
        }}
      >
        We Turn Raw Content
        <br />
        Into Brand Power
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 35 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.2 }}
        style={{
          maxWidth: "880px",
          margin: "0 auto 36px",
          fontSize: "22px",
          lineHeight: "1.8",
          color: "#d6d6d6",
          position: "relative",
          zIndex: 2,
        }}
      >
        Mineworld Production helps creators, brands, and businesses grow through
        premium video editing, strategic digital marketing, studio-backed content systems,
        and stronger creative execution.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 35 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.3 }}
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "16px",
          flexWrap: "wrap",
          position: "relative",
          zIndex: 2,
        }}
      >
        <Link
          to="/contact"
          style={{
            background: "#c9a25d",
            color: "#071226",
            padding: "16px 30px",
            borderRadius: "10px",
            fontWeight: "bold",
            textDecoration: "none",
            boxShadow: "0 8px 24px rgba(0,0,0,0.18)",
          }}
        >
          Start Your Project
        </Link>

        <Link
          to="/services"
          style={{
            border: "1px solid rgba(255,255,255,0.18)",
            color: "white",
            padding: "16px 30px",
            borderRadius: "10px",
            fontWeight: "bold",
            textDecoration: "none",
            background: "rgba(255,255,255,0.02)",
          }}
        >
          Explore Services
        </Link>
      </motion.div>
    </section>
  );
}

export default Hero;