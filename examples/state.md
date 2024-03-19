# State Examples

## .run()
Calls the function that was passed in State.of
```ts
const state = of(() => {
  console.log('a')
  return [null, null]
})

state.run(null) // Output: 'a'
```

## .map()
```ts
const state = of((num: number) => [num * 2, num])

const mapped = state.map((num) => num * 10)

console.log(mapped.run(50)) // Output: [1000, 50]
```

## .flatMap()
```ts
const state = of((num: number) => [num * 2, num])

const mapped = state.flatMap((num) =>
  of((n) => [n, num]),
)

console.log(mapped.run(50)) // Output: [50, 1000]
```
