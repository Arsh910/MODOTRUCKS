import Hero from '../home/hero/Hero.jsx'
import { SCREENS } from './PlanHero.jsx'

// A plan's picture: the street scene with the truck playing that plan's ads.
export function PlanScene({ id, className = '' }) {
  const { ads, every } = SCREENS[id]
  return <div className={`scene-card ${className}`}><Hero ads={ads} every={every} parked={id === 'event'} /></div>
}
