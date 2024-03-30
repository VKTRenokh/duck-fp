/**
 * Represents a State monad, which encapsulates a computation that modifies a state of type `T` and produces a value of type `A`.
 * @template T The type of the state.
 * @template A The type of the value produced by the computation.
 */
export interface State<T, A> {
  /**
   * Runs the computation encapsulated by the State monad, producing a value of type `A` and updating the state.
   * @param {T} state The initial state.
   * @returns {[A, T]} A tuple where the first element is the result of the computation and the second element is the updated state.
   */
  run: (state: T) => [A, T]

  /**
   * Maps over the result of the computation without modifying the state.
   * @template R The type of the result after mapping.
   * @param {(v: A) => R} f The mapping function.
   * @returns {State<T, R>} A new State monad with the mapped result.
   */
  map: <R>(f: (v: A) => R) => State<T, R>

  /**
   * Maps over the result of the computation, allowing the mapping function to produce a new State monad.
   * @template R The type of the result produced by the new State monad.
   * @param {(v: A) => State<T, R>} f The mapping function that produces a new State monad.
   * @returns {State<T, R>} A new State monad resulting from flat mapping.
   */
  flatMap: <R>(f: (v: A) => State<T, R>) => State<T, R>

  ap: <R>(f: State<T, (v: A) => R>) => State<T, R>
}

/**
 * Constructs a State monad with the provided computation.
 * @template T The type of the state.
 * @template A The type of the value produced by the computation.
 * @param {(s: T) => [A, T]} rs The computation function, which takes the current state and returns a tuple with the result and the updated state.
 * @returns {State<T, A>} The created State monad.
 */
export const of = <T, A>(
  rs: (s: T) => [A, T],
): State<T, A> => ({
  run: rs,
  map: <R>(fn: (v: A) => R): State<T, R> =>
    of((oldState) => {
      const [a, b] = rs(oldState)

      return [fn(a), b]
    }),
  flatMap: <R>(fn: (v: A) => State<T, R>) =>
    of((oldState) => {
      const [a, b] = rs(oldState)

      return fn(a).run(b)
    }),
  ap: <R>(f: State<T, (v: A) => R>) =>
    of(rs).flatMap((v) => f.map((f) => f(v))),
})
