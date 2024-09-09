const match = (onFalse, onTrue) => (value) => value ? onTrue() : onFalse();
export {
  match
};
