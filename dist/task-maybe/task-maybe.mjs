import { of as maybe, none } from "../maybe";
const of = (run) => ({
  run,
  map: (f) => of(() => run().then((value) => value.map(f))),
  flatMap: (f) => of(
    () => run().then(
      (maybe2) => maybe2.value !== null ? f(maybe2.value).run() : none
    )
  ),
  orElse: (def) => of(
    () => run().then(
      (runned) => def.run().then((def2) => runned.value ? runned : def2)
    ).then((value) => maybe(value.value))
  )
});
const immediate = (value) => of(() => Promise.resolve(maybe(value ?? null)));
export {
  immediate,
  of
};
