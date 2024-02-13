"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.longMerge = void 0;
const maybe_1 = require("../maybe");
const longMerge = (...maybes) => {
    return maybes.reduce((acc, curr) => acc.flatMap((res) => curr.map((v) => [...res, v])), (0, maybe_1.maybe)([]));
};
exports.longMerge = longMerge;
