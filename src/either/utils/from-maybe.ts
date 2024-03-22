import { Either, left, right } from '->/either'
import { Maybe } from '->/maybe'

/**
 * Converts a value from the Maybe monad to an Either monad.
 * If the Maybe monad is Just, returns a Right with the contained value.
 * If the Maybe monad is Nothing, returns a Left with the specified error value.
 * @template L The type of the error value in the Either monad.
 * @template R The type of the value in the Maybe monad.
 * @param {Maybe<R>} maybe The Maybe monad to convert.
 * @param {L} onNone The error value to be used if the Maybe monad is Nothing.
 * @returns {Either<L, R>} An Either monad representing the converted value.
 */
export const fromMaybe = <L, R>(
  maybe: Maybe<R>,
  onNone: L,
): Either<L, R> =>
  maybe.value
    ? right<R, L>(maybe.value)
    : left<L, R>(onNone)
