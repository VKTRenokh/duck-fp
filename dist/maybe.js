"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.maybe = void 0;
const maybe = (value) => ({
    map: (fn) => (value ? (0, exports.maybe)(fn(value)) : (0, exports.maybe)(null)),
    mapNullable: (fn) => {
        if (value === null) {
            return (0, exports.maybe)(null);
        }
        const next = fn(value);
        if (next === null || next === undefined) {
            return (0, exports.maybe)(null);
        }
        return (0, exports.maybe)(next);
    },
    equals: (m) => m.value === value,
    flatMap: (f) => value ? f(value) : (0, exports.maybe)(null),
    getOrElse: (dv) => (value === null ? dv : value),
    flatGetOrElse: (dv) => (value === null ? dv : (0, exports.maybe)(value)),
    merge: (om) => (0, exports.maybe)(value).flatMap((v) => om.map((ov) => ({ left: v, right: ov }))),
    asyncMap: async (fn, error) => value === null
        ? (0, exports.maybe)(null)
        : fn(value)
            .then((mapped) => (0, exports.maybe)(mapped))
            .catch((err) => {
            error?.(err);
            return (0, exports.maybe)(null);
        }),
    get value() {
        return value;
    },
});
exports.maybe = maybe;
