const mergeMap = (left, right, cb) => left.merge(right).map((maybes) => cb(maybes.left, maybes.right));
export {
  mergeMap
};
