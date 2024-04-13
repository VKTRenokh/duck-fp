# Task Either
TaskEither represents computation that might fail.

## tryCatch()
- Function signature
  ```ts
  <T, E>(
    tryFn: () => Promise<T>,
    catchFn: (e: unknown) => E,
  ): TaskEither<E, T>
  ```
- `tryFn` a function that may throw an Error
- `catchFn` a function that is called when `tryFn` throwed something
- returns TaskEither containing either `right` containg the result of tryFn or if
  tryFn throws an Error `left` containing the result of catchFn
- Code example
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
