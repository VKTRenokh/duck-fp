import { Maybe } from 'src/maybe'
import { of } from 'src/maybe'

export interface Prism<T, R> {
  view: (v: T) => Maybe<R>
  set: (v: T, s: R) => R
}

export const prism = <T, R>(
  view: (v: T) => R,
  set: Prism<T, R>['set'],
): Prism<T, R> => ({
  view: (v) => of(view(v)),
  set,
})
