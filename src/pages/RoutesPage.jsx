import { Top, Row, Caps } from '../components/mc/Blocks.jsx'
import { AreaMap } from '../components/routes/AreaMap.jsx'
import { ROUTE_NOTES } from '../data/routes.js'

export default function RoutesPage() {
  return (
    <>
      <Top title="Seen across every sector of the Tricity." sub="Chandigarh, Mohali, Zirakpur and Panchkula. Tell us the areas that matter and we plan the route with you."
        media={<div className="top-card"><img src="/img/bg-sukhna.jpg" alt="" /><p className="corner l">Routes</p><p className="corner r">Sukhna Lake, Chandigarh</p></div>} />

      <Row n={1} label="Popular areas" title="The spots brands ask for most." lead="Anywhere else in the Tricity works too." wide={<AreaMap />} />

      <div className="dark">
        <Row n={2} label="Planning" title="How the route is planned." wide={<Caps items={ROUTE_NOTES.map(([t, d], i) => [t, d, String(i + 1).padStart(2, '0')])} />} />
      </div>
    </>
  )
}
