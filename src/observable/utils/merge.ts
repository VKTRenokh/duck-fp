import {
  Observable,
  UnwrapObservable,
  of,
} from '../observable'

export type UnwrapObservableArray<
  T extends Array<Observable<any>>,
> = {
  [K in keyof T]: UnwrapObservable<T[K]>
}

export const merge = <
  T extends Observable<any>[],
  TU = UnwrapObservableArray<T>,
>(
  ...o: T
): Observable<TU> => {
  const observable = o.reduce(
    (acc, curr, index) => {
      curr.observe((v) => {
        observable.map((vs) => {
          const array = [...vs]
          return (array[index] = v), observable.next(array)
        })
      }, true)
      return acc.flatMap((v) =>
        curr.map((ov) => [...v, ov]),
      )
    },
    of<UnwrapObservableArray<T>>(
      [] as UnwrapObservableArray<T>,
    ),
  )

  return observable
}
