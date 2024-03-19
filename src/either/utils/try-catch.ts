import { Either, left, right } from '../either'

export const tryCatch = <T, E>(
  tryFn: () => T,
  catchFn: (reason: unknown) => E,
): Either<E, T> => {
  try {
    return right(tryFn())
  } catch (e) {
    return left(catchFn(e))
  }
}
