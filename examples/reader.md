# Reader Examples

# .map()
```ts

interface Env {
  string: string
}

const reader = E.of<Env, string>((env) => env.string)
const doubleString = reader.map((string) =>
  string.repeat(2),
)
const log = doubleString.map(console.log)

log.run({ string: 'doubleMe' }) // Output: "doubleMedoubleMe"
```

# .flatMap()
```ts
interface Env {
  string: string
  number: number
}

const stringReader = of<Env, string>((env) => env.string)
const numberReader = of<Env, number>((env) => env.number)

const a = stringReader.flatMap((string) =>
  numberReader.map((number) => [string, number]),
)

console.log(a.run({ string: 'hello', number: 3042 })) // Output: ["hello", 3042]
```

# .ap()
```ts
interface Env {
  s: number
}

const a = R.of<Env, number>((env) => env.s / 2)
const b = R.of<Env, (number: number) => string>(
    (env) => (number) => `${number}.${env.s}`,
)

console.log(a.ap(b).run({ s: 58 })) // Output: 29.58
```
