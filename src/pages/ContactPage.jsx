import { EnquiryForm } from '../components/contact/EnquiryForm.jsx'
import { CONTACT_ITEMS, FAQ } from '../data/contact.js'
import '../components/contact/contact.css'

export default function ContactPage() {
  return (
    <>
      {/* split: details on the left half, the form filling the right half */}
      <section className="split ct">
        <div className="split-l">
          <div>
            <p className="dot-label" data-reveal>Contact</p>
            <h1 data-reveal>Get in touch</h1>
            <p className="split-lead" data-reveal>Tell us your dates and the areas you want. We plan the route, make the ad if you need one, and reply the same day.</p>
          </div>
          <ul className="rows ct-list">
            {CONTACT_ITEMS.map(([, label, text, href], i) => (
              <li key={label} data-reveal style={{ '--d': i }}>
                <a href={href} target={href.startsWith('http') ? '_blank' : undefined} rel="noopener"><b>{text}</b><span>{label}</span></a>
              </li>
            ))}
          </ul>
        </div>
        <div className="split-r ct-form" id="enquiry">
          <EnquiryForm />
        </div>
      </section>

      <section className="sec">
        <div className="wrap list2">
          <div className="list2-l"><h2 data-reveal>Questions</h2></div>
          <div className="faq">{FAQ.map(([q, a]) => <details key={q} data-reveal><summary>{q}</summary><p>{a}</p></details>)}</div>
        </div>
      </section>
    </>
  )
}
