export const shouldNotBeCalled = (...args: any[]): any => {
  throw new Error('should not be called')
}
