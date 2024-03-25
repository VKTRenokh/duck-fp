type AnyFunction = (...args: any[]) => any

type PipeArgs<
  F extends AnyFunction[],
  Acc extends AnyFunction[] = [],
> = F extends [(...args: infer A) => infer B]
  ? [...Acc, (...args: A) => B]
  : F extends [(...args: infer A) => any, ...infer Tail]
    ? Tail extends [(arg: infer B) => any, ...any[]]
      ? PipeArgs<Tail, [...Acc, (...args: A) => B]>
      : Acc
    : Acc

type LastFnReturnType<
  F extends AnyFunction[],
  R,
> = F extends []
  ? R
  : F extends [...infer Rest, (arg: R) => infer Last]
    ? LastFnReturnType<
    Rest extends AnyFunction[] ? Rest : [],
    Last
    >
    : never

export function pipe<F extends AnyFunction[]>(
  arg: Parameters<F[0]>[0],
  ...fns: PipeArgs<F> extends F ? F : PipeArgs<F>
): LastFnReturnType<F, ReturnType<F[0]>> {
  return (fns.slice(1) as AnyFunction[]).reduce(
    (acc, fn) => fn(acc),
    fns[0]?.(arg),
  )
}
const add = (num: number) => (toAdd: number) => num + toAdd
