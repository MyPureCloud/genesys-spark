/* eslint-disable @typescript-eslint/no-namespace */

export {};

// extend custom jest matcher with typescript definition
declare global {
  namespace jest {
    interface Matchers<R> {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      toHaveNoViolations(exclusions: any): R;
    }
  }
}
