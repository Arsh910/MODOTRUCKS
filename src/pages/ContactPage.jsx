import { Row, Faq } from '../components/mc/Blocks.jsx'
import { EnquiryForm } from '../components/contact/EnquiryForm.jsx'
import { CONTACT_ITEMS, FAQ } from '../data/contact.js'
import '../components/contact/contact.css'

export default function ContactPage() {
  return (
    <>
      <section className="top wrap ct">
        <div className="ct-info">
          <h1 data-reveal>Get in touch.</h1>
          <p className="top-sub" data-reveal style={{ '--d': 1 }}>Tell us your dates and the areas you want. We plan the route, make the ad if you need one, and reply the same day.</p>
          <ul className="ct-list">
            {CONTACT_ITEMS.map(([, label, text, href], i) => (
              <li key={label} data-reveal style={{ '--d': i }}>
                <a href={href} target={href.startsWith('http') ? '_blank' : undefined} rel="noopener"><small>{label}</small><b>{text}</b></a>
              </li>
            ))}
          </ul>
        </div>
        <div className="ct-card" id="enquiry" data-reveal><EnquiryForm /></div>
      </section>

      <div className="dark"><Row n={1} label="FAQ"><Faq items={FAQ} /></Row></div>
    </>
  )
}
