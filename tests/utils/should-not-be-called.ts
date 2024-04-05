export const shouldNotBeCalled = (..._args: any[]): any => {
  throw new Error('should not be called')
}
