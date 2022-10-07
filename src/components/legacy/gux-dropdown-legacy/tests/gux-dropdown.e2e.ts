import { newSparkE2EPage, a11yCheck } from 'test/e2eTestUtils';

describe('gux-dropdown-legacy', () => {
  it('renders', async () => {
    const page = await newSparkE2EPage({
      html: `<gux-dropdown-legacy lang="en"></gux-dropdown-legacy>`
    });
    const element = await page.find('gux-dropdown-legacy');
    expect(element).toHaveAttribute('hydrated');
  });

  it('opens drop down on click', async () => {
    const page = await newSparkE2EPage({
      html: `
      <gux-dropdown-legacy lang="en" placeholder="Select..." filterable=true>
        <gux-option-legacy value="en-US">American English</gux-option-legacy>
        <gux-option-legacy value="es">Latin American Spanish</gux-option-legacy>
        <gux-option-legacy value="es-ES">European Spanish</gux-option-legacy>
        <gux-option-legacy value="en-UK">UK English</gux-option-legacy>
        <gux-option-legacy value="fr-CA" text= "Canadian French">American French</gux-option-legacy>
        <gux-option-legacy value="fr" text="European French"></gux-option-legacy>
        <gux-option-legacy>Dutch</gux-option-legacy>
      </gux-dropdown-legacy>
    `
    });
    await page.waitForChanges();
    await a11yCheck(page, [], 'before opening dropdown');
    const element = await page.find('gux-dropdown-legacy');
    const inputElm = await element.find('gux-input-text-like');
    await inputElm.click();
    await page.waitForChanges();
    await a11yCheck(page, [], 'after opening dropdown');

    const dropMenu = await element.find('.gux-dropdown');
    expect(dropMenu.className.split(' ')).toContain('gux-active');
  });

  it('selects an item when an option is clicked', async () => {
    const page = await newSparkE2EPage({
      html: `<gux-dropdown-legacy lang="en" placeholder="Select..." filterable=true>
        <gux-option-legacy value="en-US">American English</gux-option-legacy>
        <gux-option-legacy value="es">Latin American Spanish</gux-option-legacy>
        <gux-option-legacy value="es-ES">European Spanish</gux-option-legacy>
        <gux-option-legacy value="en-UK">UK English</gux-option-legacy>
        <gux-option-legacy value="fr-CA" text= "Canadian French">American French</gux-option-legacy>
        <gux-option-legacy value="fr" text="European French"></gux-option-legacy>
        <gux-option-legacy>Dutch</gux-option-legacy>
      </gux-dropdown-legacy>
      `
    });
    await page.waitForChanges();
    const element = await page.find('gux-dropdown-legacy');
    const changeSpy = await element.spyOnEvent('change');

    const inputElm = await element.find('gux-input-text-like');
    await inputElm.click();
    await page.waitForChanges();

    let dropMenu = await element.find('.gux-dropdown');
    const enElm = await dropMenu.find('gux-option-legacy');
    await enElm.click();
    await page.waitForChanges();
    dropMenu = await element.find('.gux-dropdown');

    expect(changeSpy).toHaveReceivedEventDetail('en-US');
    expect(dropMenu.className.split(' ')).not.toContain('gux-active');
  });

  it('can be tabbed to when filterable and not disabled', async () => {
    const page = await newSparkE2EPage({
      html: `<gux-dropdown-legacy lang="en" placeholder="Select..." filterable=true>
        <gux-option-legacy value="en-US">American English</gux-option-legacy>
        <gux-option-legacy value="es">Latin American Spanish</gux-option-legacy>
        <gux-option-legacy value="es-ES">European Spanish</gux-option-legacy>
        <gux-option-legacy value="en-UK">UK English</gux-option-legacy>
        <gux-option-legacy value="fr-CA" text= "Canadian French">American French</gux-option-legacy>
        <gux-option-legacy value="fr" text="European French"></gux-option-legacy>
        <gux-option-legacy>Dutch</gux-option-legacy>
      </gux-dropdown-legacy>
      `
    });

    const element = await page.find('gux-dropdown-legacy');
    const focusedBeforeTab = await page.find(':focus');

    await page.keyboard.press('Tab');
    await page.waitForChanges();

    const focusedAfterTab = await page.find(':focus');

    expect(focusedBeforeTab).toBeNull();
    expect(focusedAfterTab).not.toBeNull();
    expect(element.outerHTML).toContain(focusedAfterTab.outerHTML);
  });

  it('can be tabbed to when not filterable and not disabled', async () => {
    const page = await newSparkE2EPage({
      html: `<gux-dropdown-legacy lang="en" placeholder="Select...">
        <gux-option-legacy value="en-US">American English</gux-option-legacy>
        <gux-option-legacy value="es">Latin American Spanish</gux-option-legacy>
        <gux-option-legacy value="es-ES">European Spanish</gux-option-legacy>
        <gux-option-legacy value="en-UK">UK English</gux-option-legacy>
        <gux-option-legacy value="fr-CA" text= "Canadian French">American French</gux-option-legacy>
        <gux-option-legacy value="fr" text="European French"></gux-option-legacy>
        <gux-option-legacy>Dutch</gux-option-legacy>
      </gux-dropdown-legacy>
      `
    });

    const element = await page.find('gux-dropdown-legacy');
    const focusedBeforeTab = await page.find(':focus');

    await page.keyboard.press('Tab');
    await page.waitForChanges();

    const focusedAfterTab = await page.find(':focus');

    expect(focusedBeforeTab).toBeNull();
    expect(focusedAfterTab).not.toBeNull();
    expect(element.outerHTML).toContain(focusedAfterTab.outerHTML);
  });

  it('can not be tabbed to when filterable and disabled', async () => {
    const page = await newSparkE2EPage({
      html: `<gux-dropdown-legacy lang="en" placeholder="Select..." filterable=true disabled>
        <gux-option-legacy value="en-US">American English</gux-option-legacy>
        <gux-option-legacy value="es">Latin American Spanish</gux-option-legacy>
        <gux-option-legacy value="es-ES">European Spanish</gux-option-legacy>
        <gux-option-legacy value="en-UK">UK English</gux-option-legacy>
        <gux-option-legacy value="fr-CA" text= "Canadian French">American French</gux-option-legacy>
        <gux-option-legacy value="fr" text="European French"></gux-option-legacy>
        <gux-option-legacy>Dutch</gux-option-legacy>
      </gux-dropdown-legacy>
      `
    });

    const focusedBeforeTab = await page.find(':focus');

    await page.keyboard.press('Tab');
    await page.waitForChanges();

    const focusedAfterTab = await page.find(':focus');

    expect(focusedBeforeTab).toBeNull();
    expect(focusedAfterTab).toBeNull();
  });

  it('can not be tabbed to when not filterable and disabled', async () => {
    const page = await newSparkE2EPage({
      html: `<gux-dropdown-legacy lang="en" placeholder="Select..." disabled>
        <gux-option-legacy value="en-US">American English</gux-option-legacy>
        <gux-option-legacy value="es">Latin American Spanish</gux-option-legacy>
        <gux-option-legacy value="es-ES">European Spanish</gux-option-legacy>
        <gux-option-legacy value="en-UK">UK English</gux-option-legacy>
        <gux-option-legacy value="fr-CA" text= "Canadian French">American French</gux-option-legacy>
        <gux-option-legacy value="fr" text="European French"></gux-option-legacy>
        <gux-option-legacy>Dutch</gux-option-legacy>
      </gux-dropdown-legacy>
      `
    });

    const focusedBeforeTab = await page.find(':focus');

    await page.keyboard.press('Tab');
    await page.waitForChanges();

    const focusedAfterTab = await page.find(':focus');

    expect(focusedBeforeTab).toBeNull();
    expect(focusedAfterTab).toBeNull();
  });
});
