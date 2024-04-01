import { Maybe, none } from '->/maybe'
import { LazyPromise } from '->/types/lazy-promise'

interface TaskMaybe<T> {
  run: LazyPromise<Maybe<T>>
  map: <R>(f: (v: T) => R) => TaskMaybe<R>
  flatMap: <R>(f: (v: T) => TaskMaybe<R>) => TaskMaybe<R>
}

export const of = <T>(
  run: LazyPromise<Maybe<T>>,
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
