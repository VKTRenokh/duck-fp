import { M } from '../src/index'

describe('utils.ts', () => {
  // {{{ or
  it('or', () => {
    const final = M.or(M.of<number>(null), M.of(3), M.of(4))

    expect(final.value).toBe(3)
  })
  // }}}
  // {{{ merge
  it('merge without nothing', () => {
    const merged = M.merge(
      M.of(42),
      M.of(10),
      M.of('hello'),
    )

    expect(merged.value).toStrictEqual([42, 10, 'hello'])
  })
  // }}}
  // {{{ merge
  it('merge with nothing', () => {
    const merged = M.merge(
      M.of<number>(null),
      M.of(10),
      M.of('hello'),
    )

    expect(merged.value).toBeNull()
  })
  // }}}
  // {{{ fromNullable
  it('fromNullable', () => {
    expect(M.fromNullable(42).value).toBe(42)
  })
  // }}}
  // {{{ mergeMap
  it('merge map', () => {
    const add = (a: number, b: number) => a + b

    const a = M.of(1)
    const b = M.of(2)

    expect(M.mergeMap(a, b, add).value).toBe(3)
  })
  // }}}
  // {{{ mergeMap
  it('merge map with nothing', () => {
    const add = (a: number, b: number) => a + b

    const a = M.none<number>()
    const b = M.of(2)

    expect(M.mergeMap(a, b, add).value).toBe(null)
  })
  // }}}
  // {{{ fromThrowable
  it('fromThrowable', () => {
    const throwable = (num: number) => {
      if (num < 5) {
        throw new Error('error')
      }
      return ':)'
    }

    const handled = M.fromThrowable(throwable)

    expect(handled(0).value).toBeNull()
    expect(handled(6).value).toBe(':)')
  })
  // }}}
})
