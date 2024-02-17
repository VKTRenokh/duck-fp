export type FoldFunction<Left, Right> = <R>(
  lfn: (v: Left) => R,
  rfn: (v: Right) => R,
) => R

export interface Left<T, R> {
  readonly left: T

  isRight: () => false
  isLeft: () => true

  fold: FoldFunction<T, R>
}

export interface Right<T, R> {
  readonly right: T

  isRight: () => true
  isLeft: () => false

  fold: FoldFunction<R, T>
}

export type Either<L, R> = Left<L, R> | Right<R, L>

export const left = <L, R = never>(e: L): Either<L, R> => ({
  left: e,
  isLeft: () => true,
  isRight: () => false,
  fold: (lfn, _) => lfn(e),
})

export const right = <R, L = never>(
  v: R,
): Either<L, R> => ({
  right: v,
  isLeft: () => false,
  isRight: () => true,
  fold: (_, rfn) => rfn(v),
})
