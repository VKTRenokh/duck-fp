import {
  Either,
  left as eitherLeft,
  right as eitherRight,
  isRight,
} from '->/either'
import { Predicate, Refinement } from '->/types'
import { LazyPromise } from '->/types/lazy-promise'

// {{{ TaskEither interface
export interface EnsureOrElse<R> {
  <E, T extends R>(
    p: Refinement<R, T>,
    c: (v: R) => E,
  ): TaskEither<E, T>
  <E>(p: Predicate<R>, c: (v: R) => E): TaskEither<E, R>
}

export interface TaskEither<Left, Right> {
  map: <R>(f: (v: Right) => R) => TaskEither<Left, R>
  flatMap: <R>(
    f: (v: Right) => TaskEither<Left, R>,
  ) => TaskEither<Left, R>
  ensureOrElse: EnsureOrElse<Right>
  orElse: <R>(
    f: (e: Left) => TaskEither<R, Right>,
  ) => TaskEither<R, Right>
  run: () => Promise<Either<Left, Right>>
  mapLeft: <R>(f: (v: Left) => R) => TaskEither<R, Right>
  fold: <R>(
    onLeft: (e: Left) => Promise<R> | R,
    onRight: (v: Right) => Promise<R> | R,
  ) => Promise<R>
}
// }}}

/**
 * `TaskEither<Left, Right>` represents asynchrounous computation that might
 * fail.
 * for asynchrounous computations that never fails use `Task`
 * @see {@link https://maybets.duckdns.org/task Task}
 * @returns {TaskEither<Left, Right>} - new TaskEither
 */
export const of = <Left, Right>(
  task: LazyPromise<Either<Left, Right>>,
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
          : eitherLeft(either.left),
      ),
    ),
  ensureOrElse: (
    p: (v: Right) => boolean,
    fr: (v: Right) => Left,
  ) =>
    of(() =>
      task().then((either) => either.ensureOrElse(p, fr)),
    ),
  orElse: <R>(
    f: (e: Left) => TaskEither<R, Right>,
  ): TaskEither<R, Right> =>
    of(() =>
      task().then(
        (either) =>
          (isRight(either)
            ? Promise.resolve(either)
            : f(either.left).run()) as Promise<
            Either<R, Right>
          >,
      ),
    ),
  mapLeft: <R>(f: (v: Left) => R): TaskEither<R, Right> =>
    of(() => task().then((either) => either.mapLeft(f))),
  fold: <R>(
    onLeft: (v: Left) => Promise<R> | R,
    onRight: (v: Right) => Promise<R> | R,
  ): Promise<R> =>
    task().then((either) => either.fold(onLeft, onRight)),

  run: task,
})

export const right = <R, L = never>(
  v: R,
): TaskEither<L, R> =>
  of(() => Promise.resolve(eitherRight(v)))

export const left = <L, R = never>(
  v: L,
): TaskEither<L, R> =>
  of(() => Promise.resolve(eitherLeft(v)))
