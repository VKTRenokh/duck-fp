import { I } from '../src/'

describe('identity.ts', () => {
  // {{{ map
  it('map', () => {
    const map = jest.fn((num: number) => {
      expect(num).toBe(10)
      return num * 2
    })

    const identity = I.of(10).map(map)

    expect(map).toHaveBeenCalled()
    expect(identity.value).toBe(20)
  })
  // }}}
  // {{{ flatMap
  it('flatMap', () => {
    const toMerge = I.of(50)

    const flatMapFn = jest.fn((num: number) =>
      toMerge.map((num2) => [num, num2] as const),
    )

    const merged = I.of(10).flatMap(flatMapFn)

    expect(flatMapFn).toHaveBeenCalled()
    expect(merged.value).toStrictEqual([10, 50])
  })
  // }}}
  // {{{ merge
  it('merge', () => {
    const a = I.of(50)
    const b = I.of(500)

    expect(a.merge(b).value).toStrictEqual({
      left: 50,
      right: 500,
    })
  })
  // }}}
})
