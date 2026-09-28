// How It Works content.

export const STEPS = [
  ['Send a request', 'Pick a plan, a shift and your dates. It takes two minutes.'],
  ['Get your quote', 'We confirm availability and send your quote the same day.'],
  ['Approve your ad', 'Send your ad or let us make one. Approve it 48 hours before.'],
  ['On the road', 'The truck runs your route. GPS log, photos and video after.'],
]

// "Your ad: bring it, or we make it". `card` is what the floating card over the photo shows for that option.
export const CREATIVE = [
  { t: 'Send us your ad', d: 'Already have a video or design? We share the specs for the L-shaped screen and check it on the truck before your booking. No production cost.',
    icon: 'M12 16V4M7 9l5-5 5 5M4 16v4h16v-4',
    card: { tag: 'Screen specs', title: 'What to send', rows: [['Side screen', '8 × 6 ft'], ['Back screen', '6 × 6 ft'], ['Format', 'Video or still'], ['Length', '30–60 s']] } },
  { t: 'MODO makes it', d: 'Our in-house team designs it: motion graphics, 3D that pops out, or a video shoot. Quoted separately from the booking.',
    icon: 'M4 7h11v10H4ZM15 10l5-3v10l-5-3',
    card: { tag: 'In-house team', title: 'What we make', rows: [['Motion graphics', '✓'], ['3D that pops out', '✓'], ['Video shoot', '✓'], ['Built for the L-screen', '✓']] } },
  { t: 'Locked before the run', d: 'You approve the final ad at least 48 hours before. That version runs for the whole booking.',
    icon: 'M7 11V8a5 5 0 0 1 10 0v3M5 11h14v10H5Z',
    card: { tag: 'Locked 48 h before', title: 'Approval', rows: [['Draft shared', '✓'], ['Your changes', '✓'], ['Final approved', '✓'], ['Runs as approved', '✓']] } },
]

// Small feature cards under it.
export const AD_PERKS = [
  ['Checked on the truck', 'We play your ad on the real screen before the run.', 'M5 12l4 4 10-10'],
  ['No production cost', 'Bring a ready ad and pay only for screen time.', 'M12 3v18M17 7H9.5a2.5 2.5 0 0 0 0 5h5a2.5 2.5 0 0 1 0 5H7'],
  ['Made for the corner', 'Content that wraps the back and side as one.', 'M4 20V8l8-4 8 4v12M12 4v16M4 8l8 4 8-4'],
  ['Same day reply', 'Send a brief, get a plan and quote the same day.', 'M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18Zm0 4v5l3.5 2'],
]
