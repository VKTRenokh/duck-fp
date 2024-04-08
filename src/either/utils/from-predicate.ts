import { Either, left, right } from '../either'

/**
 * Creates an Either based on the result of a predicate function.
 * If the predicate function returns true for the provided value, returns a right
 * containing the original value. If the predicate function returns false,
 * returns a left containing the result of the provided error function.
 *
 * @template T The type of the value being evaluated.
 * @template E The type of the error value.
 * @param {T} v The value to be evaluated by the predicate function.
 * @param {function(T): boolean} predicate The predicate function to determine if the value
 * should result in a right or left.
 * @param {function(T): E} c The function returning the error value in case the predicate fails.
 * @returns {Either<E, T>} An Either instance, with a right containing the original value
 * if the predicate succeeds, or a left containing the error value if the predicate fails.
 *
 * @example
 * // Example usage:
 * const either = fromPredicate(
 *   10,
 *   (num) => num < 2,
 *   (v) => `${v} is greater than 2.`,
 * );
 *
 * either.fold(console.error, console.log); // Outputs: "10 is greater than 2."
 */
export const fromPredicate = <T, E>(
  v: T,
  predicate: (v: T) => boolean,
  c: (v: T) => E,
): Either<E, T> => (predicate(v) ? right(v) : left(c(v)))
