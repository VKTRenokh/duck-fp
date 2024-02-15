import {
  maybe,
  or,
  merge,
  undefinedToMaybe,
  mergeMap,
} from '../src/index'

describe('utils.ts', () => {
  it('or', () => {
    const final = or(
      maybe<number>(null),
      maybe(3),
      maybe(4),
    )

    expect(final.value).toBe(3)
  })

  it('merge without nothing', () => {
    const merged = merge(
      maybe(42),
      maybe(10),
      maybe('hello'),
    )

    expect(merged.value).toStrictEqual([42, 10, 'hello'])
  })

  it('merge with nothing', () => {
    const merged = merge(
      maybe<number>(null),
      maybe(10),
      maybe('hello'),
    )

    expect(merged.value).toBeNull()
  })

  it('undefined to maybe', () => {
    expect(undefinedToMaybe(42).value).toBe(42)
  })

  it('undefined to maybe with undefined', () => {
    expect(undefinedToMaybe(undefined).value).toBeNull()
  })

  it('merge map', () => {
    const add = (a: number, b: number) => a + b

    const a = maybe(1)
    const b = maybe(2)

    expect(mergeMap(a, b, add).value).toBe(3)
  })

  it('merge map with nothing', () => {
    const add = (a: number, b: number) => a + b

    const a = maybe<number>(null)
    const b = maybe(2)

    expect(mergeMap(a, b, add).value).toBe(null)
  })
})
