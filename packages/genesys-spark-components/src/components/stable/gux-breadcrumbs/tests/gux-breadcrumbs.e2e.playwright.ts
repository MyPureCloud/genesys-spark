import { checkRenders, test } from '@test/playwrightTestUtils';

test.describe('gux-breadcrumbs', () => {
  checkRenders([
    {
      html: `
      <gux-breadcrumbs lang="en">
        <gux-breadcrumb-item>Category</gux-breadcrumb-item>
        <gux-breadcrumb-item href="#">Parent</gux-breadcrumb-item>
        <gux-breadcrumb-item>Current</gux-breadcrumb-item>
      </gux-breadcrumbs>
    `
    },
    {
      html: `
      <gux-breadcrumbs lang="en">
        <gux-breadcrumb-item>Category</gux-breadcrumb-item>
        <gux-breadcrumb-item href="#">Parent</gux-breadcrumb-item>
        <gux-breadcrumb-item href="#">Current</gux-breadcrumb-item>
      </gux-breadcrumbs>
    `
    },
    {
      html: `
      <gux-breadcrumbs lang="en" accent="primary">
        <gux-breadcrumb-item>Category</gux-breadcrumb-item>
        <gux-breadcrumb-item href="#">Parent</gux-breadcrumb-item>
        <gux-breadcrumb-item>Current</gux-breadcrumb-item>
      </gux-breadcrumbs>
    `
    },
    {
      html: `
      <gux-breadcrumbs lang="en" accent="secondary">
        <gux-breadcrumb-item>Category</gux-breadcrumb-item>
        <gux-breadcrumb-item href="#">Parent</gux-breadcrumb-item>
        <gux-breadcrumb-item>Current</gux-breadcrumb-item>
      </gux-breadcrumbs>
    `
    },
    {
      html: `
      <gux-breadcrumbs lang="en" accent="invalid">
        <gux-breadcrumb-item>Category</gux-breadcrumb-item>
        <gux-breadcrumb-item href="#">Parent</gux-breadcrumb-item>
        <gux-breadcrumb-item>Current</gux-breadcrumb-item>
      </gux-breadcrumbs>
    `
    }
  ]);
});
