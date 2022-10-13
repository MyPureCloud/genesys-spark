export {};

// extend custom jest matcher with typescript definition
declare global {
  namespace jest {
    interface Matchers<R> {
      toHaveNoViolations(exclusions: any): R;
    }
  }
}
