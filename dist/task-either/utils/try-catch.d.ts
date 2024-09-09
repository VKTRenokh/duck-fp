import { TaskEither } from '..';
export declare const tryCatch: <T, E>(tryFn: () => Promise<T>, catchFn: (e: unknown) => E) => TaskEither<E, T>;
