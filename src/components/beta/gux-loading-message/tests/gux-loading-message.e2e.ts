import { newE2EPage } from '@stencil/core/testing';

describe('gux-loading-message-beta', () => {
  it('renders', async () => {
    const html = `<gux-loading-message-beta>
        <span slot="primary-message">The content is loading...</span>
        <span slot="additional-guidance">Thank you for waiting.</span>
        <gux-radial-progress slot="progress" />
        </gux-loading-message-beta>`;
    const page = await newE2EPage({ html });
    const element = await page.find('gux-loading-message-beta');

    expect(element.innerHTML).toMatchSnapshot();
  });
});
