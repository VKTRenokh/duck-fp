import { Maybe, maybe, UnwrapMaybe } from "../maybe";

type UnwrapMaybeArray<T extends Array<Maybe<any>>> = {
  [K in keyof T]: UnwrapMaybe<T[K]>;
};

export const longMerge = <MT extends Maybe<any>[], MU = UnwrapMaybeArray<MT>>(
  ...maybes: MT
): Maybe<MU> => {
  return maybes.reduce(
    (acc, curr) => acc.flatMap((res) => curr.map((v) => [...res, v])),
    maybe<MT[]>([]),
  );
};
