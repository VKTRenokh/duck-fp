import { Maybe } from "../maybe";
/**
 * Converts a value that may be undefined to a Maybe monad.
 * @template T - The type of the value to convert.
 * @param {(T | undefined) | (() => T | undefined)} from - The value or function that may return the value.
 * @returns {Maybe<T>} A new Maybe monad containing the provided value, or `null` if the value is `undefined`.
 */
export declare const undefinedToMaybe: <T>(from: T | (() => T | undefined) | undefined) => Maybe<T>;
