import { Maybe } from '../maybe'

export const isMaybe = <T>(
  value: unknown,
): value is Maybe<T> =>
  !!value &&
  typeof value === 'object' &&
  'map' in value &&
  typeof value.map === 'function' &&
  'flatMap' in value &&
  typeof value.flatMap === 'function'
