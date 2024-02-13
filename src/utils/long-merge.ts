import { Maybe, maybe, UnwrapMaybe } from "../maybe";

/**
 * Extracts the type contained in an array of Maybe monads.
 * @template T - The type of the array of Maybe monads.
 * @typedef {[K in keyof T]: UnwrapMaybe<T[K]>} UnwrapMaybeArray
 */
export type UnwrapMaybeArray<T extends Array<Maybe<any>>> = {
  [K in keyof T]: UnwrapMaybe<T[K]>;
};
/**
 * Merges multiple Maybe monads into one, combining their values into an array.
 * @template MT - The types of the Maybe monads to merge.
 * @template MU - The resulting type after unwrapping the Maybe monads.
 * @param {...MT[]} maybes - The Maybe monads to merge.
 * @returns {Maybe<MU>} A new Maybe monad containing the merged values as an array, or an empty Maybe if any of the input Maybe monads are empty.
 */
export const longMerge = <MT extends Maybe<any>[], MU = UnwrapMaybeArray<MT>>(
  ...maybes: MT
): Maybe<MU> => {
  return maybes.reduce(
    (acc, curr) => acc.flatMap((res) => curr.map((v) => [...res, v])),
    maybe<MT[]>([]),
  );
};
