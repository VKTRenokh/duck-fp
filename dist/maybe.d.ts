export interface Maybe<T> {
    map: <R>(fn: (_: T) => R) => Maybe<R>;
    equals: (m: Maybe<unknown>) => boolean;
    flatMap: <R>(f: (v: T) => Maybe<R>) => Maybe<R>;
    getOrElse: (dv: T) => T;
    flatGetOrElse: <R>(dv: R) => R | Maybe<T>;
    asyncMap: <R>(fn: (v: T) => Promise<R>, error?: (err: unknown) => void) => Promise<Maybe<R>>;
    merge: <R>(om: Maybe<R>) => Maybe<{
        left: T;
        right: R;
    }>;
    value: T | null;
}
export declare const maybe: <T>(value: T | null) => Maybe<T>;
export type UnwrapMaybe<T extends Maybe<any>> = T extends Maybe<infer U> ? U : never;
