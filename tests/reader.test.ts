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
  })
})
