import { Lazy } from './lazy'

/**
 * just like `Lazy` but returns a promise
 * useful for removing nested generics
 * @template T - type of lazy argument that is going to be wrapped in promise
 * @see {@link Lazy}
 */
export interface LazyPromise<T> {
  (): Promise<T>
}
