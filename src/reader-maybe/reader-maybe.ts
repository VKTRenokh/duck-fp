import { Maybe, none } from '->/maybe'

interface ReaderMaybe<E, T> {
  run: (e: E) => Maybe<T>
  map: <R>(f: (v: T) => R) => ReaderMaybe<E, R>
  flatMap: <R>(
    f: (v: T) => ReaderMaybe<E, R>,
  ) => ReaderMaybe<E, R>
}

export const of = <E, T>(
  run: (e: E) => Maybe<T>,
): ReaderMaybe<E, T> => ({
  run,
  map: <R>(f: (v: T) => R): ReaderMaybe<E, R> =>
    of((e) => run(e).map(f)),
  flatMap: <R>(
    f: (v: T) => ReaderMaybe<E, R>,
  ): ReaderMaybe<E, R> =>
    of((e) => {
      const runned = run(e)
      return runned.value ? f(runned.value).run(e) : none()
    }),
})
