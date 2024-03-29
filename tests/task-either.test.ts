import { left, right } from '../src/either'
import { of } from '../src/task-either'

const shouldNotBeCalled = () => {
  throw new Error('should not be called')
}

describe('task-either.ts', () => {
  // {{{ map test
  it('map', async () => {
    const mapFn = jest.fn((num: number) => num * 2)

    const task = of(() => Promise.resolve(right(40))).map(
      mapFn,
    )

    const taskWithRight = of(() =>
      Promise.resolve(left<string, number>('some error')),
    ).map(mapFn)

    const onRightFn = jest.fn((num: number) => {
      expect(num).toBe(80)
    })

    const onLeftFn = jest.fn((e: string) => {
      expect(e).toBe('some error')
    })

    task.fold(shouldNotBeCalled, onRightFn).then(() => {
      expect(onRightFn).toHaveBeenCalled()
      expect(mapFn).toHaveBeenCalled()
    })

    taskWithRight
      .fold(onLeftFn, shouldNotBeCalled)
      .then(() => {
        expect(onLeftFn).toHaveBeenCalled()
        expect(mapFn).toHaveBeenCalledTimes(1)
      })
  })
  // }}}
  // {{{ flatMap test
  it('flatMap', () => {})
  // }}}
})
