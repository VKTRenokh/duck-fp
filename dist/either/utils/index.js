"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __reExport = (target, mod, secondTarget) => (__copyProps(target, mod, "default"), secondTarget && __copyProps(secondTarget, mod, "default"));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var utils_exports = {};
module.exports = __toCommonJS(utils_exports);
__reExport(utils_exports, require("./from-throwable"), module.exports);
__reExport(utils_exports, require("./from-maybe"), module.exports);
__reExport(utils_exports, require("./to-maybe"), module.exports);
__reExport(utils_exports, require("./merge"), module.exports);
__reExport(utils_exports, require("./try-catch"), module.exports);
__reExport(utils_exports, require("./is"), module.exports);
__reExport(utils_exports, require("./to-error"), module.exports);
__reExport(utils_exports, require("./from-predicate"), module.exports);
__reExport(utils_exports, require("./from-predicate-c"), module.exports);
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  ...require("./from-throwable"),
  ...require("./from-maybe"),
  ...require("./to-maybe"),
  ...require("./merge"),
  ...require("./try-catch"),
  ...require("./is"),
  ...require("./to-error"),
  ...require("./from-predicate"),
  ...require("./from-predicate-c")
});
