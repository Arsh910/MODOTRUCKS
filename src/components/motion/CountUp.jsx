import { useEffect, useRef, useState } from 'react'

// Counts a figure like "14.27 lakh" or "51%" up from zero the first time it comes into view.
export function CountUp({ value }) {
  const m = value.match(/^([\d.]+)(.*)$/)
  const target = m ? parseFloat(m[1]) : 0, rest = m ? m[2] : value
  const decimals = m?.[1].split('.')[1]?.length ?? 0
  const [n, setN] = useState(m ? 0 : null)
  const ref = useRef(null)
  useEffect(() => {
    if (!m || matchMedia('(prefers-reduced-motion: reduce)').matches) return setN(target)
    let raf = 0
    const io = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return
      io.disconnect()
      const t0 = performance.now()
      const tick = t => {
        const k = Math.min(1, (t - t0) / 1400), ease = 1 - Math.pow(1 - k, 3)
        setN(target * ease)
        if (k < 1) raf = requestAnimationFrame(tick)
      }
      raf = requestAnimationFrame(tick)
    }, { threshold: .4 })
    io.observe(ref.current)
    return () => { io.disconnect(); cancelAnimationFrame(raf) }
  }, []) // eslint-disable-line
  return <span ref={ref}>{n === null ? value : n.toFixed(decimals) + rest}</span>
}
