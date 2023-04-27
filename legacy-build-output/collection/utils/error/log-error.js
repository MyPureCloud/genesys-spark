export function logError(component, message) {
  setTimeout(() => {
    throw new Error(`[${component}] ${message}`);
  }, 0);
}
export function logWarn(component, message) {
  setTimeout(() => {
    console.warn(`[${component}] ${message}`);
  }, 0);
}
