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
  // Rotate through the source list instead of hard-failing on the
  // first error. The video only goes into the `errored` state (poster
  // only) once every source has been exhausted.
  const [activeIdx, setActiveIdx] = useState(0);

  const sourceList =
    Array.isArray(sources) && sources.length > 0
      ? sources.filter((s) => s && s.src)
      : src
      ? [{ src, type: "video/mp4" }]
      : [];

  const errored = sourceList.length === 0 || activeIdx >= sourceList.length;
  const currentSource = errored ? null : sourceList[activeIdx];

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

  useEffect(() => {
    const v = videoRef.current;
    if (v && inView && currentSource) {
      try {
        v.load();
        // Some browsers (Safari/iOS especially) won't autoplay on
        // source change until you call .play() explicitly — and the
        // call must be in response to the load. Catch the rejected
        // promise so an autoplay-blocked browser doesn't crash.
        const p = v.play();
        if (p && typeof p.catch === "function") {
          p.catch(() => {});
        }
      } catch {
        // ignore — old browsers
      }
    }
  }, [activeIdx, inView, currentSource]);

  const handleSourceError = () => {
    setActiveIdx((i) => i + 1);
  };

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
          onError={(e) => {
            e.currentTarget.style.display = "none";
          }}
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            opacity: loaded && !errored ? 0 : 1,
            transition: "opacity 0.5s ease",
            ...videoStyle,
          }}
        />
      )}

      {inView && currentSource && (
        <video
          ref={videoRef}
          key={`${currentSource.src}-${activeIdx}`}
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
            handleSourceError();
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
          <source
            src={currentSource.src}
            type={currentSource.type || "video/mp4"}
            {...(currentSource.media ? { media: currentSource.media } : {})}
          />
        </video>
      )}

      {children}
    </div>
  );
}

export default LazyVideo;
