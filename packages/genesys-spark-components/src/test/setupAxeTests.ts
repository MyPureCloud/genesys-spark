import { toHaveNoViolations } from './expectToHaveNoViolations';

global.beforeEach(() => {
  expect.extend({
    toHaveNoViolations(axeViolations, axeScanDetails) {
      return toHaveNoViolations(axeViolations, axeScanDetails);
    }
  });
});
