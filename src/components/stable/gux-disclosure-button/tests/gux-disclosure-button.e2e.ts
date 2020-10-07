import { newE2EPage } from '@stencil/core/testing';

describe('gux-disclosure-button', () => {
  it('renders', async () => {
    const page = await newE2EPage();

    await page.setContent('<gux-disclosure-button></gux-disclosure-button>');
    const element = await page.find('gux-disclosure-button');
    expect(element).toHaveClass('hydrated');
  });

  it('renders panel when button pressed', async () => {
    const page = await newE2EPage();

    await page.setContent('<gux-disclosure-button></gux-disclosure-button>');
    page.waitForChanges();
    const button = await page.find('.gux-disclosure-button');
    const panel = await page.find('.gux-disclosure-panel');
    await button.click();
    expect(panel).toHaveClass('gux-active');
  });

  describe('disclosure panel is-open', () => {
    it('should not open disclosure panel when property openAtStart is set to false or not specified', async () => {
      const page = await newE2EPage();

      await page.setContent('<gux-disclosure-button></gux-disclosure-button>');
      page.waitForChanges();
      const panel = await page.find('.gux-disclosure-panel');
      expect(panel).not.toHaveClass('gux-active');
    });

    it('opens disclosure panel when property openAtStart is set to true', async () => {
      const page = await newE2EPage();

      await page.setContent(
        '<gux-disclosure-button is-open="true"></gux-disclosure-button>'
      );
      page.waitForChanges();
      const panel = await page.find('.gux-disclosure-panel');
      expect(panel).toHaveClass('gux-active');
    });
  });
});
