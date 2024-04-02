import { type AbstractFn } from '->/types/abstract-fn'

type LastFnReturnType<
  F extends Array<AbstractFn>,
  Else = never,
> = F extends [...any[], (...arg: any) => infer R]
  ? R
  : Else

type Pipe<
  F extends AbstractFn[],
  Acc extends AbstractFn[] = [],
> = F extends [(...a: infer A) => infer B]
  ? [...Acc, (...a: A) => B]
  : F extends [(...a: infer A) => any, ...infer Tail]
    ? Tail extends [(a: infer B) => any, ...any[]]
      ? Pipe<Tail, [...Acc, (...a: A) => B]>
      : Acc
    : Acc[]

export const pipe = <F extends AbstractFn[]>(
  a: Parameters<F[0]>[0],
  ...fns: Pipe<F> extends F ? F : Pipe<F>
): LastFnReturnType<F> =>
  (fns as AbstractFn[]).reduce(
    (prev, curr) => curr(prev),
    a,
  ) as LastFnReturnType<F>

pipe(50, (a: number) => a * 2)
