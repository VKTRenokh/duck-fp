import { Either, left, right } from '../either'

/**
 * Constructs a function that converts a throwable function into an `Either`
 * monad.
 * @param {(...a: T) => R} f The function to be wrapped.
 * @returns {(...a: T) => Either<unknown, R>} A function that takes the same parameters as `f` and returns an `Either`.
 * @template T The types of the parameters of the function `f`.
 * @template R The return type of the function `f`.
 */
export const fromThrowable =
  <T extends ReadonlyArray<unknown>, R>(
    f: (...a: T) => R,
  ) =>
    (...a: T): Either<unknown, R> => {
      try {
        return right(f(...a))
      } catch (e) {
        return left(e)
      }
    }
