"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mergeMap = void 0;
/**
 * Merges two Maybe monads and applies a callback function to their values.
 * @template L - The type of the value contained in the left Maybe monad.
 * @template R - The type of the value contained in the right Maybe monad.
 * @template N - The type of the result after applying the callback function.
 * @param {Maybe<L>} left - The left Maybe monad to merge.
 * @param {Maybe<R>} right - The right Maybe monad to merge.
 * @param {(left: L, right: R) => N} cb - The callback function to apply to the merged values.
 * @returns {Maybe<N>} A new Maybe monad containing the result of applying the callback function to the merged values, or `null` if either input Maybe monad is empty.
 */
const mergeMap = (left, right, cb) => left.merge(right).map((maybes) => cb(maybes.left, maybes.right));
exports.mergeMap = mergeMap;
