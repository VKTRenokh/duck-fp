import { F } from '../src/'

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
})
