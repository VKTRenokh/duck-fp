"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.undefinedToMaybe = void 0;
const maybe_1 = require("../maybe");
const is_callable_1 = require("./is-callable");
/**
 * Converts a value that may be undefined to a Maybe monad.
 * @template T - The type of the value to convert.
 * @param {(T | undefined) | (() => T | undefined)} from - The value or function that may return the value.
 * @returns {Maybe<T>} A new Maybe monad containing the provided value, or `null` if the value is `undefined`.
 */
const undefinedToMaybe = (from) => {
    if ((0, is_callable_1.isCallable)(from)) {
        return (0, maybe_1.maybe)(from() ?? null);
    }
    return (0, maybe_1.maybe)(from ?? null);
};
exports.undefinedToMaybe = undefinedToMaybe;
