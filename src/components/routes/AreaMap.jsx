import { useEffect, useRef, useState } from 'react'
import { AREAS, CITY_PINS } from '../../data/routes.js'
import './area-map.css'

const CITIES = Object.entries(AREAS)
const EVERY = 3500    // ms between cities
const RESUME = 8000   // ms of quiet after the user touches it before auto-play resumes
const phone = () => matchMedia('(max-width: 640px)').matches

// Map with a pin per city + the city cards. One city is "active": its pin pulses and its card is lit.
// Phones: cards are a swipe carousel with dots that auto-advances. Desktop: a grid; hover picks a city.
export function AreaMap() {
  const [on, setOn] = useState(0)
  const track = useRef(null)
  const pausedUntil = useRef(0)
  const current = useRef(0)
  useEffect(() => { current.current = on }, [on])
  const pause = () => { pausedUntil.current = Date.now() + RESUME }

  const show = i => {
    setOn(i)
    const t = track.current, card = t.children[i]
    if (phone()) t.scrollTo({ left: card.offsetLeft - t.offsetLeft, behavior: 'smooth' })
  }

  // phones: the card snapped into view becomes the active city
  useEffect(() => {
    const t = track.current
    let raf = 0
    const onScroll = () => {
      if (raf || !phone()) return
      raf = requestAnimationFrame(() => {
        raf = 0
        // the last card can't reach the left edge, so being scrolled to the end means the last city
        const atEnd = t.scrollLeft >= t.scrollWidth - t.clientWidth - 2
        const i = atEnd ? CITIES.length - 1 : Math.round(t.scrollLeft / (t.children[1].offsetLeft - t.children[0].offsetLeft))
        setOn(Math.max(0, Math.min(CITIES.length - 1, i)))
      })
    }
    t.addEventListener('scroll', onScroll, { passive: true })
    return () => { t.removeEventListener('scroll', onScroll); cancelAnimationFrame(raf) }
  }, [])

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
    <>
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
      <div className="cities" ref={track} onPointerDown={pause}>
        {CITIES.map(([c, l], i) => (
          <div key={c} className={`city ${i === on ? 'on' : ''}`} data-reveal style={{ '--d': i }} onMouseEnter={() => { pause(); setOn(i) }}>
            <h3>{c}</h3><ul>{l.map(a => <li key={a}>{a}</li>)}</ul>
          </div>
        ))}
      </div>
      <div className="city-dots" role="tablist" aria-label="Cities">
        {CITIES.map(([c], i) => <button key={c} type="button" role="tab" aria-label={c} aria-selected={i === on} onClick={() => { pause(); show(i) }} />)}
      </div>
    </>
  )
}
