import { PLANS } from '../../data/plans.js'
import { PlanScene } from '../plans/PlanScene.jsx'

// The plans as photo cards: picture on top, name, one line, link to the plan page.
export function PlanPics({ items = Object.entries(PLANS) }) {
  return (
    <ul className="plan-pics" style={{ '--n': items.length }}>
      {items.map(([k, p], i) => (
        <li key={k} data-reveal style={{ '--d': i }}>
          <a href={`/plans/${k}`}>
            <figure><PlanScene id={k} /><small>Plan {p.no}</small></figure>
            <h3>{p.name}</h3>
            <p>{p.lead}</p>
            <span className="arrow-link"><span>Learn more</span></span>
          </a>
        </li>
      ))}
    </ul>
  )
}
