import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";

function parseStat(value) {
  const match = String(value).match(/^([^\d]*)(-?[\d,.]+)(.*)$/);
  if (!match) return null;

  const prefix = match[1] || "";
  const raw = match[2].replace(/,/g, "");
  const suffix = match[3] || "";
  const numeric = Number(raw);

  if (Number.isNaN(numeric)) return null;

  const decimals = raw.includes(".") ? raw.split(".")[1].length : 0;
  const hasThousandsComma = /,/.test(match[2]);

  return { prefix, numeric, suffix, decimals, hasThousandsComma };
}

function format(value, decimals, hasThousandsComma) {
  const fixed = value.toFixed(decimals);
  if (!hasThousandsComma) return fixed;

  const [whole, dec] = fixed.split(".");
  const withCommas = whole.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return dec ? `${withCommas}.${dec}` : withCommas;
}

function AnimatedCounter({ value, duration = 1600, style, className }) {
  const parsed = parseStat(value);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.4 });
  const [display, setDisplay] = useState(parsed ? format(0, parsed.decimals, parsed.hasThousandsComma) : value);

  useEffect(() => {
    if (!parsed || !inView) return;

    let rafId;
    const start = performance.now();
    const { numeric, decimals, hasThousandsComma } = parsed;

    const tick = (now) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = numeric * eased;
      setDisplay(format(current, decimals, hasThousandsComma));
      if (progress < 1) rafId = requestAnimationFrame(tick);
    };

    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, [inView, duration, parsed]);

  if (!parsed) {
    return (
      <span ref={ref} style={style} className={className}>
        {value}
      </span>
    );
  }

  return (
    <span ref={ref} style={style} className={className}>
      {parsed.prefix}
      {display}
      {parsed.suffix}
    </span>
  );
}

export default AnimatedCounter;
