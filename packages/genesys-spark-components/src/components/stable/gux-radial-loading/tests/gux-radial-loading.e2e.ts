import { E2EElement } from '@stencil/core/testing';
import { newSparkE2EPage, a11yCheck } from '../../../../test/e2eTestUtils';
import { renderConfigs } from './gux-radial-loading.common';

function getInternalProgressBar(radialLoadingElement: E2EElement): Element {
  return radialLoadingElement.shadowRoot.querySelector(
    'div[role="progressbar"]'
  );
}

describe('gux-radial-loading', () => {
  renderConfigs.forEach(({ description, html }) => {
    it(description, async () => {
      const page = await newSparkE2EPage({ html });
      const element = await page.find('gux-radial-loading');

      await a11yCheck(page);
      expect(element.outerHTML).toMatchSnapshot();
    });
  });

  it('should add an aria-label with the provided screenreader-text to the progressbar', async () => {
    const html =
      '<gux-radial-loading lang="en" screenreader-text="Loading Content"></gux-radial-loading>';
    const page = await newSparkE2EPage({ html });
    const element = await page.find('gux-radial-loading');
    await a11yCheck(page);

    expect(getInternalProgressBar(element).getAttribute('aria-label')).toEqual(
      'Loading Content'
    );
  });

  it('should add the default aria-label text if no screenreader-text is provided', async () => {
    const html = '<gux-radial-loading lang="en"></gux-radial-loading>';
    const page = await newSparkE2EPage({ html });
    const element = await page.find('gux-radial-loading');
    await a11yCheck(page);

    expect(getInternalProgressBar(element).getAttribute('aria-label')).toEqual(
      'Loading'
    );
  });
});
