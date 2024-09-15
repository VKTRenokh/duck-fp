import type { Either } from '->/either'
import { type TaskEither, of } from '../task-either'

export const fromEither = <L, R>(
  either: Either<L, R>,
): TaskEither<L, R> => of(() => Promise.resolve(either))
