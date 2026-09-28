import { PlansIntro } from '../components/plans/PlansIntro.jsx'
import { Schedule } from '../components/plans/Schedule.jsx'
import { PlanCarousel } from '../components/plans/PlanCarousel.jsx'
import { NextLinks } from '../components/explore/NextLinks.jsx'

export default function PlansPage() {
  return (
    <>
      <PlansIntro />
      <Schedule />
      <PlanCarousel />
      <NextLinks skip="/plans" />
    </>
  )
}
