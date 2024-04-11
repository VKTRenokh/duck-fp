import { Left, left, right } from '../src/either'
import {
  TaskEither,
  of,
  left as taskLeft,
  right as taskRight,
  tryCatch,
} from '../src/task-either'

// {{{ tests helpers
const shouldNotBeCalled = () => {
  throw new Error('should not be called')
}
// }}}

describe('task-either.ts', () => {
  // {{{ map test
  it('map', async () => {
    const mapFn = jest.fn((num: number) => num * 2)

    const task = taskRight(40).map(mapFn)

    const taskWithRight = taskLeft<string, number>(
      'some error',
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
  it('flatMap', async () => {
    const flatMapFn = jest.fn(
      (cond: boolean): TaskEither<string, string> =>
        taskLeft(cond ? '!' : '?'),
    )

    const taskEitherTrue: TaskEither<string, boolean> =
      taskRight(true)

    const mapped = taskEitherTrue.flatMap(flatMapFn)

    const runned = await mapped.run()

    expect(runned.isLeft()).toBeTruthy()
    expect((runned as Left<string, string>).left).toBe('!')
  })
  // }}}
  // {{{ ensureOrElse
  it('ensureOrElse', async () => {
    interface User {
      name: string
      has2Fa: boolean
    }

    const okUser: User = {
      name: 'Bogdan',
      has2Fa: true,
    }

    const either: TaskEither<string, User> = of(() =>
      Promise.resolve(right(okUser)),
    )

    const nameValidation = jest.fn((user: User) => {
      expect(
        user.name === 'Bogdan' || user.name === 'Aa',
      ).toBeTruthy()

      return user.name.length >= 3
    })

    const onFalse = jest.fn((user: User) => {
      expect(user === okUser).toBeTruthy()

      return `${user.name} is too small`
    })

    const runned = await either
      .ensureOrElse(nameValidation, onFalse)
      .run()

    expect(nameValidation).toHaveBeenCalled()
    expect(onFalse).not.toHaveBeenCalled()
    expect(runned.isRight()).toBeTruthy()
  })
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
  // {{{ orElse
  it('orElse', async () => {
    const toRight = await taskLeft<number, string>(50)
      .orElse((number) =>
        taskRight<string, string>(number.toString()),
      )
      .run()

    expect(toRight.isRight()).toBeTruthy()
  })
  // }}}
})
