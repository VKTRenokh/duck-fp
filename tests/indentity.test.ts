import { I } from '../src/'

describe('identity.ts', () => {
  it('map', () => {
    const map = jest.fn((num: number) => {
      expect(num).toBe(10)
      return num * 2
    })

    const identity = I.of(10).map(map)

    expect(map).toHaveBeenCalled()
    expect(identity.value).toBe(20)
  })
})
