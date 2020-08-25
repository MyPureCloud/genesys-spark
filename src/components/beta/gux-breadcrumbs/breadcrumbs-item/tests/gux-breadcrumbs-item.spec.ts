import { newSpecPage } from '@stencil/core/testing';
import { GuxBreadcrumbsItem } from '../gux-breadcrumbs-item';

describe('gux-breadcrumbs-item', () => {
  let component: GuxBreadcrumbsItem;

  beforeEach(async () => {
    const page = await newSpecPage({
      components: [GuxBreadcrumbsItem],
      html: `<gux-breadcrumbs-item></gux-breadcrumbs-item>`,
      language: 'en'
    });

    component = page.rootInstance;
  });

  it('should build', async () => {
    expect(component).toBeInstanceOf(GuxBreadcrumbsItem);
  });
});
