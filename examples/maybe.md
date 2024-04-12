# Maybe Examples

## .map()
```ts
const double = (num: number) => num * 2

M.of(42).map(double).map(console.log) // Output: 84
```

## .mapNullable()
```ts
const getOrNothing = (num) => num > 2 ? null : num

const a = M.of(4).map(getOrNothing) // type is Maybe<number | null>
const a = M.of(4).mapNullable(getOrNothing) // type is Maybe<number>
```

## ~~.asyncMap()~~ deprecated
```ts
const sleep = (ms: number): Promise<number> =>
  new Promise((res) => setTimeout(() => res(ms), ms));

M.of(1000)
  .asyncMap((ms) => sleep(ms))
  .then((maybeTime) => {
    maybeTime.map(console.log); // 1000 after 1 second
  });
```

## .flatMap()
```ts
M.of(42).flatMap((num) => maybe(num + 5)).map(console.log) // 47

const getNumber = () => Math.random() > 0.5 ? 1 : undefined

maybe(42)
  .flatMap((num) =>
    fromUndefined(getNumber()).map((secondNum) => secondNum + num),
  )
  .map(console.log) // 43 or nothing
```

## .equals()
```ts
const a = M.of(24)
const b = M.of(24)
const c = M.of('Hello!')

console.log(a.equals(b)) // true
console.log(a.equals(c)) // false
```


## .getOrElse()
```ts
const value = M.none<string>().getOrElse('default string') // value is 'default string'
const value1 = M.of<string>('some string').getOrElse('default string') // value is 'some string'
```

## .orElse()
```ts
const value = M.none<number>().flatGetOrElse(M.of(42)) // value is 42
const value = M.of(53).flatGetOrElse(M.of(42)) // value is 42
```

## .merge()
```ts
const a = M.of('something')
const b = M.of('something again')

const merged = a.merge(b).map(console.log) // { left: "something", right: "something again" }
```
if something doesn't have value
```ts
const a = M.none<string>()
const b = M.of('something again')

const merged = a.merge(b).map(console.log) // nothing happens
```

## fromUndefined()
```ts
const getNumberOrUndefined = () => Math.random() > 0.5 ? 5 : undefined

const number = M.fromUndefined(getNumberOrUndefined())

number.map(console.log) // 5 or nothing
```

## merge()
```ts
const a = M.of(5)
const b = M.of('hello')
const c = M.of({someKey: 'someValue'})

const merged = M.merge(a, b, c) // type is Maybe<[number, string, {someKey: 'someValue'}]>

merged.map(console.log) // [5, 'hello', { someKey: 'someValue' }] or if some maybe is nothing, nothing going to happen
```

# mergeMap()
```ts
const add = (a: number, b: number) => a + b

const a = M.of(5)
const b = M.of(100)

const final = M.mergeMap(a, b, add)

final.map(console.log) // 105 or if some maybe is nothing, nothing going to happen
```

# call()
```ts
const mfn = M.of(() => console.log('hello world'))

mfn.map(call) // hello world
```

# or()
```ts
const a = M.none<number>()
const b = M.of(5)
const c = M.of(6)

const final = M.or(a, b, c)

final.map(console.log) // 5
```

# fromThrowable()
```ts
const throwable = (num: number) => {
  if (num > 0.5) {
    throw new Error('number is greater than 0.5')
  }

  return ':)'
}

const something = M.fromThrowable(throwable)

something(Math.random()).map(console.log) // :) or nothing
```
