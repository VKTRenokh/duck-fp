import * as M from '../src/maybe'
import { ReaderMaybe, of } from '../src/reader-maybe'

interface Env {
  something?: string
}

const eNullable: Env = {}

const e: Env = {
  something: 'test',
}

describe('reader-maybe.ts', () => {
  // {{{ map
  it('map', () => {
    const reader: ReaderMaybe<Env, string> = of((e) => {
      return M.fromUndefined(e.something)
    })

    const mapFn = jest.fn((something: string) => {
      expect(something).toBe('test')
      return something.repeat(2)
    })

    const mapped = reader.map(mapFn)

    expect(mapped.run(e).value).toBe('testtest')
    expect(mapFn).toHaveBeenCalledWith('test')
  })
  // }}}
})
