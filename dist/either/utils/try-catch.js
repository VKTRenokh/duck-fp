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
var try_catch_exports = {};
__export(try_catch_exports, {
  tryCatch: () => tryCatch
});
module.exports = __toCommonJS(try_catch_exports);
var import_either = require("../../either");
const tryCatch = (tryFn, catchFn) => {
  try {
    return (0, import_either.right)(tryFn());
  } catch (e) {
    return (0, import_either.left)(catchFn(e));
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  tryCatch
});
