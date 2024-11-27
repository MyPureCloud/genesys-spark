import { newSparkE2EPage, a11yCheck } from '../../../../test/e2eTestUtils';

describe('gux-popover-list', () => {
  it('renders', async () => {
    const page = await newSparkE2EPage({
      html: `
      <div lang="en">
        <div id="popover-target">
          Example Element
        </div>
        <gux-popover-list-beta position="top" for="popover-target" is-open popover="manual">
          <gux-list>
            <gux-list-item>Item 1</gux-list-item>
            <gux-list-item>Item 2</gux-list-item>
            <gux-list-item>Item 3</gux-list-item>
          </gux-list>
        </gux-popover-list-beta>
      </div>
      `
    });

    const element = await page.find('gux-popover-list-beta');
    await a11yCheck(page);
    expect(element).toHaveAttribute('hydrated');
  });
});
