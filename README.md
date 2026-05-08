# mineworld-website

Mineworld Production official website

## Local development

```bash
npm install
npm run dev
```

## Environment variables

Set these on Vercel (Project Settings → Environment Variables):

| Variable | Required for | What it does |
|---|---|---|
| `ANTHROPIC_API_KEY` | AI chat widget | Lets `/api/chat` call Claude. Without it, the chat widget falls back to WhatsApp. Get one at [console.anthropic.com](https://console.anthropic.com) |
| `VITE_FIREBASE_*` | Admin auth | Firebase project config for admin login |
| `VITE_ADMIN_PASSWORD` | Legacy admin (no Firebase) | Single password fallback when Firebase is not configured |
| `VITE_SHEET_WEBHOOK_URL` | Form submissions | Google Apps Script webhook that receives contact + newsletter submissions |

## Admin panel

Visit `/admin` to manage content. Toggle individual home-page sections, reorder them, edit copy, swap the logo, and toggle navbar links — all without touching code. See `Settings → Live Preview` for a side-by-side view while editing.

## Chat widget

The floating chat bubble (bottom-right) is powered by Claude Haiku 4.5 via `/api/chat`. Configure it in `Admin → Settings → Chat Widget`:

- **AI mode ON** → instant AI replies. Requires `ANTHROPIC_API_KEY`.
- **AI mode OFF** → quick replies jump straight to WhatsApp.

If the API call fails, the widget automatically falls back to WhatsApp quick replies.
