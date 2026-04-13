/**
 * Maps badge icon keys to inline SVGs.
 * PHASE 2: replace with Contentful media field if needed.
 */
const ICONS = {
  aspartame: (
    <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth={2}>
      <circle cx="24" cy="24" r="20" />
      <path d="M16 32 L32 16 M16 16 L32 32" strokeLinecap="round" />
    </svg>
  ),
  gluten: (
    <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth={2}>
      <circle cx="24" cy="24" r="20" />
      <path d="M24 12 L24 36 M18 18 L24 24 L30 18 M18 30 L24 24 L30 30" strokeLinecap="round" />
    </svg>
  ),
  ogm: (
    <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth={2}>
      <circle cx="24" cy="24" r="20" />
      <circle cx="24" cy="24" r="6" />
      <circle cx="24" cy="14" r="3" />
      <circle cx="24" cy="34" r="3" />
      <circle cx="14" cy="24" r="3" />
      <circle cx="34" cy="24" r="3" />
    </svg>
  ),
  sugar: (
    <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth={2}>
      <circle cx="24" cy="24" r="20" />
      <path d="M16 24 L32 24 M20 18 L20 30 M28 18 L28 30" strokeLinecap="round" />
    </svg>
  ),
  lactose: (
    <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth={2}>
      <circle cx="24" cy="24" r="20" />
      <path d="M18 14 L30 14 L30 34 L18 34 Z M18 22 L30 22" />
    </svg>
  ),
  vegan: (
    <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth={2}>
      <circle cx="24" cy="24" r="20" />
      <path d="M16 26 C16 18, 24 14, 32 14 C32 22, 28 30, 16 30 Z" strokeLinejoin="round" />
    </svg>
  ),
}

function BadgeIcon({ icon, className = 'w-12 h-12' }) {
  const svg = ICONS[icon] || ICONS.gluten
  return <div className={`${className} text-[#36474e]`}>{svg}</div>
}

export default BadgeIcon
