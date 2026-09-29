import { FACTS } from '../../data/home.jsx'
import { CountUp } from '../motion/CountUp.jsx'

// The case for the truck in four numbers: label on top, the figure in the middle, index at the bottom.
export function FactRows() {
  return (
    <div className="ncards lite facts" style={{ '--n': 4 }}>
      {FACTS.map((f, i) => (
        <div key={f.v} className="ncard" data-reveal style={{ '--d': i }}>
          <span className="dot-label">{f.l}</span>
          <div className="ncard-mid"><b className="big"><CountUp value={f.v} /></b><p>{f.d}</p></div>
          <small>{String(i + 1).padStart(2, '0')}</small>
        </div>
      ))}
    </div>
  )
}
