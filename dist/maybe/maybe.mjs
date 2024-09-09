import { of as tOf } from "../task-maybe";
const of = (value) => ({
  isNothing: () => value === null,
  map: (fn) => value ? of(fn(value)) : none,
  mapNullable: (fn) => {
    if (value === null) {
      return none;
    }
    const next = fn(value);
    if (next === null || next === void 0) {
      return none;
    }
    return of(next);
  },
  equals: (m) => m.value === value,
  flatMap: (f) => value ? f(value) : none,
  getOrElse: (dv) => value === null ? dv : value,
  orElse: (dv) => value === null ? dv : of(value),
  merge: (om) => of(value).flatMap(
    (v) => om.map((ov) => ({ left: v, right: ov }))
  ),
  apply: (mfn) => value && mfn.value ? of(mfn.value(value)) : none,
  asyncMap: (fn) => tOf(
    () => value ? fn(value).then(of) : Promise.resolve(none)
  ),
  toBoolean: () => !!value,
  get value() {
    return value;
  }
});
const none = of(null);
export {
  none,
  of
};
