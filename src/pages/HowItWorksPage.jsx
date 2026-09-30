import { Top, Row, Caps, Stack, StackCard, Faq, AskUs } from '../components/mc/Blocks.jsx'
import { WhiteTruck } from '../components/how/WhiteTruck.jsx'
import { STEPS, CREATIVE, AD_PERKS } from '../data/how.js'
import { FAQ } from '../data/contact.js'

export default function HowItWorksPage() {
  return (
    <>
      <Top title="From request to the road in four steps." sub="Most requests are confirmed the same day. You get a GPS log, photos and video after every run."
        media={<div className="top-card tint-mint"><p className="corner l ink">How it works</p><p className="corner r ink">Tuesday to Sunday · two shifts a day</p><div className="how-scene" data-reveal>
          <div className="how-truck"><WhiteTruck /></div>
          <ol className="how-road">{STEPS.map(([t], i) => <li key={t} style={{ '--i': i }}><i>{i + 1}</i><span>{t}</span></li>)}</ol>
        </div></div>} />

      <Row n={1} label="The steps" title="Pick a plan and your dates, send your ad, and the truck does the rest." wide={<Caps n={4} items={STEPS.map(([t, d], i) => [t, d, `Step ${i + 1}`])} />} />

      <section id="your-ad">
        <Stack title="Your ad: bring it, or we make it" sub="Whichever way, it is checked on the real screen and locked before the run.">
          {CREATIVE.map((c, i) => (
            <StackCard key={c.t} i={i} tag={c.card.tag} title={c.t} text={c.d}
              right={<ul className="spec-list">{c.card.rows.map(([k, v]) => <li key={k}><span>{k}</span><b>{v}</b></li>)}</ul>} />
          ))}
        </Stack>
      </section>

      <div className="dark">
        <Row n={2} label="Included" title="Every booking comes with this." wide={<Caps n={4} items={AD_PERKS.map(([t, d]) => [t, d])} />}>
          <a className="lime-card" href="/contact" data-reveal><b>Send a request</b><span>We reply the same day</span></a>
        </Row>
        <Row n={3} label="Questions" aside={<AskUs />}><Faq items={FAQ} /></Row>
      </div>
    </>
  )
}
