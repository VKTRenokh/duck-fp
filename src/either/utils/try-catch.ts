import { Either, left, right } from '->/either'
/**
 * Executes a function in a try-catch block, returning either the result of the try function
 * or an error produced by the catch function.
 * @template T The type of the result produced by the try function.
 * @template E The type of the error produced by the catch function.
 * @param {() => T} tryFn The function to be executed in the try block.
 * @param {(reason: unknown) => E} catchFn The function to handle errors caught in the catch block.
 * @param {() => void} [finallyFn] Optional function to be executed in the finally block.
 * @returns {Either<E, T>} An Either monad containing either the result of the try function
 * or an error produced by the catch function.
 */
export const tryCatch = <T, E>(
  tryFn: () => T,
  catchFn: (reason: unknown) => E,
  finallyFn?: () => void,
): Either<E, T> => {
  try {
    return right(tryFn())
  } catch (e) {
    return left(catchFn(e))
  } finally {
    finallyFn?.()
  }
}
