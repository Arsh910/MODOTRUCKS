import Hero from '../components/home/hero/Hero.jsx'
import { FactRows } from '../components/home/FactRows.jsx'
import { WhyUs } from '../components/home/WhyUs.jsx'
import { PlanCarousel } from '../components/plans/PlanCarousel.jsx'
import { NextLinks } from '../components/explore/NextLinks.jsx'
import { Marquee } from '../components/motion/Marquee.jsx'
import { ScrollText } from '../components/motion/ScrollText.jsx'

export default function HomePage() {
  return (
    <>
      <Hero />
      <section className="warm intro">
        <div className="wrap">
          <h2 className="center pics" data-reveal>
            Imagine your brand <img src="/img/seen-cars.jpg" alt="" /> on the one screen nobody can scroll past <img className="fit" src="/img/truck-rear.svg" alt="" />, at every signal <img src="/img/proof-night.jpg" alt="" /> in the Tricity.
          </h2>
          <FactRows />
        </div>
      </section>
      <Marquee items={['Chandigarh', 'Mohali', 'Zirakpur', 'Panchkula', 'Seen at every signal']} tone="orange" />
      <section className="sec">
        <div className="wrap">
          <ScrollText as="h2" className="statement" text="Nobody scrolls past a truck. At a red light, your ad is the most interesting thing on the road." />
        </div>
      </section>
      <WhyUs />
      <PlanCarousel title="Pick your plan" />
      <NextLinks />
    </>
  )
}
