import { SHIFTS } from '../../data/plans.js'

// The truck's day, shown before the plan cards since every plan runs on it.
export function Schedule() {
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
