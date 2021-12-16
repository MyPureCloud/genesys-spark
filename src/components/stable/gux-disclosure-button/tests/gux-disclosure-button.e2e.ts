import { E2EPage, newE2EPage } from '@stencil/core/testing';
import { a11yCheck } from '../../../../../tests/e2eTestUtils';

async function newNonrandomE2EPage({
  html
}: {
  html: string;
}): Promise<E2EPage> {
  const page = await newE2EPage();

  await page.evaluateOnNewDocument(() => {
    Math.random = () => 0.5;
  });
  await page.setContent(html);
  await page.waitForChanges();
  await page.addScriptTag({
    path: 'node_modules/axe-core/axe.min.js'
  });
  await page.waitForChanges();

  return page;
}

describe('gux-disclosure-button', () => {
  it('should build', async () => {
    const page = await newNonrandomE2EPage({
      html: `<gux-disclosure-button lang="en"></gux-disclosure-button>`
    });
    const element = await page.find('gux-disclosure-button');

    expect(element).toHaveClass('hydrated');
  });

  describe('#render', () => {
    [
      '<gux-disclosure-button lang="en"></gux-disclosure-button>',
      '<gux-disclosure-button lang="en" is-open></gux-disclosure-button>',
      '<gux-disclosure-button lang="en" position="left"></gux-disclosure-button>',
      '<gux-disclosure-button lang="en" is-open position="left"></gux-disclosure-button>',
      '<gux-disclosure-button lang="en" position="right"></gux-disclosure-button>',
      '<gux-disclosure-button lang="en" is-open position="right"></gux-disclosure-button>',
      '<gux-disclosure-button lang="en" label="More Info"></gux-disclosure-button>'
    ].forEach((html, index) => {
      it(`should render component as expected (${index + 1})`, async () => {
        const page = await newNonrandomE2EPage({ html });
        const element = await page.find('gux-disclosure-button');
        const elementShadowDom = await element.find(
          'pierce/.gux-disclosure-button-container'
        );

        expect(element.outerHTML).toMatchSnapshot();
        expect(elementShadowDom).toMatchSnapshot();
      });
    });
  });

  describe('events', () => {
    describe('active', () => {
      it('should open when clicked', async () => {
        const page = await newNonrandomE2EPage({
          html: '<gux-disclosure-button lang="en"></gux-disclosure-button>'
        });
        const element = await page.find('gux-disclosure-button');
        const button = await element.find('pierce/.gux-disclosure-button');
        const panel = await element.find('pierce/.gux-disclosure-panel');
        const icon = await element.find('pierce/gux-icon');
        const onActive = await page.spyOnEvent('active');

        expect(await element.getProperty('isOpen')).toBe(false);
        expect(panel).not.toHaveClass('gux-active');
        expect(icon).toEqualAttribute('icon-name', 'arrow-solid-right');

        await button.click();
        await page.waitForChanges();

        expect(await element.getProperty('isOpen')).toBe(true);
        expect(panel).toHaveClass('gux-active');
        expect(icon).toEqualAttribute('icon-name', 'arrow-solid-left');
        expect(onActive).toHaveReceivedEventDetail(true);
      });
    });
  });

  describe('A11Y', () => {
    it('should be accessible when closed', async () => {
      const page = await newNonrandomE2EPage({
        html: `<gux-disclosure-button lang="en"></gux-disclosure-button>`
      });

      await a11yCheck(page);
    });

    it('should be accessible when open', async () => {
      const page = await newNonrandomE2EPage({
        html: `<gux-disclosure-button lang="en" is-open></gux-disclosure-button>`
      });

      await a11yCheck(page);
    });
  });
});
