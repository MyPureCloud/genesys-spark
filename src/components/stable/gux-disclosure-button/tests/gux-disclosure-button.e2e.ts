import { newSparkE2EPage, a11yCheck } from '../../../../../tests/e2eTestUtils';

const axeExclusions = [];

describe('gux-disclosure-button', () => {
  it('should build', async () => {
    const page = await newSparkE2EPage({
      html: `<gux-disclosure-button></gux-disclosure-button>`
    });
    const element = await page.find('gux-disclosure-button');

    expect(element).toHaveClass('hydrated');
  });

  describe('#render', () => {
    [
      '<gux-disclosure-button></gux-disclosure-button>',
      '<gux-disclosure-button is-open></gux-disclosure-button>',
      '<gux-disclosure-button position="left"></gux-disclosure-button>',
      '<gux-disclosure-button is-open position="left"></gux-disclosure-button>',
      '<gux-disclosure-button position="right"></gux-disclosure-button>',
      '<gux-disclosure-button is-open position="right"></gux-disclosure-button>',
      '<gux-disclosure-button label="More Info"></gux-disclosure-button>'
    ].forEach((html, index) => {
      it(`should render component as expected (${index + 1})`, async () => {
        const page = await newSparkE2EPage({ html });
        const element = await page.find('gux-disclosure-button');
        const elementShadowDom = await element.find(
          'pierce/.gux-disclosure-button-container'
        );

        expect(element.outerHTML).toMatchSnapshot();
        expect(elementShadowDom).toMatchSnapshot();
      });
    });
  });

  describe.skip('events', () => {
    describe('active', () => {
      it('should open when clicked', async () => {
        const page = await newSparkE2EPage({
          html: '<gux-disclosure-button></gux-disclosure-button>'
        });
        const element = (await page.find(
          'gux-disclosure-button'
        )) as HTMLGuxDisclosureButtonElement;
        const button = await element.find('pierce/.gux-disclosure-button');
        const panel = await element.find('pierce/.gux-disclosure-panel');
        const icon = await element.find('pierce/gux-icon');
        const onActive = await page.spyOnEvent('active');

        expect(element.isOpen).toBe(false);
        expect(panel).not.toHaveClass('gux-active');
        expect(icon).toEqualAttribute('icon-name', 'arrow-solid-right');

        button.click();

        await page.waitForChanges();

        expect(element.isOpen).toBe(true);
        expect(panel).toHaveClass('gux-active');
        expect(icon).toEqualAttribute('icon-name', 'arrow-solid-left');
        expect(onActive).toHaveBeenCalledWith(
          expect.objectContaining({
            detail: true
          })
        );
      });
    });
  });

  describe('A11Y', () => {
    it('should be accessible when closed', async () => {
      const page = await newSparkE2EPage({
        html: `<gux-disclosure-button></gux-disclosure-button>`
      });

      await a11yCheck(page, axeExclusions);
    });

    it('should be accessible when open', async () => {
      const page = await newSparkE2EPage({
        html: `<gux-disclosure-button is-open></gux-disclosure-button>`
      });

      await a11yCheck(page, axeExclusions);
    });
  });
});
