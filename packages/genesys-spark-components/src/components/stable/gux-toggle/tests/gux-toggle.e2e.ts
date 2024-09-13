import { E2EPage, newE2EPage, E2EElement } from '@stencil/core/testing';
import { newSparkE2EPage, a11yCheck } from '../../../../test/e2eTestUtils';

const axeExclusions = [
  {
    issueId: 'color-contrast',
    target: '#disabledToggle,#gux-toggle-label-i',
    exclusionReason:
      'WCAG 1.4.3 Contrast (Minimum), inactive user interface components do not need to meet contrast minimum'
  }
];

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
    path: '../../node_modules/axe-core/axe.min.js'
  });
  await page.waitForChanges();

  return page;
}

describe('gux-toggle', () => {
  it('should build', async () => {
    const page = await newNonrandomE2EPage({
      html: `<gux-toggle lang="en"></gux-toggle>`
    });

    const element = await page.find('gux-toggle');

    expect(element).toHaveAttribute('hydrated');
  });

  describe('#render', () => {
    [
      '<gux-toggle lang="en" checked-label="On" unchecked-label="Off"></gux-toggle>',
      '<gux-toggle lang="en" checked checked-label="on" unchecked-label="off"></gux-toggle>',
      '<gux-toggle lang="en" id="disabledToggle" checked-label="On" unchecked-label="Off" disabled></gux-toggle>',
      '<gux-toggle lang="en" id="disabledToggle" checked checked-label="on" unchecked-label="off" disabled></gux-toggle>',
      `<gux-toggle lang="en"
        checked-label="On"
        unchecked-label="Off"
        label-position="left"
      ></gux-toggle>`,
      `<gux-toggle lang="en"
        checked
        checked-label="on"
        unchecked-label="off"
        label-position="right"
      ></gux-toggle>`,
      `<gux-toggle lang="en"
        checked-label="This is a long label for the toggle to test how it works"
        unchecked-label="This is another long label for the toggle to test how it works"
        label-position="left"
      ></gux-toggle>`,
      `<gux-toggle lang="en"
        checked
        checked-label="This is a long label for the toggle to test how it works"
        unchecked-label="This is another long label for the toggle to test how it works"
        label-position="right"
      ></gux-toggle>`
    ].forEach((html, index) => {
      it(`should render component as expected (${index + 1})`, async () => {
        const page = await newNonrandomE2EPage({ html });
        const element = await page.find('gux-toggle');
        await a11yCheck(page, axeExclusions);

        expect(element.innerHTML).toMatchSnapshot();
      });
    });
  });

  describe('User Interactions', () => {
    [
      {
        name: 'clicked',
        userInteraction: async (element: E2EElement) => await element.click()
      }
    ].forEach(({ name, userInteraction }) => {
      describe(name, () => {
        it(`should not fire a check event when an enabled toggle is disabled and ${name}`, async () => {
          const html =
            '<gux-toggle lang="en" disabled checked-label="On" unchecked-label="Off"></gux-toggle>';
          const page = await newNonrandomE2EPage({ html });
          const element = await page.find('gux-toggle');
          const checkSpy = await element.spyOnEvent('check');
          const toggleSlider = await element.find('pierce/gux-toggle-slider');

          await userInteraction(toggleSlider);
          await page.waitForChanges();

          expect(checkSpy).toHaveLength(0);
        });

        it(`should fire a check event when an enabled toggle is ${name}`, async () => {
          const html =
            '<gux-toggle lang="en" checked-label="On" unchecked-label="Off"></gux-toggle>';
          const page = await newNonrandomE2EPage({ html });
          const element = await page.find('gux-toggle');
          const checkSpy = await element.spyOnEvent('check');
          const toggleSlider = await element.find('pierce/gux-toggle-slider');

          await userInteraction(toggleSlider);
          await page.waitForChanges();

          expect(checkSpy).toHaveLength(1);
        });

        it(`should check an unchecked toggle when ${name}`, async () => {
          const html =
            '<gux-toggle lang="en" checked-label="On" unchecked-label="Off"></gux-toggle>';
          const page = await newSparkE2EPage({ html });
          const element = await page.find('gux-toggle');
          const toggleSlider = await element.find('pierce/gux-toggle-slider');

          expect(await element.getProperty('checked')).toBe(false);

          await userInteraction(toggleSlider);
          await page.waitForChanges();

          expect(await element.getProperty('checked')).toBe(true);
        });

        it(`should uncheck a checked toggle when ${name}`, async () => {
          const html =
            '<gux-toggle lang="en" checked checked-label="On" unchecked-label="Off"></gux-toggle>';
          const page = await newNonrandomE2EPage({ html });
          const element = await page.find('gux-toggle');
          const toggleSlider = await element.find('pierce/gux-toggle-slider');

          expect(await element.getProperty('checked')).toBe(true);

          await userInteraction(toggleSlider);
          await page.waitForChanges();

          expect(await element.getProperty('checked')).toBe(false);
        });

        it(`should not check an unchecked toggle when disabled and ${name}`, async () => {
          const html =
            '<gux-toggle lang="en" disabled checked-label="On" unchecked-label="Off"></gux-toggle>';
          const page = await newNonrandomE2EPage({ html });
          const element = await page.find('gux-toggle');
          const toggleSlider = await element.find('pierce/gux-toggle-slider');

          expect(await element.getProperty('checked')).toBe(false);

          await userInteraction(toggleSlider);
          await page.waitForChanges();

          expect(await element.getProperty('checked')).toBe(false);
        });

        it(`should not uncheck a checked toggle when disabled and ${name}`, async () => {
          const html =
            '<gux-toggle lang="en" checked disabled checked-label="On" unchecked-label="Off"></gux-toggle>';
          const page = await newNonrandomE2EPage({ html });
          const element = await page.find('gux-toggle');
          const toggleSlider = await element.find('pierce/gux-toggle-slider');

          expect(await element.getProperty('checked')).toBe(true);

          await userInteraction(toggleSlider);
          await page.waitForChanges();

          expect(await element.getProperty('checked')).toBe(true);
        });

        it(`should not check the toggle if preventDefault is called on the event`, async () => {
          const html =
            '<gux-toggle lang="en" checked-label="On" unchecked-label="Off"></gux-toggle>';
          const page: E2EPage = await newNonrandomE2EPage({ html });
          const element: E2EElement = await page.find('gux-toggle');
          const toggleSlider = await element.find('pierce/gux-toggle-slider');

          await page.evaluate(() => {
            document.addEventListener('check', event => {
              event.preventDefault();
            });
          });

          expect(await element.getProperty('checked')).toBe(false);

          await userInteraction(toggleSlider);
          await page.waitForChanges();

          expect(await element.getProperty('checked')).toBe(false);
        });
      });
    });
  });
});
