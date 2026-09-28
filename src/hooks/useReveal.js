import { useEffect } from 'react'

// Fade elements with data-reveal in the first time they scroll into view (re-run per page).
export function useReveal(path) {
  useEffect(() => {
    const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.dataset.in = '' /* an attribute, not a class: React rewrites className on re-render */; io.unobserve(e.target) } }), { rootMargin: '0px 0px -8% 0px' })
    document.querySelectorAll('[data-reveal]').forEach(el => io.observe(el))
    return () => io.disconnect()
  }, [path])
}
