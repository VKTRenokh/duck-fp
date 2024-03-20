interface Task<T> {
  map: <R>(f: (v: T) => R) => Task<R>
  flatMap: <R>(f: (v: T) => Task<R>) => Task<R>

  run: () => Promise<T>
}

/**
 * task monad represents computation that will never fail.
 * for computations that might fail use `TaskEither`.
 * @see {@link ../maybe/index.ts}
 * @template T - type that Task monad is going to produce
 * @param {() => Promise<T>} run - function to wrap in task
 * @returns {Task<T>} new task monad
 */
export const of = <T>(run: () => Promise<T>): Task<T> => ({
  map: <R>(f: (v: T) => R) =>
    of<R>(() => Promise.resolve().then(run).then(f)),
  flatMap: <R>(f: (v: T) => Task<R>): Task<R> =>
    of(() =>
      Promise.resolve()
        .then(run)
        .then((a) => f(a).run()),
    ),
  run,
})
