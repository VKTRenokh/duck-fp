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
var types_exports = {};
module.exports = __toCommonJS(types_exports);
__reExport(types_exports, require("./lazy"), module.exports);
__reExport(types_exports, require("./merged"), module.exports);
__reExport(types_exports, require("./abstract-fn"), module.exports);
__reExport(types_exports, require("./lazy-promise"), module.exports);
__reExport(types_exports, require("./predicate"), module.exports);
__reExport(types_exports, require("./refinement"), module.exports);
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  ...require("./lazy"),
  ...require("./merged"),
  ...require("./abstract-fn"),
  ...require("./lazy-promise"),
  ...require("./predicate"),
  ...require("./refinement")
});
