# Lens Examples

## from()
Creates new lens; requires two arguments `getter` and `setter`
```ts
const object = {
  objectInObject: {
    objectInObjectInObject: {
      value: 'string',
    },
  },
}

const lens: Lens<typeof object, string> = from(
  (obj) => obj.objectInObject.objectInObjectInObject.value,
  (str, obj) => ({ ...obj, value: str }),
)

console.log(lens.view(object)) // Ouptut: "string"
```

## fromProp()
Creates new lens based on the prop passed in
```ts
const object = {
  value: 50,
}

const lens: Lens<typeof object, number> = fromProp('value')

console.log(lens.view(object)) // Output: 50
```

# .set()
Calls `setter` that was passed in params.
```ts
const object = { valueToBeSetWithLens: 70 }

const lens: Lens<typeof object, number> = from(
  (obj) => obj.valueToBeSetWithLens,
  (num, obj) => ({ ...obj, valueToBeSetWithLens: num }),
)

console.log(lens.set(50, object)) // Output: { valueToBeSetWithLens: 50 }
```

## .view()
Calls `getter` that was passed in params.
```ts
const object = { valueToBeGetted: 70 }

const lens: Lens<typeof object, number> = from(
  (object) => object.valueToBeGetted,
  (n, object) => ({ ...object, valueToBeGetted: n }),
)
console.log(lens.view(object)) // Output: 70

```

## .compose()
Composes two lens. first lens should be `A` to `B` and lens to be composed with must be `B` to `C`
```ts
interface Nested2 {
  a: string
  b: string
}

interface Nested1 {
  a: number
  b: number
  nested: Nested2
}

interface Obj {
  nested1: Nested1
}

const obj: Obj = {
  nested1: {
    a: 10,
    b: 15,
    nested: {
      a: 'something something',
      b: 'something',
    },
  },
}

const nested1: Lens<Obj, Nested1> = fromProp('nested1')

const nested2: Lens<Nested1, Nested2> = fromProp('nested')

const composed = nested1.compose(nested2)

console.log(composed.view(obj)) // Ouput: { a: "something something", b: "something" }
```
