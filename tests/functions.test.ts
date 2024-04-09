import * as F from '../src/functions'

// {{{ function helpers
const add = (n: number) => (toAdd: number) => n + toAdd
const double = (n: number) => n * 2
const quadriple = (n: number) => double(double(n))
// }}}

describe('functions', () => {
  // {{{ multiple
  it('multiple', () => {
    const computations = F.multiple(
      add(50),
      double,
      quadriple,
    )

    expect(computations(50)).toStrictEqual([100, 100, 200])
  })
  // }}}
  // {{{ side
  it('side', () => {
    let something = 0

    const fnToSide = jest.fn((n: number) => {
      expect(n).toBe(2)
      something = n
      return n * 2
    })

    const sided = F.side(fnToSide)

    expect(sided(2)).toBe(2)
    expect(fnToSide).toHaveBeenCalledWith(2)
    expect(something).toBe(2)
  })
  // }}}
})
