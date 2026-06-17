// useSiteToggle — read a boolean show/hide flag for any UI element.
// Backed by a normal text slot ("on" / "off") so it uses the existing
// CMS infrastructure with zero schema changes. Default is "show".
//
// Pattern: a component asks `useSiteToggle("footer.show_phone")` and
// returns `true` (render) or `false` (hide). The admin can flip this
// via the ToggleEditor in any *Editor page.

import { useSiteContent } from "./useSiteContent";

export function useSiteToggle(slotKey, defaultVisible = true) {
  const raw = useSiteContent(slotKey, defaultVisible ? "on" : "off");
  if (typeof raw !== "string") return defaultVisible;
  const normalized = raw.trim().toLowerCase();
  if (normalized === "off" || normalized === "false" || normalized === "hide" || normalized === "0") {
    return false;
  }
  return true;
}
