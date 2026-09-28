import { ScreenHero } from '../components/screen/ScreenHero.jsx'
import { Specs } from '../components/screen/Specs.jsx'
import { NumberCards } from '../components/screen/NumberCards.jsx'
import { NextLinks } from '../components/explore/NextLinks.jsx'
import { SPECS, STATS } from '../data/screen.js'

export default function ScreenPage() {
  return (
    <>
      <ScreenHero />
      <Specs items={SPECS} />
      <NumberCards items={STATS} />
      <NextLinks skip="/screen" />
    </>
  )
}
