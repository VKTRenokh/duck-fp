import { Merged } from 'src/types/merged'

export interface Identity<T> {
  map: <R>(f: (v: T) => R) => Identity<R>
  flatMap: <R>(f: (v: T) => Identity<R>) => Identity<R>
  merge: <R>(oi: Identity<R>) => Identity<Merged<T, R>>
  value: T
}

export const of = <T>(value: T): Identity<T> => ({
  map: <R>(f: (v: T) => R) => of(f(value)),
  flatMap: <R>(f: (v: T) => Identity<R>) => f(value),
  merge: <R>(oi: Identity<R>) =>
    of(value).flatMap((left) =>
      oi.map((right) => ({ left, right })),
    ),
  value,
})
