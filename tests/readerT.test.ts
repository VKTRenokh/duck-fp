import { RT, M } from '../src'

interface Env {
  somevalue: number | null
  stringValueThatMayNotExist: string | undefined | null
}

const env: Env = {
  somevalue: 50,
  stringValueThatMayNotExist: undefined,
}

const someValue: RT.ReaderT<Env, M.Maybe<number>> = RT.of(
  (e) => M.of(e.somevalue),
)

describe('readerT.ts', () => {
  it('map', () => {
    const map = jest.fn((number: number) => number * 2)

    const mapped = someValue.map<M.Maybe<number>>(map)
    const runned = mapped.run(env)

    expect(map).toHaveBeenCalled()
    expect(runned.value).toBe(100)
  })
})
