# duck-fp

## 2.2.0

### Minor Changes

- ea7cc62: Added fromEither function to taskEither module, added fromThrowable to exports in taskEither module.

## 2.1.0

### Minor Changes

- 8e1658f: updated orElse

## 2.0.0

### Major Changes

- 7f119e5: Removed useless monads, updated asyncMap methods in maybe and either, updated packages

## 1.12.3

### Patch Changes

- e89e8d5: Renamed fromUndefined to fromNullable

## 1.12.2

### Patch Changes

- ae09843: better ensureOrElse, new functions

## 1.12.1

### Patch Changes

- 3340a58: Renamed Maybe#flatGetOrElse => orElse, Added Task-Maybe orElse method

## 1.12.0

### Minor Changes

- 4a87cc8: Added ReaderEither, Either fromPredicate & fromPredicateC utils, Either ensureOrElse overload

## 1.11.6

### Patch Changes

- c5e167f: Paths aliases was not being resolved in .d.ts files

## 1.11.5

### Patch Changes

- c9d4022: Fixed incorrect pathes

## 1.11.4

### Patch Changes

- 401b2a7: Performance: useless files wont be published to npm now

## 1.11.3

### Patch Changes

- 8a73d62: Implemented ReaderMaybe

## 1.11.2

### Patch Changes

- rename repository

## 1.11.1

### Patch Changes

- cbe00f2: Implemented TaskEither left & right functions, TaskEither fromThrowable function

## 1.11.0

### Minor Changes

- cf28fda: Implemented Task, Task Either, Task Maybe monads, implemented prisms, multiple function, namespace autoimport

## 1.10.2

### Patch Changes

- 9695c4c: tryCatch now exports from either utils

## 1.10.0

### Minor Changes

- 770286c: Added ReaderT monad, Identity Monad, Lens, Prisms, and cjs and mjs support

## 1.9.0

### Minor Changes

- 9122d8b: Added reader monad, Either#orElse method

### Patch Changes

- 63aaf62: Added E.of function
- 0d2f95e: Added Either#asyncMap method
- 9122d8b: Added Reader#ap method

## 1.8.3

### Patch Changes

- 57dc3b7: Removed observe#unobserve console.logs

## 1.8.2

### Patch Changes

- a56c88c: Fix observer#unobserve

## 1.8.1

### Patch Changes

- 0e4b4e4: Fixed Readme links
- a1e0bd6: Fixed readme links

## 1.8.0

### Minor Changes

- 69c68d7: Added observable, state

## 1.7.2

### Patch Changes

- c54d53f: Implemented apply method to maybe monad
- ae90c11: Added merge method, merge function for either monad

## 1.7.1

### Patch Changes

- d8bca82: Renamed undefinedToMaybe util function to fromUndefined

## 1.7.0

### Minor Changes

- 7e3e3fb: Implemented either monad, changed monads structure
- 011a57d: Added toMaybe, fromMaybe util functions

### Patch Changes

- ea473e3: Rename filterOrElse method to ensureOrElse

## 1.6.1

### Patch Changes

- b444163: Added fromThrowable example
- bb90a67: package build was with jest tests
- ff02d90: Tap instead of map in readme examples

## 1.6.0

### Minor Changes

- 6fb3e20: Added fromThrowable function

### Patch Changes

- ae7d2ed: fixed equals method

## 1.5.2

### Patch Changes

- d6c0173: Fixed module not found or.ts
- df82cfb: Removed orReverse from examples

## 1.5.1

### Patch Changes

- dabad19: Removed or-reverse function

## 1.5.0

### Minor Changes

- 4d2457b: tap method implemented for easy side-effects during monad chaining
- 32c0f24: Added none function

### Patch Changes

- 8867b9b: Fixed docs typo
- 209dde6: fixed typo in readme examples of merge util function

## 1.5.0

### Minor Changes

- 4d2457b: tap method implemented for easy side-effects during monad chaining

### Patch Changes

- 209dde6: fixed typo in readme examples of merge util function

## 1.4.3

### Patch Changes

- fixed documentation typo

## 1.4.2

### Patch Changes

- renamed longMerge => merge

## 1.4.1

### Patch Changes

- or-reverse now exports from utils.

## 1.4.0

### Minor Changes

- 3edbd19: added or, or-reverse util functions
