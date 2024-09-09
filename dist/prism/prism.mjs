import { of as some } from "../maybe";
const of = (view, set) => ({
  view: (v) => some(view(v)),
  set,
  compose: (bc) => of(
    (a) => bc.view(view(a)).value,
    (c, a) => set(bc.set(c, view(a)), a)
  )
});
const fromProp = (key) => of(
  (v) => v[key],
  (v, s) => ({ ...s, [key]: v })
);
export {
  fromProp,
  of
};
