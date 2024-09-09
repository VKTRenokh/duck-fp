import { left, right } from "../../either";
import { of } from "../../task-either";
const fromThrowable = (f, catchFn) => (...a) => of(
  () => f(...a).then(right).catch((e) => left(catchFn(e)))
);
export {
  fromThrowable
};
