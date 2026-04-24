import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined" && !gsap.core.globals().ScrollTrigger) {
  gsap.registerPlugin(ScrollTrigger);
}

// Animates a number from 0 to `target` when the element scrolls into view.
// Preserves the surrounding text template via `format` (e.g. "+{n} Leads").
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

    const prefersReduced =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReduced) {
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

// Utility: reveal a group of children with a stagger as they enter the viewport.
export function useRevealOnScroll({ stagger = 0.08, y = 24, duration = 0.7 } = {}) {
  const containerRef = useRef(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const prefersReduced =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReduced) return;

    const items = el.querySelectorAll("[data-gsap-reveal]");
    if (!items.length) return;

    const tween = gsap.fromTo(
      items,
      { opacity: 0, y },
      {
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
      }
    );

    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, [stagger, y, duration]);

  return containerRef;
}

export { gsap, ScrollTrigger };
