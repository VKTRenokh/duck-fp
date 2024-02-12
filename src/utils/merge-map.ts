import { Maybe } from "maybe.ts";

export const mergeMap = <L, R, N>(
  left: Maybe<L>,
  right: Maybe<R>,
  cb: (left: L, right: R) => N,
) => left.merge(right).map((maybes) => cb(maybes.left, maybes.right));
