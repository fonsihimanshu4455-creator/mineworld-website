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
  // We rotate through the source list instead of hard-failing on the
  // first error. The video element only goes into the `errored` state
  // (poster-only render) once every source has been exhausted.
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

  // When the active source changes, force the video element to reload
  // from the new src — without this, switching the React `key` is the
  // only reliable way to retrigger the loader.
  useEffect(() => {
    const v = videoRef.current;
    if (v && inView && currentSource) {
      try {
        v.load();
      } catch {
        // ignore — old browsers
      }
    }
  }, [activeIdx, inView, currentSource]);

  const handleSourceError = () => {
    if (typeof window !== "undefined" && import.meta.env.DEV) {
      // eslint-disable-next-line no-console
      console.warn(
        "[LazyVideo] source failed:",
        sourceList[activeIdx]?.src,
        `(falling through to source ${activeIdx + 2}/${sourceList.length})`
      );
    }
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
            // Hide a broken poster image so it doesn't show the alt text.
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
          // `key` per source forces React to mount a fresh <video>
          // element when we rotate sources — otherwise some browsers
          // hang on the failed one.
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
