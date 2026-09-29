import { PAGES, CONTACT_CARD } from '../../data/explore.js'
import { BOOK_LINK } from '../../config/site.js'
import { EXPLORE_ART } from './ExploreArt.jsx'

// The other pages as a row of panels: one is open, the rest are cropped strips; hovering a strip opens it.
// On phones they become a swipe row.
export function NextLinks({ skip, title = 'Plan your campaign' }) {
  const items = [...PAGES, CONTACT_CARD].filter(([h]) => h !== skip)
  return (
    <section className="warm explore">
      <div className="wrap">
        <div className="explore-head">
          <h2 data-reveal>{title}</h2>
          <a className="orange-btn" href={BOOK_LINK} data-reveal>Book Now</a>
        </div>
        <p className="swipe-hint">Swipe</p>
        <div className="xs" data-reveal>
          {items.map(([h, t, d], i) => {
            const Art = EXPLORE_ART[h]
            return (
              <a key={h} href={h} className="xs-card">
                <div className="xs-in">
                  <h3>{t}</h3>
                  <p>{d}</p>
                  <Art />
                  <div className="xs-foot"><small>{String(i + 1).padStart(2, '0')}</small><span>Open <span aria-hidden="true">→</span></span></div>
                </div>
              </a>
            )
          })}
        </div>
      </div>
    </section>
  )
}
