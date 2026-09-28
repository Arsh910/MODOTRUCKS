import './plans.css'

// The three ways to book, as icons (24 x 24 line drawings).
const POINTS = [
  ['Own a shift', 'M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18Zm0 4v5l3.5 2'],
  ['Share with brands', 'M4 12a8 8 0 0 1 14-5.3M20 12a8 8 0 0 1-14 5.3M18 3v4h-4M6 21v-4h4'],
  ['Park at your event', 'M12 21s-7-6.2-7-11.5a7 7 0 0 1 14 0C19 14.8 12 21 12 21Zm0-9a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z'],
]

// The Plans page top: title, the three ways, and a button down to the plan cards.
export function PlansIntro() {
  return (
    <section className="warm ps ps-intro">
      <div className="wrap">
        <h1 className="ps-title" data-reveal>Three ways to use <mark>the screen</mark></h1>
        <ul className="ps-points">
          {POINTS.map(([label, d], i) => (
            <li key={label} data-reveal style={{ '--d': i }}>
              <i><svg viewBox="0 0 24 24" aria-hidden="true"><path d={d} /></svg></i>
              <span>{label}</span>
            </li>
          ))}
        </ul>
        <p className="ps-note" data-reveal>Every booking ends with a proof report: GPS route, photos and video.</p>
        <div className="ps-cta" data-reveal><a className="dark-btn ps-btn" href="#plans">See plans <span aria-hidden="true">↓</span></a></div>
      </div>
    </section>
  )
}
