"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from2, except, desc) => {
  if (from2 && typeof from2 === "object" || typeof from2 === "function") {
    for (let key of __getOwnPropNames(from2))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from2[key], enumerable: !(desc = __getOwnPropDesc(from2, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var lens_exports = {};
__export(lens_exports, {
  from: () => from,
  fromProp: () => fromProp
});
module.exports = __toCommonJS(lens_exports);
const from = (view, set) => ({
  view,
  set,
  compose: (bc) => from(
    (a) => bc.view(view(a)),
    (c, a) => set(bc.set(c, view(a)), a)
  )
});
const fromProp = (key) => from(
  (v) => v[key],
  (v, s) => ({ ...s, [key]: v })
);
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  from,
  fromProp
});
