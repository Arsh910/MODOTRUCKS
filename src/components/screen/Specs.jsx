import './screen.css'

// "The specs": centred title, then a 2x2 grid split by a fading cross with a diamond at its centre.
export function Specs({ items }) {
  return (
    <section className="warm sp">
      <div className="wrap">
        <p className="sp-label" data-reveal>The specs</p>
        <h2 className="sp-title" data-reveal>Built to be looked at, from every side of the road</h2>
        <ul className="sp-grid">
          {items.map(([t, d, icon], i) => (
            <li key={t} data-reveal style={{ '--d': i }}>
              <i><svg viewBox="0 0 24 24" aria-hidden="true"><path d={icon} /></svg></i>
              <h3>{t}</h3>
              <p>{d}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
