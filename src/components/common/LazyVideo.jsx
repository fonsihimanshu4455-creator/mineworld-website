import { useEffect, useRef, useState } from "react";

function LazyVideo({
  src,
  sources,
  poster,
  ariaLabel,
  style = {},
  videoStyle = {},
  rootMargin = "240px",
  autoPlay = true,
  loop = true,
  muted = true,
  playsInline = true,
  onError,
  children,
}) {
  const wrapperRef = useRef(null);
  const videoRef = useRef(null);
  const [inView, setInView] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [errored, setErrored] = useState(false);

  const sourceList =
    Array.isArray(sources) && sources.length > 0
      ? sources
      : src
      ? [{ src, type: "video/mp4" }]
      : [];

  useEffect(() => {
    const el = wrapperRef.current;
    if (!el || inView) return;

    if (typeof IntersectionObserver === "undefined") {
      setInView(true);
      return;
    }

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
      style={{
        position: "relative",
        width: "100%",
        height: "100%",
        ...style,
      }}
    >
      {poster && (
        <img
          src={poster}
          alt={ariaLabel || ""}
          loading="lazy"
          aria-hidden={inView && loaded ? "true" : "false"}
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            opacity: loaded ? 0 : 1,
            transition: "opacity 0.5s ease",
            ...videoStyle,
          }}
        />
      )}

      {inView && !errored && sourceList.length > 0 && (
        <video
          ref={videoRef}
          autoPlay={autoPlay}
          loop={loop}
          muted={muted}
          playsInline={playsInline}
          preload="metadata"
          poster={poster}
          aria-label={ariaLabel}
          onLoadedData={() => setLoaded(true)}
          onCanPlay={() => setLoaded(true)}
          onError={() => {
            setErrored(true);
            if (typeof onError === "function") onError();
          }}
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            opacity: loaded ? 1 : 0,
            transition: "opacity 0.6s ease",
            ...videoStyle,
          }}
        >
          {sourceList.map((s, i) => (
            <source
              key={`${s.src}-${i}`}
              src={s.src}
              type={s.type || "video/mp4"}
              {...(s.media ? { media: s.media } : {})}
            />
          ))}
        </video>
      )}

      {children}
    </div>
  );
}

export default LazyVideo;
