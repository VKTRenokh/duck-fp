import { Left, isRight, left, right } from '../src/either'
import { ReaderEither, of } from '../src/reader-either'

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

    const reader: ReaderEither<Env, string, number> = of(
      (_e: Env) => right(40),
    )

    const runned = reader.flatMap(leftDouble).run(env)
    expect(leftDouble).toHaveBeenCalledWith(40)
    expect((runned as Left<string, number>).left).toBe(
      'hello world80',
    )
  })
  // }}}
})
