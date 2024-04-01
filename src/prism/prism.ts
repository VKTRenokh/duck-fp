import { Maybe, of as some } from '->/maybe'

export interface Prism<T, R> {
  view: (v: T) => Maybe<R>
  set: (v: R, s: T) => T
  compose: <C>(bc: Prism<R, C>) => Prism<T, C>
}

export const prism = <T, R>(
  view: (v: T) => R | null,
  set: Prism<T, R>['set'],
): Prism<T, R> => ({
  view: (v) => some(view(v)),
  set,
  compose: <C>(bc: Prism<R, C>): Prism<T, C> =>
    prism(
      (a) => bc.view(view(a)!).value,
      (c, a) => set(bc.set(c, view(a)!), a),
    ),
})
