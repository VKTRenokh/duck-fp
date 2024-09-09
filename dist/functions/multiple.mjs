const multiple = (...fns) => (...a) => fns.map((fn) => fn(...a));
export {
  multiple
};
