import { useEffect, useState } from "react";
import { contentStore } from "./contentStore";

function subscribe(onChange) {
  window.addEventListener("mw-content-change", onChange);
  window.addEventListener("storage", onChange);
  return () => {
    window.removeEventListener("mw-content-change", onChange);
    window.removeEventListener("storage", onChange);
  };
}

export function useSiteSettings(defaultConfig) {
  const compute = () => {
    const saved = contentStore.get("settings") || {};
    return {
      brand: { ...defaultConfig.brand, ...(saved.brand || {}) },
      contact: { ...defaultConfig.contact, ...(saved.contact || {}) },
      social: { ...defaultConfig.social, ...(saved.social || {}) },
      logo: {
        src: "",
        width: 40,
        scale: 1.7,
        position: "center",
        ...(saved.logo || {}),
      },
      integrations: { ...(defaultConfig.integrations || {}) },
    };
  };

  const [settings, setSettings] = useState(compute);

  useEffect(() => {
    return subscribe(() => setSettings(compute()));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return settings;
}

export function useCollection(key, defaults) {
  const compute = () => {
    const override = contentStore.get(key);
    const list = Array.isArray(override) ? override : defaults;
    return list.filter((item) => !item?.__hidden);
  };

  const [items, setItems] = useState(compute);

  useEffect(() => {
    return subscribe(() => setItems(compute()));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key]);

  return items;
}

export function getOverlaySnapshot(key, defaults) {
  const override = contentStore.get(key);
  const list = Array.isArray(override) ? override : defaults;
  return list.filter((item) => !item?.__hidden);
}
