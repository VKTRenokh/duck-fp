export declare const fromThrowable: <A extends ReadonlyArray<unknown>, R, E>(f: (...a: A) => Promise<R>, catchFn: (e: unknown) => E) => (...a: A) => import("../../task-either").TaskEither<E, R>;
