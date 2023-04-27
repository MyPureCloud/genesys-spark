export {};
declare global {
  namespace jest {
    interface Matchers<R> {
      toHaveNoViolations(exclusions: any): R;
    }
  }
}
