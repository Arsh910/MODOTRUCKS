import { useEffect, useRef } from 'react'

// A big line whose words light up one by one as it scrolls up the screen.
// Sets --p (0 → 1) on the element; each word lights once --p passes its share of the line.
export function ScrollText({ as: Tag = 'p', text, className = '' }) {
  const ref = useRef(null)
  const words = text.split(' ')
  useEffect(() => {
    const el = ref.current
    let raf = 0
    const update = () => {
      raf = 0
      const r = el.getBoundingClientRect(), vh = innerHeight
      // 0 when the top enters at 90% of the screen, 1 when the bottom reaches 45%
      const p = (vh * .9 - r.top) / (vh * .45 + r.height)
      el.style.setProperty('--p', Math.max(0, Math.min(1, p)).toFixed(3))
    }
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(update) }
    update()
    addEventListener('scroll', onScroll, { passive: true })
    return () => { removeEventListener('scroll', onScroll); cancelAnimationFrame(raf) }
  }, [])
  return (
    <Tag ref={ref} className={`scroll-text ${className}`}>
      {words.map((w, i) => <span key={i} style={{ '--w': i / words.length }}>{w} </span>)}
    </Tag>
  )
}
