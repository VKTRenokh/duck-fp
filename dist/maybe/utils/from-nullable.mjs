import { of } from "../../maybe";
const fromNullable = (from) => of(from ?? null);
export {
  fromNullable
};
