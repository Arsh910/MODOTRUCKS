import { useEffect, useRef, useState } from 'react'
import { City, Lamps } from './City.jsx'
import { Truck, ADS } from './Truck.jsx'
import { Crowd, NEAR_PEOPLE, FAR_PEOPLE } from './Crowd.jsx'
import './hero.css'

const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches
const AD_EVERY = 4000        // ms between ad changes
const SKY_EVERY = 6500       // ms between day and night
const SKY_FIRST = 3500       // first sunrise comes sooner

// Damped spring written out as a CSS linear() easing: overshoots, wobbles once, settles.
function springEasing(damping = .5, freq = 11, secs = 1.4, steps = 48) {
  if (!CSS.supports('animation-timing-function', 'linear(0, 1)')) return 'cubic-bezier(.34, 1.56, .64, 1)'
  const wd = freq * Math.sqrt(1 - damping * damping), pts = []
  for (let i = 0; i < steps; i++) {
    const t = i / steps * secs
    pts.push((1 - Math.exp(-damping * freq * t) * (Math.cos(wd * t) + damping * freq / wd * Math.sin(wd * t))).toFixed(3))
  }
  return `linear(${pts.join(',')},1)`
}
const SPRING = springEasing()

// Run `fn` every `ms` while `on` (the first run after `first` ms).
function useEvery(ms, fn, on, first = ms) {
  const saved = useRef(fn)
  useEffect(() => { saved.current = fn })
  useEffect(() => {
    if (!on || reduced) return
    let t = setTimeout(function tick() { saved.current(); t = setTimeout(tick, ms) }, first)
    return () => clearTimeout(t)
  }, [on, ms, first])
}

// True while the element is on screen and the tab is visible: everything pauses otherwise.
function useActive(ref) {
  const [seen, setSeen] = useState(true), [shown, setShown] = useState(!document.hidden)
  useEffect(() => {
    const io = new IntersectionObserver(([e]) => setSeen(e.isIntersecting))
    io.observe(ref.current)
    const vis = () => setShown(!document.hidden)
    document.addEventListener('visibilitychange', vis)
    return () => { io.disconnect(); document.removeEventListener('visibilitychange', vis) }
  }, [ref])
  return seen && shown
}

// The street scene. The landing page uses it full screen; plan cards use a small copy with that plan's ads
// (`ads`, changing every `every` ms). `parked` stops the truck at the kerb, for the event plan.
export default function Hero({ children, ads: list = ADS, every = AD_EVERY, parked = false, id }) {
  const ref = useRef(null)
  const active = useActive(ref)
  const [ads, setAds] = useState({ now: 0, prev: -1 })
  const [sky, setSky] = useState({ day: false, swaps: 0 })
  useEvery(every, () => setAds(a => ({ now: (a.now + 1) % list.length, prev: a.now })), active)
  useEvery(SKY_EVERY, () => setSky(s => ({ day: !s.day, swaps: s.swaps + 1 })), active, SKY_FIRST)

  // Sun and moon each ride an arm pivoting at the horizon. On a swap one rises from the left
  // while the other sets to the right, same moment, same spring. Before the first swap: moon up, sun down.
  const sun = sky.day ? 'rise' : sky.swaps ? 'set' : ''
  const moon = sky.day ? 'set' : sky.swaps ? 'rise' : ''

  return (
    <section ref={ref} id={id} className={`hero ${active ? '' : 'paused'} ${parked ? 'parked' : ''}`} data-time={sky.day ? 'day' : 'night'} style={{ '--spring': SPRING }}>
      <div className="sky" aria-hidden="true">
        <i className="sky-day" />
        {sky.swaps > 0 && <i key={sky.swaps} className="sky-dusk" />}
        <div className={`orbit sun-arm ${sun}`}><i className="sun" /></div>
        <div className={`orbit moon-arm ${moon}`}><i className="moon" /></div>
      </div>
      <City />
      <Lamps />
      <div className="road" aria-hidden="true">
        <i className="far-walk" />
        <i className="glow" style={{ '--glow': list[ads.now].glow ?? list[ads.now].bg }} />
        <i className="dash" />
      </div>
      <Crowd people={FAR_PEOPLE} far />
      <div className="pavement" aria-hidden="true" />
      <Truck ad={ads.now} prev={ads.prev} ads={list} />
      <Crowd people={NEAR_PEOPLE} />
      {children}
    </section>
  )
}
