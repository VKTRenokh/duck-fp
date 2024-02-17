import { E } from '../src'

const eitherExampleString = 'cannot work with 0'
const eitherExampleError = new Error(eitherExampleString)

const eitherExample = (
  a: number,
  b: number,
): E.Either<string, number> => {
  if (a === 0) {
    return E.left(eitherExampleString)
  }

  return E.right(a / b)
}

const throwable = (num: number) => {
  if (num === 0) {
    throw eitherExampleError
  }

  return num / 2
}

describe('either monad', () => {
  it('fold', () => {
    const nums = [0, 2] as const

    const a = eitherExample(...nums)

    const onLeft = jest.fn((e: string) =>
      expect(e).toBe(eitherExampleString),
    )

    const onRight = jest.fn((v) =>
      expect(v).toBe(nums[0] / nums[1]),
    )

    a.fold(onLeft, onRight)

    expect(onLeft).toHaveBeenCalled()
    expect(onRight).not.toHaveBeenCalled()
  })

  it('fromThrowable', () => {
    const wrapped = E.fromThrowable(throwable)

    const onLeft = jest.fn((e) =>
      expect(e).toStrictEqual(eitherExampleError),
    )
    const onRight = jest.fn((v) => expect(v).toBe(2))

    wrapped(0).fold(onLeft, onRight)

    expect(onLeft).toHaveBeenCalled()
    expect(onRight).not.toHaveBeenCalled()

    wrapped(4).fold(onLeft, onRight)

    expect(onLeft).toHaveBeenCalledTimes(1)
    expect(onRight).toHaveBeenCalled()
  })
})
