import { TM } from '../src/'

// {{{ helpers
const createDoubler = (expectable: number) =>
  jest.fn((num: number) => {
    expect(num).toBe(expectable)
    return num * 2
  })
// }}}

describe('task-maybe.ts', () => {
  // {{{ map
  it('map', async () => {
    const double = createDoubler(50)

    const task = await TM.immediate(50).map(double).run()

    expect(double).toHaveBeenCalledWith(50)
    expect(task.value).toBe(100)
  })
  // }}}
})
