export function randomHTMLId(prefix = 'gux'): string {
  return `${prefix}-${Math.random().toString(36).substr(2, 10)}`;
}
