import { E, M } from '../src'
import { Either } from '../src/either'

const eitherExampleString = 'cannot work with 0'
const eitherExampleError = new Error(eitherExampleString)
const eitherExampleFlatMapString = 'cannot work with 1'

interface User {
  has2Fa: boolean
  name: string
}

const validate = (user: User) => user.has2Fa
const validateName = (user: User) => user.name.length > 3

const validateUser = (user: User): E.Either<string, User> =>
  E.right<User, string>(user)
    .ensureOrElse(validate, () => 'user does not have 2 fa')
    .ensureOrElse(
      validateName,
      () => 'user name is too small',
    )

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
    expect(flatMapFn).toHaveBeenCalled()
    expect(left).not.toHaveBeenCalled()
    expect(right).toHaveBeenCalled()

    eitherExample(2, 2).flatMap(flatMapFn).fold(left, right)
    expect(flatMapFn).toHaveBeenCalledTimes(2)
    expect(left).toHaveBeenCalledTimes(1)
    expect(right).toHaveBeenCalled()

    eitherExample(0, 2).flatMap(flatMapFn)
    expect(flatMapFn).toHaveBeenCalledTimes(2)
  })

  it('ensureOrelse', () => {
    validateUser({ has2Fa: true, name: '1234' }).fold(
      () => {
        throw new Error('should not be called')
      },
      (user) =>
        expect(user).toMatchObject({
          has2Fa: true,
          name: '1234',
        }),
    )

    validateUser({ has2Fa: false, name: '3423' }).fold(
      (e) => expect(e).toBe('user does not have 2 fa'),
      () => {
        throw new Error('should not be called')
      },
    )

    E.left<string, string>('some error')
      .ensureOrElse(
        (string) => string.length > 2,
        () => 'some string error',
      )
      .fold(
        (e) => expect(e).toBe('some error'),
        () => {
          throw new Error('shouldnt be called')
        },
      )
  })

  it('fromMaybe', () => {
    E.fromMaybe(M.of(42), '!').fold(
      () => {
        throw new Error('should not be called')
      },
      (v) => expect(v).toBe(42),
    )

    E.fromMaybe(M.none<number>(), 'maybe is none').fold(
      (e) => expect(e).toBe('maybe is none'),
      () => {
        throw new Error('should not be called')
      },
    )
  })

  it('toMaybe', () => {
    const eitherRight: E.Either<string, number> = E.right(5)
    const eitherLeft: E.Either<string, number> =
      E.left('string')

    E.toMaybe(eitherRight).map((value) =>
      expect(value).toBe(5),
    )
    expect(E.toMaybe(eitherLeft).value).toBeNull()
  })

  it('merge', () => {
    const a: E.Either<string, number> = E.right(5)
    const b: E.Either<string, string> = E.right('Hello')
    const c: E.Either<string, number> = E.left('Some error')

    a.merge(b).fold(
      () => {
        throw new Error('should not be called')
      },
      (m) => {
        expect(m.left).toBe(5)
        expect(m.right).toBe('Hello')
      },
    )

    b.merge(c).fold(
      (e) => expect(e).toBe('Some error'),
      () => {
        throw new Error("should'nt be called")
      },
    )

    c.merge(b).fold(
      (e) => expect(e).toBe('Some error'),
      () => {
        throw new Error('should not be called')
      },
    )
  })

  it('merge util', () => {
    const merged = E.merge<E.Either<string, number>[]>(
      E.right(4),
      E.right(5),
      E.right(6),
    )

    merged.fold(
      () => {
        throw new Error('should not be called')
      },
      (array) => {
        expect(array).toStrictEqual([4, 5, 6])
      },
    )
  })

  it('isLeft', () => {
    const right: E.Either<string, string> = E.right('hello')
    const left: E.Either<string, string> = E.left('bye')

    expect(right.isLeft()).not.toBeTruthy()
    expect(left.isLeft()).toBeTruthy()
  })

  it('isRight', () => {
    const right: E.Either<string, string> = E.right('hello')
    const left: E.Either<string, string> = E.left('bye')

    expect(right.isRight()).toBeTruthy()
    expect(left.isRight()).not.toBeTruthy()
  })

  it('orElse', () => {
    const a: E.Either<string, string> = E.right('k').orElse(
      () => E.left('test'),
    )

    a.fold(
      () => {
        throw new Error('should not be called')
      },
      (v) => {
        expect(v).toBe('k')
      },
    )

    const b = E.left<string, string>('err').orElse(() =>
      E.left('a'),
    )

    b.fold(
      (e) => expect(e).toBe('a'),
      () => {
        throw new Error('should not be called')
      },
    )
  })
})
