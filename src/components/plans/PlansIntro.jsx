import { PageHero } from '../ui/PageHero.jsx'
import './plans.css'

const WAYS = [['Own a shift', 'Whole screen'], ['Share with brands', 'Up to 6 on one loop'], ['Park at your event', '4, 8 or 10 hours']]
const PICS = ['/img/seen-cars.jpg', '/img/hero-night.jpg', '/img/proof-night.jpg', '/img/bg-interchange.jpg', '/img/camera-rig.jpg', '/img/bg-avenue.jpg']

// The Plans page top: the three ways as rows on the left, a grid of photos on the right.
export function PlansIntro() {
  return (
    <PageHero label="Plans" title="Three ways to use the screen" foot="Every booking ends with a proof report: GPS route, photos and video."
      art={<div className="pgrid">{PICS.map((p, i) => <img key={p} src={p} alt="" style={{ '--i': i }} />)}</div>}>
      <ul className="rows ps-ways" data-reveal>
        {WAYS.map(([t, d]) => <li key={t}><b>{t}</b><span>{d}</span></li>)}
      </ul>
      <div className="btns" data-reveal><a className="orange-btn" href="#plans">See plans ↓</a></div>
    </PageHero>
  )
}
