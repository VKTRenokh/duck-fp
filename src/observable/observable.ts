export type Observer<T> = (v: T) => void

export interface Observation<T> {
  value: T
  unobserve: () => void
}

export interface Observable<T> {
  map: <R>(f: (v: T) => R) => Observable<R>
  flatMap: <R>(f: (v: T) => Observable<R>) => Observable<R>
  observe: (
    o: Observer<T>,
    call?: boolean,
  ) => Observation<T>
  next: (v: T) => Observable<T>
  dependingNext: (fn: (v: T) => T) => Observable<T>
}

export const of = <T>(v: T): Observable<T> => {
  let value = v
  const observers: Observer<T>[] = []

  const notify = () =>
    observers.forEach((observer) => observer(value))

  return {
    map: <R>(fn: (v: T) => R) => of(fn(value)),
    flatMap: <R>(fn: (v: T) => Observable<R>) => fn(value),
    observe: (o: Observer<T>, call?: boolean) => {
      const index = observers.push(o)
      call && o(value)

      return {
        value,
        unobserve: () => observers.splice(index, 1),
      }
    },
    next: (v: T) => ((value = v), notify(), of(v)),
    dependingNext: (fn: (v: T) => T) => {
      const nv = fn(v)
      return (value = nv), notify(), of(nv)
    },
  }
}

export type UnwrapObservable<T extends Observable<any>> =
  T extends Observable<infer R> ? R : never
