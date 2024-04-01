import { Maybe, of as some } from '->/maybe'

export interface Prism<T, R> {
  view: (v: T) => Maybe<R>
  set: (v: R, s: T) => T
  compose: <C>(bc: Prism<R, C>) => Prism<T, C>
}

export const of = <T, R>(
  view: (v: T) => R | null,
  set: Prism<T, R>['set'],
): Prism<T, R> => ({
  view: (v) => some(view(v)),
  set,
  compose: <C>(bc: Prism<R, C>): Prism<T, C> =>
    of(
      (a) => bc.view(view(a)!).value,
      (c, a) => set(bc.set(c, view(a)!), a),
    ),
})

export const fromProp = <T, K extends keyof T>(
  key: K,
): Prism<T, T[K]> =>
  of(
    (v) => v[key],
    (v, s) => ({ ...s, [key]: v }),
  )
