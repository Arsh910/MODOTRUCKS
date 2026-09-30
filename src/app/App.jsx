import { useEffect } from 'react'
import { usePath } from '../hooks/usePath.js'
import { useReveal } from '../hooks/useReveal.js'
import { resolveRoute } from './routes.js'
import { Nav } from '../components/layout/Nav.jsx'
import { Footer } from '../components/layout/Footer.jsx'

export default function App() {
  const path = usePath().replace(/\/+$/, '') || '/'
  useReveal(path)
  const { Page, props, title } = resolveRoute(path)
  useEffect(() => { document.title = title }, [title])
  return (
    <>
      <Nav path={path} />
      <main key={path}><Page {...props} /></main>
      <Footer />
    </>
  )
}
