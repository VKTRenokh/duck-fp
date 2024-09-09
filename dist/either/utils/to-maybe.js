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
var to_maybe_exports = {};
__export(to_maybe_exports, {
  toMaybe: () => toMaybe
});
module.exports = __toCommonJS(to_maybe_exports);
var import_maybe = require("../../maybe");
const toMaybe = (either) => either.fold(() => import_maybe.none, import_maybe.of);
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  toMaybe
});
