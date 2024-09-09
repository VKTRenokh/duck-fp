import { Maybe } from '../maybe';
export interface Prism<T, R> {
    view: (v: T) => Maybe<R>;
    set: (v: R, s: T) => T;
    compose: <C>(bc: Prism<R, C>) => Prism<T, C>;
}
export declare const of: <T, R>(view: (v: T) => R | null, set: Prism<T, R>["set"]) => Prism<T, R>;
export declare const fromProp: <T, K extends keyof T>(key: K) => Prism<T, T[K]>;
