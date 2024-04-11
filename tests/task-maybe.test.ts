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
  // {{{ orElse
  it('orElse', async () => {
    const some = TM.immediate(50)

    const none = await TM.immediate<number>(null)
      .orElse(some)
      .run()

    const someToNone = await some
      .orElse(TM.immediate<number>(null))
      .run()

    expect(none.value).toBe(50)
    expect(someToNone.value).toBe(50)
  })
  // }}}
})
