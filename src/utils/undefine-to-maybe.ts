import { Maybe, maybe } from "../maybe";

export const undefinedToMaybe = <T>(from: T | undefined): Maybe<T> => {
  const value = from ?? null;

  return maybe<T>(value);
};
