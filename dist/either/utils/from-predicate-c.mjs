import { left, right } from "../either";
const fromPredicateC = (predicate, c) => (v) => predicate(v) ? right(v) : left(c(v));
export {
  fromPredicateC
};
