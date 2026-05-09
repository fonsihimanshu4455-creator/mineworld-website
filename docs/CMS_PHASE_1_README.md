# CMS — Phase 1 Foundation

Status: **Phase 1 / 4** — foundation only. Upload UI, full slot wiring,
and bulk content editing arrive in Phases 2 / 3 / 4.

## What Phase 1 ships

- **Cloudinary integration** — unsigned uploads from the browser via the
  `mineworld_assets` upload preset; signed deletes via a Vercel
  serverless function (`/api/cloudinary-delete`) using
  `CLOUDINARY_API_SECRET`.
- **Two new Firestore collections** — `assets` and `site_content`.
  The legacy `content` collection (settings / portfolio / team / etc.)
  is **untouched**.
- **`useSiteContent` hook** — reads a single slot from Firestore in
  real-time with a fallback. The site renders identically when the DB
  is empty.
- **Hero is the first consumer** — eyebrow, headline (rich JSX
  fallback), subhead, headline/subhead colour, CTA labels, and the
  background video are all DB-overrideable.
- **Migration UI** at `/admin/migrate` — admins-only (gated by the
  existing `useAdminAuth`). Seeds slot keys and uploads bundled static
  assets to Cloudinary.

## Configuration

Add to `.env` (do not commit — `.env` is gitignored):

```env
# Frontend (safe to expose):
VITE_CLOUDINARY_CLOUD_NAME=your_cloud
VITE_CLOUDINARY_API_KEY=your_key
VITE_CLOUDINARY_UPLOAD_PRESET=mineworld_assets

# Backend only (NEVER prefix with VITE_):
CLOUDINARY_CLOUD_NAME=your_cloud
CLOUDINARY_API_KEY=your_key
CLOUDINARY_API_SECRET=your_secret
```

In Cloudinary's dashboard, create the upload preset:

- **Name:** `mineworld_assets`
- **Signing mode:** Unsigned
- **Use filename:** off (Cloudinary should generate the public_id)
- **Overwrite:** on (so re-running the migration is idempotent)
- **Folder:** leave blank (the migration script supplies one per asset)

Then in Vercel (or wherever you deploy), set the same six env vars at
the **project** level. The three non-`VITE_` vars are required for
`/api/cloudinary-delete` to work.

## Running the migration

1. Sign in to `/admin` with your Firebase admin account.
2. Navigate to `/admin/migrate` (also linked in the sidebar as
   "CMS · Migrate (Phase 1)").
3. Click **Run seed** — populates `site_content` with one document per
   slot in `SLOT_DEFINITIONS` (`src/lib/cms-schema.js`). Idempotent.
4. Click **Run all** (or per-asset **Upload**) — uploads
   `src/assets/hero-video.mp4` to Cloudinary and points `hero.video` at
   the resulting URL.

After the migration runs, the homepage will lazily switch from the
bundled video to the Cloudinary URL. The bundled file stays in the
repo for now (the fallback path in `useSiteContent` keeps the site
working if Firestore is unreachable). It can be removed in Phase 3
once every Hero consumer is happy.

## What's coming in Phase 2

- Upload UI with drag-drop + URL paste, per-slot previews, and the
  resolution / format guidance from `src/lib/asset-specs.js`.
- A "delete asset" action backed by `/api/cloudinary-delete`.
- Slot-level editors for text, color, and JSON values.

## File map

| Path | Purpose |
| ---- | ------- |
| `src/lib/cloudinary.js` | Browser upload helpers (file + URL) |
| `src/lib/cms-schema.js` | Collection contracts + `SLOT_DEFINITIONS` |
| `src/lib/asset-specs.js` | Per-slot upload guidance (Phase 2 input) |
| `src/hooks/useSiteContent.js` | Single-slot read hook with cache + fallback |
| `src/admin/cmsStore.js` | Firestore writes for `assets` + `site_content` |
| `src/admin/pages/MigrateAssets.jsx` | One-time migration UI |
| `api/cloudinary-delete.js` | Serverless deletion endpoint |
| `src/components/home/Hero.jsx` | First DB-driven consumer |

## Notes / decisions

- **Doc id encoding** — Firestore doc ids cannot contain `/`. We encode
  Cloudinary public_ids by replacing `/` with `__` (see
  `encodeAssetDocId`). The original `cloudinary_id` field on each doc
  preserves the real value for round-tripping.
- **Denormalised `cloudinary_url`** — `site_content` docs store the
  Cloudinary URL inline alongside `asset_id` so a slot read is a single
  Firestore query. Whenever the asset is changed, both fields must be
  updated together (the `setSiteContent` helper handles this).
- **Auth reuse** — no new auth. `/admin/migrate` is wrapped by the
  existing `AdminApp` gate that already requires Firebase Auth.
- **Migration approach** — browser-based instead of Node so we don't
  need a service-account JSON or `firebase-admin`. The page can be left
  in place after migration (admin-only, harmless) or removed in a later
  PR.
