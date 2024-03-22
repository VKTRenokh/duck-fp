import { Maybe } from '->/maybe'
import { Lazy } from '->t/lazy'
import { M } from '-->'

interface TaskMaybe<T> {
  run: () => Promise<Maybe<T>>
}

export const of = <T>(
  run: Lazy<Promise<T | null>>,
): TaskMaybe<T> => ({
  run: () => run().then(M.of),
})
