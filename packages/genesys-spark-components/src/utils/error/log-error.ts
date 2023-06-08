export function logError(component: HTMLElement, message: string): void {
  setTimeout(() => {
    console.error(`[${component.tagName.toLowerCase()}] ${message}`, component);
  }, 0);
}

export function logWarn(component: HTMLElement, message: string): void {
  setTimeout(() => {
    console.warn(`[${component.tagName.toLowerCase()}] ${message}`, component);
  }, 0);
}
