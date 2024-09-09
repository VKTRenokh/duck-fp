import { Maybe } from '../../maybe';
/**
 * Converts a value that may be undefined to a Maybe monad.
 * @template T - The type of the value to convert.
 * @param {(T | undefined)} from - The value to convert to Maybe.
 * @returns {Maybe<T>} A new Maybe monad containing the provided value, or `null` if the value is `undefined`.
 */
export declare const fromNullable: <T>(from: T | undefined | null) => Maybe<T>;
