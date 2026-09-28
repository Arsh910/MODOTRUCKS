// Landing page content.

// The case for the truck in four numbers. Each row: label + figure on one side, the meaning and a small line drawing on the other.
export const FACTS = [
  { v: '5 hrs', l: 'On the phone, daily', d: 'The average Indian spends five hours a day on a phone. Every brand is fighting for that same small screen.', art: 'rings' },
  { v: '51%', l: 'Of ad spend is digital', d: 'Half of all ad money in India goes to digital, crowding into one feed that people scroll straight past.', art: 'dash' },
  { v: '14.27 lakh', l: 'Vehicles in Chandigarh', d: 'More vehicles than people. The highest vehicle density in India, all stopping at the same signals.', art: 'split' },
  { v: '104', l: 'New vehicles a day', d: 'Every day, another hundred pairs of eyes join the Tricity\'s roads, and they have to wait at the lights.', art: 'target' },
]
export const FACT_ART = {
  rings: <><circle cx="38" cy="50" r="30" /><circle cx="62" cy="50" r="30" /></>,
  dash: <><circle cx="50" cy="50" r="34" strokeDasharray="6 7" /><circle cx="50" cy="50" r="18" /></>,
  split: <><circle cx="50" cy="50" r="36" /><path d="M50,14 V86" /><path d="M50,14 A20,36 0 0 1 50,86" /></>,
  target: <><circle cx="50" cy="50" r="36" /><circle cx="50" cy="50" r="24" /><circle cx="50" cy="50" r="12" /><circle cx="50" cy="50" r="2" fill="currentColor" /></>,
}
