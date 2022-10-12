export {};

// extend custom jest matcher with typescript definition
declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace jest {
    interface Matchers<R> {
      toHaveNoViolations(exclusions: unknown): R;
    }
  }
}
