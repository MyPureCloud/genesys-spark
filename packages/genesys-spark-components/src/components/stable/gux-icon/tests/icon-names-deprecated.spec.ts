import { deprecatedIconNamesMap } from '../icon-names-deprecated';

const deprecatedIconNames = Object.keys(deprecatedIconNamesMap);

describe('deprecatedIconNamesMap', () => {
  deprecatedIconNames.forEach(deprecatedIconName => {
    it(`should map "${deprecatedIconName}" to another icon`, () => {
      expect(deprecatedIconNamesMap[deprecatedIconName]).not.toBe(
        deprecatedIconName
      );
    });

    it(`should not map "${deprecatedIconName}" to another deprecated icon`, () => {
      const mappedIcon = deprecatedIconNamesMap[deprecatedIconName];
      expect(deprecatedIconNamesMap[mappedIcon]).toBe(undefined);
    });
  });
});
