"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.longMerge = void 0;
const maybe_1 = require("../maybe");
/**
 * Merges multiple Maybe monads into one, combining their values into an array.
 * @template MT - The types of the Maybe monads to merge.
 * @template MU - The resulting type after unwrapping the Maybe monads.
 * @param {...MT[]} maybes - The Maybe monads to merge.
 * @returns {Maybe<MU>} A new Maybe monad containing the merged values as an array, or an empty Maybe if any of the input Maybe monads are empty.
 */
const longMerge = (...maybes) => {
    return maybes.reduce(
    /**
     * @param {Maybe<MT[]>} acc - The accumulated Maybe monad.
     * @param {Maybe<UnwrapMaybe<MT>>} curr - The current Maybe monad.
     * @returns {Maybe<MU>} A new Maybe monad containing the merged values as an array, or an empty Maybe if any of the input Maybe monads are empty.
     */
    (acc, curr) => acc.flatMap((res) => curr.map((v) => [...res, v])), (0, maybe_1.maybe)([]));
};
exports.longMerge = longMerge;
