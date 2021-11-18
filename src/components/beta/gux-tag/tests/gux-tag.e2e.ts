import { newSparkE2EPage, a11yCheck } from '../../../../../tests/e2eTestUtils';

const axeExclusions = [];

describe('gux-radial-progress', () => {
  [
    '<gux-tag-beta lang="en">default</gux-tag-beta>',
    '<gux-tag-beta lang="en" color="default">default (explicit)</gux-tag-beta>',
    '<gux-tag-beta lang="en" color="navy">navy</gux-tag-beta>',
    '<gux-tag-beta lang="en" icon="bolt" color="navy">navy</gux-tag-beta>',
    '<gux-tag-beta lang="en" icon="bolt" color="navy" value="3" removable>navy</gux-tag-beta>'
  ].forEach((html, index) => {
    it(`should display component as expected (${index + 1})`, async () => {
      const page = await newSparkE2EPage({ html });
      const element = await page.find('gux-tag-beta');
      await a11yCheck(page, axeExclusions);

      expect(element.outerHTML).toMatchSnapshot();
    });
  });
});
