import { left, right } from "../../either";
import { of } from "..";
const tryCatch = (tryFn, catchFn) => of(async () => {
  try {
    return right(await tryFn());
  } catch (e) {
    return left(catchFn(e));
  }
});
export {
  tryCatch
};
