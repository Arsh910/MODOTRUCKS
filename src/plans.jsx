import { Logo } from './art.jsx'

// One page per plan. Photos in `gallery` are placeholders: swap them for MODO's own shots
// of each plan in action (same aspect ratio, 4:3) when the shoot is ready.
export const PLANS = {
  whole: {
    no: '01', name: 'Whole screen', tag: 'One brand, the whole truck',
    title: 'Your ad. The whole truck. The whole shift.',
    lead: 'Only your ad on the screen, nonstop, on the route you pick. The strongest way to own an area for a day.',
    hero: '/img/bg-expressway.jpg',
    card: { t: 'Whole screen: your ad is the only thing on screen, all shift', meta: 'From one\nshift' },
    what: ['What it means', 'For the full shift, the side and back of the truck show nothing but your ad. You choose the sectors, markets and roads, and we plan the timing so the truck reaches them when they are busiest.'],
    gallery: [
      ['/img/seen-cars.jpg', 'Seen by everyone stuck at the signal'],
      ['/img/route-avenue.jpg', 'On the roads you choose'],
      ['/img/proof-night.jpg', 'Glowing after dark on the evening shift'],
    ],
    details: [['Screen time', 'The full shift, nonstop'], ['Shifts', 'Morning 8 AM – 1 PM, evening 5 PM – 10 PM, or both'], ['Route', 'You pick it, we plan the timing'], ['Days', 'Tuesday to Sunday'], ['Great for', 'Launches, sale days, new showrooms, owning an area'], ['To confirm', '50% advance locks your dates']],
    faq: [['Can I change the route on the day?', 'The route is planned with you before the booking. Small changes are fine if you tell us before the shift starts.'], ['Can I book more than one day?', 'Yes. Book as many dates as you like. Runs longer than 7 days get a custom quote.']],
  },
  shared: {
    no: '02', name: 'Share the screen', tag: 'Up to 6 brands take turns',
    title: 'Share the truck. Share the cost.',
    lead: 'Up to six brands on one loop. Your ad plays for 30 to 60 seconds, the others take their turn, then it’s you again, all shift long.',
    hero: '/img/bg-interchange.jpg',
    card: { t: 'Share the screen: the most affordable way to try the truck', meta: 'Reserve\nfree' },
    what: ['What it means', 'The screen plays a loop of up to six ads. Every few minutes your ad comes round again, on a busy route we plan through the Tricity. A shift goes ahead once three brands have joined, and the cost is split between the brands on it.'],
    gallery: [
      ['/img/hero-night.jpg', 'A busy route through the markets'],
      ['/img/seen-cars.jpg', 'Your turn comes round every few minutes'],
      ['/img/bg-avenue.jpg', 'Seen in every sector the truck passes'],
    ],
    details: [['Screen time', '30–60 seconds per turn, on repeat'], ['Brands per shift', 'Up to 6'], ['Runs when', '3 of 6 brands have joined'], ['Route', 'A busy route we plan'], ['Great for', 'Trying the truck on a smaller budget'], ['To reserve', 'Free. You pay your share once the shift confirms']],
    faq: [['What if my shift doesn’t get 3 brands?', 'We check every shared shift 48 hours before it starts. If it hasn’t reached 3 brands, you choose: take the whole shift, or run it with the brands already booked and share the cost.'], ['Will my ad play next to a competitor?', 'Tell us who your competitors are when you book and we keep them off your shift.']],
  },
  event: {
    no: '03', name: 'Parked at your event', tag: 'One date, at your venue',
    title: 'The screen, parked at your event.',
    lead: 'Openings, weddings, exhibitions and screenings. The truck parks at your venue and the screen stays on for as long as you need it.',
    hero: '/img/bg-sukhna.jpg',
    card: { t: 'Parked at your event: a giant screen at your venue', meta: '4, 8 or\n10 hours' },
    what: ['What it means', 'Instead of driving a route, the truck parks where your guests are. Play your ads, a countdown, a highlight reel, or a live feed of the event itself, filmed by our team and shown on the screen as it happens.'],
    gallery: [
      ['/img/bg-sukhna.jpg', 'Parked where your guests gather'],
      ['/img/camera-rig.jpg', 'Live filming shown on the screen'],
      ['/img/hero-night.jpg', 'Bright enough for evening events'],
    ],
    details: [['Duration', '4, 8 or 10 hours'], ['Where', 'Your venue, in or outside the Tricity'], ['Content', 'Your ads, videos or a live camera feed'], ['Live filming', 'Optional, by our in-house crew'], ['Great for', 'Openings, weddings, exhibitions, screenings'], ['To confirm', 'Full payment locks the date']],
    faq: [['Do you need power at the venue?', 'No. The truck runs its own screen. We only need a spot to park where the screen faces your guests.'], ['Can you go outside the Tricity?', 'Yes. Travel is quoted separately; tell us the venue when you book.']],
  },
}

// Picture of how each plan uses the screen over a shift.
function Diagram({ id }) {
  if (id === 'whole') return (
    <div className="dia">
      <div className="dia-head"><span>8 AM</span><span>Morning shift</span><span>1 PM</span></div>
      <div className="dia-bar solo"><span>Your ad · nonstop</span><i className="playhead" /></div>
      <p className="dia-note">Nobody else on the screen. Every minute of the shift is yours.</p>
    </div>
  )
  if (id === 'shared') return (
    <div className="dia">
      <div className="dia-head"><span>One loop</span><span>about 3–6 minutes</span><span>then again</span></div>
      <div className="dia-bar loop">{['You', 'Brand 2', 'Brand 3', 'Brand 4', 'Brand 5', 'Brand 6'].map((b, i) => <span key={b} className={i ? '' : 'you'} style={{ '--i': i }}>{b}</span>)}</div>
      <div className="dia-pips"><span className="on" /><span className="on" /><span className="on" /><span /><span /><span /><em>Goes ahead at 3 brands</em></div>
    </div>
  )
  return (
    <div className="dia">
      {[4, 8, 10].map(h => (
        <div key={h} className="dia-row"><span>{h} hours</span><div className="dia-bar hours" style={{ '--w': h / 10 }}><span /></div></div>
      ))}
      <p className="dia-note">Add live filming and the screen shows your event as it happens.</p>
    </div>
  )
}

// Photo header shared by every inner page.
export function PageHero({ img, label, title, lead, cta = 'Book Now' }) {
  return (
    <section className="plan-hero">
      <img src={img} alt="" />
      <div className="wrap">
        <p className="plan-no">{label}</p>
        <h1>{title}</h1>
        <p className="plan-lead">{lead}</p>
        <div className="plan-ctas">
          <a className="nav-btn" href="/contact">{cta}</a>
          <a className="ghost-btn" href="tel:+919056005271">Call +91 90560 05271</a>
        </div>
      </div>
    </section>
  )
}

export function PlanPage({ id }) {
  const p = PLANS[id]
  const others = Object.entries(PLANS).filter(([k]) => k !== id)
  return (
    <>
      <PageHero img={p.hero} label={`Plan ${p.no} · ${p.name}`} title={p.title} lead={p.lead} cta="Book this plan" />

      <section className="warm plan-what">
        <div className="wrap">
          <div className="two-col">
            <h2 data-reveal>{p.what[0]}</h2>
            <p data-reveal>{p.what[1]}</p>
          </div>
          <div data-reveal><Diagram id={id} /></div>
          <div className="gallery">
            {p.gallery.map(([src, cap], i) => (
              <figure key={cap} data-reveal style={{ '--d': i }}>
                <div><img src={src} alt={cap} loading="lazy" /></div>
                <figcaption>{cap}</figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      <section className="brown plan-details">
        <div className="wrap">
          <h2 data-reveal>The details</h2>
          <dl>{p.details.map(([k, v], i) => <div key={k} data-reveal style={{ '--d': i % 2 }}><dt>{k}</dt><dd>{v}</dd></div>)}</dl>
          <div className="plan-faq">
            {p.faq.map(([q, a]) => <details key={q} data-reveal><summary>{q}</summary><p>{a}</p></details>)}
          </div>
        </div>
      </section>

      <section className="warm cta">
        <div className="wrap">
          <h2 className="center" data-reveal>Other ways to use the screen</h2>
          <PlanCards items={others} />
        </div>
      </section>
    </>
  )
}

export function PlanCards({ items = Object.entries(PLANS) }) {
  return (
    <div className={`news n${items.length}`}>
      {items.map(([k, p], i) => (
        <a key={k} href={`/plans/${k}`} className="news-card" data-reveal style={{ '--d': i }}>
          <div className="news-img">
            <img src={p.hero} alt="" loading="lazy" />
            <div className="news-strip"><Logo compact /><span>{p.tag}</span><span className="news-go">View plan →</span></div>
          </div>
          <div className="news-body">
            <h3>{p.card.t}</h3>
            <span className="news-meta">{p.card.meta}</span>
            <p>{p.lead}</p>
          </div>
        </a>
      ))}
    </div>
  )
}
