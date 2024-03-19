import { Lens, from, fromProp } from '../src/lens'

describe('lens.ts', () => {
  it('set()', () => {
    const obj = { a: 'string' }

    const setter = jest.fn((v: string, s: typeof obj) => {
      expect(v).toBe('str')
      expect(s).toBe(obj)

      return { ...obj, a: v }
    })
    const view = (_: typeof obj): string => {
      throw new Error('should not be called')
    }

    const lens = from(view, setter)
    const setted = lens.set('str', obj)
    expect(setter).toHaveBeenCalled()

    expect(setted.a).toBe('str')
    expect(setted).not.toBe(obj)
  })

  it('get()', () => {
    const obj = { a: 'string' }

    const setter = (
      s: string,
      v: typeof obj,
    ): typeof obj => {
      throw new Error('should not be called')
    }

    const view = jest.fn((a: typeof obj) => {
      expect(a).toBe(obj)
      return a.a
    })

    const lens = from(view, setter)

    expect(lens.view(obj)).toBe('string')
    expect(view).toHaveBeenCalled()
  })

  it('compose()', () => {
    interface Nested2 {
      a: string
      b: string
    }

    interface Nested1 {
      a: number
      b: number
      nested: Nested2
    }

    interface Obj {
      nested1: Nested1
    }

    const obj: Obj = {
      nested1: {
        a: 10,
        b: 15,
        nested: {
          a: 'something something',
          b: 'something',
        },
      },
    }

    const nested1: Lens<Obj, Nested1> = fromProp('nested1')

    const nested2: Lens<Nested1, Nested2> =
      fromProp('nested')

    const composed = nested1.compose(nested2)

    expect(composed.view(obj)).toBe(obj.nested1.nested)

    const newObj = {
      a: 'new something',
      b: 'new new something',
    }

    expect(composed.set(newObj, obj).nested1.nested).toBe(
      newObj,
    )
  })
})
