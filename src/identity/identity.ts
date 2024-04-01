import { Merged } from '->t/merged'

export interface Identity<T> {
  map: <R>(f: (v: T) => R) => Identity<R>
  flatMap: <R>(f: (v: T) => Identity<R>) => Identity<R>
  merge: <R>(oi: Identity<R>) => Identity<Merged<T, R>>
  ap: <R>(f: Identity<(v: T) => R>) => Identity<R>
  value: T
}

export const of = <T>(value: T): Identity<T> => ({
  map: <R>(f: (v: T) => R) => of(f(value)),
  flatMap: <R>(f: (v: T) => Identity<R>) => f(value),
  merge: <R>(oi: Identity<R>) =>
    of(value).flatMap((left) =>
      oi.map((right) => ({ left, right })),
    ),
  ap: <R>(f: Identity<(v: T) => R>): Identity<R> =>
    f.map((fn) => fn(value)),
  value,
})
