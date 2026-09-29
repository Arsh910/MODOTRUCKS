# MODO Screen Truck site

[![Netlify Status](https://netlify.com)](https://netlify.com)


React + Vite. No router or UI library: a tiny router in `src/hooks/usePath.js`, plain CSS.

```
npm install
npm run dev        # local
npm run build      # static output in dist/ (Cloudflare Pages / Netlify; public/_redirects sends every path to index.html)
```

## Where things live

```
src/
  main.jsx                 entry: mounts <App />, loads global styles
  app/
    App.jsx                layout: Nav, the current page, Footer
    routes.js              URL path -> page component + tab title  (add a page here)
  pages/                   one file per URL
    HomePage.jsx           /
    ScreenPage.jsx         /screen
    HowItWorksPage.jsx     /how-it-works
    PlansPage.jsx          /plans
    PlanDetailPage.jsx     /plans/whole, /plans/shared, /plans/event
    RoutesPage.jsx         /routes
    ContactPage.jsx        /contact
  components/              sections, grouped by the page that uses them
    layout/                Nav, Footer
    ui/                    shared pieces: Logo, PageHero
    home/                  landing hero animation (hero/), FactRows, WhyUs, QuoteBand
    screen/                ScreenHero (animated screen diagram), Specs, NumberCards
    how/                   HowSteps (white truck + 4 steps), AdOptions (#your-ad)
    plans/                 PlansIntro, Schedule, PlanCarousel, PlanDiagram, PlanCards
    explore/               NextLinks ("Plan your campaign" cards) + their drawings
  data/                    all page copy and lists (plans, FAQ, specs, areas...) — edit text here
  config/site.js           phone, email, address, nav links, Book Now / "Don't have an ad?" links
  hooks/                   usePath (router), useReveal (fade-in on scroll)
  services/                everything that talks to the backend
    supabase.js            the one Supabase client (null until .env has keys)
    bookings.js            booking API: read slots, create, update, admin auth
  features/booking/        booking form + owner panel + booking rules (built, not yet on a page)
  styles/global.css        site-wide styles and brand colours; section styles sit next to their component
```

Rules of thumb:
- **Text or a price changes** → `src/data/` or `src/config/site.js`, not the components.
- **New page** → add a file in `src/pages/` and one line in `src/app/routes.js`.
- **New backend call** → add a function in `src/services/`; components call that, never Supabase directly.

## Booking backend

Copy `.env.example` to `.env`, fill the Supabase URL + anon key, then run `supabase/schema.sql`
(go-live steps: `../MODO TRUCK/modo-truck-site/DEVELOPER.md`, sections 2–4).
`features/booking/BookingForm.jsx` and `AdminPanel.jsx` are ready to mount on a page (e.g. `/book`, `/admin`)
with `useBookings()` from the same folder.
