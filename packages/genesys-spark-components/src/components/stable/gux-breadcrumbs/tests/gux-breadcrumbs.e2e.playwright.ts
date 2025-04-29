import { analyze, setContent, test } from '@test/playwrightTestUtils';

test.describe('gux-breadcrumbs', () => {
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
    test(`should render component as expected (${index + 1})`, async ({
      page
    }) => {
      await setContent(page, html);
      await analyze(page);
    });
  });
});
