import { useEffect, useRef, useState } from "react";

function LazyImage({
  src,
  alt = "",
  width,
  height,
  style = {},
  className,
  rootMargin = "200px",
  objectFit = "cover",
  ...rest
}) {
  const wrapperRef = useRef(null);
  const [inView, setInView] = useState(
    () => typeof IntersectionObserver === "undefined"
  );
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const el = wrapperRef.current;
    if (!el || inView) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setInView(true);
            observer.disconnect();
          }
        });
      },
      { rootMargin, threshold: 0.01 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [inView, rootMargin]);

  return (
    <div
      ref={wrapperRef}
      className={className}
      style={{
        position: "relative",
        width: width || "100%",
        height: height || "100%",
        overflow: "hidden",
        background:
          "linear-gradient(135deg, rgba(188,153,102,0.10), rgba(88,110,180,0.08))",
        ...style,
      }}
    >
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(135deg, rgba(188,153,102,0.15), rgba(20,28,46,0.5))",
          opacity: loaded ? 0 : 1,
          transition: "opacity 0.45s ease",
          filter: "blur(18px)",
        }}
      />
      {inView && src ? (
        <img
          src={src}
          alt={alt}
          width={width}
          height={height}
          loading="lazy"
          decoding="async"
          onLoad={() => setLoaded(true)}
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit,
            opacity: loaded ? 1 : 0,
            transition: "opacity 0.45s ease",
          }}
          {...rest}
        />
      ) : null}
    </div>
  );
}

export default LazyImage;
