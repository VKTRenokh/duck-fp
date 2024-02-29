export interface State<T, A> {
  run: (state: T) => [T, A]
  map: <R>(f: (v: A) => R) => State<T, R>
  flatMap: <R>(f: (v: A) => State<T, R>) => State<T, R>
}

export const of = <T, A>(
  rs: (s: T) => [T, A],
): State<T, A> => ({
  run: rs,
  map: <R>(fn: (v: A) => R): State<T, R> =>
    of((oldState) => {
      const [a, b] = rs(oldState)

      return [a, fn(b)] as const
    }),
  flatMap: <R>(fn: (v: A) => State<T, R>) =>
    of((oldState) => {
      const [a, b] = rs(oldState)

      return fn(b).run(a)
    }),
})
