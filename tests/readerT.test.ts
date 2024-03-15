import { RT, M } from '../src'

interface Env {
  somevalue: number | null
  stringValueThatMayNotExist: string | undefined
}

const envWithMissingValues: Env = {
  somevalue: 50,
  stringValueThatMayNotExist: undefined,
}

const envWithoutMissingValues: Env = {
  somevalue: 50,
  stringValueThatMayNotExist: 'i exist.',
}

const someValue: RT.ReaderT<Env, M.Maybe<number>> = RT.of(
  (e) => M.of(e.somevalue),
)

describe('readerT.ts', () => {
  it('map', () => {
    const map = jest.fn((number: number) => number * 2)

    const mapped = someValue.map<M.Maybe<number>>(map)
    const runned = mapped.run(envWithMissingValues)

    expect(map).toHaveBeenCalled()
    expect(runned.value).toBe(100)
  })

  it('flatMap', () => {
    const run = jest.fn((enviroment: Env) => {
      expect(enviroment).toBe(envWithoutMissingValues)
      return M.fromUndefined(
        enviroment.stringValueThatMayNotExist,
      )
    })

    const a = RT.of<Env, M.Maybe<string>>(run)

    const merge = jest.fn((num: number) =>
      a.map<M.Maybe<[number, string]>>((string) => [
        num,
        string,
      ]),
    )

    const merged = someValue
      .flatMap<M.Maybe<[number, string]>>(merge)
      .run(envWithoutMissingValues)

    expect(run).toHaveBeenCalled()
    expect(merge).toHaveBeenCalled()
    expect(merged.value).toStrictEqual([
      envWithoutMissingValues.somevalue,
      envWithoutMissingValues.stringValueThatMayNotExist,
    ])
  })
})
