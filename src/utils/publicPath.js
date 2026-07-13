export function publicPath(path = '') {
  const value = String(path)
  if (/^https?:\/\//i.test(value)) return value

  const base = import.meta.env.BASE_URL
  const relative = value.replace(/^\//, '')
  return `${base}${relative}`
}
