import { E, I, M, S } from '-->'

export type Acceptable<T> =
  | M.Maybe<T>
  | E.Either<unknown, T>
  | S.State<unknown, T>
  | I.Identity<T>

export type Unwrap<T extends Acceptable<unknown>> =
  T extends E.Either<unknown, infer R>
    ? R
    : T extends M.Maybe<infer R>
      ? R
      : T extends S.State<unknown, infer R>
        ? R
        : T extends I.Identity<infer R>
          ? R
          : never

export interface ReaderT<E, M extends Acceptable<any>> {
  run: (e: E) => M
  map: <N extends Acceptable<any>>(
    f: (v: Unwrap<M>) => Unwrap<N>,
  ) => ReaderT<E, N>
  flatMap: <N extends Acceptable<any>>(
    f: (v: Unwrap<M>) => ReaderT<E, N>,
  ) => ReaderT<E, N>
}

export const of = <E, M extends Acceptable<any>>(
  run: (e: E) => M,
): ReaderT<E, M> => ({
  run,
  map: <N extends Acceptable<any>>(
    f: (v: Unwrap<M>) => Unwrap<N>,
  ) => of((e) => run(e).map(f) as N),
  flatMap: <N extends Acceptable<any>>(
    f: (v: Unwrap<M>) => ReaderT<E, N>,
  ): ReaderT<E, N> =>
    // @ts-expect-error it is assignable
    of((e) => run(e).flatMap((i) => f(i).run(e))),
})
