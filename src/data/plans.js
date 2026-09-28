// One page per plan. Photos in `gallery` are placeholders: swap them for MODO's own shots
// of each plan in action when the shoot is ready. Each item: [image, title, one-sentence description].
export const PLANS = {
  whole: {
    no: '01', name: 'Whole screen', tag: 'One brand, the whole truck',
    title: 'Your ad. The whole truck. The whole shift.',
    lead: 'Only your ad on the screen, nonstop, on the route you pick. The strongest way to own an area for a day.',
    hero: '/img/bg-expressway.jpg',
    card: { t: 'Whole screen: your ad is the only thing on screen, all shift', meta: 'From one\nshift' },
    what: ['What it means', 'For the full shift, the side and back of the truck show nothing but your ad. You choose the sectors, markets and roads, and we plan the timing so the truck reaches them when they are busiest.'],
    gallery: [
      ['/img/seen-cars.jpg', 'Seen by everyone at the signal', 'Every car in the queue faces your ad for as long as the light stays red. No skip button, no scrolling past.'],
      ['/img/tricity-osm.jpg', 'On the roads you choose', 'Pick the sectors and markets. We time the route to reach them at their busiest.'],
      ['/img/proof-night.jpg', 'Brightest thing after dark', 'On the evening shift the screen glows over the traffic and markets.'],
    ],
    details: [['Screen time', 'The full shift, nonstop'], ['Shifts', 'Morning 8 AM – 1 PM, evening 5 PM – 10 PM, or both'], ['Route', 'You pick it, we plan the timing'], ['Days', 'Tuesday to Sunday'], ['Great for', 'Launches, sale days, new showrooms, owning an area'], ['To confirm', '50% advance locks your dates']],
    faq: [['Can I change the route on the day?', 'The route is planned with you before the booking. Small changes are fine if you tell us before the shift starts.'], ['Can I book more than one day?', 'Yes. Book as many dates as you like. Runs longer than 7 days get a custom quote.']],
  },
  shared: {
    no: '02', name: 'Share the screen', tag: 'Up to 6 brands take turns',
    title: 'Share the truck. Share the cost.',
    lead: 'Up to six brands on one loop. Your ad plays for 30 to 60 seconds, the others take their turn, then it’s you again, all shift long.',
    hero: '/img/bg-interchange.jpg',
    card: { t: 'Share the screen: the most affordable way to try the truck', meta: 'Reserve\nfree' },
    what: ['What it means', 'The screen plays a loop of up to six ads. Every few minutes your ad comes round again, on a busy route we plan through the Tricity. A shift goes ahead once three brands have joined, and the cost is split between the brands on it.'],
    gallery: [
      ['/img/hero-night.jpg', 'A busy route through the markets', 'We plan one route through the Tricity’s busiest roads, so every brand on the loop gets the same crowds.'],
      ['/img/seen-cars.jpg', 'Your turn every few minutes', 'Six brands take turns. Your ad comes round again and again, all shift long.'],
      ['/img/bg-avenue.jpg', 'Seen in every sector', 'Different areas all day, so your ad reaches new people at each stop.'],
    ],
    details: [['Screen time', '30–60 seconds per turn, on repeat'], ['Brands per shift', 'Up to 6'], ['Runs when', '3 of 6 brands have joined'], ['Route', 'A busy route we plan'], ['Great for', 'Trying the truck on a smaller budget'], ['To reserve', 'Free. You pay your share once the shift confirms']],
    faq: [['What if my shift doesn’t get 3 brands?', 'We check every shared shift 48 hours before it starts. If it hasn’t reached 3 brands, you choose: take the whole shift, or run it with the brands already booked and share the cost.'], ['Will my ad play next to a competitor?', 'Tell us who your competitors are when you book and we keep them off your shift.']],
  },
  event: {
    no: '03', name: 'Parked at your event', tag: 'One date, at your venue',
    title: 'The screen, parked at your event.',
    lead: 'Openings, weddings, exhibitions and screenings. The truck parks at your venue and the screen stays on for as long as you need it.',
    hero: '/img/bg-sukhna.jpg',
    card: { t: 'Parked at your event: a giant screen at your venue', meta: '4, 8 or\n10 hours' },
    what: ['What it means', 'Instead of driving a route, the truck parks where your guests are. Play your ads, a countdown, a highlight reel, or a live feed of the event itself, filmed by our team and shown on the screen as it happens.'],
    gallery: [
      ['/img/bg-sukhna.jpg', 'Parked where your guests gather', 'The truck parks at your venue, screen facing the crowd, for 4, 8 or 10 hours.'],
      ['/img/camera-rig.jpg', 'Live filming on the screen', 'Our crew films the event and plays it on the screen as it happens.'],
      ['/img/proof-night.jpg', 'Bright for evening events', 'Readable in daylight, glowing after dark.'],
    ],
    details: [['Duration', '4, 8 or 10 hours'], ['Where', 'Your venue, in or outside the Tricity'], ['Content', 'Your ads, videos or a live camera feed'], ['Live filming', 'Optional, by our in-house crew'], ['Great for', 'Openings, weddings, exhibitions, screenings'], ['To confirm', 'Full payment locks the date']],
    faq: [['Do you need power at the venue?', 'No. The truck runs its own screen. We only need a spot to park where the screen faces your guests.'], ['Can you go outside the Tricity?', 'Yes. Travel is quoted separately; tell us the venue when you book.']],
  },
}

// How the truck's day works. Shown before the plan cards, since every plan runs on this schedule.
export const SHIFTS = [
  ['8 AM – 1 PM', 'Morning shift', 'Office rush and markets opening, in bright daylight.'],
  ['5 PM – 10 PM', 'Evening shift', 'Home time, then markets. After dark the screen is the brightest thing on the road.'],
  ['1 PM – 5 PM', 'Off the road', 'The quiet, hottest hours. The truck refuels and moves to the evening route.'],
  ['Mondays', 'Closed on Mondays', 'The quietest day for Tricity shops and restaurants. The truck runs Tuesday to Sunday.'],
]
