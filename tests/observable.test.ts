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
})