# Either Examples
## .map()
```ts
E.right(1)
  .map(double)
  .fold(() => {}, console.log) // Output: 2
```

## .flatMap()
```ts
const getMoreThan = (
  num: number,
): E.Either<string, number> => {
  const random = Math.random()

  if (random > num) {
    return E.left(`random is greater than ${num}`)
  }

  return E.right(random)
}

getMoreThan(0.5)
  .flatMap((num) => getMoreThan(num + 0.01))
  .fold(console.error, console.log) // random number, or error in console
```

## .isRight()
```ts
console.log(left('test').isRight()) // Output: false
console.log(right('test').isRight()) // Output: true
```

## .isLeft()
```ts
console.log(left('test').isLeft()) // Output: true
console.log(right('test').isLeft()) // Output: false
```

## .ensureOrElse()
```ts
const user = {
  has2Fa: true,
  name: '12',
}

const validate = (u: typeof user) => u.has2Fa
const validateName = (u: typeof user) => u.name.length >= 3

const a: Either<string, typeof user> = right(user)

const b = a
  .ensureOrElse(validate, () => 'user does not have 2 fa')
  .ensureOrElse(
    validateName,
    () => 'user name is too small',
  )

b.fold(
  (e) => console.error(e),
  (b) => console.log(b),
i) // Output: user name is too small
```

## toMaybe()
```ts
toMaybe(left<string, number>('left')).tap(console.log) // nothing happens
toMaybe(right<number, string>(50)).tap(console.log) // Output: 50
```

## fromMaybe()
```ts
fromMaybe(of(50), 'maybe is nothing').fold(
  console.error,
  console.log,
) // Output: 50

fromMaybe(none<number>(), 'maybe is nothing').fold(
  console.error,
  console.log,
) // Output: error maybe is nothing
```

## .merge()
```ts
const a: Either<string, number> = right(5)
const b: Either<string, number> = right(1)

const add = (m: Merged<number, number>) => m.left + m.right

a.merge(b).map(add).fold(console.error, console.log) // Output: 6
```

## merge()
Just like .merge method of either but takes unlimited either monads and returns right containing array of values
```ts
const final = merge<Either<string, number>[]>(
  right(4),
  right(5),
  right(6),
  right(8),
  right(9),
)

const getBiggest = (nums: number[]) => Math.max(...nums)

final.map(getBiggest).fold(console.error, console.log) // Output: 9
```

## .orElse()
```ts
const orElseFn = (e: string): Either<string, string> =>
  e === 'some error' ? right('3') : left('0')

const a = right<string, string>('some string').orElse(
  orElseFn,
)
const b = left<string, string>('some error').orElse(
  orElseFn,
)

a.fold(console.error, console.log) // Output: "some string"
b.fold(console.error, console.log) // Output: "3"
```

## of()
Alias for E.right()
```ts
E.of(42).fold(console.error, console.log) // Output: 42
```
