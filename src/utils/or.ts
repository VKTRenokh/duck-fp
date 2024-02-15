import { Maybe, maybe } from '../maybe'

/**
 * Combines multiple Maybe monads into one, returning the first non-empty Maybe monad.
 * @template MT - The types of the Maybe monads to combine.
 * @param {...MT[]} maybies - The Maybe monads to combine.
 * @returns {MT[number]} The first non-empty Maybe monad, or `null` if all input Maybe monads are empty.
 */
export const or = <MT extends Maybe<any>[]>(
  ...maybies: MT
): MT[number] => {
  return maybies.reduce(
    (acc, curr) => acc.flatGetOrElse(curr),
    maybe<MT[number]>(null),
  )
}
