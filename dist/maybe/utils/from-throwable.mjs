import { none, of } from "../../maybe";
const fromThrowable = (f) => (...a) => {
  try {
    return of(f(...a));
  } catch (e) {
    return none;
  }
};
export {
  fromThrowable
};
