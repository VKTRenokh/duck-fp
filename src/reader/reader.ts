/**
 * Represents a Reader monad, which is a computation that depends on a shared environment `T`
 * and produces a result `R`.
 * @template T The type of the environment.
 * @template R The type of the result.
 */
export interface Reader<T, R> {
  /**
   * Runs the computation within the reader monad with the provided environment.
   * @param {T} env The environment for the computation.
   * @returns {R} The result of the computation.
   */
  run: (env: T) => R

  /**
   * Transforms the result of the computation using the provided function.
   * @template B The type of the transformed result.
   * @param {(v: R) => B} fn The transformation function.
   * @returns {Reader<T, B>} A new Reader monad with the transformed result type.
   */
  map: <B>(fn: (v: R) => B) => Reader<T, B>

  /**
   * Applies a function that returns another Reader monad to the result of the computation,
   * then flattens the nested Reader monad structure.
   * @template B The type of the result of the function.
   * @param {(v: R) => Reader<T, B>} fn The function to apply.
   * @returns {Reader<T, B>} A new Reader monad with the flattened result.
   */
  flatMap: <B>(fn: (v: R) => Reader<T, B>) => Reader<T, B>

  /**
   * Applies a function wrapped in another Reader monad to the result of the computation.
   * @template B The type of the result of the function.
   * @param {Reader<T, (v: R) => B>} fn The function wrapped in a Reader monad.
   * @returns {Reader<T, B>} A new Reader monad with the result of applying the function.
   */
  ap: <B>(fn: Reader<T, (v: R) => B>) => Reader<T, B>
}

/**
 * Constructs a Reader monad with the provided computation.
 * @template T The type of the environment.
 * @template R The type of the result.
 * @param {(env: T) => R} run The computation to be encapsulated in the Reader monad.
 * @returns {Reader<T, R>} A new Reader monad.
 */
export const of = <T, R>(
  run: (env: T) => R,
): Reader<T, R> => ({
  run,
  map: <B>(fn: (v: R) => B) => of((env: T) => fn(run(env))),
  flatMap: <B>(fn: (v: R) => Reader<T, B>) =>
    of((env: T) => fn(run(env)).run(env)),
  ap: <B>(fn: Reader<T, (v: R) => B>): Reader<T, B> =>
    of((env) => fn.map((fn) => fn(run(env))).run(env)),
})
