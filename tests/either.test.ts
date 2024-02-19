import { E } from '../src'

const eitherExampleString = 'cannot work with 0'
const eitherExampleError = new Error(eitherExampleString)
const eitherExampleFlatMapString = 'cannot work with 1'

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

describe('either.ts', () => {
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

  it('map', () => {
    const mapFn = jest.fn((number: number) => number + 1)

    const either = eitherExample(4, 2)

    const left = jest.fn((e: string) =>
      expect(e).toBe(eitherExampleString),
    )
    const right = jest.fn((e: number) => expect(e).toBe(3))

    either.map(mapFn).fold(left, right)

    expect(mapFn).toHaveBeenCalled()
    expect(left).not.toHaveBeenCalled()
    expect(right).toHaveBeenCalled()

    const eitherLeft = eitherExample(0, 2).map(mapFn)

    expect(mapFn).toHaveBeenCalledTimes(1)

    eitherLeft.fold(left, right)
    expect(left).toHaveBeenCalled()
    expect(right).toHaveBeenCalledTimes(1)
  })

  it('flatMap', () => {
    const flatMapFn = jest.fn(
      (number: number): E.Either<string, number> => {
        if (number === 1) {
          return E.left(eitherExampleFlatMapString)
        }

        return E.right(number + number)
      },
    )

    const left = jest.fn((string: string) =>
      expect(string).toBe(eitherExampleFlatMapString),
    )
    const right = jest.fn((number: number) =>
      expect(number).toBe(4),
    )

    eitherExample(4, 2).flatMap(flatMapFn).fold(left, right)
    expect(left).not.toHaveBeenCalled()
    expect(right).toHaveBeenCalled()

    eitherExample(2, 2).flatMap(flatMapFn).fold(left, right)
    expect(left).toHaveBeenCalledTimes(1)
    expect(right).toHaveBeenCalled()
  })

  it('filterOrElse', () => {
    interface User {
      has2Fa: boolean
      name: string
    }

    const validate = (user: User) => user.has2Fa
    const validateName = (user: User) =>
      user.name.length > 3

    E.right<User, string>({ has2Fa: true, name: '1234' })
      .ensureOrElse(
        validate,
        () => 'user does not have 2 fa',
      )
      .ensureOrElse(
        validateName,
        () => 'user name is too small',
      )
      .fold(
        () => {
          throw new Error('shouldnt be called')
        },
        (user) =>
          expect(user).toMatchObject({
            has2Fa: true,
            name: '1234',
          }),
      )
  })
})
