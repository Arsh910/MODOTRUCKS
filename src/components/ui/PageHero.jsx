import { BOOK_LINK, PHONE, PHONE_HREF } from '../../config/site.js'

// Split header shared by the inner pages: words on the left half, a picture (or `art`) filling the right.
export function PageHero({ img, art, label, title, lead, cta = 'Book Now', children, foot = 'Chandigarh · Mohali · Zirakpur · Panchkula' }) {
  return (
    <section className="split">
      <div className="split-l">
        <div>
          <p className="dot-label" data-reveal>{label}</p>
          <h1 data-reveal>{title}</h1>
          {lead && <p className="split-lead" data-reveal>{lead}</p>}
          {children ?? (
            <div className="btns" data-reveal>
              <a className="orange-btn" href={BOOK_LINK}>{cta}</a>
              <a className="box-btn" href={PHONE_HREF}>Call {PHONE}</a>
            </div>
          )}
        </div>
        <p className="split-foot">{foot}</p>
      </div>
      <div className="split-r">{art ?? <img className="cover" src={img} alt="" />}</div>
    </section>
  )
}
