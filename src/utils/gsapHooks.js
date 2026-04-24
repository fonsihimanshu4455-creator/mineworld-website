import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined" && !gsap.core.globals().ScrollTrigger) {
  gsap.registerPlugin(ScrollTrigger);
}

function prefersReducedMotion() {
  return (
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}

// Animates a number from 0 to `target` when the element scrolls into view.
export function useCountUp({
  target,
  duration = 1.6,
  format = (n) => `${n}`,
  start = "top 85%",
  once = true,
}) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || !Number.isFinite(target)) return;

    if (prefersReducedMotion()) {
      el.textContent = format(target);
      return;
    }

    el.textContent = format(0);
    const obj = { value: 0 };

    const tween = gsap.to(obj, {
      value: target,
      duration,
      ease: "power2.out",
      scrollTrigger: {
        trigger: el,
        start,
        once,
      },
      onUpdate: () => {
        el.textContent = format(Math.round(obj.value));
      },
      onComplete: () => {
        el.textContent = format(target);
      },
    });

    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, [target, duration, format, start, once]);

  return ref;
}

// Reveal children with a stagger as they enter the viewport.
export function useRevealOnScroll({ stagger = 0.08, y = 24, duration = 0.7 } = {}) {
  const containerRef = useRef(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    if (prefersReducedMotion()) return;

    const items = el.querySelectorAll("[data-gsap-reveal]");
    if (!items.length) return;

    gsap.set(items, { opacity: 0, y });

    const tween = gsap.to(items, {
      opacity: 1,
      y: 0,
      duration,
      stagger,
      ease: "power2.out",
      scrollTrigger: {
        trigger: el,
        start: "top 85%",
        once: true,
      },
    });

    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, [stagger, y, duration]);

  return containerRef;
}

// Split a text element into words, fade+translate each on mount.
// Preserves spacing and line breaks, respects reduced motion.
export function useSplitTextReveal({
  delay = 0.15,
  duration = 0.9,
  stagger = 0.045,
  y = "1.1em",
} = {}) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (prefersReducedMotion()) return;

    const original = el.innerHTML;
    const text = el.textContent || "";
    const tokens = text.split(/(\s+|<br\s*\/?>)/);
    el.innerHTML = "";

    const wordWrappers = [];

    tokens.forEach((token) => {
      if (/^\s+$/.test(token)) {
        el.appendChild(document.createTextNode(token));
        return;
      }
      if (!token) return;
      const outer = document.createElement("span");
      outer.style.display = "inline-block";
      outer.style.overflow = "hidden";
      outer.style.verticalAlign = "top";
      outer.style.lineHeight = "inherit";

      const inner = document.createElement("span");
      inner.style.display = "inline-block";
      inner.style.willChange = "transform, opacity";
      inner.textContent = token;

      outer.appendChild(inner);
      el.appendChild(outer);
      wordWrappers.push(inner);
    });

    if (!wordWrappers.length) {
      el.innerHTML = original;
      return;
    }

    gsap.set(wordWrappers, { y, opacity: 0 });
    const tween = gsap.to(wordWrappers, {
      y: 0,
      opacity: 1,
      duration,
      stagger,
      delay,
      ease: "power3.out",
    });

    return () => {
      tween.kill();
      el.innerHTML = original;
    };
  }, [delay, duration, stagger, y]);

  return ref;
}

// Parallax: move element as user scrolls through its parent viewport position.
export function useParallax({ speed = 0.3, start = "top bottom", end = "bottom top" } = {}) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (prefersReducedMotion()) return;

    const tween = gsap.fromTo(
      el,
      { yPercent: -speed * 100 },
      {
        yPercent: speed * 100,
        ease: "none",
        scrollTrigger: {
          trigger: el,
          start,
          end,
          scrub: true,
        },
      }
    );

    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, [speed, start, end]);

  return ref;
}

// Stagger-animate children matching [data-anim] on MOUNT (not scroll).
// Preserves inner HTML/styling since it only touches transforms + opacity.
export function useMountStagger({
  delay = 0.1,
  duration = 0.9,
  stagger = 0.05,
  y = "1.1em",
} = {}) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (prefersReducedMotion()) return;

    const items = el.querySelectorAll("[data-anim]");
    if (!items.length) return;

    gsap.set(items, { y, opacity: 0 });
    const tween = gsap.to(items, {
      y: 0,
      opacity: 1,
      duration,
      stagger,
      delay,
      ease: "power3.out",
    });

    return () => tween.kill();
  }, [delay, duration, stagger, y]);

  return ref;
}

// Animate an element in once on mount (fade + y).
export function useFadeIn({ delay = 0, duration = 0.8, y = 16 } = {}) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (prefersReducedMotion()) return;

    gsap.set(el, { opacity: 0, y });
    const tween = gsap.to(el, {
      opacity: 1,
      y: 0,
      duration,
      delay,
      ease: "power2.out",
    });

    return () => tween.kill();
  }, [delay, duration, y]);

  return ref;
}

export { gsap, ScrollTrigger };
