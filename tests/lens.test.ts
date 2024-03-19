import { from } from '../src/lens'

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
})
