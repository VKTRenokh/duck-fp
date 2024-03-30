export type ReturnTypes<
  A extends readonly unknown[],
  T extends ((...a: A) => unknown)[],
> = {
  [K in keyof T]: T[K] extends (...a: infer _A) => infer U
    ? U
    : never
}

/**
 * @example
 *
 * const add = (num: number) => (toAdd: number) => num + toAdd
 * const double = (num: number) => num * 2
 * const quadriple = (num: number) => double(double(num))
 * const toString = (num: number) => num.toString()
 *
 * const a = multiple(
 *  add(10),
 * )
 *
 * a() // Output: [ 60, 100, 200, 140, "50" ]
 * @returns result of all computations passed in
 */
export const multiple =
  <
    A extends readonly any[],
    F extends (...a: A) => any,
    T extends ((...a: A) => any)[],
  >(
    ...fns: T extends Array<(...a: A) => any>
      ? [F, ...T]
      : T
  ) =>
  (...a: A): ReturnTypes<A, [F, ...T]> =>
    fns.map((fn) => fn(...a)) as ReturnTypes<A, [F, ...T]>
