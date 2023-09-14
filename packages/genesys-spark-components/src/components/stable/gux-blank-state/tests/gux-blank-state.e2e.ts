import { a11yCheck, newSparkE2EPage } from '../../../../test/e2eTestUtils';

describe('gux-blank-state', () => {
  it('renders', async () => {
    const html = `
      <gux-blank-state lang="en">
        <gux-icon slot="image" icon-name="bot" decorative="true"></gux-icon>
        <div slot="primary-message">Sorry, something went wrong.</div>
        <div slot="additional-guidance">Please refresh this page to try again.</div>
        <button slot="call-to-action" type="button" onclick="notify(event)">
          Call to action
        </button>
      </gux-blank-state>`;
    const page = await newSparkE2EPage({ html });
    const element = await page.find('gux-blank-state');

    await a11yCheck(page);

    expect(element).toHaveAttribute('hydrated');
    expect(element.outerHTML).toMatchSnapshot();
  });
});
