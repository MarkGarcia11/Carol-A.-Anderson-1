# Carol A. Anderson, MS, LMFT: Website

A calm, hopeful, multi-page website for a Fresno marriage & family therapist.
Built with **React + Vite + Tailwind CSS v4 + Framer Motion + React Router**.

## Run locally

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # production build → dist/
npm run preview
```

## 1. Add Carol's photos

Drop these files into `public/images/` (exact names; see `public/images/README.txt`):

| File | Used for |
| --- | --- |
| `consulting-room-1.jpg` | Office: armchairs + loveseat by tall windows |
| `consulting-room-2.jpg` | Office: loveseat with cushions, plants |
| `consulting-room-3.jpg` | Office: cabinet with framed certificates (portrait) |
| `consulting-room-4.jpg` | Office: sofa by window + bookshelf |
| `carol-portrait.jpg` | Carol's portrait (replaces the marked placeholder) |

Until a file exists, a royalty-free stand-in shows automatically (see `src/data/site.ts → photos`).
Lifestyle images (couples, journaling, sprouts) are royalty-free stock; swap them in the same file.

## 2. Deploy: GitHub + Vercel

```bash
git init && git add . && git commit -m "Carol Anderson website"
git branch -M main
git remote add origin https://github.com/<you>/<repo>.git
git push -u origin main
```

Then on [vercel.com](https://vercel.com) → **Add New → Project → Import** the repo.
Vercel auto-detects Vite (`npm run build`, output `dist`), so just click **Deploy**.

### Optional environment variables (Vercel → Settings → Environment Variables)

| Variable | What it does |
| --- | --- |
| `VITE_FORM_ENDPOINT` | Form delivery URL (e.g. a free [Formspree](https://formspree.io) endpoint). **Set this so consultation requests reach Carol's email.** Without it, forms run in demo mode. |
| `VITE_ROUTER` | Set to `browser` for clean URLs (`/about`). Default is hash URLs (`/#/about`), which work everywhere. `vercel.json` already contains the needed rewrite. |
| `VITE_CALENDLY_URL` | Embeds a scheduler on the Contact page. |
| `VITE_CONTACT_EMAIL` | Shows a public email in the footer and Contact page. |

See `.env.example`. After changing variables, redeploy.

## Where to edit things

- **Facts, photos, services, FAQs, fees:** `src/data/site.ts`
- **Colors / fonts / motion tokens:** `src/index.css` (`@theme`)
- **Hero video:** `src/components/sections/HeroVideo.tsx` (Cloudinary `CLOUD` + `PUBLIC_ID`)
- **Logo + loader:** `src/components/Logo.tsx`, `src/components/Loader.tsx`
- **Reviews:** hidden by default; set `showReviews: true` in `site.ts` only after Carol approves reviews under professional ethics guidelines.

## To confirm with Carol before launch

- Headway steps, standard session length, EMDR wording (flagged `verify` in `site.ts`; visible in dev mode)
- Public email, office hours, social links (placeholders in footer/contact)
- Privacy Policy and Terms dates (and legal review)
- Her real portrait and office photos
- Her real process steps on the Home page (the 4-step approach is placeholder wording)
- Religion is intentionally not mentioned; add only if Carol requests it.

## Accessibility & performance notes

WCAG AA palette (small gold text uses the darker `gold-ink` token), skip link, visible focus,
48px+ tap targets, `prefers-reduced-motion` support, lazy-loaded images, a pause control for the hero video,
and the video is skipped when Data Saver is on.
