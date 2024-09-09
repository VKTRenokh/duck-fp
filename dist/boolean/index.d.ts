import { Lazy } from '../types';
export declare const match: <T, R>(onFalse: Lazy<T>, onTrue: Lazy<R>) => (value: boolean) => T | R;
