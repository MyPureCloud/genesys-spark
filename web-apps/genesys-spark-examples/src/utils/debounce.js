export const debounce =
  (fn, wait = 1000, timeout = null) =>
  (...args) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => fn(...args), wait);
  };
