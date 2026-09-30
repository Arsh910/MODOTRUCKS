import Hero from '../components/home/hero/Hero.jsx'
import { Row, Caps, Rail, Stack, StackCard, Faq, Talk } from '../components/mc/Blocks.jsx'
import { AD_LINK } from '../config/site.js'
import { PlanPics } from '../components/mc/PlanPics.jsx'
import { CountUp } from '../components/motion/CountUp.jsx'
import { FACTS } from '../data/home.jsx'
import { ScreenShow } from '../components/screen/ScreenHero.jsx'
import { REASONS } from '../data/whyUs.js'
import { STEPS } from '../data/how.js'
import { FAQ } from '../data/contact.js'

const PICS = [['/img/camera-rig.jpg', '4 / 3'], ['/img/proof-night.jpg', '4 / 5'], ['/img/seen-cars.jpg', '16 / 9'], ['/img/bg-avenue.jpg', '4 / 3']]

export default function HomePage() {
  return (
    <>
      {/* the animated street fills the screen; the headline sits over its sky */}
      <div className="hero-full">
        <Hero id="top">
          <div className="wrap hero-text">
            <h1>Nobody scrolls past a truck.</h1>
            <p className="top-sub">A 3D LED screen that drives your brand through Chandigarh, Mohali, Zirakpur and Panchkula.</p>
            <div className="top-btns"><Talk tone="solid">Book Now</Talk><Talk href={AD_LINK}>Don’t have an ad?</Talk></div>
          </div>
        </Hero>
      </div>

      <Row n={1} label="The truck" title="Imagine your brand on the one screen nobody can scroll past, at every signal in the Tricity."
        cols={['The back and the side of the truck are a single LED screen with no gap between them, so your ad flows round the corner in one piece.', 'You pick the plan, the dates and the areas. We plan the route, make the ad if you need one, and send a GPS log, photos and video after every run.']}
        link={['/screen', 'See the screen']}
        aside={<div className="top-card tint-peach"><ScreenShow /></div>} />

      <Rail title="Why brands choose us" sub="The one ad in the Tricity nobody can scroll past, planned, made and proven by one team."
        cards={REASONS.map((r, i) => ({ img: r.img, contain: r.contain, title: r.t, text: r.d, tag: String(i + 1).padStart(2, '0') }))} />

      <Stack title="The case for the road" sub="Why a screen on the street beats one more ad in the feed.">
        {FACTS.map((f, i) => (
          <StackCard key={f.v} i={i} tag={String(i + 1).padStart(2, '0')} title={f.l} text={f.d}
            right={<b className="big-num"><CountUp value={f.v} /></b>} />
        ))}
      </Stack>

      <Row n={2} label="Plans" title="Three ways to use the screen. One truck, two shifts a day." lead="Own a whole shift, share the loop with other brands, or park the screen at your event. Tuesday to Sunday, morning and evening.">
        <PlanPics />
      </Row>

      <div className="dark">
        <Row n={3} label="How it works" title="From request to the road in four steps." lead="Most requests are confirmed the same day. You get a GPS log, photos and video after every run.">
          <a className="lime-card" href="/how-it-works" data-reveal><b>See how it works</b><span>Steps, your ad, and what’s included</span></a>
          <Caps n={4} items={STEPS.map(([t, d], i) => [t, d, String(i + 1).padStart(2, '0')])} />
        </Row>
        <div className="wrap stagger" aria-hidden="true">
          {PICS.map(([src, ar]) => <figure key={src} style={{ '--ar': ar }}><img src={src} alt="" loading="lazy" /></figure>)}
        </div>
        <Row n={4} label="FAQ"><Faq items={FAQ} /></Row>
      </div>
    </>
  )
}
