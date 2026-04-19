import { useContext } from "react";
import { defaultContent } from "../data/defaultContent";
import { SiteContentCtx } from "./siteContentContext";

export function useSiteContent() {
  const ctx = useContext(SiteContentCtx);
  if (!ctx) {
    return {
      content: defaultContent,
      defaults: defaultContent,
      overrides: {},
      updateContent: () => {},
      replaceOverrides: () => {},
      resetContent: () => {},
    };
  }
  return ctx;
}
