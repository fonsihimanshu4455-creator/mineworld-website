// useSiteList — read a JSON list slot (`json_value: { items: [...] }`)
// from the CMS. If the slot is empty, missing, or has zero VISIBLE items,
// returns the supplied fallback list so the public site still paints.
//
// Public consumers only ever see `visible !== false` items; admin-side
// uses the raw items via the editor.

import { useSiteContent } from "./useSiteContent";

export function useSiteList(slotKey, fallback = []) {
  const value = useSiteContent(slotKey, null);

  if (!value) return fallback;

  // Stored shape from RepeatingListEditor is { items: [...] }.
  // Tolerate raw arrays for forward-compat too.
  const rawItems = Array.isArray(value)
    ? value
    : Array.isArray(value.items)
    ? value.items
    : null;

  if (!rawItems) return fallback;

  const visible = rawItems.filter((item) => item && item.visible !== false);
  return visible.length > 0 ? visible : fallback;
}
