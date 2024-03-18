# ReaderT examples

# .map()
```ts
interface SomeEnv {
  value: number | null
}

const readerT: ReaderT<SomeEnv, M.Maybe<number>> = of(
  (env: SomeEnv) => M.of(env.value).map((num) => num / 2),
)
const newReader = readerT.map<M.Maybe<string>>((num) =>
  num.toString(),
)

newReader.run({ value: 50 }).map(console.log) // Output: 25
```

# .flatMap()
```ts
interface SomeEnv {
  value: number | null
}

const a: ReaderT<SomeEnv, M.Maybe<number>> = of((env) =>
  M.of(env.value),
)

const b: ReaderT<SomeEnv, M.Maybe<number>> = of((env) =>
  M.of(env.value).map((number) => number * 10),
)

a.flatMap(() => b)
  .run({
    value: 10,
  })
  .map(console.log) // Output: 100
```
