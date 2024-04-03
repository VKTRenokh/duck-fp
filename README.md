<div align="center">
    <p align="center">
    <h1>duck-fp</h1>
    <a href="https://www.npmjs.com/package/duck-fp">
        <img alt="npm latest version" src="https://img.shields.io/npm/v/duck-fp/latest.svg">
    </a>
</div>

# Installation
To install the latest version:
`npm i duck-fp`

## Namespaces auto import
Install ts-namespace-import-plugin:
`npm i -D @unsplash/ts-namespace-import-plugin`

Extend from namespaces tsconfig:
```json
// tsconfig.json
{
  "extends": "./node_modules/duck-fp/tsconfig.namespaces.json"
}
```

Use project typescript version in vscode press <kbd>Ctrl</kbd> + <kbd>Shift</kbd> + <kbd>p</kbd> then running **TypeScript: Select TypeScript Version** command, and selectin **Use Workspace Version** refering to [this](https://github.com/unsplash/ts-namespace-import-plugin/issues/12#issuecomment-1836965622)

# Examples

- Imagine you have a piece of text that represents data in JSON format (like a configuration file or an API response).
- The parse function takes this text as input.
- Inside the function, it tries to convert the text into a JavaScript object using JSON.parse.
- If successful, it returns the either `right` parsed object.
- If there’s an issue (for example, the text isn’t valid JSON), it returns either `left` containing Error instead.
- We are using toError function that takes anything then stringifies it and
  wraps in `Error` to handle catch block
- Why Use This?
   - The tryCatch approach is useful because it gracefully handles potential errors without crashing our program using `Either` monad.
     It’s like saying, “Hey, let’s try to parse this JSON, and if anything goes wrong, we’ll handle it gracefully.”
```ts
import { tryCatch, toError } from 'duck-fp/either'

const parse = (text: string) => {
  return tryCatch(
    () => JSON.parse(text),
    toError
  )
}
```

- [Maybe](https://maybets.duckdns.org/examples/maybe.html)
- [State](https://maybets.duckdns.org/examples/state.html)
- [Either](https://maybets.duckdns.org/examples/either.html)
- [Observable](https://maybets.duckdns.org/examples/observable.html)
- [Reader](https://maybets.duckdns.org/examples/reader.html)
- [ReaderT](https://maybets.duckdns.org/examples/readerT.html)
- [Lens](https://maybets.duckdns.org/examples/lens.html)
- [Prism](https://maybets.duckdns.org/examples/prisms.html)
- [Task Either](https://maybets.duckdns.org/examples/task-either.html)

# License
The MIT License (MIT)
