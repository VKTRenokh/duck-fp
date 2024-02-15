import { maybe, none } from '../src/'

describe('maybe.ts', () => {
  it('map', () => {
    const number = maybe(42).map((num) => num * 2)

    expect(number.value).toBe(42 * 2)

    const fn = (value: number) => {
      console.log(value, ': (')
    }

    const mockedFunction = jest.fn(fn)

    const num = none<number>()

    num.map(mockedFunction)

    expect(mockedFunction).not.toHaveBeenCalled()
  })

  it('mapNullable', () => {
    const a = maybe(32).mapNullable(() => undefined)
    const b = maybe(5).mapNullable(() => 5)

    expect(a.value).toBeNull()
    expect(b.value).toBe(5)
  })

  it('tap', () => {
    const tapfn = jest.fn((value) => {
      value
    })

    const a = maybe(42).tap(tapfn)

    expect(a.value).toBe(42)
    expect(tapfn).toHaveBeenCalled()
  })

  it('flatMap', () => {
    const a = maybe(5)
    const b = maybe(52).flatMap((value) =>
      a.map((otherValue) => value + otherValue),
    )

    expect(b.value).toBe(57)
  })

  it('getOrElse', () => {
    const get = none<number>().getOrElse(5)
    const m = maybe(10).getOrElse(6)

    expect(get).toBe(5)
    expect(m).toBe(10)
  })

  it('flatGetOrElse', () => {
    const maybeFive = maybe(5)
    const maybeSix = maybe(6)

    const get = none<number>().flatGetOrElse(maybeFive)
    const m = maybeFive.flatGetOrElse(maybeSix)

    expect(get.value).toBe(5)
    expect(m.value).toBe(5)
  })

  it('merge', () => {
    const a = maybe(5)
    const b = maybe('decyat')
    const nullable = none<string>()

    expect(a.merge(b).value).toMatchObject({
      left: 5,
      right: 'decyat',
    })

    expect(a.merge(nullable).value).toBeNull()
  })

  it('asyncMap', () => {
    const sleep = (ms: number): Promise<number> =>
      new Promise((res) => setTimeout(() => res(ms), ms))

    maybe(500)
      .asyncMap((ms) => sleep(ms / 2))
      .then((maybeTime) => {
        expect(maybeTime.value).toBe(250)
      })
  })

  it('equals', () => {
    const a = maybe(5)
    const b = maybe(5)
    const c = maybe(6)

    expect(a.equals(b)).toBeTruthy()
    expect(a.equals(c)).not.toBeTruthy()
  })
})
