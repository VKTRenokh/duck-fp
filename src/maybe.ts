/**
 * Represents a Maybe monad, which can contain either a value of type `T` or `null`.
 * @template T - The type of the value contained in the Maybe monad.
 */
export interface Maybe<T> {
  /**
   * Maps over the value contained in the Maybe monad.
   * @template R - The type of the result after applying the mapping function.
   * @param {(_: T) => R} fn - The mapping function.
   * @returns {Maybe<R>} A new Maybe monad containing the mapped value.
   */
  map: <R>(fn: (_: T) => R) => Maybe<R>;

  /**
   * Maps over the value contained in the Maybe monad, allowing nullable results.
   * @template R - The type of the result after applying the mapping function.
   * @param {(v: T) => R | undefined | null} fn - The mapping function.
   * @returns {Maybe<R>} A new Maybe monad containing the mapped value, or `null` if the result is `null` or `undefined`.
   */
  mapNullable: <R>(fn: (v: T) => R | undefined | null) => Maybe<R>;

  /**
   * Checks equality between two Maybe monads.
   * @param {Maybe<unknown>} m - The Maybe monad to compare against.
   * @returns {boolean} `true` if the Maybe monads are equal, otherwise `false`.
   */
  equals: (m: Maybe<unknown>) => boolean;

  /**
   * Applies a function that returns another Maybe monad and flattens the result.
   * @template R - The type of the value contained in the resulting Maybe monad.
   * @param {(v: T) => Maybe<R>} f - The function to apply.
   * @returns {Maybe<R>} A new Maybe monad containing the result of applying the function, or `null` if the original value is `null`.
   */
  flatMap: <R>(f: (v: T) => Maybe<R>) => Maybe<R>;

  /**
   * Gets the value contained in the Maybe monad, or a default value if the Maybe monad is empty.
   * @param {T} dv - The default value to return if the Maybe monad is empty.
   * @returns {T} The value contained in the Maybe monad, or the default value if the Maybe monad is empty.
   */
  getOrElse: (dv: T) => T;

  /**
   * Gets the value contained in the Maybe monad, or a default value if the Maybe monad is empty, returning the value unwrapped.
   * @template R - The type of the default value.
   * @param {R} dv - The default value to return if the Maybe monad is empty.
   * @returns {R | Maybe<T>} The value contained in the Maybe monad, or the default value if the Maybe monad is empty.
   */
  flatGetOrElse: <R>(dv: R) => R | Maybe<T>;

  /**
   * Merges two Maybe monads into one, combining their values into an object.
   * @template R - The type of the value contained in the other Maybe monad.
   * @param {Maybe<R>} om - The other Maybe monad to merge with.
   * @returns {Maybe<{ left: T; right: R }>} A new Maybe monad containing the merged values, or `null` if either Maybe monad is empty.
   */
  merge: <R>(om: Maybe<R>) => Maybe<{ left: T; right: R }>;

  /**
   * Asynchronously maps over the value contained in the Maybe monad.
   * @template R - The type of the result after applying the mapping function.
   * @param {(v: T) => Promise<R>} fn - The async mapping function.
   * @param {(err: unknown) => void} [error] - Optional error handler.
   * @returns {Promise<Maybe<R>>} A promise resolving to a new Maybe monad containing the mapped value, or `null` if the original value is `null`.
   */
  asyncMap: <R>(
    fn: (v: T) => Promise<R>,
    error?: (err: unknown) => void,
  ) => Promise<Maybe<R>>;

  /**
   * The value contained in the Maybe monad.
   * @type {T | null}
   */
  value: T | null;
}
// export interface Maybe<T> {
//   map: <R>(fn: (_: T) => R) => Maybe<R>;
//   mapNullable: <R>(fn: (v: T) => R | undefined | null) => Maybe<R>;
//   equals: (m: Maybe<unknown>) => boolean;
//   flatMap: <R>(f: (v: T) => Maybe<R>) => Maybe<R>;
//   getOrElse: (dv: T) => T;
//   flatGetOrElse: <R>(dv: R) => R | Maybe<T>;
//   asyncMap: <R>(
//     fn: (v: T) => Promise<R>,
//     error?: (err: unknown) => void,
//   ) => Promise<Maybe<R>>;
//   merge: <R>(om: Maybe<R>) => Maybe<{ left: T; right: R }>;
//   value: T | null;
// }

export const maybe = <T>(value: T | null): Maybe<T> => ({
  map: <R>(fn: (_: T) => R) => (value ? maybe<R>(fn(value)) : maybe<R>(null)),
  mapNullable: <R>(fn: (v: T) => R | undefined | null) => {
    if (value === null) {
      return maybe<R>(null);
    }
    const next = fn(value);

    if (next === null || next === undefined) {
      return maybe<R>(null);
    }

    return maybe<R>(next);
  },
  equals: (m) => m.value === value,
  flatMap: <R>(f: (value: T) => Maybe<R>) =>
    value ? f(value) : maybe<R>(null),
  getOrElse: (dv) => (value === null ? dv : value),
  flatGetOrElse: <R>(dv: R) => (value === null ? dv : maybe<T>(value)),
  merge: <R>(om: Maybe<R>): Maybe<{ left: T; right: R }> =>
    maybe<T>(value).flatMap((v: T) => om.map((ov) => ({ left: v, right: ov }))),
  asyncMap: async <R>(
    fn: (v: T) => Promise<R>,
    error?: (err: unknown) => void,
  ): Promise<Maybe<R>> =>
    value === null
      ? maybe<R>(null)
      : fn(value)
          .then((mapped) => maybe(mapped))
          .catch((err) => {
            error?.(err);
            return maybe<R>(null);
          }),
  get value() {
    return value;
  },
});

export type UnwrapMaybe<T extends Maybe<any>> = T extends Maybe<infer U>
  ? U
  : never;
