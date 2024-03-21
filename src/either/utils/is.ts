import { Either, Left, Right } from '->/either'

export const isLeft = <L, R>(
  v: Either<L, R>,
): v is Left<L, R> => v.isLeft()

export const isRight = <L, R>(
  v: Either<L, R>,
): v is Right<R, L> => v.isRight()
