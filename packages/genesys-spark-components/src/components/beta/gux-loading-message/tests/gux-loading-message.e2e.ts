import { newSparkE2EPage, a11yCheck } from '../../../../test/e2eTestUtils';

describe('gux-loading-message-beta', () => {
  it('renders', async () => {
    const html = `<gux-loading-message-beta>
        <span slot="primary-message">The content is loading...</span>
        <span slot="additional-guidance">Thank you for waiting.</span>
        <gux-radial-progress slot="progress" />
        </gux-loading-message-beta>`;
    const page = await newSparkE2EPage({ html });
    const element = await page.find('gux-loading-message-beta');

    await a11yCheck(page);

    expect(element.innerHTML).toMatchSnapshot();
  });
});
