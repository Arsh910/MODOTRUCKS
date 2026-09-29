import { PlansIntro } from '../components/plans/PlansIntro.jsx'
import { Schedule } from '../components/plans/Schedule.jsx'
import { PlanCarousel } from '../components/plans/PlanCarousel.jsx'
import { NextLinks } from '../components/explore/NextLinks.jsx'
import { Marquee } from '../components/motion/Marquee.jsx'

export default function PlansPage() {
  return (
    <>
      <PlansIntro />
      <Marquee items={['Whole screen', 'Share the screen', 'Parked at your event', 'Tuesday to Sunday']} tone="orange" />
      <Schedule />
      <PlanCarousel />
      <NextLinks skip="/plans" />
    </>
  )
}
