const toError = (error) => error instanceof Error ? error : new Error(String(error));
export {
  toError
};
