/**
 * lazy argument
 * usage in `Task`, `State`
 */
export interface Lazy<T> {
  (): T
}
