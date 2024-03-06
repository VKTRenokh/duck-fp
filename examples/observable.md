# Observable Examples

## .map()
```ts
const observable = O.of(42)
observable.map((num) => num.toString()).observe(console.log()) // Output: "42"
```

## .flatMap()
```ts
const observable = O.of(42)
observable.flatMap(num => O.of(num + 1)).observe(console.log()) // Output: 43
```


## .observe()
```ts
const observable = O.of(42)
observable.observe((num) => console.log('!!!', num))
observable.next(32) // Output from observer: !!! 32
observable.next(52) // Output from observer: !!! 52
observable.next(72) // Output from observer: !!! 72
```

## .next()
example above

## .dependingNext()
```ts
const double = (n: number) => n * 2
const observable = O.of(1)

observable.observe((number) => console.log('got number', number))

observable.dependingNext(double) // Output from observer: got number 2
observable.dependingNext(double) // Output from observer: got number 4
```
