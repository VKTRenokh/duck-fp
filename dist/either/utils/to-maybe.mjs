import { none, of } from "../../maybe";
const toMaybe = (either) => either.fold(() => none, of);
export {
  toMaybe
};
