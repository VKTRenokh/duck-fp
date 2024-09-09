import { Either, Left, Right } from '../../either';
export declare const isLeft: <L, R>(v: Either<L, R>) => v is Left<L, R>;
export declare const isRight: <L, R>(v: Either<L, R>) => v is Right<R, L>;
