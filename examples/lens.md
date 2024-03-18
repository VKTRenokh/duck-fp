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
