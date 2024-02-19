import { Maybe, none, of } from '../../maybe'
import { Either } from '../either'

/**
 * Converts a value from the Either monad to a Maybe monad.
 * If the Either monad is Left, returns a None.
 * If the Either monad is Right, returns a Just containing the right value.
 * @template L The type of the error value in the Either monad.
 * @template R The type of the value in the Either monad.
 * @param {Either<L, R>} either The Either monad to convert.
 * @returns {Maybe<R>} A Maybe monad representing the converted value.
 */
export const toMaybe = <L, R>(
  either: Either<L, R>,
): Maybe<R> =>
  either.fold(
    () => none(),
    (v) => of(v),
  )
