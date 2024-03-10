# Reader Examples

# .map()
```ts

interface Env {
  string: string
}

const reader = of<Env, string>((env) => env.string)
const doubleString = reader.map((string) =>
  string.repeat(2),
)
const log = doubleString.map(console.log)

log.run({ string: 'doubleMe' }) // Output: "doubleMedoubleMe"
```
