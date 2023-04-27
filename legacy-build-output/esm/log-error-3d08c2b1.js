function logError(component, message) {
  setTimeout(() => {
    throw new Error(`[${component}] ${message}`);
  }, 0);
}
function logWarn(component, message) {
  setTimeout(() => {
    console.warn(`[${component}] ${message}`);
  }, 0);
}

export { logWarn as a, logError as l };
