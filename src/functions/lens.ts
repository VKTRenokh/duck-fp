export interface Lens<T, R> {
  view: (v: T) => R
  set: (v: R, s: T) => T
}

export const lens = <T, R>(
  view: Lens<T, R>['view'],
  set: Lens<T, R>['set'],
): Lens<T, R> => ({
  view,
  set,
})

export const lensKey = <
  K extends symbol | string | number,
  T extends Record<K, unknown>,
>(
  key: K,
): Lens<T, T[K]> =>
  lens<T, T[K]>(
    (v) => v[key],
    (v, s) => ({ ...s, [key]: v }),
  )

export const composeLens = <A, B, C>(
  ab: Lens<A, B>,
  bc: Lens<B, C>,
): Lens<A, C> => ({
  view: (a) => bc.view(ab.view(a)),
  set: (c, a) => ab.set(bc.set(c, ab.view(a)), a),
})
