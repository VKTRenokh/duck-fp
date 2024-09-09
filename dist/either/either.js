"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var either_exports = {};
__export(either_exports, {
  left: () => left,
  of: () => of,
  right: () => right
});
module.exports = __toCommonJS(either_exports);
var import_task_either = require("../task-either");
const left = (e) => ({
  left: e,
  isLeft: () => true,
  isRight: () => false,
  orElse: (fn) => fn(e),
  fold: (lfn, _) => lfn(e),
  map: (_) => left(e),
  mapLeft: (f) => left(f(e)),
  asyncMap: (_) => (0, import_task_either.left)(e),
  flatMap: (_) => left(e),
  ensureOrElse: (_p, _c) => left(e),
  merge: (_) => left(e),
  ap: (_f) => left(e)
});
const right = (v) => ({
  right: v,
  isLeft: () => false,
  isRight: () => true,
  orElse: (_) => right(v),
  fold: (_, rfn) => rfn(v),
  map: (fn) => right(fn(v)),
  mapLeft: (_) => right(v),
  asyncMap: (fn) => (0, import_task_either.of)(
    () => fn(v).then(
      (mapped) => right(mapped)
    )
  ),
  flatMap: (fn) => fn(v),
  ensureOrElse: (fn, fr) => fn(v) ? right(v) : left(fr(v)),
  merge: (or) => right(v).flatMap(
    (cv) => or.map((ov) => ({ left: cv, right: ov }))
  ),
  ap: (fn) => fn.map((fn2) => fn2(v))
});
const of = (value) => right(value);
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  left,
  of,
  right
});
