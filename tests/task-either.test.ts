import { left, right } from '../src/either'
import { of, tryCatch } from '../src/task-either'

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
  // {{{ tryCatch
  it('tryCatch', () => {
    const throwable = jest.fn(() => {
      throw 'test'
    })
    const nonThrowable = jest.fn(() => {
      return Promise.resolve(10 * 2)
    })
    const catchFn = jest.fn((e) => {
      expect(e).toBe('test')
      return e
    })

    tryCatch(throwable, catchFn)
      .run()
      .then((either) =>
        expect(either.isLeft()).toBeTruthy(),
      )

    expect(throwable).toHaveBeenCalled()
    expect(throwable).toHaveBeenCalledWith()
    expect(catchFn).toHaveBeenCalled()
    expect(catchFn).toHaveBeenCalledWith('test')

    tryCatch(nonThrowable, catchFn)
      .run()
      .then((either) =>
        expect(either.isRight()).toBeTruthy(),
      )

    expect(nonThrowable).toHaveBeenCalled()
    expect(nonThrowable).toHaveBeenCalledWith()
    expect(catchFn).toHaveBeenCalledTimes(1)
  })
  // }}}
})
