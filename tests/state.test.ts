import { S } from '../src'

// {{{ helpers for running tests
const double = (num: number): [number, number] => [
  num * 2,
  num * 2,
]

const initialState = 10

const doubleState = S.of(double)
// }}}

describe('state.ts', () => {
  // {{{ run
  it('run', () => {
    expect(doubleState.run(initialState)).toStrictEqual([
      20, 20,
    ])
  })
  // }}}
  // {{{ map
  it('map', () => {
    const [result, newState] = doubleState
      .map((num) => num.toString())
      .map((str) => str.repeat(2))
      .run(initialState)

    expect(result).toBe('2020')
    expect(newState).toBe(initialState * 2)
  })
  // }}}
  // {{{ flatMap
  it('flatMap', () => {
    const result = doubleState
      .flatMap(() => S.of((num) => [num.toString(), num]))
      .run(initialState)

    expect(result).toStrictEqual(['20', 20])
  })
  // }}}
})
