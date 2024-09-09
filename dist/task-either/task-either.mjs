import {
  left as eitherLeft,
  right as eitherRight,
  isRight
} from "../either";
const of = (task) => ({
  map: (f) => of(() => task().then((either) => either.map(f))),
  flatMap: (f) => of(
    () => task().then(
      (either) => isRight(either) ? f(either.right).run() : eitherLeft(either.left)
    )
  ),
  ensureOrElse: (p, fr) => of(
    () => task().then((either) => either.ensureOrElse(p, fr))
  ),
  orElse: (f) => of(
    () => task().then(
      (either) => isRight(either) ? Promise.resolve(either) : f(either.left).run()
    )
  ),
  mapLeft: (f) => of(() => task().then((either) => either.mapLeft(f))),
  fold: (onLeft, onRight) => task().then((either) => either.fold(onLeft, onRight)),
  run: task
});
const right = (v) => of(() => Promise.resolve(eitherRight(v)));
const left = (v) => of(() => Promise.resolve(eitherLeft(v)));
export {
  left,
  of,
  right
};
