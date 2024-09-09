/**
 * Wraps a potentially throwing function in a Maybe monad.
 * @template T - The types of the arguments accepted by the function.
 * @template R - The return type of the function.
 * @param {(...a: T) => R} f - The function to wrap.
 * @returns A new function that returns a Maybe monad containing the result of the wrapped function, or `none` if an error occurs.
 */
export declare const fromThrowable: <T extends ReadonlyArray<unknown>, R>(f: (...a: T) => R) => (...a: T) => import("../../maybe").Maybe<any> | import("../../maybe").Maybe<R>;
