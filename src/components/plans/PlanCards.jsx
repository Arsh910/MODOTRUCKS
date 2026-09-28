import { Logo } from '../ui/Logo.jsx'
import { PLANS } from '../../data/plans.js'
import { PlanDiagram } from './PlanDiagram.jsx'

// Cards linking to plan pages ("Other ways to use the screen"), each showing that plan's animation.
export function PlanCards({ items = Object.entries(PLANS) }) {
  return (
    <div className={`news n${items.length}`}>
      {items.map(([k, p], i) => (
        <a key={k} href={`/plans/${k}`} className="news-card" data-reveal style={{ '--d': i }}>
          <div className="news-img">
            <div className="news-dia"><PlanDiagram id={k} /></div>
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
