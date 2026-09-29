import { useEffect, useState } from 'react'
import { ScreenDiagram } from '../screen/ScreenHero.jsx'
import '../screen/screen.css'
import { PageHero } from '../ui/PageHero.jsx'
import './plan-hero.css'

// What the truck's screen plays on each plan page, and how often it changes (ms).
const YOU = { bg: '#E8622C', fa: '#fff', fb: '#fff' }
const SCREENS = {
  whole: { every: 3200, ads: [
    { ...YOU, a: 'YOUR BRAND', b: 'ALL SHIFT · NONSTOP' },
    { ...YOU, a: 'YOUR OFFER', b: 'ONLY YOUR ADS ON SCREEN' },
    { ...YOU, a: 'YOUR LAUNCH', b: 'ON THE ROUTE YOU PICK' },
  ] },
  shared: { every: 2200, ads: [
    { ...YOU, a: 'YOUR BRAND', b: 'YOUR TURN · 30–60 S' },
    { bg: '#1F3D2B', a: 'CHAI & CO.', b: 'BRAND 2', fa: '#F3E3C3', fb: '#E8A33D' },
    { bg: '#1E4FD8', a: 'NOVA FITNESS', b: 'BRAND 3', fa: '#fff', fb: '#BFD3FF' },
    { bg: '#FFC531', a: 'PIZZA PRONTO', b: 'BRAND 4', fa: '#1c120d', fb: '#B3261E' },
    { bg: '#F6EEE6', a: 'LUMEN OPTICALS', b: 'BRAND 5', fa: '#C9562A', fb: '#1c120d' },
    { bg: '#140b08', a: 'VOLTA MOTORS', b: 'BRAND 6', fa: '#fff', fb: '#E8622C', rings: true },
  ] },
  event: { every: 3200, ads: [
    { bg: '#140b08', a: '● LIVE', b: 'YOUR EVENT, ON THE BIG SCREEN', fa: '#ff4a3d', fb: '#fff' },
    { ...YOU, a: 'WELCOME', b: 'GRAND OPENING · TONIGHT' },
    { bg: '#F6EEE6', a: 'SAY CHEESE', b: 'FILMED BY OUR CREW', fa: '#C9562A', fb: '#1c120d' },
  ] },
}

// Under the truck: a small readout of what the plan means.
function Meter({ id, now, count }) {
  if (id === 'shared') return (
    <div className="pm pm-loop">
      {Array.from({ length: count }, (_, i) => <i key={i} className={`${i === now ? 'on' : ''} ${i === 0 ? 'you' : ''}`}>{i === 0 ? 'You' : i + 1}</i>)}
      <span>{now === 0 ? 'Your turn on screen' : `Brand ${now + 1} · you’re back in ${count - now} turn${count - now > 1 ? 's' : ''}`}</span>
    </div>
  )
  if (id === 'event') return (
    <div className="pm pm-hours"><b>Parked at your venue</b><div className="pm-bar"><i /></div><span>4 · 8 · 10 hours</span></div>
  )
  return <div className="pm pm-shift"><span>8 AM</span><div className="pm-bar"><i /></div><span>1 PM</span><b>Only your ad, all shift</b></div>
}

// Plan page top, split like the other pages: headline + pitch on the left, the corner screen playing the plan on the right.
export function PlanHero({ id, plan }) {
  const { ads, every } = SCREENS[id]
  const [s, setS] = useState({ now: 0, prev: -1 })
  useEffect(() => {
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const t = setInterval(() => { if (!document.hidden) setS(x => ({ now: (x.now + 1) % ads.length, prev: x.now })) }, every)
    return () => clearInterval(t)
  }, [ads.length, every])

  return (
    <PageHero label={`Plan ${plan.no} · ${plan.name}`} title={plan.title} lead={plan.lead} cta="Book this plan"
      art={<div className="sh-art plan-art"><ScreenDiagram ads={ads} now={s.now} prev={s.prev} dims={false} truck /><Meter id={id} now={s.now} count={ads.length} /></div>} />
  )
}
