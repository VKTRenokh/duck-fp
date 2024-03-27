import { left, right } from '->/either'
import { TaskEither, of } from '..'

export const tryCatch = <T, E>(
  tryFn: () => Promise<T>,
  catchFn: (e: unknown) => E,
): TaskEither<E, T> =>
  of(async () => {
    try {
      return tryFn().then(right<T, E>)
    } catch (e) {
      return left(catchFn(e))
    }
  })
