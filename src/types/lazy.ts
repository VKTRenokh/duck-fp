/**
 * Lazy argument
 * @template T - Type of lazy argument
 */
export interface Lazy<T> {
  (): T
}
