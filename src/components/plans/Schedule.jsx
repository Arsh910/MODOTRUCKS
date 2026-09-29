import { SHIFTS } from '../../data/plans.js'

// The truck's day, shown before the plans since every plan runs on it.
export function Schedule() {
  return (
    <section className="sec">
      <div className="wrap list2">
        <div className="list2-l">
          <h2 data-reveal>Two shifts a day, Tuesday to Sunday</h2>
          <p data-reveal>Every plan runs on this schedule. Pick the morning rush, the evening glow, or both, and we plan the route around those hours.</p>
          <img className="shifts-pic" src="/img/truck-rear.svg" alt="The MODO truck from the back corner, its back and side screens showing one ad" loading="lazy" data-reveal />
        </div>
        <ul className="rows">
          {SHIFTS.map(([time, t, d], i) => <li key={t} data-reveal style={{ '--d': i }}><b>{t}</b><span>{time}</span><p>{d}</p></li>)}
        </ul>
      </div>
    </section>
  )
}
