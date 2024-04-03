import { left, right } from '->/either'
import { of } from '->/task-either'

export const fromThrowable =
  <A extends ReadonlyArray<unknown>, R, E>(
    f: (...a: A) => Promise<R>,
    catchFn: (e: unknown) => E,
  ) =>
  (...a: A) =>
    of(() =>
      f(...a)
        .then(right<R, E>)
        .catch((e) => left<E, R>(catchFn(e))),
    )
