import { M, P } from '../src'

// {{{ helpers to run tests
interface Nested2 {
  a: number
  b: string
}

interface Nested {
  something: Nested2
}

interface Obj {
  a: 5
  nonExisting?: string
  nonExistingExisting: string | null
  nested: Nested
}

const obj: Obj = {
  a: 5,
  nonExistingExisting: 'hello',
  nested: {
    something: {
      a: 42,
      b: 'something',
    },
  },
}
// }}}

describe('prism', () => {
  // {{{ view
  it('view', () => {
    const prism: P.Prism<Obj, 5> = P.fromProp('a')
    const canNotExist: P.Prism<Obj, string | null> =
      P.fromProp('nonExistingExisting')

    const viewed = prism.view(obj)
    const viewed2 = canNotExist.view(obj)

    expect(M.is(viewed)).toBeTruthy()
    expect(M.is(viewed2)).toBeTruthy()

    expect(viewed.value).toBe(5)
    expect(viewed2.value).toBe('hello')
  })
  // }}}
  // {{{ set
  it('set', () => {
    const prism: P.Prism<Obj, string | null> = P.fromProp(
      'nonExistingExisting',
    )

    const setted = prism.set('helloworld', obj)

    expect(setted.nonExistingExisting).toBe('helloworld')
  })
  // }}}
  // {{{ compose
  it('compose', () => {
    const a: P.Prism<Obj, Nested> = P.fromProp('nested')
    const b: P.Prism<Nested, Nested2> =
      P.fromProp('something')

    const composed = a.compose(b)

    const viewed = composed.view(obj)

    expect(M.is(viewed)).toBeTruthy()
    expect(viewed.value).toStrictEqual(obj.nested.something)

    const nested2: Nested2 = {
      a: 50,
      b: 'qwerty',
    }

    const setted = composed.set(nested2, obj)

    expect(setted.nested.something).toBe(nested2)
  })
  // }}}
})
