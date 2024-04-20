import { Lazy } from '->/types'

export const match =
  <T, R>(onFalse: Lazy<T>, onTrue: Lazy<R>) =>
  (value: boolean): T | R =>
    value ? onTrue() : onFalse()
