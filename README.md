# Maybe Monad In Typescript

maybe monad implementation in typescript with great types and some utils

# Examples

## .map()
```ts
maybe(42).map(num => num * 2).map(console.log) // Output: 84
```
## .tap()
``` ts
maybe(42).tap(console.log).map(num => num * 2).tap(console.log) // Output: 42 then 84

```

## .mapNullable()
```ts
const getOrNothing = (num) => num > 2 ? null : num

const a = maybe(4).map(getOrNothing) // type is Maybe<number | null>
const a = maybe(4).mapNullable(getOrNothing) // type is Maybe<number>
```

## .asyncMap()
```ts
const sleep = (ms: number): Promise<number> =>
  new Promise((res) => setTimeout(() => res(ms), ms));

maybe(1000)
  .asyncMap((ms) => sleep(ms))
  .then((maybeTime) => {
    maybeTime.map(console.log); // 1000 after 1 second
  });
```

## .flatMap()
```ts
maybe(42).flatMap((num) => maybe(num + 5)).map(console.log) // 47

const getNumber = () => Math.random() > 0.5 ? 1 : undefined

maybe(42)
  .flatMap((num) =>
    undefinedToMaybe(getNumber()).map((secondNum) => secondNum + num),
  )
  .map(console.log) // 43 or nothing
```

## .equals()
```ts
const a = maybe(24)
const b = maybe(24)
const c = maybe('Hello!')

console.log(a.equals(b)) // true
console.log(a.equals(c)) // false
```


## .getOrElse()
```ts
const value = maybe<string>(null).getOrElse('default string') // value is 'default string'
const value1 = maybe<string>('some string').getOrElse('default string') // value is 'some string'
```

## .flatGetOrElse()
```ts
const value = maybe<number>(null).flatGetOrElse(maybe(42)) // value is 42
const value = maybe(53).flatGetOrElse(maybe(42)) // value is 42
```

## .merge()
```ts
const a = maybe('something')
const b = maybe('something again')

const merged = a.merge(b).map(console.log) // { left: "something", right: "something again" }
```
if something doesn't have value
```ts
const a = maybe<string>(null)
const b = maybe('something again')

const merged = a.merge(b).map(console.log) // nothing happens
```

## undefinedToMaybe()
```ts
const getNumberOrUndefined = () => Math.random() > 0.5 ? 5 : undefined

const number = undefinedToMaybe(getNumberOrUndefined())

number.map(console.log) // 5 or nothing
```

## merge()
```ts
const a = maybe(5)
const b = maybe('hello')
const c = maybe({someKey: 'someValue'})

const merged = merge(a, b, c) // type is Maybe<[number, string, {someKey: 'someValue'}]>

merged.map(console.log) // [5, 'hello', { someKey: 'someValue' }] or if some maybe is nothing, nothing going to happen
```

# mergeMap()
```ts
const add = (a: number, b: number) => a + b

const a = maybe(5)
const b = maybe(100)

const final = mergeMap(a, b, add)

final.map(console.log) // 105 or if some maybe is nothing, nothing going to happen
```

# call()
```ts
const mfn = maybe(() => console.log('hello world'))

mfn.map(call) // hello world
```

# or()
```ts
const a = maybe<number>(null)
const b = maybe(5)
const c = maybe(6)

const final = or(a, b, c)

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

const something = fromThrowable(throwable)

something(Math.random()).map(console.log) // :) or nothing
```
