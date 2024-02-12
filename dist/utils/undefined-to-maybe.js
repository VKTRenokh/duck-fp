"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.undefinedToMaybe = void 0;
const maybe_1 = require("../maybe");
const undefinedToMaybe = (from) => (0, maybe_1.maybe)(from ?? null);
exports.undefinedToMaybe = undefinedToMaybe;
