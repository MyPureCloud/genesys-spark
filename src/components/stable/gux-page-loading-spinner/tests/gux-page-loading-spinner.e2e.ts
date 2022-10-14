import { newSparkE2EPage, a11yCheck } from '../../../../../tests/e2eTestUtils';

describe('gux-page-loading-spinner', () => {
  it('renders', async () => {
    const html =
      '<gux-page-loading-spinner lang="en"></gux-page-loading-spinner>';
    const page = await newSparkE2EPage({ html });
    const element = await page.find('gux-page-loading-spinner');

    expect(element.outerHTML).toMatchSnapshot();
  });

  it('should add an aria-label with the provided screenreader-text to the progressbar', async () => {
    const html =
      '<gux-page-loading-spinner lang="en" screenreader-text="Loading Content"></gux-page-loading-spinner>';
    const page = await newSparkE2EPage({ html });
    const progressBarAriaLabelValue = await page.evaluate(() => {
      const element = document.querySelector('gux-page-loading-spinner');
      const radialLoadingElement =
        element.shadowRoot.querySelector('gux-radial-loading');
      const progressBarElement = radialLoadingElement.shadowRoot.querySelector(
        'div[role="progressbar"]'
      );

      return progressBarElement.getAttribute('aria-label');
    });
    await a11yCheck(page);

    expect(progressBarAriaLabelValue).toEqual('Loading Content');
  });

  it('should add the default aria-label text if no screenreader-text is provided', async () => {
    const html =
      '<gux-page-loading-spinner lang="en"></gux-page-loading-spinner>';
    const page = await newSparkE2EPage({ html });
    const progressBarAriaLabelValue = await page.evaluate(() => {
      const element = document.querySelector('gux-page-loading-spinner');
      const radialLoadingElement =
        element.shadowRoot.querySelector('gux-radial-loading');
      const progressBarElement = radialLoadingElement.shadowRoot.querySelector(
        'div[role="progressbar"]'
      );

      return progressBarElement.getAttribute('aria-label');
    });
    await a11yCheck(page);

    expect(progressBarAriaLabelValue).toEqual('Loading');
  });
});
