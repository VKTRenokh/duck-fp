import { Maybe, maybe } from "../maybe";
import { isCallable } from "./is-callable";

export const undefinedToMaybe = <T>(
  from: (T | undefined) | (() => T | undefined),
): Maybe<T> => {
  if (isCallable(from)) {
    return maybe<T>(from() ?? null);
  }

  return maybe<T>(from ?? null);
};
