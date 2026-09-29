import { PageHero } from '../components/ui/PageHero.jsx'
import { HowSteps } from '../components/how/HowSteps.jsx'
import { AdOptions } from '../components/how/AdOptions.jsx'
import { NextLinks } from '../components/explore/NextLinks.jsx'
import { Marquee } from '../components/motion/Marquee.jsx'

export default function HowItWorksPage() {
  return (
    <>
      <PageHero img="/img/bg-avenue.jpg" label="How It Works" title="From request to the road in four steps." lead="Most requests are confirmed the same day. You get a GPS log, photos and video after every run." />
      <Marquee items={['Send a request', 'Get your quote', 'Approve your ad', 'On the road']} />
      <HowSteps />
      <AdOptions />
      <NextLinks skip="/how-it-works" />
    </>
  )
}
