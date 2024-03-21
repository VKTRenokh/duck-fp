import { Either, isRight, left } from 'src/either'

type TaskEither<Left, Right> = {
  map: <R>(f: (v: Right) => R) => TaskEither<Left, R>
  flatMap: <R>(
    f: (v: Right) => TaskEither<Left, R>,
  ) => TaskEither<Left, R>
  run: () => Promise<Either<Left, Right>>
}

export const of = <Left = never, Right = never>(
  task: () => Promise<Either<Left, Right>>,
): TaskEither<Left, Right> => ({
  map: <R>(f: (v: Right) => R): TaskEither<Left, R> =>
    of(() => task().then((either) => either.map(f))),
  flatMap: <R>(
    f: (v: Right) => TaskEither<Left, R>,
  ): TaskEither<Left, R> =>
    of(() =>
      task().then((either) =>
        isRight(either)
          ? f(either.right).run()
          : left(either.left),
      ),
    ),
  run: task,
})
