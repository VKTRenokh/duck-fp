export interface Lens<T, R> {
  view: (v: T) => R
  set: (v: R, s: T) => T
  compose: <C>(bc: Lens<R, C>) => Lens<T, C>
}

export const from = <T, R>(
  view: Lens<T, R>['view'],
  set: Lens<T, R>['set'],
): Lens<T, R> => ({
  view,
  set,
  compose: <C>(bc: Lens<R, C>): Lens<T, C> =>
    from(
      (a) => bc.view(view(a)),
      (c, a) => set(bc.set(c, view(a)), a),
    ),
})

export const fromProp = <
  K extends symbol | string | number,
  T extends Record<K, unknown>,
>(
  key: K,
): Lens<T, T[K]> =>
  from<T, T[K]>(
    (v) => v[key],
    (v, s) => ({ ...s, [key]: v }),
  )
