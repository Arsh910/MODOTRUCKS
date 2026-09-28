import { BOOK_LINK, PHONE, PHONE_HREF } from '../../config/site.js'

// Photo header shared by every inner page.
export function PageHero({ img, label, title, lead, cta = 'Book Now' }) {
  return (
    <section className="plan-hero">
      <img src={img} alt="" />
      <div className="wrap">
        <p className="plan-no">{label}</p>
        <h1>{title}</h1>
        <p className="plan-lead">{lead}</p>
        <div className="plan-ctas">
          <a className="nav-btn" href={BOOK_LINK}>{cta}</a>
          <a className="ghost-btn" href={PHONE_HREF}>Call {PHONE}</a>
        </div>
      </div>
    </section>
  )
}
