import Hero from '../components/home/hero/Hero.jsx'
import { FactRows } from '../components/home/FactRows.jsx'
import { WhyUs } from '../components/home/WhyUs.jsx'
import { QuoteBand } from '../components/home/QuoteBand.jsx'
import { NextLinks } from '../components/explore/NextLinks.jsx'

export default function HomePage() {
  return (
    <>
      <Hero />
      <section className="warm intro">
        <div className="wrap">
          <h2 className="center" data-reveal>Imagine your brand on the one screen nobody can scroll past, at every signal in the Tricity.</h2>
          <FactRows />
        </div>
      </section>
      <WhyUs />
      <QuoteBand />
      <NextLinks />
    </>
  )
}
