import { Either } from '../../either';
/**
 * Constructs a function that converts a throwable function into an `Either`
 * monad.
 * @param {(...a: T) => R} f The function to be wrapped.
 * @returns  A function that takes the same parameters as `f` and returns an `Either`.
 * @template T The types of the parameters of the function `f`.
 * @template R The return type of the function `f`.
 */
export declare const fromThrowable: <T extends ReadonlyArray<unknown>, R, E>(f: (...a: T) => R, c: (e: unknown) => E) => (...a: T) => Either<E, R>;
