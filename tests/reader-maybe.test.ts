import * as M from '../src/maybe'
import { ReaderMaybe, of } from '../src/reader-maybe'
import { shouldNotBeCalled } from './utils/should-not-be-called'

// {{{ helpers
interface Env {
  something?: string
}

const eNullable: Env = {}

const e: Env = {
  something: 'test',
}
// }}}

describe('reader-maybe.ts', () => {
  // {{{ map
  it('map', () => {
    const reader: ReaderMaybe<Env, string> = of((e) => {
      return M.fromNullable(e.something)
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
  // {{{ flatMap
  it('flatMap', () => {
    const reader = of<Env, string>((e) =>
      M.fromNullable(e.something),
    )
    const otherReader = of<Env, string>((e) =>
      M.fromNullable(e.something).map((e: string) =>
        e.repeat(2),
      ),
    )

    const flatMapFn = jest.fn(() => otherReader)

    const runned = reader.flatMap(flatMapFn).run(e)

    expect(
      of(() => M.none())
        .flatMap(shouldNotBeCalled)
        .run(0).value,
    ).toBeNull()

    expect(runned.value).toBe('testtest')
    expect(runned.isNothing()).toBeFalsy()
  })
  // }}}
  // {{{ runOrElse
  it('runOrElse', () => {
    const reader = of<Env, string>((e) =>
      M.fromNullable(e.something),
    )

    const runnedNonNullable = reader.runOrElse(
      e,
      'it is not possible',
    )
    const runnnedNullable = reader.runOrElse(
      eNullable,
      'should be this',
    )

    expect(runnedNonNullable).toBe('test')
    expect(runnnedNullable).toBe('should be this')
  })
  // }}}
  // {{{ orElse
  it('orElse', () => {
    const readerNone = of<Env, string>(() => M.none())
    const readerSome = of<Env, string>((e) =>
      M.fromNullable(e.something),
    )

    const a = readerNone.orElse(readerSome).run(e)
    const b = readerSome.orElse(readerNone).run(e)

    expect(a.value).toBe('test')
    expect(b.value).toBe('test')
  })
  // }}}
})
