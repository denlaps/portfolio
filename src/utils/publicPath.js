export function publicPath(path = '') {
  const base = import.meta.env.BASE_URL
  const relative = String(path).replace(/^\//, '')
  return `${base}${relative}`
}
