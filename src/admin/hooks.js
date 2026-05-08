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
      stores: {
        appStore: "",
        playStore: "",
        ...(saved.stores || {}),
      },
      integrations: { ...(defaultConfig.integrations || {}) },
      sectionVisibility: {
        ...(defaultConfig.sectionVisibility || {}),
        ...(saved.sectionVisibility || {}),
      },
      sectionOrder: Array.isArray(saved.sectionOrder)
        ? saved.sectionOrder
        : defaultConfig.sectionOrder || [],
      navbar: {
        ...(defaultConfig.navbar || {}),
        ...(saved.navbar || {}),
      },
      seo: {
        ...(defaultConfig.seo || {}),
        ...(saved.seo || {}),
      },
      chat: {
        ...(defaultConfig.chat || {}),
        ...(saved.chat || {}),
      },
      newsletter: {
        ...(defaultConfig.newsletter || {}),
        ...(saved.newsletter || {}),
      },
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

export function useSectionVisible(key, defaultVisible = true) {
  const compute = () => {
    const saved = contentStore.get("settings") || {};
    const sv = saved.sectionVisibility || {};
    if (typeof sv[key] === "boolean") return sv[key];
    return defaultVisible;
  };
  const [visible, setVisible] = useState(compute);
  useEffect(() => {
    return subscribe(() => setVisible(compute()));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key]);
  return visible;
}

export function useSectionOrder(defaultOrder) {
  const compute = () => {
    const saved = contentStore.get("settings") || {};
    if (Array.isArray(saved.sectionOrder) && saved.sectionOrder.length) {
      const valid = saved.sectionOrder.filter((k) => defaultOrder.includes(k));
      const missing = defaultOrder.filter((k) => !valid.includes(k));
      return [...valid, ...missing];
    }
    return defaultOrder;
  };
  const [order, setOrder] = useState(compute);
  useEffect(() => {
    return subscribe(() => setOrder(compute()));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return order;
}
