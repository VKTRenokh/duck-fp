import { M } from '-->'
import { Lazy } from '->t/lazy'
import { none } from '->/maybe'

interface TaskMaybe<T> {
  run: () => Promise<M.Maybe<T>>
  map: <R>(f: (v: T) => R) => TaskMaybe<R>
  flatMap: <R>(f: (v: T) => TaskMaybe<R>) => TaskMaybe<R>
}

export const of = <T>(
  run: Lazy<Promise<M.Maybe<T>>>,
): TaskMaybe<T> => ({
  run: run,
  map: <R>(f: (v: T) => R): TaskMaybe<R> =>
    of(() => run().then((value) => value.map(f))),
  flatMap: <R>(f: (v: T) => TaskMaybe<R>): TaskMaybe<R> =>
    of(() =>
      run().then((maybe) =>
        maybe.value !== null
          ? f(maybe.value).run()
          : none<R>(),
      ),
    ),
})
