import { left, right } from "../../either";
const fromThrowable = (f, c) => (...a) => {
  try {
    return right(f(...a));
  } catch (e) {
    return left(c(e));
  }
};
export {
  fromThrowable
};
