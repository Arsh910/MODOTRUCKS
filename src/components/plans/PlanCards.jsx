import { PLANS } from '../../data/plans.js'
import { BOOK_LINK } from '../../config/site.js'
import { PlanDiagram } from './PlanDiagram.jsx'

// Panels linking to the other plan pages ("Other ways to use the screen"), each playing that plan's diagram.
export function PlanCards({ items = Object.entries(PLANS) }) {
  return (
    <>
    <p className="swipe-hint">Swipe</p>
    <div className="panels" style={{ '--n': items.length }}>
      {items.map(([k, p], i) => (
        <article key={k} className="panel" data-reveal style={{ '--d': i }}>
          <span className="dot-label">{p.tag}</span>
          <div className="panel-art"><PlanDiagram id={k} /></div>
          <div className="panel-bar">
            <div><small>Plan {p.no}</small><b>{p.name}</b></div>
            <div className="btns"><a className="box-btn" href={`/plans/${k}`}>Learn more</a><a className="orange-btn" href={BOOK_LINK}>Book</a></div>
          </div>
        </article>
      ))}
    </div>
    </>
  )
}
