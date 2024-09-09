/**
 * Represents a lens that can focus on a specific part (property) of an object.
 * @template T The type of the whole object.
 * @template R The type of the focused part.
 */
export interface Lens<T, R> {
    /**
     * Retrieves the focused part from the whole object.
     * @param {T} v The whole object.
     * @returns {R} The focused part.
     */
    view: (v: T) => R;
    /**
     * Sets the focused part within the whole object.
     * @param {R} v The new value of the focused part.
     * @param {T} s The whole object.
     * @returns {T} The updated whole object.
     */
    set: (v: R, s: T) => T;
    /**
     * Composes this lens with another lens to focus on a deeper part of the object.
     * @template C The new focused part type.
     * @param {Lens<R, C>} bc The lens to be composed with.
     * @returns {Lens<T, C>} A new composed lens.
     */
    compose: <C>(bc: Lens<R, C>) => Lens<T, C>;
}
/**
 * Creates a lens for focusing on a specific part (property) of an object.
 * @template T The type of the whole object.
 * @template R The type of the focused part.
 * @param {(v: T) => R} view Function to get the focused part from the whole object.
 * @param {(v: R, s: T) => T} set Function to set the focused part within the whole object.
 * @returns {Lens<T, R>} The created lens.
 */
export declare const from: <T, R>(view: Lens<T, R>["view"], set: Lens<T, R>["set"]) => Lens<T, R>;
/**
 * Creates a lens for focusing on a specific property of an object.
 * @template T The type of the whole object.
 * @template K The type of the property key.
 * @param {K} key The key of the property to focus on.
 * @returns {Lens<T, T[K]>} The created lens.
 */
export declare const fromProp: <T, K extends keyof T>(key: K) => Lens<T, T[K]>;
