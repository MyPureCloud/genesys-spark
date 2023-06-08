export function logError(component: HTMLElement, message: string): void {
  setTimeout(() => {
    throw new Error(`[${component.outerHTML}] ${message}`);
  }, 0);
}

export function logWarn(component: HTMLElement, message: string): void {
  setTimeout(() => {
    console.warn(`[${component.outerHTML}] ${message}`);
  }, 0);
}
