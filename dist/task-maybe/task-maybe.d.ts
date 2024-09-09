import { LazyPromise } from '../types/lazy-promise';
import { Maybe } from '../maybe';
export interface TaskMaybe<T> {
    run: LazyPromise<Maybe<T>>;
    map: <R>(f: (v: T) => R) => TaskMaybe<R>;
    flatMap: <R>(f: (v: T) => TaskMaybe<R>) => TaskMaybe<R>;
    orElse: <R>(def: TaskMaybe<R>) => TaskMaybe<T | R>;
}
export declare const of: <T>(run: LazyPromise<Maybe<T>>) => TaskMaybe<T>;
export declare const immediate: <T>(value: T | null | undefined) => TaskMaybe<T>;
