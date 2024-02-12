import { Maybe, maybe } from "../maybe";

export const undefinedToMaybe = <T>(from: T | undefined): Maybe<T> =>
  maybe<T>(from ?? null);
