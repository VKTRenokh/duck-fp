import { left, right } from '->/either'
import { ReaderEither, of } from '->/reader-either'

export const tryCatch = <E, T, M>(
  tryFn: (e: E) => T,
  catchFn: (e: unknown) => M,
): ReaderEither<E, M, T> =>
  of((e) => {
    try {
      return right<T, M>(tryFn(e))
    } catch (e) {
      return left<M, T>(catchFn(e))
    }
  })
