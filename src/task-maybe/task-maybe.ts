import { M } from '-->'
import { Lazy } from '->t/lazy'
import { Maybe } from '->/maybe'

interface TaskMaybe<T> {
  run: () => Promise<Maybe<T>>
}

export const of = <T>(
  run: Lazy<Promise<T | null>>,
): TaskMaybe<T> => ({
  run: () => run().then(M.of),
})
