const GA_ID = import.meta.env.VITE_GA4_ID || "";
const META_PIXEL_ID = import.meta.env.VITE_META_PIXEL_ID || "";

let initialized = false;

function loadScript(src, attrs = {}) {
  const s = document.createElement("script");
  s.src = src;
  s.async = true;
  Object.entries(attrs).forEach(([k, v]) => s.setAttribute(k, v));
  document.head.appendChild(s);
  return s;
}

export function initAnalytics() {
  if (initialized) return;
  initialized = true;

  if (GA_ID) {
    loadScript(`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`);
    window.dataLayer = window.dataLayer || [];
    window.gtag = function gtag() {
      window.dataLayer.push(arguments);
    };
    window.gtag("js", new Date());
    window.gtag("config", GA_ID, { send_page_view: false });
  }

  if (META_PIXEL_ID) {
    (function (f, b, e, v, n, t, s) {
      if (f.fbq) return;
      n = f.fbq = function () {
        n.callMethod
          ? n.callMethod.apply(n, arguments)
          : n.queue.push(arguments);
      };
      if (!f._fbq) f._fbq = n;
      n.push = n;
      n.loaded = !0;
      n.version = "2.0";
      n.queue = [];
      t = b.createElement(e);
      t.async = !0;
      t.src = v;
      s = b.getElementsByTagName(e)[0];
      s.parentNode.insertBefore(t, s);
    })(
      window,
      document,
      "script",
      "https://connect.facebook.net/en_US/fbevents.js"
    );
    window.fbq("init", META_PIXEL_ID);
  }
}

export function trackPageView(path, title) {
  if (GA_ID && typeof window.gtag === "function") {
    window.gtag("event", "page_view", {
      page_path: path,
      page_title: title || document.title,
      page_location: window.location.href,
    });
  }
  if (META_PIXEL_ID && typeof window.fbq === "function") {
    window.fbq("track", "PageView");
  }
}

export function trackEvent(name, params = {}) {
  if (GA_ID && typeof window.gtag === "function") {
    window.gtag("event", name, params);
  }
  if (META_PIXEL_ID && typeof window.fbq === "function") {
    const metaMap = {
      contact_open: "Lead",
      whatsapp_click: "Contact",
      cta_click: "InitiateCheckout",
      case_study_view: "ViewContent",
      form_submit: "Lead",
    };
    const metaEvent = metaMap[name];
    if (metaEvent) {
      window.fbq("track", metaEvent, params);
    } else {
      window.fbq("trackCustom", name, params);
    }
  }
}

export const analyticsEnabled = Boolean(GA_ID || META_PIXEL_ID);
