"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.maybe = void 0;
const maybe = (value) => ({
    map: (fn) => (value ? (0, exports.maybe)(fn(value)) : (0, exports.maybe)(null)),
    equals: (m) => m.value === value,
    flatMap: (f) => value ? f(value) : (0, exports.maybe)(null),
    getOrElse: (dv) => (value === null ? dv : value),
    flatGetOrElse: (dv) => (value === null ? dv : (0, exports.maybe)(value)),
    merge: (om) => (0, exports.maybe)(value).flatMap((v) => om.map((ov) => ({ left: v, right: ov }))),
    asyncMap: async (fn) => value === null ? (0, exports.maybe)(null) : fn(value).then((mapped) => (0, exports.maybe)(mapped)),
    get value() {
        return value;
    },
});
exports.maybe = maybe;
