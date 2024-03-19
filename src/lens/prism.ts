import { Maybe } from '../maybe'
import { of } from '../maybe'

export interface Prism<T, R> {
  view: (v: T) => Maybe<R>
  set: (v: R, s: T) => T
}

export const prism = <T, R>(
  view: (v: T) => R,
  set: Prism<T, R>['set'],
): Prism<T, R> => ({
  view: (v) => of(view(v)),
  set,
})

export const composePrism = <A, B, C>(
  ab: Prism<A, B>,
  bc: Prism<B, C>,
): Prism<A, C> => ({
  view: (a) => ab.view(a).flatMap((view) => bc.view(view)),
  set: (c, a) =>
    ab.view(a).map((view) => ab.set(bc.set(c, view), a))
      .value!,
})
