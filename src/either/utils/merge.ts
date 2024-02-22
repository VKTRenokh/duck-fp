import { Either, GetLeft, GetRight, right } from '../either'

export type GetRightFromArray<
  T extends Array<Either<any, any>>,
> = {
  [K in keyof T]: GetRight<T[K]>
}

export type GetLeftFromArray<
  T extends Array<Either<any, any>>,
> = {
  [K in keyof T]: GetLeft<T[K]>
}

/**
 * Function that merges multiple Either monads into one.
 * @template MT An array of Either monads.
 * @template L The type of the error value in the Either monads.
 * @param {...MT} e The Either monads to merge.
 * @returns {Either<L, GetRightFromArray<MT>>} An Either monad representing the merged result.
 */
export const merge = <
  MT extends Either<L, any>[],
  L = GetLeftFromArray<MT>[number],
>(
  ...e: MT
): Either<L, GetRightFromArray<MT>> =>
  e.reduce(
    (a, c) => a.flatMap((r) => c.map((v) => [...r, v])),
    right<MT[], any>([]),
  )
