# MedChain frontend

```
npm install
cp .env.example .env     # VITE_USE_MOCK=true by default
npm run dev
```

**Mock vs real:** set `VITE_USE_MOCK=false` (and `VITE_API_URL`) to use `src/api/real/*`. Both folders export the same functions, chosen in `src/api/index.js`.

## Design

A light hospital identity: ward-white surfaces on chart-paper grid, scrub-navy ink, wayfinding blue, and clinical flag colours.

- **Type:** Bricolage Grotesque for headings, Atkinson Hyperlegible Next for everything else (built for legibility; tabular numerals for lab values).
- **Colour tokens** (`tailwind.config.js`): `signal` blue = primary, `mint` = in range / verified, `coral` = high, `honey` = low / needs review, `plum` = pharmacy.
- **Signature pieces:** patient shown as an ID wristband (barcode, consent countdown ring); range gauges whose pin travels into place; a heartbeat line in the app bar; the "Quick read" summary panel.

## Motion

- **Landing (`components/Flythrough.jsx`):** a scroll-driven camera. Scenes sit along the Z axis; scrolling dollies through them with eased inertia, a slow weave, and pointer parallax. Tune `GAP` (distance between scenes) and the `0.07` easing constant. Scene content lives in `content/story.js`.
- **App:** pages glide in (`animate-dolly`), flagged rows stagger in, gauge pins travel, the timeline reveals as you scroll, the integrity badge draws its tick (or shakes on a hash mismatch), and the upload journey pulses on the active step.
- **Reduced motion:** the landing falls back to plain sections and all animations are effectively disabled.

## Demo triggers (mock mode)

- Login: any email and password; password `wrong` shows the error state
- Patient search: any name + 12 digits; a name with `nobody` = not found, `fail` = server error
- Consent code: `123456`
- Tamper demo: the 2022 Thyroid profile (`r_31`) shows the red hash-mismatch badge
- Upload: a file name containing `blurry` ends in manual review, `error` shows a failure

## Contract notes for the backend lead

Assumed endpoints: `POST /consent/request`, `POST /consent/verify`, `GET /reports/:id/status`, `GET /patients/:id/prescriptions?open=true`. The consent token is sent as `X-Consent-Token`. The upload stage order is the `STAGE_ORDER` list in `components/UploadStatus.jsx`.

## Deploying to Vercel

- Root Directory: the folder that contains `package.json` and `index.html` (this folder).
- Framework preset: Vite. Build command `npm run build`. Output directory `dist`.
- Environment variable (the `.env` file is not committed): `VITE_USE_MOCK=true` for the demo build. For the real backend set `VITE_USE_MOCK=false` and `VITE_API_URL`.
- `vercel.json` rewrites every path to `index.html` so `/login`, `/doctor` etc. work on refresh.
