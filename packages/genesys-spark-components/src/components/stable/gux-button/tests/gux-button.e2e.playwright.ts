import { analyze, expect, setContent, test } from '@test/playwrightTestUtils';

test.describe('gux-button', () => {
  [
    {
      clickable: true,
      description: 'should render default button',
      html: '<gux-button>Button</gux-button>'
    },
    {
      clickable: true,
      description: 'should render primary button',
      html: '<gux-button accent="primary">Button</gux-button>'
    },
    {
      clickable: true,
      description: 'should render secondary button',
      html: '<gux-button accent="secondary">Button</gux-button>'
    },
    {
      clickable: true,
      description: 'should render tertiary button',
      html: '<gux-button accent="tertiary">Button</gux-button>'
    },
    {
      clickable: true,
      description: 'should render ghost button',
      html: '<gux-button accent="ghost">Button</gux-button>'
    },
    {
      clickable: true,
      description: 'should render danger button',
      html: '<gux-button accent="danger">Button</gux-button>'
    },
    {
      clickable: true,
      description: 'should render inline button',
      html: '<gux-button accent="inline">Button</gux-button>'
    },
    {
      clickable: true,
      description: 'should render invalid button',
      html: '<gux-button accent="invalid">Button</gux-button>'
    },
    {
      clickable: false,
      description: 'should render disabled default button',
      html: '<gux-button disabled>Button</gux-button>'
    },
    {
      clickable: false,
      description: 'should render disabled primary button',
      html: '<gux-button accent="primary" disabled>Button</gux-button>'
    },
    {
      clickable: false,
      description: 'should render disabled secondary button',
      html: '<gux-button accent="secondary" disabled>Button</gux-button>'
    },
    {
      clickable: false,
      description: 'should render disabled tertiary button',
      html: '<gux-button accent="tertiary" disabled>Button</gux-button>'
    },
    {
      clickable: false,
      description: 'should render disabled ghost button',
      html: '<gux-button accent="ghost" disabled>Button</gux-button>'
    },
    {
      clickable: false,
      description: 'should render disabled danger button',
      html: '<gux-button accent="danger" disabled>Button</gux-button>'
    },
    {
      clickable: false,
      description: 'should render disabled inline button',
      html: '<gux-button accent="inline" disabled>Button</gux-button>'
    },
    {
      clickable: false,
      description: 'should render disabled invalid button',
      html: '<gux-button accent="invalid" disabled>Button</gux-button>'
    }
  ].forEach(({ description, html }) => {
    test(description, async ({ page }) => {
      await setContent(page, html);

      await analyze(page);
    });
  });

  test('should fire a click event when an enabled button slot content is clicked', async ({
    page
  }) => {
    await setContent(
      page,
      '<gux-button><span data-testid="span">Span</span></gux-button>'
    );

    const onClickSpy = await page.spyOnEvent('click');

    await page.getByTestId('span').dispatchEvent('click');

    expect(onClickSpy).toHaveReceivedEventTimes(1);
  });

  test('should not fire a click event when a disabled button slot content is clicked', async ({
    page
  }) => {
    await setContent(
      page,
      '<gux-button disabled><span data-testid="span">Span</span></gux-button>'
    );

    const onClickSpy = await page.spyOnEvent('click');

    await page.getByTestId('span').dispatchEvent('click'); // https://playwright.dev/docs/input#programmatic-click

    expect(onClickSpy).toHaveReceivedEventTimes(0);
  });

  test.describe('focus', () => {
    test('should be programmatically focusable', async ({ page }) => {
      await setContent(page, '<gux-button>Button</gux-button>');

      await page.locator('gux-button').evaluate(element => element.focus());

      expect(await page.evaluate(() => document.activeElement.nodeName)).toBe(
        'GUX-BUTTON'
      );
    });
  });
});
