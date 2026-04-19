import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";

// Extract the first number (and surrounding prefix/suffix) from a string.
// Ex: "+32 Leads" => { prefix: "+", num: 32, suffix: " Leads" }
// Ex: "2.5M" => { prefix: "", num: 2.5, suffix: "M" }
// Ex: "₹1,80,000" => { prefix: "₹", num: 180000, suffix: "", hasCommas: true }
function parseStat(raw) {
  const str = String(raw ?? "");
  const match = str.match(/[\d][\d,]*(?:\.\d+)?/);
  if (!match) return null;

  const numStr = match[0];
  const idx = str.indexOf(numStr);
  const prefix = str.slice(0, idx);
  const suffix = str.slice(idx + numStr.length);
  const cleaned = numStr.replace(/,/g, "");
  const numeric = Number(cleaned);
  if (!Number.isFinite(numeric)) return null;

  const decimals = cleaned.includes(".") ? cleaned.split(".")[1].length : 0;
  const hasCommas = /,/.test(numStr);
  return { prefix, numeric, suffix, decimals, hasCommas };
}

function format(value, decimals, hasCommas) {
  // Avoid -0 / -0.0 during animation
  const safe = Math.abs(value) < 1e-9 ? 0 : value;
  const fixed = safe.toFixed(decimals);
  if (!hasCommas) return fixed;
  const [whole, dec] = fixed.split(".");
  const withCommas = whole.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return dec ? `${withCommas}.${dec}` : withCommas;
}

function AnimatedCounter({ value, duration = 1600, style, className }) {
  const parsed = parseStat(value);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.4 });
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!parsed || !inView) return;
    let rafId;
    const start = performance.now();
    const tick = (now) => {
      const elapsed = now - start;
      const p = Math.min(Math.max(elapsed / duration, 0), 1);
      setProgress(p);
      if (p < 1) rafId = requestAnimationFrame(tick);
    };
    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, [inView, duration, parsed]);

  // Couldn't parse a number — show the raw value verbatim.
  if (!parsed) {
    return (
      <span ref={ref} style={style} className={className}>
        {value}
      </span>
    );
  }

  // Animation finished: guarantee the final text matches the original string
  // exactly — prevents any formatting drift (no leading "-0.0" artifacts etc).
  const finished = progress >= 1;
  if (finished) {
    return (
      <span ref={ref} style={style} className={className}>
        {value}
      </span>
    );
  }

  const eased = 1 - Math.pow(1 - progress, 3);
  const currentNum = parsed.numeric * eased;
  const currentText = format(currentNum, parsed.decimals, parsed.hasCommas);

  return (
    <span ref={ref} style={style} className={className}>
      {parsed.prefix}
      {currentText}
      {parsed.suffix}
    </span>
  );
}

export default AnimatedCounter;
