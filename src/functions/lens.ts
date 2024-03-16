export interface Lens<T, R> {
  get: (v: T) => R
  set: (v: T) => T
}

export const lens = <T, R>(
  get: Lens<T, R>['get'],
  set: Lens<T, R>['set'],
): Lens<T, R> => ({
  get,
  set,
})
