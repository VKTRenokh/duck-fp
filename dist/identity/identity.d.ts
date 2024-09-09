import { Merged } from '../types/merged';
export interface Identity<T> {
    map: <R>(f: (v: T) => R) => Identity<R>;
    flatMap: <R>(f: (v: T) => Identity<R>) => Identity<R>;
    merge: <R>(oi: Identity<R>) => Identity<Merged<T, R>>;
    ap: <R>(f: Identity<(v: T) => R>) => Identity<R>;
    value: T;
}
export declare const of: <T>(value: T) => Identity<T>;
