import { Either, isRight, left } from '->/either'

export interface ReaderEither<E, L, R> {
  run: (e: E) => Either<L, R>
  map: <Re>(f: (v: R) => Re) => ReaderEither<E, L, Re>
  flatMap: <Re>(
    f: (v: R) => ReaderEither<E, L, Re>,
  ) => ReaderEither<E, L, Re>
}

export const of = <E, L, R>(
  run: (e: E) => Either<L, R>,
): ReaderEither<E, L, R> => ({
  run,
  map: <Re>(f: (v: R) => Re): ReaderEither<E, L, Re> =>
    of((e) => run(e).map(f)),
  flatMap: <Re>(
    f: (v: R) => ReaderEither<E, L, Re>,
  ): ReaderEither<E, L, Re> =>
    of((e) => {
      const a = run(e)
      return isRight(a) ? f(a.right).run(e) : left(a.left)
    }),
})
