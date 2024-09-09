import { Either } from '../either';
/**
 * Creates a function similar to {@link ./from-predicate.ts} but curried for better composition.
 * This function returns a new function that takes a value of type `T` and applies
 * the provided predicate function. If the predicate succeeds, it returns a right
 * containing the original value. If the predicate fails, it returns a left containing
 * the result of the provided error function `c`.
 *
 * @param predicate The predicate function to determine if the value
 * should result in a right or left.
 * @param c The function returning the error value in case the predicate fails.
 * @returns A curried function taking a value of type `T` and returning
 * an Either, with a right containing the original value if the predicate succeeds, or a left
 * containing the error value if the predicate fails.
 *
 * @example
 * const predicator = fromPredicateC(
 *  (number: number) => number > 10 && number < 15,
 *  (n) => `${n} is greater than 15 or lower than 10.`,
 * )
 *
 * predicator(11) // Right containing 11
 * predicator(100) // Left containing `100 is greater than 15 or lowe than 10`
 */
export declare const fromPredicateC: <T, E>(predicate: (v: T) => boolean, c: (v: T) => E) => (v: T) => Either<E, T>;
