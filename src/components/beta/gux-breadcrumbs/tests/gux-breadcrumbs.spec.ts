import { newSpecPage } from '@stencil/core/testing';
import { GuxBreadcrumbs } from '../gux-breadcrumbs';

const components = [GuxBreadcrumbs];
const language = 'en';

describe('gux-breadcrumbs', () => {
  it('should build', async () => {
    const html = `<gux-breadcrumbs></gux-breadcrumbs>`;
    const page = await newSpecPage({ components, html, language });
    const component = page.rootInstance;

    expect(component).toBeInstanceOf(GuxBreadcrumbs);
  });
});
