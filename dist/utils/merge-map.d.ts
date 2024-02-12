import { Maybe } from "../maybe";
export declare const mergeMap: <L, R, N>(left: Maybe<L>, right: Maybe<R>, cb: (left: L, right: R) => N) => Maybe<N>;
