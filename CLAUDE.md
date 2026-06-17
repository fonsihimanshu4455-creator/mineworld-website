# CLAUDE.md — Rules for editing this repo

> Critical context for any Claude (or human) session that touches the
> Mineworld website code. Read this **before** making any change. The
> rules exist because admin-edited content has gone "missing" after
> deploys, and that must never happen again.

---

## 1. The two-system reality

The site's content comes from THREE possible sources at runtime, in
priority order:

| Source | Where it lives | What writes it |
|---|---|---|
| Firestore `site_content` collection | Cloud DB | Modern CMS editors (`src/admin/cmsStore.js` + `src/hooks/useSiteContent.js`) |
| Firestore `content` collection | Cloud DB | Legacy admin (`src/admin/contentStore.js`) |
| Bundled defaults | `src/data/*.js` + component fallbacks | This repo, in code |

**Admin edits write to Firestore. Code only provides fallbacks.** If
admin has set a value, code defaults are ignored. If you rename a
slot key, admin's edit becomes orphaned and the site silently reverts
to defaults — looking exactly like "the deploy wiped my data".

---

## 2. Hard rules — never break

1. **NEVER rename an existing CMS slot key.** Once a key like
   `hero.video_card_caption` is in Firestore with admin content,
   renaming it in code orphans the data. Add new keys, never rename
   old ones. If a key MUST change name, write a one-time migration
   that copies the value to the new key first.

2. **NEVER delete a `useSiteContent` / `useSiteList` / `useSiteAsset`
   call** without first checking `cms-snapshot.json` to see if the
   slot has admin-edited content. If it does, the data has to be
   migrated or surfaced somewhere else.

3. **NEVER change the Firestore collection name** (`site_content` or
   `content`) without writing a migration. Different collections =
   different data buckets.

4. **NEVER hardcode a value that was previously read from CMS** —
   the admin edit is still in Firestore, the hardcode just hides it.

---

## 3. Workflow — before every code change

### Step 1 — Read the snapshot

```bash
cat cms-snapshot.json | jq '.slot_map'
```

(Or just read the file directly with the Read tool.)

`cms-snapshot.json` is committed in this repo and updated periodically.
It lists every slot key that has admin-edited content, with a short
summary of what's in it.

### Step 2 — Check what you're about to touch

For any component you're editing, grep for `useSiteContent`,
`useSiteList`, `useSiteAsset`, or `useCollection` calls. For each
slot key found, check the snapshot:

- **Key is in snapshot** → admin has edited this. Don't rename or
  remove the hook. Default changes are fine (admin's value overrides
  yours anyway).
- **Key is NOT in snapshot** → safe to change/rename, but flag it in
  the commit message so future readers know.

### Step 3 — Refresh the snapshot after non-trivial changes

After landing changes that touched CMS hooks:

```bash
npm run cms:audit
git add cms-snapshot.json
git commit -m "chore: refresh CMS snapshot after <change>"
```

---

## 4. For the human owner (recovery + maintenance)

### To run the snapshot yourself

```bash
npm run cms:audit
```

Requires `.env.local` with the Firebase config (same vars as the
website itself — see `.env.example`).

### To back up admin edits manually

Admin Dashboard has an **"Export JSON"** button (top of
`/admin` page). Click it before major edits — gives you a local JSON
file you can re-import via the "Import JSON" button if anything goes
sideways.

### If data appears to have "vanished" after a deploy

1. Run `npm run cms:audit` and check `cms-snapshot.json`
2. If the data IS in Firestore — slot key mismatch. Find which key it's
   under, and either:
   - Migrate it to the new key Firestore-side, OR
   - Add a backward-compat alias in code so the old key is still read
3. If the data is NOT in Firestore — check your Firebase project ID
   in `.env.local`. A deploy with the wrong project ID would read from
   a different (empty) database.

---

## 5. Branch hygiene

Multiple feature branches exist with different states of the CMS:

- `main` — the production reference. Treat as source of truth.
- `claude/add-admin-credentials-Ojav9` — uses LEGACY `content`
  collection. Older system.
- `pr-portfolio-detail-visual-editor` (and related PR branches) —
  uses MODERN `site_content` collection.

**Before merging any PR**, confirm:
- It targets the same collection as `main`
- It doesn't rename slot keys present in `cms-snapshot.json`
- The snapshot has been refreshed in the PR

---

## 6. Pattern: per-element show/hide toggles

Admin can hide individual UI elements without deleting them. Implementation:

- **Hook:** `useSiteToggle(slotKey, defaultVisible=true)` from
  `src/hooks/useSiteToggle.js`. Returns `true`/`false`. Backed by a
  text slot containing `"on"` or `"off"`.
- **Admin UI:** `<ToggleEditor slotKey label hint />` from
  `src/admin/components/ToggleEditor.jsx`. Renders a switch and saves
  to the slot.
- **Slot naming convention:** `<section>.show_<element>`
  e.g. `footer.show_phone`, `hero.show_eyebrow`, `services.show_section`.

### To add a new toggle:

1. Identify the JSX block in the public component.
2. Add a `useSiteToggle("<section>.show_<element>", true)` call.
3. Wrap the JSX block in `{showXyz && (<JSX/>)}`.
4. In the matching `*Editor.jsx` admin page, add a `<ToggleEditor>`
   with the same slot key, in a "What to show / hide" section at the
   bottom of the page.
5. **Default is always ON.** Off only when admin flips it. Visual
   parity preserved when no admin edit exists.

Already wired (as of this writing): Footer — CTA card, brand
description, signature, address/email/phone/Instagram/WhatsApp rows,
nav column, services column, social column, newsletter, copyright.

Extending to other pages/sections is incremental — just add the hook
+ wrapper + admin toggle. Don't bulk-add to every element in one PR;
it's high-risk and the user prefers section-by-section verification.

---

## 7. Where the rules came from

Real incidents on this repo where admin edits "vanished":

- A refactor renamed `hero.cta_label` to `hero.cta_primary_label`.
  Old admin data orphaned. (Migration: read both, prefer new.)
- A branch merge swapped from `content` to `site_content` collection.
  All legacy admin edits invisible. (Recovery: dual-read.)
- A component refactor replaced `useSiteContent` with a hardcoded
  string. Admin's saved value silently bypassed.

The snapshot + this file exist to make these mistakes loud, not
silent.
