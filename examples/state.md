# State Examples

# .map()
```ts
const state = of((num: number) => [num * 2, num])

const mapped = state.map((num) => num * 10)

console.log(mapped.run(50)) // Output: [1000, 50]
```
