import {
  left as tLeft,
  of as tOf
} from "../task-either";
const left = (e) => ({
  left: e,
  isLeft: () => true,
  isRight: () => false,
  orElse: (fn) => fn(e),
  fold: (lfn, _) => lfn(e),
  map: (_) => left(e),
  mapLeft: (f) => left(f(e)),
  asyncMap: (_) => tLeft(e),
  flatMap: (_) => left(e),
  ensureOrElse: (_p, _c) => left(e),
  merge: (_) => left(e),
  ap: (_f) => left(e)
});
const right = (v) => ({
  right: v,
  isLeft: () => false,
  isRight: () => true,
  orElse: (_) => right(v),
  fold: (_, rfn) => rfn(v),
  map: (fn) => right(fn(v)),
  mapLeft: (_) => right(v),
  asyncMap: (fn) => tOf(
    () => fn(v).then(
      (mapped) => right(mapped)
    )
  ),
  flatMap: (fn) => fn(v),
  ensureOrElse: (fn, fr) => fn(v) ? right(v) : left(fr(v)),
  merge: (or) => right(v).flatMap(
    (cv) => or.map((ov) => ({ left: cv, right: ov }))
  ),
  ap: (fn) => fn.map((fn2) => fn2(v))
});
const of = (value) => right(value);
export {
  left,
  of,
  right
};
