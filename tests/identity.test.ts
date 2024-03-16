import { I } from '../src/'

describe('identity.ts', () => {
  it('map', () => {
    const map = jest.fn((num: number) => {
      expect(num).toBe(10)
      return num * 2
    })

    const identity = I.of(10).map(map)

    expect(map).toHaveBeenCalled()
    expect(identity.value).toBe(20)
  })

  it('flatMap', () => {
    const toMerge = I.of(50)

    const flatMapFn = jest.fn((num: number) =>
      toMerge.map((num2) => [num, num2] as const),
    )

    const merged = I.of(10).flatMap(flatMapFn)

    expect(flatMapFn).toHaveBeenCalled()
    expect(merged.value).toStrictEqual([10, 50])
  })
})
