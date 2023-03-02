export function randomHTMLId(prefix: string = 'gux'): string {
  return `${prefix}-${Math.random().toString(36).substr(2, 10)}`;
}
