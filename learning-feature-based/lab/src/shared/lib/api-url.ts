export function apiUrl(path: string) {
  const origin = globalThis.location?.origin ?? 'http://localhost:3000'
  return new URL(path, origin).toString()
}
