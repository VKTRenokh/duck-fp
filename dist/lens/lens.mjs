const from = (view, set) => ({
  view,
  set,
  compose: (bc) => from(
    (a) => bc.view(view(a)),
    (c, a) => set(bc.set(c, view(a)), a)
  )
});
const fromProp = (key) => from(
  (v) => v[key],
  (v, s) => ({ ...s, [key]: v })
);
export {
  from,
  fromProp
};
