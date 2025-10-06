import {
  checkRenders,
  expect,
  setContent,
  test
} from '@test/playwrightTestUtils';
import { renderConfigs } from './gux-blank-state.common';

test.describe('gux-blank-state-beta', () => {
  checkRenders({
    renderConfigs,
    element: 'gux-blank-state-beta'
  });

  test.describe('properties', () => {
    test('should apply left alignment class when alignment is set to left', async ({
      page
    }) => {
      await setContent(
        page,
        `
          <gux-blank-state-beta alignment="left">
            <div slot="primary-message">Left aligned</div>
          </gux-blank-state-beta>
        `
      );

      const component = page.locator('gux-blank-state-beta');
      const container = component.locator('.gux-container');
      await expect(container).toHaveClass(/gux-alignment-left/);
    });

    test('should apply no padding class when noPadding is true', async ({
      page
    }) => {
      await setContent(
        page,
        `
          <gux-blank-state-beta no-padding>
            <div slot="primary-message">No padding</div>
          </gux-blank-state-beta>
        `
      );

      const component = page.locator('gux-blank-state-beta');
      const container = component.locator('.gux-container');
      await expect(container).toHaveClass(/gux-no-padding/);
    });
  });

  test.describe('interactions', () => {
    test('should fire click event when call to action button is clicked', async ({
      page
    }) => {
      await setContent(
        page,
        `
          <gux-blank-state-beta>
            <div slot="primary-message">Test message</div>
            <button slot="call-to-action" data-testid="cta-button">Click me</button>
          </gux-blank-state-beta>
        `
      );

      const onClickSpy = await page.spyOnEvent('click');
      const ctaButton = page.getByTestId('cta-button');

      await ctaButton.click();

      expect(onClickSpy).toHaveReceivedEventTimes(1);
    });
  });
});
