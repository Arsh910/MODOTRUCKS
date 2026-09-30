import { Top, Row, Caps, Rail, Faq, Talk, AskUs } from '../components/mc/Blocks.jsx'
import { PlanShow } from '../components/plans/PlanHero.jsx'
import { PlanDiagram } from '../components/plans/PlanDiagram.jsx'
import { PLANS } from '../data/plans.js'
import { PlanPics } from '../components/mc/PlanPics.jsx'
import { PHONE, PHONE_HREF } from '../config/site.js'

const TINT = { whole: 'tint-peach', shared: 'tint-lilac', event: 'tint-mint' }

// One page per plan: /plans/whole, /plans/shared, /plans/event
export default function PlanDetailPage({ id }) {
  const p = PLANS[id]
  const others = Object.entries(PLANS).filter(([k]) => k !== id)
  return (
    <>
      <Top title={p.title} sub={p.lead} buttons={false}
        media={<div className={`top-card ${TINT[id]}`}><p className="corner l ink">Plan {p.no} · {p.name}</p><p className="corner r ink">{p.tag}</p><PlanShow id={id} /></div>}>
        <div className="top-btns" data-reveal style={{ '--d': 2 }}><Talk tone="solid">Book this plan</Talk><Talk href={PHONE_HREF}>Call {PHONE}</Talk></div>
      </Top>

      <Row n={1} label={p.what[0]} title={p.card.t} lead={p.what[1]}>
        <div className="plan-dia" data-reveal><PlanDiagram id={id} /></div>
      </Row>

      <Rail title="On the road" sub="What this plan looks like out in the Tricity." cards={p.gallery.map(([img, title, text]) => ({ img, title, text }))} />

      <Row n={2} label="The details" title="Everything you need to know before you book." wide={<Caps n={3} items={p.details.map(([k, v]) => [v, '', k])} />} />

      <div className="dark">
        <Row n={3} label="Questions" aside={<AskUs />}><Faq items={p.faq} /></Row>
        <Row n={4} label="Other plans" title="Other ways to use the screen." wide={<PlanPics items={others} />} />
      </div>
    </>
  )
}
