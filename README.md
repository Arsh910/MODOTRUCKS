# MODO Screen Truck site

React + Vite. The redesign of `../MODO TRUCK/modo-truck-site` (same copy, same booking rules, same Supabase schema).

```
npm install
npm run dev        # local
npm run build      # static output in dist/ — deploy to Cloudflare Pages / Vercel / Netlify
```

Booking: copy `.env.example` to `.env` and fill the Supabase URL + anon key, then run `supabase/schema.sql`
(go-live steps are unchanged — see `../MODO TRUCK/modo-truck-site/DEVELOPER.md`, sections 2–4).
Without keys the form still works and tells visitors to call/WhatsApp. Owner view: `/#admin`.

| File | What |
|---|---|
| `src/App.jsx` | All page sections, scroll + reveal animations |
| `src/truck3d.js` | The 3D truck (three.js, built in code). Ads on the screen: `ADS` at the top |
| `src/booking.jsx` | Booking form, calendar rules, owner view |
| `src/index.css` | All styles. Brand tokens at the top |
| `public/img/` | Photos, logos (`logo-modo-white.png` is the dark-background version) |
