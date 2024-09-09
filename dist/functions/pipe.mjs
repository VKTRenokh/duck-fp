const pipe = (a, ...fns) => fns.reduce(
  (prev, curr) => curr(prev),
  a
);
pipe(50, (a) => a * 2);
export {
  pipe
};
