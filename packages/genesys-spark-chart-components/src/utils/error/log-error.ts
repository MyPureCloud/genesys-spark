export function logError(component: HTMLElement, message: string): void {
  console.error(`[${component.tagName.toLowerCase()}] ${message}`, component);
}

export function logWarn(component: HTMLElement, message: string): void {
  console.warn(`[${component.tagName.toLowerCase()}] ${message}`, component);
}
