import { Either } from '../either';
import { Predicate, Refinement } from '../types';
import { LazyPromise } from '../types/lazy-promise';
export interface EnsureOrElse<R> {
    <E, T extends R>(p: Refinement<R, T>, c: (v: R) => E): TaskEither<E, T>;
    <E>(p: Predicate<R>, c: (v: R) => E): TaskEither<E, R>;
}
export interface TaskEither<Left, Right> {
    map: <R>(f: (v: Right) => R) => TaskEither<Left, R>;
    flatMap: <R>(f: (v: Right) => TaskEither<Left, R>) => TaskEither<Left, R>;
    ensureOrElse: EnsureOrElse<Right>;
    orElse: <R>(f: (e: Left) => TaskEither<R, Right>) => TaskEither<R, Right>;
    run: () => Promise<Either<Left, Right>>;
    mapLeft: <R>(f: (v: Left) => R) => TaskEither<R, Right>;
    fold: <R>(onLeft: (e: Left) => Promise<R> | R, onRight: (v: Right) => Promise<R> | R) => Promise<R>;
}
/**
 * `TaskEither<Left, Right>` represents asynchrounous computation that might
 * fail.
 * for asynchrounous computations that never fails use `Task`
 * @see {@link https://maybets.duckdns.org/task Task}
 * @returns {TaskEither<Left, Right>} - new TaskEither
 */
export declare const of: <Left, Right>(task: LazyPromise<Either<Left, Right>>) => TaskEither<Left, Right>;
export declare const right: <R, L = never>(v: R) => TaskEither<L, R>;
export declare const left: <L, R = never>(v: L) => TaskEither<L, R>;
