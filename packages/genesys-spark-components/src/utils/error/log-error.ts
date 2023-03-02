export function logError(component: string, message: string): void {
  setTimeout(() => {
    throw new Error(`[${component}] ${message}`);
  }, 0);
}

export function logWarn(component: string, message: string): void {
  setTimeout(() => {
    console.warn(`[${component}] ${message}`);
  }, 0);
}
