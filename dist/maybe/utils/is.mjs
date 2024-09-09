const is = (value) => !!value && typeof value === "object" && "map" in value && typeof value.map === "function" && "flatMap" in value && typeof value.flatMap === "function";
export {
  is
};
