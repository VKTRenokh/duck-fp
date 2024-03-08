import { R } from '../src'

describe('reader.ts', () => {
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

  it('map', () => {
    interface Env {
      s: number
    }

    const run = jest.fn((env: Env) => env.s * 2)

    const reader = R.of(run).map((number) => number / 0.2)

    expect(reader.run({ s: 100 })).toBe(1000)
    expect(run).toHaveBeenCalled()
  })
})
