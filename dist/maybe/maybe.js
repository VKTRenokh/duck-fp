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
var maybe_exports = {};
__export(maybe_exports, {
  none: () => none,
  of: () => of
});
module.exports = __toCommonJS(maybe_exports);
var import_task_maybe = require("../task-maybe");
const of = (value) => ({
  isNothing: () => value === null,
  map: (fn) => value ? of(fn(value)) : none,
  mapNullable: (fn) => {
    if (value === null) {
      return none;
    }
    const next = fn(value);
    if (next === null || next === void 0) {
      return none;
    }
    return of(next);
  },
  equals: (m) => m.value === value,
  flatMap: (f) => value ? f(value) : none,
  getOrElse: (dv) => value === null ? dv : value,
  orElse: (dv) => value === null ? dv : of(value),
  merge: (om) => of(value).flatMap(
    (v) => om.map((ov) => ({ left: v, right: ov }))
  ),
  apply: (mfn) => value && mfn.value ? of(mfn.value(value)) : none,
  asyncMap: (fn) => (0, import_task_maybe.of)(
    () => value ? fn(value).then(of) : Promise.resolve(none)
  ),
  toBoolean: () => !!value,
  get value() {
    return value;
  }
});
const none = of(null);
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  none,
  of
});
