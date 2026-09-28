import How from './how.jsx'
import { PageHero } from './plans.jsx'
import { PlansIntro, PlanShowcase } from './PlanShowcase.jsx'
import { ScreenHero, Specs, NumberCards } from './ScreenHero.jsx'
import { AREAS } from './booking.jsx'

/* ---------- The Screen ---------- */

const SPECS = [
  ['8 × 6 ft side', 'The long face, seen by everyone alongside the truck.', 'M3 7h18v10H3ZM7 7v3M11 7v4M15 7v3M19 7v4'],
  ['6 × 6 ft back', 'Faces the traffic stuck behind the truck at every signal.', 'M5 5h14v14H5ZM5 12h14M12 5v14'],
  ['No gap at the corner', 'One screen, so 3D ads look like they jump off the truck.', 'M4 20V8l8-4 8 4v12M12 4v16M4 8l8 4 8-4'],
  ['Bright day and night', 'High-brightness LED, readable at noon, glowing after dark.', 'M12 3v2M12 19v2M3 12h2M19 12h2M5.6 5.6 7 7M17 17l1.4 1.4M5.6 18.4 7 17M17 7l1.4-1.4M12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8Z'],
]
const STATS = [
  ['14 ft', 'Of seamless LED screen', 'Side and rear working as one continuous surface.', 'M3 7h18v10H3ZM7 7v3M11 7v4M15 7v3M19 7v4'],
  ['2', 'Shifts every day', 'Morning 8 AM – 1 PM and evening 5 PM – 10 PM.', 'M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18Zm0 4v5l3.5 2'],
  ['6', 'Brands per shared loop', 'Each ad plays 30–60 seconds, on repeat all shift.', 'M4 12a8 8 0 0 1 14-5.3M20 12a8 8 0 0 1-14 5.3M18 3v4h-4M6 21v-4h4'],
  ['48 h', 'Ad lock before every run', 'Approved ads stay the same for the whole booking.', 'M7 11V8a5 5 0 0 1 10 0v3M5 11h14v10H5Z'],
]

export function ScreenPage() {
  return (
    <>
      <ScreenHero />
      <Specs items={SPECS} />
      <NumberCards items={STATS} />
      <NextLinks skip="/screen" />
    </>
  )
}

/* ---------- How it works ---------- */

const CREATIVE = [
  ['Send us your ad', 'Already have a video or design? We share the specs for the L-shaped screen and check it on the truck before your booking. No production cost.'],
  ['MODO makes it', 'Our in-house team designs it: motion graphics, 3D that pops out, or a video shoot. Quoted separately from the booking.'],
  ['Locked before the run', 'You approve the final ad at least 48 hours before. That version runs for the whole booking.'],
]

export function HowPage() {
  return (
    <>
      <PageHero img="/img/bg-avenue.jpg" label="How It Works" title="From request to the road in four steps." lead="Most requests are confirmed the same day. You get a GPS log, photos and video after every run." />
      <How />
      <section className="brown value">
        <div className="wrap">
          <h2 data-reveal>Your ad: bring it, or we make it</h2>
          <div className="value-grid">
            <div className="value-img" data-reveal><img src="/img/camera-rig.jpg" alt="A cinema camera ready for a shoot" loading="lazy" /></div>
            <ul>{CREATIVE.map(([h, p], i) => <li key={h} data-reveal style={{ '--d': i }}><h3>{h}</h3><p>{p}</p></li>)}</ul>
          </div>
        </div>
      </section>
      <NextLinks skip="/how-it-works" />
    </>
  )
}

/* ---------- Plans overview ---------- */

// How the truck's day works. Shown before the plan cards, since every plan runs on this schedule.
const SHIFTS = [
  ['8 AM – 1 PM', 'Morning shift', 'Office rush and markets opening, in bright daylight.'],
  ['5 PM – 10 PM', 'Evening shift', 'Home time, then markets. After dark the screen is the brightest thing on the road.'],
  ['1 PM – 5 PM', 'Off the road', 'The quiet, hottest hours. The truck refuels and moves to the evening route.'],
  ['Mondays', 'Closed on Mondays', 'The quietest day for Tricity shops and restaurants. The truck runs Tuesday to Sunday.'],
]

function Shifts() {
  return (
    <section className="brown shifts">
      <div className="wrap">
        <div className="shifts-head">
          <h2 data-reveal>Two shifts a day, Tuesday to Sunday</h2>
          <p data-reveal>Every plan runs on this schedule. Pick the morning rush, the evening glow, or both, and we plan the route around those hours.</p>
        </div>
        <div className="shifts-body">
          {/* placeholder drawing: swap for a cut-out photo of the truck from the back corner (transparent PNG) */}
          <div className="shifts-pic" data-reveal><img src="/img/truck-rear.svg" alt="The MODO truck from the back corner, its back and side screens showing one ad" loading="lazy" /></div>
          <div className="shifts-side">
            <ul className="shifts-list">
              {SHIFTS.map(([time, t, d], i) => (
                <li key={t} data-reveal style={{ '--d': i }}>
                  <span className="shifts-tag">{time}</span>
                  <h3>{t}</h3>
                  <p>{d}</p>
                </li>
              ))}
            </ul>
            <a href="#plans" className="shifts-link" data-reveal>See the plans <i aria-hidden="true">↓</i></a>
          </div>
        </div>
      </div>
    </section>
  )
}

export function PlansPage() {
  return (
    <>
      <PlansIntro />
      <Shifts />
      <PlanShowcase />
      <NextLinks skip="/plans" />
    </>
  )
}

/* ---------- Routes ---------- */

const ROUTE_NOTES = [['Whole screen', 'You pick the sectors, markets and roads. We plan the timing so the truck reaches them when they are busiest.'], ['Share the screen', 'A set route through the busiest parts of the Tricity, since six brands share the truck.'], ['Outside the Tricity', 'Kharar, Rajpura, Ludhiana, Shimla and further. Travel is quoted separately.']]

export function RoutesPage() {
  return (
    <>
      <PageHero img="/img/bg-sukhna.jpg" label="Routes" title="Seen across every sector of the Tricity." lead="Chandigarh, Mohali, Zirakpur and Panchkula. Tell us the areas that matter and we plan the route with you." />
      <section className="warm page-sec">
        <div className="wrap">
          <div className="two-col first">
            <h2 data-reveal>Popular areas</h2>
            <p data-reveal>These are the spots brands ask for most. Anywhere else in the Tricity works too.</p>
          </div>
          <div className="map" data-reveal><img src="/img/tricity-map.jpg" alt="Illustrated map of the Tricity marking Sector 17, Elante, Sukhna Lake, Phase 3B2, Airport Road, VIP Road and Sector 5" loading="lazy" /></div>
          <div className="cities">
            {Object.entries(AREAS).map(([c, l], i) => <div key={c} className="city" data-reveal style={{ '--d': i }}><h3>{c}</h3><ul>{l.map(a => <li key={a}>{a}</li>)}</ul></div>)}
          </div>
        </div>
      </section>
      <section className="brown value">
        <div className="wrap">
          <h2 data-reveal>How the route is planned</h2>
          <ul className="route-notes">{ROUTE_NOTES.map(([h, p], i) => <li key={h} data-reveal style={{ '--d': i }}><h3>{h}</h3><p>{p}</p></li>)}</ul>
        </div>
      </section>
      <NextLinks skip="/routes" />
    </>
  )
}

/* ---------- Contact ---------- */

const FAQ = [
  ['How much does it cost?', 'It depends on the plan, the shift, how many days and where you want to go. Call or WhatsApp us and we send your quote the same day.'],
  ['I don’t have an ad. Can you make one?', 'Yes. Design, motion graphics, 3D and video shoots are all done in house, quoted separately from the booking.'],
  ['Can I change my ad once the truck is on the road?', 'No. You approve the final ad at least 48 hours before your booking starts, and that version runs for the whole booking.'],
  ['How do I know the truck actually ran my ad?', 'After every booking you get the GPS log of the route, plus photos and video of your ad on the road.'],
  ['Can the truck go outside the Tricity?', 'Yes. Travel is quoted separately; tell us the destination when you book.'],
]
const CONTACTS = [['Call or WhatsApp', '+91 90560 05271', 'tel:+919056005271'], ['Email', 'modovisuals@gmail.com', 'mailto:modovisuals@gmail.com'], ['Canada', '+1 (647) 513-4802', 'tel:+16475134802'], ['Office', '3rd Floor, D-231, Phase 8B, Sector 91, Mohali', null]]

export function ContactPage() {
  return (
    <>
      <PageHero img="/img/bg-expressway.jpg" label="Contact" title="Talk to the MODO team." lead="Tell us your dates and the areas you want. We reply on WhatsApp and email the same day." />
      <section className="warm page-sec">
        <div className="wrap contact-grid">
          {CONTACTS.map(([k, v, href], i) => {
            const Tag = href ? 'a' : 'div'
            return <Tag key={k} href={href || undefined} className="contact-card" data-reveal style={{ '--d': i }}><span>{k}</span><b>{v}</b></Tag>
          })}
        </div>
      </section>
      <section className="brown plan-details">
        <div className="wrap">
          <h2 data-reveal>Questions</h2>
          <div className="plan-faq">{FAQ.map(([q, a]) => <details key={q} data-reveal><summary>{q}</summary><p>{a}</p></details>)}</div>
        </div>
      </section>
    </>
  )
}

/* ---------- links to the other pages, at the bottom of each ---------- */

export const PAGES = [
  ['/screen', 'The Screen', 'An 8 × 6 ft side and 6 × 6 ft back, working as one 3D canvas.', '/img/hero-night.jpg'],
  ['/how-it-works', 'How It Works', 'Four steps from request to the road, and how your ad gets made.', '/img/bg-avenue.jpg'],
  ['/plans', 'Plans', 'Whole screen, shared with other brands, or parked at your event.', '/img/bg-interchange.jpg'],
  ['/routes', 'Routes', 'Chandigarh, Mohali, Zirakpur, Panchkula and further by request.', '/img/bg-sukhna.jpg'],
]

const CONTACT_CARD = ['/contact', 'Contact', 'Tell us your dates and areas. We reply on WhatsApp and email the same day.', '/img/tricity-map.jpg']

// Bento grid of the other pages: photo cards with the title over a dark fade.
// 5 cards: two wide on top, then one wide and two small. 4 cards: two rows of two.
export function NextLinks({ skip, title = 'Keep exploring' }) {
  const items = [...PAGES, CONTACT_CARD].filter(([h]) => h !== skip)
  return (
    <section className="warm explore">
      <div className="wrap">
        <div className="explore-head">
          <h2 data-reveal>{title}</h2>
          <a className="dark-btn" href="/contact" data-reveal>Book Now</a>
        </div>
        <div className={`explore-grid n${items.length}`}>
          {items.map(([h, t, d, img], i) => (
            <a key={h} href={h} className="explore-card" data-reveal style={{ '--d': i }}>
              <img src={img} alt="" loading="lazy" />
              <div className="explore-txt">
                <h3>{t} <span aria-hidden="true">→</span></h3>
                <p>{d}</p>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
