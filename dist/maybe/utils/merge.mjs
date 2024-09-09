import { of } from "../../maybe";
const merge = (...maybes) => maybes.reduce(
  (acc, curr) => acc.flatMap((res) => curr.map((v) => [...res, v])),
  of([])
);
export {
  merge
};
