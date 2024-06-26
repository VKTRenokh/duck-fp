import { Maybe, of } from '->/maybe'

/**
 * Combines multiple Maybe monads into one, returning the first non-empty Maybe monad.
 * @template MT - The types of the Maybe monads to combine.
 * @param {...MT[]} maybies - The Maybe monads to combine.
 * @returns {MT[number]} The first non-empty Maybe monad, or `null` if all input Maybe monads are empty.
 */
export const or = <MT extends Maybe<any>[]>(
  ...maybies: MT
): MT[number] =>
  maybies.reduce(
    (acc, curr) => acc.orElse(curr),
    of<MT[number]>(null),
  )
