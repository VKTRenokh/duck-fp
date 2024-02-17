import { Either, left, right } from '../either'

export const fromThrowableE =
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
