import { Merged } from '->t/merged'
import { Predicate } from '->t/predicate'
import { Refinement } from '->t/refinement'
import {
  TaskEither,
  left as tLeft,
  of as tOf,
} from '->/task-either'

// {{{ types for either functions
export type FoldFunction<Left, Right> = <R>(
  lfn: (e: Left) => R,
  rfn: (v: Right) => R,
) => R

export type MapFunction<Left, Right> = <R>(
  fn: (v: Right) => R,
) => Either<Left, R>

export type ApFunction<Left, Right> = <R>(
  fn: Either<Left, (v: Right) => R>,
) => Either<Left, R>

export type MapLeft<Left, Right> = <R>(
  f: (v: Left) => R,
) => Either<R, Right>

export type FlatMapFunction<Left, Right> = <R>(
  fn: (v: Right) => Either<Left, R>,
) => Either<Left, R>

export interface EnsureOrElse<L, R> {
  <T extends R>(
    p: Refinement<R, T>,
    c: (v: R) => L,
  ): Either<L, T>

  (p: Predicate<R>, c: (v: R) => L): Either<L, R>
}

export type MergeFunction<Left, Right> = <Nr>(
  or: Either<Left, Nr>,
) => Either<Left, Merged<Right, Nr>>

export type AsyncMapFunction<Left, Right> = <R>(
  fn: (v: Right) => Promise<R>,
) => TaskEither<Left, R>
// }}}

// {{{ interface for left
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

  orElse: <B>(fn: (e: T) => Either<B, R>) => Either<B, R>

  ap: ApFunction<T, R>

  asyncMap: AsyncMapFunction<T, R>

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
   * @param {Function} fn - The function to map over the right value.
   * @returns {Left<U, R>} - A new Left containing the result of applying `fn` to the right value.
   */
  map: MapFunction<T, R>

  /**
   * Maps a function over the left value.
   * @template U - The type of the result of the mapping function.
   * @param {Function} fn - The function to map over the left value.
   * @returns {Left<U, R>} - A new Left containing the result of applying `fn` to the left value.
   */
  mapLeft: MapLeft<T, R>

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
  ensureOrElse: EnsureOrElse<T, R>

  /**
   * Merges two Either monads into one, combining their values if both are Right, or returning the first Left value otherwise.
   */
  merge: MergeFunction<T, R>
}
// }}}

// {{{ interface for right
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

  ap: ApFunction<R, T>

  asyncMap: AsyncMapFunction<R, T>

  orElse: <B>(fn: (e: R) => Either<B, T>) => Either<B, T>

  fold: FoldFunction<R, T>

  map: MapFunction<R, T>

  mapLeft: MapLeft<R, T>

  flatMap: FlatMapFunction<R, T>

  ensureOrElse: EnsureOrElse<R, T>

  merge: MergeFunction<R, T>
}
// }}}

export type Either<L, R> = Left<L, R> | Right<R, L>

// {{{ function for left
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

  orElse: <B>(fn: (e: L) => Either<B, R>): Either<B, R> =>
    fn(e),

  fold: (lfn, _) => lfn(e),

  map: <Re>(_: (v: R) => Re) => left<L, Re>(e),

  mapLeft: <Re>(f: (v: L) => Re): Either<Re, R> =>
    left(f(e)),

  asyncMap: <Re>(
    _: (v: R) => Promise<Re>,
  ): TaskEither<L, Re> => tLeft(e),

  flatMap: <Re>(_: (v: R) => Either<L, Re>) =>
    left<L, Re>(e),

  ensureOrElse: <T extends R>(
    _p: Refinement<R, T> | Predicate<R>,
    _c: (v: R) => L,
  ): Either<L, T> => left(e),

  merge: <Nl, Nr, R>(_: Either<Nl, Nr>) => left<L, R>(e),

  ap: <Re>(_f: Either<L, (v: R) => Re>): Either<L, Re> =>
    left(e),
})
// }}}

// {{{ function for right
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

  orElse: <B>(_: (e: L) => Either<B, R>): Either<B, R> =>
    right(v),

  fold: (_, rfn) => rfn(v),

  map: <Re>(fn: (v: R) => Re) => right(fn(v)),

  mapLeft: <Re>(_: (v: L) => Re): Either<Re, R> => right(v),

  asyncMap: <Re>(fn: (v: R) => Promise<Re>) =>
    tOf(() =>
      fn(v).then<Either<L, Re>>((mapped) =>
        right<Re, L>(mapped),
      ),
    ),

  flatMap: <Re>(fn: (v: R) => Either<L, Re>) => fn(v),

  ensureOrElse: <T extends R>(
    fn: Refinement<R, T> | Predicate<R>,
    fr: (v: R) => L,
  ): Either<L, R> => (fn(v) ? right(v) : left(fr(v))),

  merge: <Nr>(
    or: Either<L, Nr>,
  ): Either<L, Merged<R, Nr>> =>
    right<R, L>(v).flatMap((cv) =>
      or.map((ov) => ({ left: cv, right: ov })),
    ),

  ap: <Re>(fn: Either<L, (v: R) => Re>): Either<L, Re> =>
    fn.map((fn) => fn(v)),
})

/**
 * Alias for E.right.
 * @see {@link right}
 * @example
 * const right = E.of(42)
 *
 * right.fold(console.error, console.log) // Output: 42
 */
// }}}

export const of = <Right, Left>(value: Right) =>
  right<Right, Left>(value)

// {{{ Infers
export type GetRight<T extends Either<unknown, unknown>> =
  T extends Either<infer _, infer U> ? U : never

export type GetLeft<T extends Either<unknown, unknown>> =
  T extends Either<infer U, infer _> ? U : never
// }}}
