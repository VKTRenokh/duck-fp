import { type AbstractFn } from '->/types/abstract-fn'

type LastFnReturnType<
  F extends Array<AbstractFn>,
  Else = never,
> = F extends [...any[], (...arg: any) => infer R]
  ? R
  : Else

export type Pipe<
  F extends AbstractFn[],
  Acc extends AbstractFn[] = [],
> = F extends [(...a: infer A) => infer R]
  ? [...Acc, [(...a: A) => R]]
  : F extends [(...a: infer A) => any, ...infer T]
    ? T extends [(a: infer B) => any, ...any[]]
      ? Pipe<T, [(...a: A) => B]>
      : Acc
    : Acc

type Input<A, B, C, D> = [(a: A) => D, (b: B) => C]
type Output<A, B, C, D> = Pipe<Input<A, B, C, D>>

export const pipe = <
  F extends AbstractFn,
  Rest extends AbstractFn[],
>(
  a: Parameters<F>[0],
) => {}
