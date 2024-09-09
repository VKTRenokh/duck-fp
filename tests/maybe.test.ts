import { M } from '../src/'

describe('maybe.ts', () => {
  // {{{ map
  it('map', () => {
    const number = M.of(42).map((num) => num * 2)

    expect(number.value).toBe(42 * 2)

    const fn = (value: number) => {
      console.log(value, ': (')
    }

    const mockedFunction = jest.fn(fn)

    const num = M.none

    num.map(mockedFunction)

    expect(mockedFunction).not.toHaveBeenCalled()
  })
  // }}}
  // {{{ mapNullable
  it('mapNullable', () => {
    const shouldntBeCalled = jest.fn(() => {
      throw new Error('shouldnt be called')
    })

    const a = M.of(32).mapNullable(() => undefined)
    const b = M.of(5).mapNullable(() => 5)
    const c = M.none.mapNullable(shouldntBeCalled)

    expect(a.value).toBeNull()
    expect(b.value).toBe(5)
    expect(c.value).toBe(null)
    expect(shouldntBeCalled).not.toHaveBeenCalled()
  })
  // }}}
  // {{{ flatMap
  it('flatMap', () => {
    const a = M.of(5)
    const b = M.of(52).flatMap((value) =>
      a.map((otherValue) => value + otherValue),
    )

    expect(b.value).toBe(57)
  })
  // }}}
  // {{{ getOrElse
  it('getOrElse', () => {
    const get = M.none.getOrElse(5)
    const m = M.of(10).getOrElse(6)

    expect(get).toBe(5)
    expect(m).toBe(10)
  })
  // }}}
  // {{{ flatGetOrElse
  it('flatGetOrElse', () => {
    const maybeFive = M.of(5)
    const maybeSix = M.of(6)

    const get = M.none.orElse(maybeFive)
    const m = maybeFive.orElse(maybeSix)

    expect(get.value).toBe(5)
    expect(m.value).toBe(5)
  })
  // }}}
  // {{{ merge
  it('merge', () => {
    const a = M.of(5)
    const b = M.of('decyat')
    const nullable = M.none

    expect(a.merge(b).value).toMatchObject({
      left: 5,
      right: 'decyat',
    })

    expect(a.merge(nullable).value).toBeNull()
  })
  // }}}
  // {{{ asyncMap
  it('asyncMap', async () => {
    const sleep = (ms: number): Promise<number> =>
      new Promise((res) => setTimeout(() => res(ms), ms))

    const sleepWithError = (ms: number): Promise<number> =>
      new Promise((_, rej) => setTimeout(() => rej(ms), ms))

    M.of(500)
      .asyncMap((ms) => sleep(ms / 2))
      .then((maybeTime) => {
        expect(maybeTime.value).toBe(250)
      })

    const catchError = jest.fn((err) =>
      expect(err).toBe(250),
    )

    const withError = await M.of(500).asyncMap(
      (ms) => sleepWithError(ms / 2),
      catchError,
    )

    const withNothing = await M.none.asyncMap(() => {
      throw new Error('shouldntBeCalled')
    })

    expect(withNothing.value).toBeNull()
    expect(catchError).toHaveBeenCalled()
    expect(withError.value).toBeNull()
  })
  // }}}
  // {{{ equals
  it('equals', () => {
    const a = M.of(5)
    const b = M.of(5)
    const c = M.of(6)

    expect(a.equals(b)).toBeTruthy()
    expect(a.equals(c)).not.toBeTruthy()
  })
  // }}}
  // {{{ apoly
  it('apply', () => {
    const double = M.of((num: number) => num * 2)
    const doubleNoCall = M.of((num: number) => {
      throw new Error('shouldntBeCalled')
    })

    expect(M.of(42).apply(double).value).toBe(84)
    expect(M.none.apply(doubleNoCall).value).toBeNull()
  })
  // }}}
  // {{{ isNothing
  it('isNothing', () => {
    expect(M.none.isNothing()).toBeTruthy()
    expect(M.of(2).isNothing()).toBeFalsy()
  })
  // }}}
  // {{{ call
  it('call', () => {
    const fn = jest.fn(() => 0)

    expect(M.call(fn)).toBe(0)
    expect(fn).toHaveBeenCalled()
  }) // }}}
  // {{{ is
  it('is', () => {
    const maybe = M.of(30)

    expect(M.is(maybe)).toBeTruthy()
    expect(M.is(40)).toBeFalsy()
  })
  // }}}
  // {{{ toBoolean
  it('toBoolean', () => {
    expect(M.of('hello').toBoolean()).toBeTruthy()
    expect(M.none.toBoolean()).toBeFalsy()
  })
  // }}}
})
