import { left, right } from 'src/either'
import { TaskEither, of } from '..'

export const tryCatch = <T, E>(
  tryFn: () => Promise<T>,
  catchFn: (e: unknown) => E,
): TaskEither<E, T> =>
  of(async () => {
    try {
      return right<T, E>(await tryFn())
    } catch (e) {
      return left(catchFn(e))
    }
  })
