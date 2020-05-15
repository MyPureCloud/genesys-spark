import { newSpecPage } from '@stencil/core/testing';
import { GuxPageLoadingSpinner } from '../gux-page-loading-spinner';

describe('gux-page-loading-spinner', () => {
  let component: GuxPageLoadingSpinner;

  beforeEach(async () => {
    const page = await newSpecPage({
      components: [GuxPageLoadingSpinner],
      html: `<gux-page-loading-spinner></gux-page-loading-spinner>`,
      language: 'en'
    });

    component = page.rootInstance;
  });

  it('should build', async () => {
    expect(component).toBeInstanceOf(GuxPageLoadingSpinner);
  });
});
