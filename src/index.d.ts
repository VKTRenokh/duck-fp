declare module "maybe.ts" {
  export interface Maybe<T> {
    map: <R>(fn: (_: T) => R) => Maybe<R>;
    equals: (m: Maybe<unknown>) => boolean;
    flatMap: <R>(f: (v: T) => Maybe<R>) => Maybe<R>;
    getOrElse: (dv: T) => T;
    flatGetOrElse: <R>(dv: R) => R | Maybe<T>;
    asyncMap: <R>(fn: (v: T) => Promise<R>) => Promise<Maybe<R>>;
    merge: <R>(om: Maybe<R>) => Maybe<{ left: T; right: R }>;
    value: T | null;
  }

  export function maybe<T>(value: T | null): Maybe<T>;
}

declare module "maybe.ts/utils" {
  import { Maybe } from "maybe.ts";

  export function call<T>(fn: () => T): T;

  export function mergeMap<L, R, N>(
    left: Maybe<L>,
    right: Maybe<R>,
    cb: (left: L, right: R) => N,
  ): Maybe<N>;

  export function undefinedToMaybe<T>(from: T | undefined): Maybe<T>;
}
