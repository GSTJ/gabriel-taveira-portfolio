export const memoize = (fn, { maxAge }) => {
  let lastArgs = null;
  let lastResult = null;
  let lastTime = null;

  return async (...args) => {
    if (
      lastArgs &&
      lastArgs.length === args.length &&
      lastArgs.every((arg, i) => arg === args[i])
    ) {
      if (lastTime && Date.now() - lastTime < maxAge) {
        return lastResult;
      }
    }

    lastArgs = args;
    lastResult = await fn(...args);
    lastTime = Date.now();

    return lastResult;
  };
};
