import { match } from '../src/boolean'

describe('boolean.ts', () => {
  it('match', () => {
    const onFalse = jest.fn(() => ':(')
    const onTrue = jest.fn(() => ':)')

    const matcher = match(onFalse, onTrue)

    expect(matcher(false)).toBe(':(')
    expect(matcher(true)).toBe(':)')
  })
})
