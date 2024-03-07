export interface State<T, A> {
  run: (state: T) => [A, T]
  map: <R>(f: (v: A) => R) => State<T, R>
  flatMap: <R>(f: (v: A) => State<T, R>) => State<T, R>
}

export const of = <T, A>(
  rs: (s: T) => [A, T],
): State<T, A> => ({
  run: rs,
  map: <R>(fn: (v: A) => R): State<T, R> =>
    of((oldState) => {
      const [a, b] = rs(oldState)

      return [fn(a), b]
    }),
  flatMap: <R>(fn: (v: A) => State<T, R>) =>
    of((oldState) => {
      const [a, b] = rs(oldState)

      return fn(a).run(b)
    }),
})
