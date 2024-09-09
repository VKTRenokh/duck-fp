import { type AbstractFn } from '../types/abstract-fn';
export type ReturnTypes<A extends readonly unknown[], T extends ((...a: A) => unknown)[]> = {
    [K in keyof T]: T[K] extends (...a: A) => infer U ? U : never;
};
/**
 * requires at least one function to execute
 * @example
 *
 * const add = (num: number) => (toAdd: number) => num + toAdd
 * const double = (num: number) => num * 2
 * const quadriple = (num: number) => double(double(num))
 * const toString = (num: number) => num.toString()
 *
 * const a = multiple(add(10), double, quadriple, toString)
 *
 * console.log(a(50)) // Output: [ 60, 100, 200, "50" ]
 * @returns result of all computations passed in
 */
export declare const multiple: <F extends AbstractFn, T extends ((...a: Parameters<F>) => any)[]>(...fns: T extends Array<(...a: Parameters<F>) => any> ? [F, ...T] : T) => (...a: Parameters<F>) => ReturnTypes<Parameters<F>, [F, ...T]>;
