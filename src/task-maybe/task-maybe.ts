import { LazyPromise } from '->t/lazy-promise'
import { Maybe, of as maybe, none } from '->/maybe'

interface TaskMaybe<T> {
  run: LazyPromise<Maybe<T>>
  map: <R>(f: (v: T) => R) => TaskMaybe<R>
  flatMap: <R>(f: (v: T) => TaskMaybe<R>) => TaskMaybe<R>
  orElse: <R>(def: TaskMaybe<R>) => TaskMaybe<T | R>
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
  orElse: <R>(def: TaskMaybe<R>): TaskMaybe<T | R> =>
    of(() =>
      run()
        .then((runned) =>
          def
            .run()
            .then((def) => (runned.value ? runned : def)),
        )
        .then((value) => maybe(value.value)),
    ),
})

export const immediate = <T>(value: T): TaskMaybe<T> =>
  of(() => Promise.resolve(maybe(value)))
