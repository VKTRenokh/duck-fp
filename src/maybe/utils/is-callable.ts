export const isCallable = (
  fn: unknown,
): fn is CallableFunction => typeof fn === 'function'
