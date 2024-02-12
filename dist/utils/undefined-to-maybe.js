"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.undefinedToMaybe = void 0;
const maybe_1 = require("../maybe");
const is_callable_1 = require("./is-callable");
const undefinedToMaybe = (from) => {
    if ((0, is_callable_1.isCallable)(from)) {
        return (0, maybe_1.maybe)(from() ?? null);
    }
    return (0, maybe_1.maybe)(from ?? null);
};
exports.undefinedToMaybe = undefinedToMaybe;
