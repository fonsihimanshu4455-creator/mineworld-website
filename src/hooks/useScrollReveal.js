import { useEffect, useRef } from "react";

export function useScrollReveal(options = {}) {
  const ref = useRef(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    if (typeof IntersectionObserver === "undefined") {
      element.classList.add("revealed");
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          element.classList.add("revealed");
          observer.unobserve(element);
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -50px 0px", ...options }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [options]);

  return ref;
}
