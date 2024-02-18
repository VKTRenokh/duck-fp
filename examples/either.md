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

## .filterOrElse()
```ts
const user = {
  has2Fa: true,
  name: '12',
}

const validate = (u: typeof user) => u.has2Fa
const validateName = (u: typeof user) => u.name.length >= 3

const a: Either<string, typeof user> = right(user)

const b = a
  .filterOrElse(validate, () => 'user does not have 2 fa')
  .filterOrElse(
    validateName,
    () => 'user name is too small',
  )

b.fold(
  (e) => console.error(e),
  (b) => console.log(b),
) // Output: user name is too small
```
