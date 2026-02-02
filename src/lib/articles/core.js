export function slugifyTitle(title) {
  if (!title || typeof title !== 'string') return ''
  return title
    .trim()
    .toLowerCase()
    .replace(/['"]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

export function isValidIsoDate(dateString) {
  if (!dateString || typeof dateString !== 'string') return false
  if (!/^\d{4}-\d{2}-\d{2}$/.test(dateString)) return false
  const date = new Date(`${dateString}T00:00:00Z`)
  if (Number.isNaN(date.getTime())) return false
  const [year, month, day] = dateString.split('-').map((v) => Number(v))
  return (
    date.getUTCFullYear() === year &&
    date.getUTCMonth() + 1 === month &&
    date.getUTCDate() === day
  )
}

export function formatDateLong(dateString) {
  if (!isValidIsoDate(dateString)) return dateString
  const date = new Date(`${dateString}T00:00:00Z`)
  return new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'long', day: 'numeric' }).format(date)
}

