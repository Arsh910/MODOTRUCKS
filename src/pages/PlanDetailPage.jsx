import { PlanHero } from '../components/plans/PlanHero.jsx'
import { PlanDiagram } from '../components/plans/PlanDiagram.jsx'
import { PlanCards } from '../components/plans/PlanCards.jsx'
import { PLANS } from '../data/plans.js'
import { ScrollText } from '../components/motion/ScrollText.jsx'

// One page per plan: /plans/whole, /plans/shared, /plans/event
export default function PlanDetailPage({ id }) {
  const p = PLANS[id]
  const others = Object.entries(PLANS).filter(([k]) => k !== id)
  return (
    <>
      <PlanHero id={id} plan={p} />

      <section className="sec">
        <div className="wrap">
          <p className="dot-label plan-what-label" data-reveal>{p.what[0]}</p>
          <ScrollText className="lede" text={p.what[1]} />
          <div className="plan-dia" data-reveal><PlanDiagram id={id} /></div>
        </div>
      </section>

      <section className="strip" aria-label="Photos">
        <div className="strip-track">
          {p.gallery.map(([src, t, d]) => (
            <figure key={t}><img src={src} alt="" loading="lazy" /><figcaption><b>{t}</b><span>{d}</span></figcaption></figure>
          ))}
        </div>
      </section>

      <section className="sec">
        <div className="wrap list2">
          <div className="list2-l"><h2 data-reveal>The details</h2></div>
          <ul className="rows">{p.details.map(([k, v], i) => <li key={k} data-reveal style={{ '--d': i % 3 }}><b>{v}</b><span>{k}</span></li>)}</ul>
        </div>
        <div className="wrap list2">
          <div className="list2-l"><h2 data-reveal>Questions</h2></div>
          <div className="faq">{p.faq.map(([q, a]) => <details key={q} data-reveal><summary>{q}</summary><p>{a}</p></details>)}</div>
        </div>
      </section>

      <section className="sec tight">
        <div className="wrap sec-head"><h2 className="sec-title" data-reveal>Other ways to use the screen</h2></div>
        <PlanCards items={others} />
      </section>
    </>
  )
}
