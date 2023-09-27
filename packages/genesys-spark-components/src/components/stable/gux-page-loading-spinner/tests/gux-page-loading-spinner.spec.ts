import { newSpecPage } from '@test/specTestUtils';
import { GuxPageLoadingSpinner } from '../gux-page-loading-spinner';

describe('gux-page-loading-spinner', () => {
  it('should render as expected', async () => {
    const page = await newSpecPage({
      components: [GuxPageLoadingSpinner],
      html: `<gux-page-loading-spinner></gux-page-loading-spinner>`,
      language: 'en'
    });

    expect(page.root).toMatchSnapshot();
  });
});
