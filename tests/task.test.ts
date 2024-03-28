import { of } from '../src/task'

describe('task.ts', () => {
  it('map', async () => {
    const task = of(() => Promise.resolve(40)).map(
      (num) => num * 2,
    )

    const result = await task.run()

    expect(result).toBe(80)
  })

  it('flatMap', async () => {
    const task = of(() => Promise.resolve(50))
    const otherTask = of(() => Promise.resolve(60))

    const taskInTask = task.flatMap(() => otherTask)

    const runned = await taskInTask.run()

    expect(runned).toBe(60)
  })

  it('delay', async () => {
    const a = of(() => Promise.resolve(40)).delay(10)

    expect(await a.run()).toBe(40)
  })
})
