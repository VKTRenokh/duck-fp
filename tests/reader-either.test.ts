import { isRight, left, right } from '../src/either'
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
})
