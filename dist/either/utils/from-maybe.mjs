import { left, right } from "../../either";
const fromMaybe = (maybe, onNone) => maybe.value ? right(maybe.value) : left(onNone);
export {
  fromMaybe
};
