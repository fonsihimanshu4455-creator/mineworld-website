import { useEffect, useState } from "react";
import { contentStore } from "./contentStore";

export function useContentOverlay(key, defaults) {
  const [value, setValue] = useState(() => {
    const override = contentStore.get(key);
    return override !== undefined ? override : defaults;
  });

  useEffect(() => {
    const update = () => {
      const override = contentStore.get(key);
      setValue(override !== undefined ? override : defaults);
    };
    window.addEventListener("mw-content-change", update);
    window.addEventListener("storage", update);
    return () => {
      window.removeEventListener("mw-content-change", update);
      window.removeEventListener("storage", update);
    };
  }, [key, defaults]);

  return value;
}
