import { Top, Row, Caps, Stack, StackCard } from '../components/mc/Blocks.jsx'
import { ScreenShow } from '../components/screen/ScreenHero.jsx'
import { SPECS, STATS } from '../data/screen.js'
import { CREATIVE } from '../data/how.js'
import { AD_LINK } from '../config/site.js'

export default function ScreenPage() {
  return (
    <>
      <Top title="One screen, wrapped around the corner." sub="The back and the side of the truck are a single LED screen with no gap between them. Your ad flows round the corner in one piece."
        media={<div className="top-card tint-peach"><p className="corner l ink">The Screen</p><p className="corner r ink">8 × 6 ft side · 6 × 6 ft back</p><ScreenShow /></div>} />

      <Row n={1} label="The specs" title="Built to be looked at, from every side of the road." wide={<Caps n={4} items={SPECS.map(([t, d], i) => [t, d, String(i + 1).padStart(2, '0')])} />} />

      <Stack title="The truck in numbers" sub="What you get every time the screen goes out.">
        {STATS.map(([v, t, d], i) => <StackCard key={t} i={i} tag={String(i + 1).padStart(2, '0')} title={t} text={d} right={<b className="big-num">{v}</b>} />)}
      </Stack>

      <div className="dark">
        <Row n={2} label="Your ad" title="Bring your ad, or we make it for the corner." lead="Anamorphic 3D, motion graphics or a video shoot, designed for the L-shaped screen by our in-house team." wide={<Caps items={CREATIVE.map(c => [c.t, c.d, c.card.tag])} />}>
          <a className="lime-card" href={AD_LINK} data-reveal><b>Don’t have an ad?</b><span>See what we make</span></a>
        </Row>
      </div>
    </>
  )
}
