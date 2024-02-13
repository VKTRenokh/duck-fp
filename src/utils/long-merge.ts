import { Maybe, maybe } from "../maybe";

export const longMerge = <MT extends Maybe<any>[]>(
  ...maybes: MT
): Maybe<MT> => {
  return maybes.reduce(
    (acc, curr) => acc.flatMap((res) => curr.map((v) => [...res, v])),
    maybe<MT[]>([]),
  );
};
