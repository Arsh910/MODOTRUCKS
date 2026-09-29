import './screen.css'

// "The specs": four flat cards, the spec as the label, what it means in the middle.
export function Specs({ items }) {
  return (
    <section className="sec">
      <div className="wrap">
        <div className="sec-head">
          <h2 className="sec-title" data-reveal>Built to be looked at, from every side of the road</h2>
        </div>
        <div className="ncards stack" style={{ '--n': 4 }}>
          {items.map(([t, d], i) => (
            <div key={t} className="ncard" data-reveal style={{ '--d': i }}>
              <span className="dot-label">{t}</span>
              <div className="ncard-mid"><h3>{d}</h3></div>
              <small>{String(i + 1).padStart(2, '0')}</small>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
