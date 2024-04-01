# Task Either

You can think of it like a function that return promise of either.

## tryCatch()
```ts
import { toError } from "@victorenokh/maybe.ts/either"
import { tryCatch } from "@victorenokh/maybe.ts/task-either"

const parseOrThrow = (res: Response) => {
  if (!res.ok) {
    throw new Error(res.statusText)
  }

  return res.text()
}

const fetchString = (url: string) =>
  tryCatch(() => fetch(url).then(parseOrThrow), toError)

fetchString('https://example.com').fold(
  console.error,
  console.log,
) // Output: html string of example.com site
fetchString('https://example.com/non/existing/path').fold(
  console.error,
  console.log,
) // Ouput: Error: internal server error
```
