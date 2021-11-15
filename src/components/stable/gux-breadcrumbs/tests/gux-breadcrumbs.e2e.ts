import { newSparkE2EPage, a11yCheck } from '../../../../../tests/e2eTestUtils';

const axeExclusions = [];

describe('gux-breadcrumbs', () => {
  [
    `<gux-breadcrumbs lang="en"></gux-breadcrumbs>`,
    `
      <gux-breadcrumbs lang="en">
        <gux-breadcrumb-item>Category</gux-breadcrumb-item>
        <gux-breadcrumb-item href="#">Parent</gux-breadcrumb-item>
        <gux-breadcrumb-item>Current</gux-breadcrumb-item>
      </gux-breadcrumbs>
    `,
    `
      <gux-breadcrumbs lang="en">
        <gux-breadcrumb-item>Category</gux-breadcrumb-item>
        <gux-breadcrumb-item href="#">Parent</gux-breadcrumb-item>
        <gux-breadcrumb-item href="#">Current</gux-breadcrumb-item>
      </gux-breadcrumbs>
    `,
    `
      <gux-breadcrumbs lang="en" accent="primary">
        <gux-breadcrumb-item>Category</gux-breadcrumb-item>
        <gux-breadcrumb-item href="#">Parent</gux-breadcrumb-item>
        <gux-breadcrumb-item>Current</gux-breadcrumb-item>
      </gux-breadcrumbs>
    `,
    `
      <gux-breadcrumbs lang="en" accent="secondary">
        <gux-breadcrumb-item>Category</gux-breadcrumb-item>
        <gux-breadcrumb-item href="#">Parent</gux-breadcrumb-item>
        <gux-breadcrumb-item>Current</gux-breadcrumb-item>
      </gux-breadcrumbs>
    `,
    `
      <gux-breadcrumbs lang="en" accent="invalid">
        <gux-breadcrumb-item>Category</gux-breadcrumb-item>
        <gux-breadcrumb-item href="#">Parent</gux-breadcrumb-item>
        <gux-breadcrumb-item>Current</gux-breadcrumb-item>
      </gux-breadcrumbs>
    `
  ].forEach((html, index) => {
    it(`should display component as expected (${index + 1})`, async () => {
      const page = await newSparkE2EPage({ html });

      const element = await page.find('gux-breadcrumbs');

      await a11yCheck(page, axeExclusions);

      expect(element.outerHTML).toMatchSnapshot();
    });
  });
});
