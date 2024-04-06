export const side =
  <T>(f: (v: T) => void) =>
  (v: T) => (f(v), v)
