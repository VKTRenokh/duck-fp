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
var task_either_exports = {};
__export(task_either_exports, {
  left: () => left,
  of: () => of,
  right: () => right
});
module.exports = __toCommonJS(task_either_exports);
var import_either = require("../either");
const of = (task) => ({
  map: (f) => of(() => task().then((either) => either.map(f))),
  flatMap: (f) => of(
    () => task().then(
      (either) => (0, import_either.isRight)(either) ? f(either.right).run() : (0, import_either.left)(either.left)
    )
  ),
  ensureOrElse: (p, fr) => of(
    () => task().then((either) => either.ensureOrElse(p, fr))
  ),
  orElse: (f) => of(
    () => task().then(
      (either) => (0, import_either.isRight)(either) ? Promise.resolve(either) : f(either.left).run()
    )
  ),
  mapLeft: (f) => of(() => task().then((either) => either.mapLeft(f))),
  fold: (onLeft, onRight) => task().then((either) => either.fold(onLeft, onRight)),
  run: task
});
const right = (v) => of(() => Promise.resolve((0, import_either.right)(v)));
const left = (v) => of(() => Promise.resolve((0, import_either.left)(v)));
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  left,
  of,
  right
});
