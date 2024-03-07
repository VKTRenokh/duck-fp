import { O } from '../src'

const double = (num: number): number => num * 2
const flatDouble = (num: number): O.Observable<number> =>
  O.of(num * 2)

describe('observable.ts', () => {
  it('map', () => {
    const observable = O.of(52)
    const newObservable = observable.map(double)

    const observer = jest.fn((num: number) =>
      expect(num).toBe(104),
    )

    newObservable.observe(observer)

    expect(observer).toHaveBeenCalled()
  })

  it('flatMap', () => {
    const observable = O.of(2)
    const newObservable = observable.flatMap(flatDouble)

    const observer = jest.fn((num: number) => {
      expect(num).toBe(4)
    })

    newObservable.observe(observer)

    expect(observer).toHaveBeenCalled()
  })

  it('next', () => {
    const observable = O.of(42)
    const observer = jest.fn((num: number) =>
      expect(num).toBeTruthy(),
    )

    observable.observe(observer)
    observable.next(5)

    expect(observer).toHaveBeenCalledTimes(2)
  })

  it('dependingNext', () => {
    const initialState = 2
    const observable = O.of(initialState)
    const double = (num: number): number => num * 2
    const observer = jest.fn((num: number) =>
      expect(
        num === 2 || num === double(initialState),
      ).toBeTruthy(),
    )

    observable.observe(observer)
    observable.dependingNext(double)

    expect(observer).toHaveBeenCalled()
  })

  it('merge', () => {
    const a = O.of(2)
    const b = O.of(9)
    const c = O.of(3)

    const merged = O.merge(a, b, c)

    merged.observe((numbers) =>
      expect(Array.isArray(numbers)).toBeTruthy(),
    )

    const double = (num: number): number => num * 2

    a.dependingNext(double)
    expect(merged.value).toStrictEqual([4, 9, 3])

    b.dependingNext(double)
    expect(merged.value).toStrictEqual([4, 18, 3])

    a.dependingNext(double)
    expect(merged.value).toStrictEqual([8, 18, 3])
  })

  it('observe.unobserve', () => {
    const a = O.of(4)
    const observer = jest.fn((_: number) => {
      throw new Error('should not be called')
    })

    a.observe(observer, true).unobserve()

    a.next(10)
    expect(a.value).toBe(10)
  })

  it('equals', () => {
    const x = 5
    const f = (v: number) => O.of(v * 2)
    const g = (v: number) => O.of(v + 3)

    const law1_lhs = O.of(x).flatMap(f)
    const law1_rhs = f(x)
    expect(law1_lhs.equals(law1_rhs)).toBeTruthy()

    const law2_lhs = O.of(x).flatMap(O.of)
    const law2_rhs = O.of(x)
    expect(law2_lhs.equals(law2_rhs)).toBeTruthy()

    const law3_lhs = O.of(x).flatMap(f).flatMap(g)
    const law3_rhs = O.of(x).flatMap((x) => f(x).flatMap(g))
    expect(law3_lhs.equals(law3_rhs)).toBeTruthy()
  })
})
