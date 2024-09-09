import { of } from "../../maybe";
const or = (...maybies) => maybies.reduce(
  (acc, curr) => acc.orElse(curr),
  of(null)
);
export {
  or
};
