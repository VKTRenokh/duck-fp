import { left, right } from '->/either'
import { ReaderEither, of } from '->/reader-either'

export const tryCatch = <E, T, M>(
  tryFn: (e: E) => T,
  catchFn: (e: unknown) => M,
): ReaderEither<E, M, T> =>
  of((e) => {
    try {
      return right(tryFn(e))
    } catch (err) {
      return left(catchFn(err))
    }
  })
