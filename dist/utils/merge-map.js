"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mergeMap = void 0;
const mergeMap = (left, right, cb) => left.merge(right).map((maybes) => cb(maybes.left, maybes.right));
exports.mergeMap = mergeMap;
