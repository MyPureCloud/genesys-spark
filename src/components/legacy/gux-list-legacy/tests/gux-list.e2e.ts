import { newSparkE2EPage, a11yCheck } from 'test/e2eTestUtils';
const focusedElementSelector = '[tabindex]:not([tabindex="-1"])';

const axeExclusions = [
  {
    issueId: 'color-contrast',
    target: 'gux-list-item-legacy[value="test2"],gux-text-highlight > span',
    exclusionReason:
      'WCAG 1.4.3 Contrast (Minimum), inactive user interface components do not need to meet contrast minimum'
  }
];

const html = `<gux-list-legacy>
  <gux-list-item-legacy value="test1" text="first"></gux-list-item-legacy>
  <gux-list-divider-legacy></gux-list-divider-legacy>
  <gux-list-item-legacy value="test2" text="second" disabled></gux-list-item-legacy>
  <gux-list-item-legacy value="test3" text="third"></gux-list-item-legacy>
</gux-list-legacy>`;

describe('gux-list-legacy', () => {
  it('renders', async () => {
    const page = await newSparkE2EPage({ html });
    const element = await page.find('gux-list-legacy');

    expect(element.outerHTML).toMatchSnapshot();
    await a11yCheck(page, axeExclusions);
  });

  it('should select the next item on "ArrowDown"', async () => {
    const page = await newSparkE2EPage({ html });
    const element = await page.find('gux-list-legacy');
    await page.waitForChanges();
    await element.press('Tab');

    await element.press('ArrowDown');
    await page.waitForChanges();

    const focused = await element.find(focusedElementSelector);
    expect(focused.shadowRoot.querySelector('*').textContent).toContain(
      'first'
    );
  });

  it('should not select dividers or disabled elements on "ArrowDown"', async () => {
    const page = await newSparkE2EPage({ html });
    const element = await page.find('gux-list-legacy');
    await page.waitForChanges();
    await element.press('Tab');

    await element.press('ArrowDown');
    await element.press('ArrowDown');
    await page.waitForChanges();

    const focused = await element.find(focusedElementSelector);
    expect(focused.shadowRoot.querySelector('*').textContent).toContain(
      'third'
    );
  });

  it('should select the last item on "End" and the first item on "Home"', async () => {
    const page = await newSparkE2EPage({ html });
    const element = await page.find('gux-list-legacy');
    await page.waitForChanges();
    await element.press('Tab');

    await element.press('End');
    await page.waitForChanges();

    let focused = await element.find(focusedElementSelector);
    expect(focused.shadowRoot.querySelector('*').textContent).toContain(
      'third'
    );

    await element.press('Home');
    await page.waitForChanges();

    focused = await element.find(focusedElementSelector);
    expect(focused.shadowRoot.querySelector('*').textContent).toContain(
      'first'
    );
  });

  it('should select the previous item on "ArrowUp', async () => {
    const page = await newSparkE2EPage({ html });
    const element = await page.find('gux-list-legacy');
    await page.waitForChanges();
    await element.press('Tab');

    await element.press('End');
    await page.waitForChanges();

    await element.press('ArrowUp');
    await page.waitForChanges();

    const focused = await element.find(focusedElementSelector);
    expect(focused.shadowRoot.querySelector('*').textContent).toContain(
      'first'
    );
  });

  it('should set focus to first item when requested', async () => {
    const page = await newSparkE2EPage({ html });
    const element = await page.find('gux-list-legacy');
    await page.waitForChanges();

    await element.callMethod('setFocusOnFirstItem');
    await page.waitForChanges();

    const firstSelected = await element.callMethod('isFirstItemSelected');
    expect(firstSelected).toBe(true);

    const focused = await element.find(focusedElementSelector);
    expect(focused.shadowRoot.querySelector('*').textContent).toContain(
      'first'
    );
  });

  it('should set focus to last item when requested', async () => {
    const page = await newSparkE2EPage({ html });
    const element = await page.find('gux-list-legacy');
    await page.waitForChanges();

    await element.callMethod('setFocusOnLastItem');
    await page.waitForChanges();

    const lastSelected = await element.callMethod('isLastItemSelected');
    expect(lastSelected).toBe(true);

    const focused = await element.find(focusedElementSelector);
    expect(focused.shadowRoot.querySelector('*').textContent).toContain(
      'third'
    );
  });
});
