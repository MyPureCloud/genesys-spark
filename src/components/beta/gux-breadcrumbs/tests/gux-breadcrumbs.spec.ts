import { newSpecPage } from '@stencil/core/testing';

import { GuxBreadcrumbs } from '../gux-breadcrumbs';
import { GuxBreadcrumbItem } from '../breadcrumb-item/gux-breadcrumb-item';

const components = [GuxBreadcrumbs, GuxBreadcrumbItem];
const language = 'en';

describe('gux-breadcrumbs-beta', () => {
  let component: GuxBreadcrumbs;

  beforeEach(async () => {
    const page = await newSpecPage({
      components,
      html: `<gux-breadcrumbs-beta></gux-breadcrumbs-beta>`,
      language
    });

    component = page.rootInstance;
  });

  it('should build', async () => {
    expect(component).toBeInstanceOf(GuxBreadcrumbs);
  });

  describe('#render', () => {
    [
      `<gux-breadcrumbs-beta></gux-breadcrumbs-beta>`,
      `
        <gux-breadcrumbs-beta>
          <gux-breadcrumb-item>Category</gux-breadcrumb-item>
          <gux-breadcrumb-item href="#">Parent</gux-breadcrumb-item>
          <gux-breadcrumb-item>Current</gux-breadcrumb-item>
        </gux-breadcrumbs-beta>
      `,
      `
        <gux-breadcrumbs-beta>
          <gux-breadcrumb-item>Category</gux-breadcrumb-item>
          <gux-breadcrumb-item href="#">Parent</gux-breadcrumb-item>
          <gux-breadcrumb-item href="#">Current</gux-breadcrumb-item>
        </gux-breadcrumbs-beta>
      `,
      `
        <gux-breadcrumbs-beta accent="primary">
          <gux-breadcrumb-item>Category</gux-breadcrumb-item>
          <gux-breadcrumb-item href="#">Parent</gux-breadcrumb-item>
          <gux-breadcrumb-item>Current</gux-breadcrumb-item>
        </gux-breadcrumbs-beta>
      `,
      `
        <gux-breadcrumbs-beta accent="secondary">
          <gux-breadcrumb-item>Category</gux-breadcrumb-item>
          <gux-breadcrumb-item href="#">Parent</gux-breadcrumb-item>
          <gux-breadcrumb-item>Current</gux-breadcrumb-item>
        </gux-breadcrumbs-beta>
      `,
      `
        <gux-breadcrumbs-beta accent="invalid">
          <gux-breadcrumb-item>Category</gux-breadcrumb-item>
          <gux-breadcrumb-item href="#">Parent</gux-breadcrumb-item>
          <gux-breadcrumb-item>Current</gux-breadcrumb-item>
        </gux-breadcrumbs-beta>
      `
    ].forEach((html, index) => {
      it(`should render component as expected (${index + 1})`, async () => {
        const page = await newSpecPage({ components, html, language });

        expect(page.root).toMatchSnapshot();
      });
    });
  });
});
