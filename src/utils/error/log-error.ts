export function logError(component: string, message: string): void {
  setTimeout(() => {
    throw new Error(`[${component}] ${message}`);
  }, 0);
}
