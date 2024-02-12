import { Maybe } from "../maybe";
export declare const undefinedToMaybe: <T>(from: T | (() => T | undefined) | undefined) => Maybe<T>;
