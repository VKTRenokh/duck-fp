import { Either, isRight, left } from 'src/either'

export interface TaskEither<Left, Right> {
  map: <R>(f: (v: Right) => R) => TaskEither<Left, R>
  flatMap: <R>(
    f: (v: Right) => TaskEither<Left, R>,
  ) => TaskEither<Left, R>
  run: () => Promise<Either<Left, Right>>
}

/**
 * `TaskEither<Left, Right>` represents asynchrounous computation that might
 * fail.
 * for asynchrounous computations that never fails use `Task`
 * @see {@link https://maybets.duckdns.org/task Task}
 * @returns {TaskEither<Left, Right>} - new TaskEither
 */
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
