import { R } from '../src'

// {{{ interface for enviroments
interface Env {
  s: number
}
// }}}
describe('reader.ts', () => {
  // {{{ run
  it('run', () => {
    const run = jest.fn(
      (env: Record<string, string>) => env.someKey,
    )

    const reader = R.of(run)

    expect(reader.run({})).toBeUndefined()
    expect(reader.run({ someKey: 'someValue' })).toBe(
      'someValue',
    )
    expect(run).toHaveBeenCalledTimes(2)
  })
  // }}}
  // {{{ map
  it('map', () => {
    const run = jest.fn((env: Env) => env.s * 2)

    const reader = R.of(run).map((number) => number / 0.2)

    expect(reader.run({ s: 100 })).toBe(1000)
    expect(run).toHaveBeenCalled()
  })
  // }}}
  // {{{ flatMap
  it('flatMap', () => {
    const a = R.of<Env, number>((env) => env.s * 10)
    const b = R.of<Env, number>((env) => env.s * 2)

    const merged = a.flatMap((firstValue) =>
      b.map(
        (secondValue) => [firstValue, secondValue] as const,
      ),
    )

    expect(merged.run({ s: 10 })).toStrictEqual([100, 20])
  })
  // }}}
  // {{{ ap
  it('ap', () => {
    const a = R.of<Env, number>((env) => env.s / 2)
    const b = R.of<Env, (number: number) => string>(
      (env) => (number) => `${number}.${env.s}`,
    )

    expect(a.ap(b).run({ s: 58 })).toBe('29.58')
  })
  // }}}
})
