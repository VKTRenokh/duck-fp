import { right } from "../../either";
const merge = (...e) => e.reduce(
  (a, c) => a.flatMap((r) => c.map((v) => [...r, v])),
  right([])
);
export {
  merge
};
