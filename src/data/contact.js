import { PHONE, PHONE_CA, EMAIL, ADDRESS, WHATSAPP, MAP_LINK } from '../config/site.js'

export const FAQ = [
  ['How much does it cost?', 'It depends on the plan, the shift, how many days and where you want to go. Call or WhatsApp us and we send your quote the same day.'],
  ['I don’t have an ad. Can you make one?', 'Yes. Design, motion graphics, 3D and video shoots are all done in house, quoted separately from the booking.'],
  ['Can I change my ad once the truck is on the road?', 'No. You approve the final ad at least 48 hours before your booking starts, and that version runs for the whole booking.'],
  ['How do I know the truck actually ran my ad?', 'After every booking you get the GPS log of the route, plus photos and video of your ad on the road.'],
  ['Can the truck go outside the Tricity?', 'Yes. Travel is quoted separately; tell us the destination when you book.'],
]

// Contact list on the left of the Contact page: [icon, label, text, link].
export const CONTACT_ITEMS = [
  ['M4 5l8 7 8-7M4 5h16v14H4Z', 'Email', EMAIL, `mailto:${EMAIL}`],
  ['M8 3h8a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1H8a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1Zm3 15h2', 'Call or WhatsApp', PHONE, `https://wa.me/${WHATSAPP}`],
  ['M8 3h8a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1H8a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1Zm3 15h2', 'Canada', PHONE_CA, 'tel:+16475134802'],
  ['M12 21s-7-6.2-7-11.5a7 7 0 0 1 14 0C19 14.8 12 21 12 21Zm0-9a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z', 'Office · get directions', ADDRESS, MAP_LINK],
]
