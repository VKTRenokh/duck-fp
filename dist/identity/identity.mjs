const of = (value) => ({
  map: (f) => of(f(value)),
  flatMap: (f) => f(value),
  merge: (oi) => of(value).flatMap(
    (left) => oi.map((right) => ({ left, right }))
  ),
  ap: (f) => f.map((fn) => fn(value)),
  value
});
export {
  of
};
