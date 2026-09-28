import HomePage from '../pages/HomePage.jsx'
import ScreenPage from '../pages/ScreenPage.jsx'
import HowItWorksPage from '../pages/HowItWorksPage.jsx'
import PlansPage from '../pages/PlansPage.jsx'
import PlanDetailPage from '../pages/PlanDetailPage.jsx'
import RoutesPage from '../pages/RoutesPage.jsx'
import ContactPage from '../pages/ContactPage.jsx'
import { NAV_LINKS } from '../config/site.js'
import { PLANS } from '../data/plans.js'

const PAGES = { '/': HomePage, '/screen': ScreenPage, '/how-it-works': HowItWorksPage, '/plans': PlansPage, '/routes': RoutesPage, '/contact': ContactPage }
const SITE = 'MODO Screen Truck'

// Turn a URL path into the page to show, its props, and the tab title. Unknown paths show the home page.
export function resolveRoute(path) {
  const plan = path.match(/^\/plans\/(\w+)$/)?.[1]
  if (PLANS[plan]) return { Page: PlanDetailPage, props: { id: plan }, title: `${PLANS[plan].name} | ${SITE}` }
  const name = NAV_LINKS.find(([h]) => h === path)?.[1]
  return { Page: PAGES[path] || HomePage, props: {}, title: name ? `${name} | ${SITE}` : `${SITE} | LED advertising truck in the Tricity` }
}
