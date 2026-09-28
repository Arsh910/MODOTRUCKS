import { useState } from 'react'
import './screen.css'

// The numbers: four cards, icon at the top, the figure and its meaning at the bottom.
// One card is lit at a time; hovering or tapping a card lights it. Phones swipe sideways.
export function NumberCards({ items }) {
  const [on, setOn] = useState(1)
  return (
    <section className="brown nc">
      <div className="wrap">
        <ul className="nc-row">
          {items.map(([v, t, d, icon], i) => (
            <li key={t} className={i === on ? 'on' : ''} onMouseEnter={() => setOn(i)} onClick={() => setOn(i)} data-reveal style={{ '--d': i }}>
              <i><svg viewBox="0 0 24 24" aria-hidden="true"><path d={icon} /></svg></i>
              <div><b>{v}</b><h3>{t}</h3><p>{d}</p></div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
