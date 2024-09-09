"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
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
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var src_exports = {};
__export(src_exports, {
  Bool: () => Bool,
  E: () => E,
  F: () => F,
  I: () => I,
  L: () => L,
  M: () => M,
  P: () => P,
  TE: () => TE,
  TM: () => TM,
  TY: () => TY
});
module.exports = __toCommonJS(src_exports);
var M = __toESM(require("./maybe"));
var E = __toESM(require("./either"));
var I = __toESM(require("./identity"));
var L = __toESM(require("./lens"));
var P = __toESM(require("./prism"));
var TE = __toESM(require("./task-either"));
var TM = __toESM(require("./task-maybe"));
var F = __toESM(require("./functions"));
var TY = __toESM(require("./types"));
var Bool = __toESM(require("./boolean"));
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  Bool,
  E,
  F,
  I,
  L,
  M,
  P,
  TE,
  TM,
  TY
});
