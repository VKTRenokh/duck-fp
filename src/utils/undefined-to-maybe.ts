import { Maybe, maybe } from "../maybe";
import { isCallable } from "./is-callable";

/**
 * Converts a value that may be undefined to a Maybe monad.
 * @template T - The type of the value to convert.
 * @param {(T | undefined) | (() => T | undefined)} from - The value or function that may return the value.
 * @returns {Maybe<T>} A new Maybe monad containing the provided value, or `null` if the value is `undefined`.
 */
export const undefinedToMaybe = <T>(
  from: (T | undefined) | (() => T | undefined),
): Maybe<T> => {
  if (isCallable(from)) {
    return maybe<T>(from() ?? null);
  }

  return maybe<T>(from ?? null);
};
