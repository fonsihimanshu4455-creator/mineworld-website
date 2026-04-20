# Firestore Security Rules

## After 30 days, test mode will expire. Paste these rules instead:

```js
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {

    // Content collection: public can READ, only authenticated users can WRITE
    match /content/{docId} {
      allow read: if true;
      allow write: if request.auth != null;
    }

    // Deny everything else by default
    match /{document=**} {
      allow read, write: if false;
    }
  }
}
```

## How to apply

1. Firebase Console → Firestore Database → **Rules** tab
2. Replace the default rules with the block above
3. Click **Publish**

## Why these rules

- **Public READ** on `/content/*` — site visitors can load the content overlays
- **Auth-only WRITE** — only signed-in admin users (from your Firebase Auth users list) can edit content
- **Everything else locked** — no accidental exposure of other collections
