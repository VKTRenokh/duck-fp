export interface Reader<T, R> {
  run: (env: T) => R
  map: <B>(fn: (v: R) => B) => Reader<T, B>
  flatMap: <B>(fn: (v: R) => Reader<T, B>) => Reader<T, B>
  ap: <B>(fn: Reader<T, (v: R) => B>) => Reader<T, B>
}

export const of = <T, R>(
  run: (env: T) => R,
): Reader<T, R> => ({
  run,
  map: <B>(fn: (v: R) => B) => of((env: T) => fn(run(env))),
  flatMap: <B>(fn: (v: R) => Reader<T, B>) =>
    of((env: T) => fn(run(env)).run(env)),
  ap: <B>(fn: Reader<T, (v: R) => B>): Reader<T, B> =>
    of((env) => fn.map((fn) => fn(run(env))).run(env)),
})
