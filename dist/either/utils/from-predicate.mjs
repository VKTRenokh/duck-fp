import { left, right } from "../either";
const fromPredicate = (v, predicate, c) => predicate(v) ? right(v) : left(c(v));
export {
  fromPredicate
};
