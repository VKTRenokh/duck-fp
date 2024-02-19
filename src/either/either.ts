export type FoldFunction<Left, Right> = <R>(
  lfn: (e: Left) => R,
  rfn: (v: Right) => R,
) => R

export type MapFunction<Left, Right> = <R>(
  fn: (v: Right) => R,
) => Either<Left, R>

export type FlatMapFunction<Left, Right> = <R>(
  fn: (v: Right) => Either<Left, R>,
) => Either<Left, R>

export type EnsureOrElseFunction<Left, Right> = (
  p: (v: Right) => boolean,
  fr: (v: Right) => Left,
) => Either<Left, Right>

/**
 * Represents the left side of the Either monad.
 * @template T - The type of the left value.
 * @template R - The type of the right value.
 */
export interface Left<T, R> {
  readonly left: T

  /**
   * Checks if this side of Either is a Right.
   * @returns {boolean} - Returns true if this side is right.
   */
  isRight: () => false

  /**
   * Checks if this side of Either is a Left.
   * @returns {boolean} - Returns true if this side is left.
   */
  isLeft: () => true

  /**
   * Folds over either side of the Either monad.
   * @template R - The type to fold into.
   * @param {(e: Left) => R} lfn - The function to map over the left side.
   * @param {(v: Right) => R} rfn - The function to map over the right side (unused in Left).
   * @returns {R} - The result of applying `leftFn` to the left value.
   */
  fold: FoldFunction<T, R>

  /**
   * Maps a function over the right value.
   * @template U - The type of the result of the mapping function.
   * @param {Function} fn - The function to map over the left value.
   * @returns {Left<U, R>} - A new Left containing the result of applying `fn` to the left value.
   */
  map: MapFunction<T, R>

  /**
   * Maps a function over the right value and flattens the result.
   * @template U - The type of the result of the mapping function.
   * @param {Function} fn - The function to map over the left value.
   * @returns {Left<U, R>} - A new Left containing the flattened result of applying `fn` to the left value.
   */
  flatMap: FlatMapFunction<T, R>

  /**
   * Ensures that a predicate `fn` holds true for the success value.
   * If the predicate fails, returns an alternative failure value computed by `fr`.
   * This method is applicable when the `Either` instance represents a success value.
   * @template Re The type of the alternative failure value returned if the predicate fails.
   * @param {function(R): boolean} fn The predicate function to be satisfied by the success value.
   * @param {function(R): Re} fr The function to compute an alternative failure value if the predicate fails.
   * @returns {Either<L, R>} An `Either` instance with the same failure type `L` but potentially different success type.
   */
  ensureOrElse: EnsureOrElseFunction<T, R>
}

/**
 * Represents the right side of the Either monad.
 * @template T - The type of the right value.
 * @template R - The type of the left value.
 */
export interface Right<T, R> {
  readonly right: T

  /**
   * Checks if this side of Either is a Right.
   * @returns {boolean} - Returns true if this side is right.
   */
  isRight: () => true

  /**
   * Checks if this side of Either is a Left.
   * @returns {boolean} - Returns true if this side is left.
   */
  isLeft: () => false

  fold: FoldFunction<R, T>

  /**
   * Maps a function over the right value.
   * @template U - The type of the result of the mapping function.
   * @param {Function} fn - The function to map over the right value.
   * @returns {Right<T, U>} - A new Right containing the result of applying `fn` to the right value.
   */
  map: MapFunction<R, T>

  /**
   * Maps a function over the right value and flattens the result.
   * @template U - The type of the result of the mapping function.
   * @param {Function} fn - The function to map over the right value.
   * @returns {Right<T, U>} - A new Right containing the flattened result of applying `fn` to the right value.
   */
  flatMap: FlatMapFunction<R, T>

  /**
   * Ensures that a predicate `fn` holds true for the success value.
   * If the predicate fails, returns an alternative failure value computed by `fr`.
   * This method is applicable when the `Either` instance represents a success value.
   * @template Re The type of the alternative failure value returned if the predicate fails.
   * @param {function(R): boolean} fn The predicate function to be satisfied by the success value.
   * @param {function(R): Re} fr The function to compute an alternative failure value if the predicate fails.
   * @returns {Either<L, R>} An `Either` instance with the same failure type `L` but potentially different success type.
   */
  ensureOrElse: EnsureOrElseFunction<R, T>
}

export type Either<L, R> = Left<L, R> | Right<R, L>

/**
 * Constructs a Left Either monad with the provided value.
 *
 * @template L - The type of the value wrapped in Left.
 * @template R - The type of the value wrapped in Right. Defaults to `never`.
 * @param {L} e - The value to wrap in Left.
 * @returns {Either<L, R>} An Either monad representing the Left side with the provided value.
 */
export const left = <L, R = never>(e: L): Either<L, R> => ({
  left: e,

  isLeft: () => true,
  isRight: () => false,

  fold: (lfn, _) => lfn(e),

  map: <Re>(_: (v: R) => Re) => left<L, Re>(e),

  flatMap: <Re>(_: (v: R) => Either<L, Re>) =>
    left<L, Re>(e),

  ensureOrElse: (_: (v: R) => boolean, __: (v: R) => L) =>
    left(e),
})

/**
 * Constructs a Right Either monad with the provided value.
 *
 * @template R - The type of the value wrapped in Right.
 * @template L - The type of the value wrapped in Left. Defaults to `never`.
 * @param {R} v - The value to wrap in Right.
 * @returns {Either<L, R>} An Either monad representing the Right side with the provided value.
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

  ensureOrElse: <Re>(
    fn: (v: R) => boolean,
    fr: (v: R) => Re,
  ) => (fn(v) ? right(v) : left(fr(v))),
})
