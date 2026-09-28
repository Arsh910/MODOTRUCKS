import { useEffect, useState } from 'react'

// Tiny router: same-origin links change the page without a reload.
export function usePath() {
  const [path, setPath] = useState(location.pathname)
  useEffect(() => {
    const onClick = e => {
      const a = e.target.closest('a[href]')
      if (!a || a.target || e.button || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return
      const u = new URL(a.href)
      if (u.origin !== location.origin) return
      e.preventDefault()
      if (u.pathname === location.pathname) {
        if (u.hash) { history.replaceState(null, '', u.hash); document.querySelector(u.hash)?.scrollIntoView({ behavior: 'smooth' }) }
        return
      }
      history.pushState(null, '', u.pathname + u.hash)
      setPath(u.pathname)
    }
    const onPop = () => setPath(location.pathname)
    document.addEventListener('click', onClick); addEventListener('popstate', onPop)
    return () => { document.removeEventListener('click', onClick); removeEventListener('popstate', onPop) }
  }, [])
  // new page: jump to its #section if the link had one, else to the top
  useEffect(() => {
    const el = location.hash && document.querySelector(location.hash)
    if (el) el.scrollIntoView()
    else scrollTo(0, 0)
  }, [path])
  return path
}
