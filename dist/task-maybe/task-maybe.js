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
var task_maybe_exports = {};
__export(task_maybe_exports, {
  immediate: () => immediate,
  of: () => of
});
module.exports = __toCommonJS(task_maybe_exports);
var import_maybe = require("../maybe");
const of = (run) => ({
  run,
  map: (f) => of(() => run().then((value) => value.map(f))),
  flatMap: (f) => of(
    () => run().then(
      (maybe2) => maybe2.value !== null ? f(maybe2.value).run() : import_maybe.none
    )
  ),
  orElse: (def) => of(
    () => run().then(
      (runned) => def.run().then((def2) => runned.value ? runned : def2)
    ).then((value) => (0, import_maybe.of)(value.value))
  )
});
const immediate = (value) => of(() => Promise.resolve((0, import_maybe.of)(value ?? null)));
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  immediate,
  of
});
