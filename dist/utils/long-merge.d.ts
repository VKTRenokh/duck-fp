import { Maybe, UnwrapMaybe } from "../maybe";
type UnwrapMaybeArray<T extends Array<Maybe<any>>> = {
    [K in keyof T]: UnwrapMaybe<T[K]>;
};
export declare const longMerge: <MT extends Maybe<any>[], MU = UnwrapMaybeArray<MT>>(...maybes: MT) => Maybe<MU>;
export {};
