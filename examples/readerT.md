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

```
