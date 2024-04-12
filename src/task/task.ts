import { LazyPromise } from '->/types/lazy-promise'

export interface Task<T> {
  map: <R>(f: (v: T) => R) => Task<R>
  flatMap: <R>(f: (v: T) => Task<R>) => Task<R>
  delay: (ms: number) => Task<T>
  run: LazyPromise<T>
}

/**
 * `Task<T>` represents an asynchronous computation that yields value of type `T` and **never fails**.
 * for computations that might fail use `TaskEither`.
 * @see {@link https://maybets.duckdns.org/task-either.md Task either}
 * @template T - type that Task monad is going to produce
 * @param {() => Promise<T>} run - function to wrap in task
 * @returns {Task<T>} new task monad
 */
export const of = <T>(run: LazyPromise<T>): Task<T> => ({
  map: <R>(f: (v: T) => R) =>
    of<R>(() => Promise.resolve().then(run).then(f)),
  flatMap: <R>(f: (v: T) => Task<R>): Task<R> =>
    of(() =>
      Promise.resolve()
        .then(run)
        .then((a) => f(a).run()),
    ),
  delay: (ms) =>
    of(
      () =>
        new Promise<T>((res) =>
          setTimeout(
            () => Promise.resolve().then(run).then(res),
            ms,
          ),
        ),
    ),
  run,
})

export const immediate = <T>(v: T): Task<T> =>
  of(() => Promise.resolve(v))

export type UnwrapTask<T extends Task<unknown>> =
  T extends Task<infer U> ? U : never
