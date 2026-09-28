import { PAGES, CONTACT_CARD } from '../../data/explore.js'
import { BOOK_LINK } from '../../config/site.js'
import { EXPLORE_ART } from './ExploreArt.jsx'

// Bento grid of the other pages: each card has a small drawing of what that page is about.
// 5 cards: two wide on top, then one wide and two small. 4 cards: two rows of two.
export function NextLinks({ skip, title = 'Plan your campaign' }) {
  const items = [...PAGES, CONTACT_CARD].filter(([h]) => h !== skip)
  return (
    <section className="warm explore">
      <div className="wrap">
        <div className="explore-head">
          <h2 data-reveal>{title}</h2>
          <a className="dark-btn" href={BOOK_LINK} data-reveal>Book Now</a>
        </div>
        <div className={`explore-grid n${items.length}`}>
          {items.map(([h, t, d], i) => {
            const Art = EXPLORE_ART[h]
            return (
            <a key={h} href={h} className="explore-card" data-reveal style={{ '--d': i }}>
              <Art />
              <div className="explore-txt">
                <h3>{t} <span aria-hidden="true">→</span></h3>
                <p>{d}</p>
              </div>
            </a>
            )
          })}
        </div>
      </div>
    </section>
  )
}
