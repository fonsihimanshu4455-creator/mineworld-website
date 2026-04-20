import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Container from "../common/Container";
import Reveal from "../common/Reveal";
import SectionHeading from "../common/SectionHeading";
import SectionTag from "../common/SectionTag";
import { theme } from "../../styles/theme";
import { openContactModal, trackCtaClick } from "../../utils/contactActions";
import { trackEvent } from "../../utils/analytics";
import useIsMobile from "../../utils/useIsMobile";

const questions = [
  {
    id: "hook",
    label: "First 1 second of your reel",
    question:
      "Does the first frame instantly signal what the reel is about?",
    help: "Motion, a bold visual, or a clear claim in the opening frame.",
    options: [
      { label: "Nope, my intro is text-heavy or slow", weight: 0 },
      { label: "Kinda — sometimes it lands", weight: 10 },
      { label: "Yes — visual + claim in first second", weight: 20 },
    ],
  },
  {
    id: "retention",
    label: "Watch-through behavior",
    question: "Do viewers usually watch past the 3-second mark?",
    help: "Check Instagram Insights → average watch time.",
    options: [
      { label: "Most drop off before 3 seconds", weight: 0 },
      { label: "Around 3-6 seconds average", weight: 10 },
      { label: "7+ seconds average", weight: 20 },
    ],
  },
  {
    id: "pacing",
    label: "Pacing + cuts",
    question: "Is there a pattern interrupt in the middle of the reel?",
    help: "A zoom, a beat drop, a tone shift — something that re-engages.",
    options: [
      { label: "Flat pacing, single energy", weight: 0 },
      { label: "Some visual variation", weight: 10 },
      { label: "Intentional interrupts + sound design", weight: 20 },
    ],
  },
  {
    id: "loop",
    label: "Loop / re-watch trigger",
    question: "Does your reel end in a way that loops naturally?",
    help: "Instagram rewards re-watches. A soft cliffhanger or repeat beat helps.",
    options: [
      { label: "No — it just ends", weight: 0 },
      { label: "Sometimes it loops okay", weight: 10 },
      { label: "Yes — engineered to loop", weight: 20 },
    ],
  },
  {
    id: "cta",
    label: "Post-view action",
    question: "Is there a clear action for viewers after watching?",
    help: "Save, share, DM keyword, swipe up — something measurable.",
    options: [
      { label: "No CTA", weight: 0 },
      { label: "Generic 'follow for more'", weight: 10 },
      { label: "Specific CTA aligned to business goal", weight: 20 },
    ],
  },
];

function getBand(score) {
  if (score >= 80) {
    return {
      band: "Top 5%",
      headline: "Your reel structure is strong — now scale it.",
      color: "rgba(110,220,150,0.38)",
      tips: [
        "Maintain your hook + loop formula across every reel.",
        "Repurpose the winning structure into ad creatives.",
        "Add consistent CTAs that route viewers to revenue, not just reach.",
      ],
    };
  }
  if (score >= 60) {
    return {
      band: "Solid Base",
      headline: "You're ahead of most creators. A few tweaks unlock growth.",
      color: "rgba(214,176,96,0.38)",
      tips: [
        "Sharpen the first 1 second — visual + claim + motion.",
        "Add a mid-reel pattern interrupt to hold past the 7s decision point.",
        "Engineer loop-ready endings to multiply re-watch count.",
      ],
    };
  }
  if (score >= 40) {
    return {
      band: "Growing",
      headline: "Good intent. The execution layer needs upgrading.",
      color: "rgba(214,176,96,0.28)",
      tips: [
        "Rewrite hooks to be 1.5 seconds of motion + claim.",
        "Cut filler b-roll; every shot must earn its place.",
        "Shift from generic CTAs to one specific measurable action.",
      ],
    };
  }
  return {
    band: "Needs Structure",
    headline: "Your ideas are fine. Your edits are leaking attention.",
    color: "rgba(220,110,110,0.32)",
    tips: [
      "Open every reel with motion + claim in the first frame.",
      "Shorten total runtime — cut everything not earning attention.",
      "Add intentional beat drops, captions, and a clear ending trigger.",
    ],
  };
}

function Option({ option, active, onClick }) {
  return (
    <button
      onClick={onClick}
      aria-pressed={active}
      style={{
        width: "100%",
        textAlign: "left",
        padding: "14px 16px",
        borderRadius: "16px",
        border: active
          ? "1px solid rgba(214,176,96,0.85)"
          : `1px solid ${theme.colors.line}`,
        background: active
          ? "rgba(214,176,96,0.12)"
          : "rgba(255,255,255,0.03)",
        color: active ? theme.colors.goldSoft : theme.colors.text,
        fontSize: "14.5px",
        fontWeight: 600,
        cursor: "pointer",
        transition: "all 0.2s ease",
      }}
    >
      {option.label}
    </button>
  );
}

function ReelScoreTool() {
  const isMobile = useIsMobile(768);
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState({});
  const [finished, setFinished] = useState(false);

  const current = questions[step];
  const totalSteps = questions.length;

  const score = useMemo(
    () =>
      Object.values(answers).reduce(
        (acc, weight) => acc + (weight || 0),
        0
      ),
    [answers]
  );

  const band = useMemo(() => getBand(score), [score]);

  const selectOption = (weight) => {
    setAnswers((prev) => ({ ...prev, [current.id]: weight }));
  };

  const next = () => {
    if (step === totalSteps - 1) {
      setFinished(true);
      trackEvent("reel_score_completed", { score });
      return;
    }
    setStep((s) => s + 1);
  };

  const reset = () => {
    setStep(0);
    setAnswers({});
    setFinished(false);
  };

  const hasAnswer = answers[current?.id] !== undefined;
  const progress = finished
    ? 100
    : Math.round(((step + (hasAnswer ? 1 : 0)) / totalSteps) * 100);

  return (
    <section
      id="reel-score"
      style={{
        position: "relative",
        padding: isMobile ? "82px 0" : "122px 0",
        background: `
          radial-gradient(circle at 80% 20%, rgba(214,176,96,0.08), transparent 24%),
          linear-gradient(180deg, rgba(13,20,34,1) 0%, rgba(16,24,39,1) 100%)
        `,
        borderBottom: `1px solid ${theme.colors.line}`,
        overflow: "hidden",
      }}
    >
      <Container>
        <Reveal>
          <SectionTag>Free Tool</SectionTag>
        </Reveal>
        <Reveal delay={0.06}>
          <SectionHeading
            title="Your Reel Score — a 60-second self audit."
            subtitle="Answer 5 quick questions about your last 5 reels. Get a score out of 100 and see exactly where your content is leaking attention. No email required to see the result."
          />
        </Reveal>

        <div
          style={{
            borderRadius: "28px",
            border: `1px solid ${theme.colors.lineStrong}`,
            background:
              "linear-gradient(180deg, rgba(255,255,255,0.045), rgba(255,255,255,0.015))",
            padding: isMobile ? "26px 22px" : "36px 40px",
            boxShadow: theme.shadow.deep,
            maxWidth: "960px",
            margin: "0 auto",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: "16px",
              marginBottom: "20px",
              flexWrap: "wrap",
            }}
          >
            <div
              style={{
                color: theme.colors.goldSoft,
                fontSize: "12px",
                letterSpacing: "2px",
                textTransform: "uppercase",
                fontWeight: 700,
              }}
            >
              {finished
                ? "Your Score"
                : `Question ${step + 1} of ${totalSteps}`}
            </div>
            <div
              style={{
                flex: 1,
                minWidth: "180px",
                height: "6px",
                borderRadius: "999px",
                background: "rgba(255,255,255,0.08)",
                overflow: "hidden",
              }}
            >
              <motion.div
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                style={{
                  height: "100%",
                  background:
                    "linear-gradient(90deg, #D6B060, #E7C98A)",
                }}
              />
            </div>
          </div>

          <AnimatePresence mode="wait">
            {!finished ? (
              <motion.div
                key={current.id}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
              >
                <div
                  style={{
                    color: theme.colors.textSoft,
                    fontSize: "12px",
                    letterSpacing: "1.6px",
                    textTransform: "uppercase",
                    fontWeight: 700,
                    marginBottom: "10px",
                  }}
                >
                  {current.label}
                </div>

                <h3
                  style={{
                    margin: "0 0 8px",
                    color: theme.colors.text,
                    fontSize: isMobile ? "22px" : "28px",
                    lineHeight: 1.2,
                    letterSpacing: "-0.4px",
                    fontWeight: 800,
                  }}
                >
                  {current.question}
                </h3>

                <p
                  style={{
                    margin: "0 0 22px",
                    color: theme.colors.textSoft,
                    fontSize: "14px",
                    lineHeight: 1.75,
                  }}
                >
                  {current.help}
                </p>

                <div style={{ display: "grid", gap: "10px" }}>
                  {current.options.map((opt) => (
                    <Option
                      key={opt.label}
                      option={opt}
                      active={answers[current.id] === opt.weight}
                      onClick={() => selectOption(opt.weight)}
                    />
                  ))}
                </div>

                <div
                  style={{
                    display: "flex",
                    gap: "12px",
                    marginTop: "26px",
                    flexWrap: "wrap",
                  }}
                >
                  <button
                    onClick={() => setStep((s) => Math.max(0, s - 1))}
                    disabled={step === 0}
                    style={{
                      padding: "12px 18px",
                      borderRadius: "999px",
                      border: `1px solid ${theme.colors.line}`,
                      background: "rgba(255,255,255,0.03)",
                      color: theme.colors.text,
                      fontWeight: 700,
                      fontSize: "14px",
                      cursor: step === 0 ? "not-allowed" : "pointer",
                      opacity: step === 0 ? 0.4 : 1,
                    }}
                  >
                    ← Back
                  </button>
                  <button
                    onClick={next}
                    disabled={!hasAnswer}
                    style={{
                      padding: "12px 22px",
                      borderRadius: "999px",
                      border: "none",
                      background: hasAnswer
                        ? "linear-gradient(135deg, #D6B060, #E7C98A)"
                        : "rgba(255,255,255,0.06)",
                      color: hasAnswer ? "#18140F" : "rgba(255,255,255,0.4)",
                      fontWeight: 800,
                      fontSize: "14px",
                      cursor: hasAnswer ? "pointer" : "not-allowed",
                      boxShadow: hasAnswer
                        ? "0 10px 24px rgba(214,176,96,0.28)"
                        : "none",
                    }}
                  >
                    {step === totalSteps - 1 ? "See my score" : "Next →"}
                  </button>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="result"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, ease: "easeOut" }}
              >
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: isMobile ? "1fr" : "240px 1fr",
                    gap: isMobile ? "24px" : "36px",
                    alignItems: "center",
                  }}
                >
                  <div
                    style={{
                      position: "relative",
                      width: isMobile ? "180px" : "200px",
                      height: isMobile ? "180px" : "200px",
                      borderRadius: "50%",
                      background: `conic-gradient(#D6B060 ${score * 3.6}deg, rgba(255,255,255,0.08) 0deg)`,
                      display: "grid",
                      placeItems: "center",
                      margin: isMobile ? "0 auto" : 0,
                      boxShadow: `0 18px 50px ${band.color}`,
                    }}
                  >
                    <div
                      style={{
                        width: "84%",
                        height: "84%",
                        borderRadius: "50%",
                        background:
                          "linear-gradient(180deg, rgba(17,24,39,0.98), rgba(22,32,51,0.98))",
                        display: "grid",
                        placeItems: "center",
                        flexDirection: "column",
                      }}
                    >
                      <div
                        style={{
                          color: theme.colors.text,
                          fontSize: "44px",
                          fontWeight: 800,
                          lineHeight: 1,
                          letterSpacing: "-1.5px",
                        }}
                      >
                        {score}
                      </div>
                      <div
                        style={{
                          color: theme.colors.goldSoft,
                          fontSize: "11px",
                          letterSpacing: "1.6px",
                          textTransform: "uppercase",
                          fontWeight: 700,
                          marginTop: "4px",
                        }}
                      >
                        / 100
                      </div>
                    </div>
                  </div>

                  <div>
                    <div
                      style={{
                        display: "inline-block",
                        padding: "6px 12px",
                        borderRadius: "999px",
                        background: band.color,
                        color: theme.colors.text,
                        fontSize: "11px",
                        letterSpacing: "1.6px",
                        textTransform: "uppercase",
                        fontWeight: 800,
                        marginBottom: "12px",
                      }}
                    >
                      {band.band}
                    </div>
                    <h3
                      style={{
                        margin: "0 0 12px",
                        fontSize: isMobile ? "22px" : "28px",
                        lineHeight: 1.2,
                        color: theme.colors.text,
                        fontWeight: 800,
                        letterSpacing: "-0.4px",
                      }}
                    >
                      {band.headline}
                    </h3>
                    <ul
                      style={{
                        listStyle: "none",
                        margin: 0,
                        padding: 0,
                        display: "grid",
                        gap: "10px",
                      }}
                    >
                      {band.tips.map((tip) => (
                        <li
                          key={tip}
                          style={{
                            display: "flex",
                            gap: "10px",
                            color: theme.colors.textSoft,
                            fontSize: "14.5px",
                            lineHeight: 1.75,
                          }}
                        >
                          <span
                            style={{
                              color: theme.colors.goldSoft,
                              flexShrink: 0,
                              fontWeight: 800,
                            }}
                          >
                            ▸
                          </span>
                          {tip}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div
                  style={{
                    marginTop: "32px",
                    padding: isMobile ? "22px" : "28px",
                    borderRadius: "22px",
                    border: "1px solid rgba(214,176,96,0.38)",
                    background:
                      "linear-gradient(180deg, rgba(214,176,96,0.08), rgba(255,255,255,0.02))",
                    display: "grid",
                    gridTemplateColumns: isMobile ? "1fr" : "1.4fr 1fr",
                    gap: "20px",
                    alignItems: "center",
                  }}
                >
                  <div>
                    <div
                      style={{
                        fontSize: isMobile ? "18px" : "22px",
                        color: theme.colors.text,
                        fontWeight: 700,
                        lineHeight: 1.35,
                        fontFamily:
                          '"Playfair Display", Georgia, "Times New Roman", serif',
                      }}
                    >
                      Want a detailed reel-by-reel audit?
                    </div>
                    <div
                      style={{
                        color: theme.colors.textSoft,
                        fontSize: "14px",
                        lineHeight: 1.75,
                        marginTop: "6px",
                      }}
                    >
                      Send us your last 5 reels. We'll return a free loom with
                      specific timestamps where you're leaking attention —
                      within 48 hours.
                    </div>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      gap: "12px",
                      flexWrap: "wrap",
                      justifyContent: isMobile ? "flex-start" : "flex-end",
                    }}
                  >
                    <button
                      onClick={() => {
                        trackCtaClick("Get Free Audit", "reel-score");
                        openContactModal("reel-score-tool");
                      }}
                      style={{
                        padding: "14px 22px",
                        borderRadius: "999px",
                        border: "none",
                        background:
                          "linear-gradient(135deg, #D6B060, #E7C98A)",
                        color: "#18140F",
                        fontWeight: 800,
                        fontSize: "14px",
                        cursor: "pointer",
                        boxShadow: "0 10px 24px rgba(214,176,96,0.28)",
                      }}
                    >
                      Get Free Audit
                    </button>
                    <button
                      onClick={reset}
                      style={{
                        padding: "14px 22px",
                        borderRadius: "999px",
                        border: `1px solid ${theme.colors.line}`,
                        background: "rgba(255,255,255,0.03)",
                        color: theme.colors.text,
                        fontWeight: 700,
                        fontSize: "14px",
                        cursor: "pointer",
                      }}
                    >
                      Retake
                    </button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </Container>
    </section>
  );
}

export default ReelScoreTool;
