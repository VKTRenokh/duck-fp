import { Left, isRight, left, right } from '../src/either'
import {
  ReaderEither,
  of,
  tryCatch,
} from '../src/reader-either'

// {{{ test helpers
interface Env {
  something: string
}

const env: Env = {
  something: 'hello world',
}
// }}}

describe('reader-either.ts', () => {
  // {{{ map
  it('map', () => {
    const readerEither: ReaderEither<Env, Error, string> =
      of((_env) => right('test'))

    const mapFn = jest.fn((_string: string) => {
      return 'test2'
    })

    const runned = readerEither.map(mapFn).run(env)

    if (!isRight(runned)) {
      throw new Error('should be right')
    }

    expect(runned['right']).toBe('test2')
  })
  // }}}
  // {{{ flatMap
  it('flatMap', () => {
    const leftDouble = jest.fn(
      (num: number): ReaderEither<Env, string, number> =>
        of((env) => left(env.something + num * 2)),
    )

    const readerRight: ReaderEither<Env, string, number> =
      of((_e: Env) => right(40))

    const readerLeft: ReaderEither<Env, string, number> =
      of((_e) => left('some error'))

    const runnedRight = readerRight
      .flatMap(leftDouble)
      .run(env)

    expect(leftDouble).toHaveBeenCalledWith(40)
    expect((runnedRight as Left<string, number>).left).toBe(
      'hello world80',
    )

    const runnedLeft = readerLeft
      .flatMap(leftDouble)
      .run(env)

    expect(leftDouble).toHaveBeenCalledTimes(1)
    expect((runnedLeft as Left<string, number>).left).toBe(
      'some error',
    )
  })
  // }}}
  // {{{ tryCatch
  it('tryCatch', () => {
    const throwableTryFn = jest.fn((_: Env): number => {
      throw 'throwable'
    })
    const throwableCatchFn = jest.fn((e: unknown) => {
      return String(e).toUpperCase()
    })

    const throwable = tryCatch(
      throwableTryFn,
      throwableCatchFn,
    ).run(env)

    expect(throwableTryFn).toHaveBeenCalledWith(env)
    expect(throwableCatchFn).toHaveBeenCalledWith(
      'throwable',
    )
    expect((throwable as Left<string, number>).left).toBe(
      'THROWABLE',
    )
  })
  // }}}
})
