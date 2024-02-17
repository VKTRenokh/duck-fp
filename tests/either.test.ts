import { Either, left, right } from '../src'

const eitherExampleError = 'cannot work with 0'

const eitherExample = (
  a: number,
  b: number,
): Either<string, number> => {
  if (a === 0) {
    return left(eitherExampleError)
  }

  return right(a / b)
}

describe('either monad', () => {
  it('fold', () => {
    const nums = [0, 2] as const

    const a = eitherExample(...nums)

    const onLeft = jest.fn((e: string) =>
      expect(e).toBe(eitherExampleError),
    )

    const onRight = jest.fn((v) =>
      expect(v).toBe(nums[0] / nums[1]),
    )

    a.fold(onLeft, onRight)

    expect(onLeft).toHaveBeenCalled()
    expect(onRight).not.toHaveBeenCalled()
  })
})
