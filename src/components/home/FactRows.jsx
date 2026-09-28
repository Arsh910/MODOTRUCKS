import { FACTS, FACT_ART } from '../../data/home.jsx'

// The case for the truck in four numbers, as zig-zag rows.
export function FactRows() {
  return (
      <div className="facts-z">
        {FACTS.map((f, i) => (
          <div key={f.v} className={`fz ${i % 2 ? 'flip' : ''}`} data-reveal>
            <div className="fz-num"><span>{f.l}</span><b>{f.v}</b></div>
            <div className="fz-more">
              <p>{f.d}</p>
              <svg viewBox="0 0 100 100" aria-hidden="true">{FACT_ART[f.art]}</svg>
            </div>
          </div>
        ))}
      </div>
  )
}
