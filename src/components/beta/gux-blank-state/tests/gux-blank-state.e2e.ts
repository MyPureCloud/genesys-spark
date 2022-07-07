import { E2EElement, E2EPage } from '@stencil/core/testing';
import { a11yCheck, newSparkE2EPage } from '../../../../../tests/e2eTestUtils';

describe('gux-blank-state-beta', () => {
  let page: E2EPage;
  let element: E2EElement;

  const html = `
  <gux-blank-state-beta lang="en">
  <gux-icon slot="image" icon-name="robot-circle" decorative="true"></gux-icon>
  <div slot="primary-message">Sorry, something went wrong.</div>
  <div slot="additional-guidance">Please refresh this page to try again.</div>
  <button slot="call-to-action" type="button" onclick="notify(event)">
    Call to action
  </button>
  </gux-blank-state-beta>
`;

  beforeAll(async () => {
    page = await newSparkE2EPage({ html });
  });

  it('renders', async () => {
    element = await page.find('gux-blank-state-beta');

    await a11yCheck(page);

    expect(element).toHaveAttribute('hydrated');
  });
});
