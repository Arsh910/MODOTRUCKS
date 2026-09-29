import { useEffect, useRef, useState } from 'react'
import { AREAS, CITY_PINS } from '../../data/routes.js'
import './area-map.css'

const CITIES = Object.entries(AREAS)
const EVERY = 3500    // ms between cities
const RESUME = 8000   // ms of quiet after the user touches it before auto-play resumes

// Map with a pin per city, and the cities as rows beside it. One city is "active": its pin pulses and its row is lit.
// It moves to the next city on its own; hovering or tapping picks one.
export function AreaMap() {
  const [on, setOn] = useState(0)
  const track = useRef(null)
  const pausedUntil = useRef(0)
  const current = useRef(0)
  useEffect(() => { current.current = on }, [on])
  const pause = () => { pausedUntil.current = Date.now() + RESUME }

  const show = setOn

  // auto-play, only while on screen and not recently touched
  useEffect(() => {
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) return
    let visible = false
    const io = new IntersectionObserver(([e]) => { visible = e.isIntersecting })
    io.observe(track.current)
    const id = setInterval(() => {
      if (!visible || document.hidden || Date.now() < pausedUntil.current) return
      show((current.current + 1) % CITIES.length)
    }, EVERY)
    return () => { clearInterval(id); io.disconnect() }
  }, []) // eslint-disable-line

  return (
    <div className="am">
      <figure className="map" data-reveal>
        <img src="/img/tricity-osm.jpg" alt="Map of the Tricity: Chandigarh, Mohali, Panchkula, Zirakpur and Kharar" loading="lazy" />
        {CITIES.map(([c], i) => {
          const [x, y] = CITY_PINS[c]
          return (
            <button key={c} type="button" className={`pin ${i === on ? 'on' : ''}`} style={{ left: `${x}%`, top: `${y}%` }} aria-label={c} onClick={() => { pause(); show(i) }}>
              <i /><span>{c}</span>
            </button>
          )
        })}
        <figcaption>Map © OpenStreetMap contributors</figcaption>
      </figure>
      <ul className="rows cities" ref={track} onPointerDown={pause}>
        {CITIES.map(([c, l], i) => (
          <li key={c} className={`city ${i === on ? 'on' : ''}`} data-reveal style={{ '--d': i }} onMouseEnter={() => { pause(); setOn(i) }} onClick={() => { pause(); setOn(i) }}>
            <b>{c}</b><span>{String(i + 1).padStart(2, '0')}</span><p>{l.join(' · ')}</p>
          </li>
        ))}
      </ul>
    </div>
  )
}
