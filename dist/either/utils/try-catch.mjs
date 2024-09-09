import { left, right } from "../../either";
const tryCatch = (tryFn, catchFn) => {
  try {
    return right(tryFn());
  } catch (e) {
    return left(catchFn(e));
  }
};
export {
  tryCatch
};
