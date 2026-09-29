import { ScreenHero } from '../components/screen/ScreenHero.jsx'
import { Specs } from '../components/screen/Specs.jsx'
import { NumberCards } from '../components/screen/NumberCards.jsx'
import { NextLinks } from '../components/explore/NextLinks.jsx'
import { SPECS, STATS } from '../data/screen.js'
import { Marquee } from '../components/motion/Marquee.jsx'

export default function ScreenPage() {
  return (
    <>
      <ScreenHero />
      <Marquee items={['8 × 6 ft side', '6 × 6 ft back', 'No gap at the corner', 'Bright day and night']} />
      <Specs items={SPECS} />
      <NumberCards items={STATS} />
      <NextLinks skip="/screen" />
    </>
  )
}
