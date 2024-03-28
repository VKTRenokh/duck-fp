import { of } from '../src/task'

describe('task.ts', () => {
  it('map', async () => {
    const task = of(() => Promise.resolve(40)).map(
      (num) => num * 2,
    )

    const result = await task.run()

    expect(result).toBe(80)
  })

  it('flatMap', () => {})

  it('delay', () => {})
})
