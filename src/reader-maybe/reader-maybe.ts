import { Maybe, none } from '->/maybe'

export interface ReaderMaybe<E, T> {
  run: (e: E) => Maybe<T>
  runOrElse: (e: E, d: T) => T
  map: <R>(f: (v: T) => R) => ReaderMaybe<E, R>
  orElse: (or: ReaderMaybe<E, T>) => ReaderMaybe<E, T>
  flatMap: <R>(
    f: (v: T) => ReaderMaybe<E, R>,
  ) => ReaderMaybe<E, R>
}

export const of = <E, T>(
  run: (e: E) => Maybe<T>,
): ReaderMaybe<E, T> => ({
  run,
  runOrElse: (e: E, d: T) => run(e).getOrElse(d),
  map: <R>(f: (v: T) => R): ReaderMaybe<E, R> =>
    of((e) => run(e).map(f)),
  orElse: (or: ReaderMaybe<E, T>): ReaderMaybe<E, T> =>
    of((e) => run(e).flatGetOrElse(or.run(e))),
  flatMap: <R>(
    f: (v: T) => ReaderMaybe<E, R>,
  ): ReaderMaybe<E, R> =>
    of((e) => {
      const runned = run(e)
      return runned.value ? f(runned.value).run(e) : none()
    }),
})
