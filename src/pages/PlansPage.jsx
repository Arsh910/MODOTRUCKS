import { Top, Row, Caps, Stack, StackCard, Faq, Talk } from '../components/mc/Blocks.jsx'
import { PlanScene } from '../components/plans/PlanScene.jsx'
import { PLANS, SHIFTS } from '../data/plans.js'
import '../components/plans/plans.css'

export default function PlansPage() {
  const faq = Object.values(PLANS).flatMap(p => p.faq)
  return (
    <>
      <Top title="Three ways to use the screen." sub="Every booking ends with a proof report: GPS route, photos and video."
        media={<div className="top-card"><img src="/img/bg-interchange.jpg" alt="" /><p className="corner l">Plans</p><p className="corner r">Whole screen · Shared · At your event</p></div>} />

      <Row n={1} label="The schedule" title="Two shifts a day, Tuesday to Sunday." lead="Every plan runs on this schedule. Pick the morning rush, the evening glow, or both, and we plan the route around those hours.">
        <Caps n={2} items={SHIFTS.map(([time, t, d]) => [t, d, time])} />
      </Row>

      <section id="plans">
        <Stack title="Pick your plan" sub="One truck, three ways to put your brand on it.">
          {Object.entries(PLANS).map(([k, p], i) => {
            return (
              <StackCard key={k} i={i} tag={`Plan ${p.no} · ${p.tag}`} title={p.name} text={p.lead} right={<PlanScene id={k} className="stack-photo" />}>
                <div className="top-btns"><Talk href={`/plans/${k}`} tone="solid">Learn more</Talk><Talk>Book</Talk></div>
              </StackCard>
            )
          })}
        </Stack>
      </section>

      <div className="dark"><Row n={2} label="FAQ"><Faq items={faq} /></Row></div>
    </>
  )
}
