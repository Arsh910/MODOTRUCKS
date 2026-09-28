import { EnquiryForm } from '../components/contact/EnquiryForm.jsx'
import { CONTACT_ITEMS, FAQ } from '../data/contact.js'
import '../components/contact/contact.css'

export default function ContactPage() {
  return (
    <>
      {/* details on the left, the form as a card on the right that hangs over the dark band below */}
      <section className="ct">
        <div className="wrap ct-grid">
          <div className="ct-info">
            <h1 data-reveal>Get in touch</h1>
            <p className="ct-lead" data-reveal>Tell us your dates and the areas you want. We plan the route, make the ad if you need one, and reply the same day.</p>
            <ul className="ct-list">
              {CONTACT_ITEMS.map(([icon, label, text, href], i) => (
                <li key={label} data-reveal style={{ '--d': i }}>
                  <svg viewBox="0 0 24 24" aria-hidden="true"><path d={icon} /></svg>
                  <div>
                    <small>{label}</small>
                    <a href={href} target={href.startsWith('http') ? '_blank' : undefined} rel="noopener">{text}</a>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <div className="ct-card" id="enquiry" data-reveal>
            <h2>Say something</h2>
            <EnquiryForm />
          </div>
        </div>
      </section>

      <section className="brown plan-details ct-faq">
        <div className="wrap">
          <h2 data-reveal>Questions</h2>
          <div className="plan-faq">{FAQ.map(([q, a]) => <details key={q} data-reveal><summary>{q}</summary><p>{a}</p></details>)}</div>
        </div>
      </section>
    </>
  )
}
