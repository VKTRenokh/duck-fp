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
