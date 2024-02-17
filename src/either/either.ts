/**
 * Represents a function that folds over the value of either the left or right side of an `Either`.
 * @template Left The type of the left side of the `Either`. @template Right The type of the right side of the `Either`.
 */
export type FoldFunction<Left, Right> = <R>(
  /**
   * A function to apply if the `Either` is on the left side.
   * @param {Left} e The value on the left side.
   * @returns {R} The result of applying the function to the left side value.
   */
  lfn: (e: Left) => R,
  /**
   * A function to apply if the `Either` is on the right side.
   * @param {Right} v The value on the right side.
   * @returns {R} The result of applying the function to the right side value.
   */
  rfn: (v: Right) => R,
) => R

/**
 * Represents a function that maps over the value of the right side of an `Either`.
 * @template Left The type of the left side of the `Either`.
 * @template Right The type of the right side of the `Either`.
 */
export type MapFunction<Left, Right> = <R>(
  /**
   * A function to apply to the right side value.
   * @param {Right} v The value on the right side.
   * @returns {R} The result of applying the function to the right side value.
   */
  fn: (v: Right) => R,
) => Either<Left, R>

/**
 * Represents a function that applies a function to the value on the right side of an `Either`
 * and returns a new `Either`.
 * @template Left The type of the left side of the `Either`.
 * @template Right The type of the right side of the `Either`.
 */
export type FlatMapFunction<Left, Right> = <R>(
  /**
   * A function to apply to the value on the right side of the `Either`.
   * @param {Right} v The value on the right side.
   * @returns {Either<Left, R>} A new `Either` resulting from applying the function to the right side value.
   */
  fn: (v: Right) => Either<Left, R>,
) => Either<Left, R>
/**
 * Represents the left side of an `Either`.
 * @template T The type of the value stored on the left side.
 * @template R The type of the value stored on the right side.
 */
export interface Left<T, R> {
  /** The value stored on the left side. */
  readonly left: T

  /** Checks if this `Either` is on the right side. */
  isRight: () => false

  /** Checks if this `Either` is on the left side. */
  isLeft: () => true

  /**
   * Folds over the value of this `Either`.
   * @param {(e: T) => R} lfn A function to apply if this `Either` is on the left side.
   * @param {(v: R) => R} rfn A function to apply if this `Either` is on the right side.
   * @returns {R} The result of applying the appropriate function to the value stored in this `Either`.
   */
  fold: FoldFunction<T, R>

  /**
   * Maps over the value on the right side of this `Either`.
   * @param {(v: R) => Re} _: A function to apply to the value on the right side (ignored for `Left`).
   * @returns {Either<T, Re>} A new `Either` with the same left side and the result of applying the function to the right side.
   */
  map: MapFunction<T, R>

  flatMap: FlatMapFunction<T, R>
}

/**
 * Represents the right side of an `Either`.
 * @template T The type of the value stored on the right side.
 * @template R The type of the value stored on the left side.
 */
export interface Right<T, R> {
  /** The value stored on the right side. */
  readonly right: T

  /** Checks if this `Either` is on the right side. */
  isRight: () => true

  /** Checks if this `Either` is on the left side. */
  isLeft: () => false

  /**
   * Folds over the value of this `Either`.
   * @param {(e: R) => T} _: A function to apply if this `Either` is on the left side (ignored for `Right`).
   * @param {(v: T) => R} rfn A function to apply if this `Either` is on the right side.
   * @returns {R} The result of applying the appropriate function to the value stored in this `Either`.
   */
  fold: FoldFunction<R, T>

  /**
   * Maps over the value on the right side of this `Either`.
   * @param {(v: T) => Re} fn A function to apply to the value on the right side.
   * @returns {Either<R, Re>} A new `Either` with the same right side and the result of applying the function to the right side.
   */
  map: MapFunction<R, T>

  flatMap: FlatMapFunction<R, T>
}

/**
 * Represents a value that can be either on the left side or the right side.
 * @template L The type of the value on the left side.
 * @template R The type of the value on the right side.
 */
export type Either<L, R> = Left<L, R> | Right<R, L>

/**
 * Constructs a new `Either` with the given value on the left side.
 * @param {L} e The value to store on the left side.
 * @returns {Either<L, R>} A new `Either` instance with the provided value on the left side.
 * @template L The type of the value on the left side.
 * @template R The type of the value on the right side.
 */
export const left = <L, R = never>(e: L): Either<L, R> => ({
  left: e,

  isLeft: () => true,
  isRight: () => false,

  fold: (lfn, _) => lfn(e),

  map: <Re>(_: (v: R) => Re) => left<L, Re>(e),

  flatMap: <Re>(_: (v: R) => Either<L, Re>) =>
    left<L, Re>(e),
})

/**
 * Constructs a new `Either` with the given value on the right side.
 * @param {R} v The value to store on the right side.
 * @returns {Either<L, R>} A new `Either` instance with the provided value on the right side.
 * @template R The type of the value on the right side.
 * @template L The type of the value on the left side.
 */
export const right = <R, L = never>(
  v: R,
): Either<L, R> => ({
  right: v,

  isLeft: () => false,
  isRight: () => true,

  fold: (_, rfn) => rfn(v),

  map: <Re>(fn: (v: R) => Re) => right(fn(v)),

  flatMap: <Re>(fn: (v: R) => Either<L, Re>) => fn(v),
})
