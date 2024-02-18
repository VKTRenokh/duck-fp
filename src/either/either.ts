export type FoldFunction<Left, Right> = <R>(
  lfn: (e: Left) => R,
  rfn: (v: Right) => R,
) => R

export type MapFunction<Left, Right> = <R>(
  fn: (v: Right) => R,
) => Either<Left, R>

export type FlatMapFunction<Left, Right> = <R>(
  fn: (v: Right) => Either<Left, R>,
) => Either<Left, R>

export type FilterOrElseFunction<Left, Right> = (
  f: (v: Right) => boolean,
  fr: () => Left,
) => Either<Left, Right>

export interface Left<T, R> {
  readonly left: T
  isRight: () => false
  isLeft: () => true
  fold: FoldFunction<T, R>
  map: MapFunction<T, R>
  flatMap: FlatMapFunction<T, R>
  filterOrElse: FilterOrElseFunction<T, R>
}

export interface Right<T, R> {
  readonly right: T
  isRight: () => true
  isLeft: () => false
  fold: FoldFunction<R, T>
  map: MapFunction<R, T>
  flatMap: FlatMapFunction<R, T>
  filterOrElse: FilterOrElseFunction<R, T>
}

export type Either<L, R> = Left<L, R> | Right<R, L>

export const left = <L, R = never>(e: L): Either<L, R> => ({
  left: e,

  isLeft: () => true,
  isRight: () => false,

  fold: (lfn, _) => lfn(e),

  map: <Re>(_: (v: R) => Re) => left<L, Re>(e),

  flatMap: <Re>(_: (v: R) => Either<L, Re>) =>
    left<L, Re>(e),

  filterOrElse: (_: (v: R) => boolean, __: () => L) =>
    left<L, R>(e),
})

export const right = <R, L = never>(
  v: R,
): Either<L, R> => ({
  right: v,

  isLeft: () => false,
  isRight: () => true,

  fold: (_, rfn) => rfn(v),

  map: <Re>(fn: (v: R) => Re) => right(fn(v)),

  flatMap: <Re>(fn: (v: R) => Either<L, Re>) => fn(v),

  filterOrElse: <Re>(
    fn: (v: R) => boolean,
    fr: () => Re,
  ) => (fn(v) ? right<R, Re>(v) : left<Re, R>(fr())),
})
