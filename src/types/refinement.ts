export interface Refinement<T, B extends T> {
  (v: T): v is B
}
