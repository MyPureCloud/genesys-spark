import { E2EPage, newE2EPage, E2EElement } from '@stencil/core/testing';
import { newSparkE2EPage, a11yCheck } from '../../../../test/e2eTestUtils';
import { renderConfigs } from './gux-toggle.common';

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
    renderConfigs.forEach(({ description, html }) => {
      it(description, async () => {
        const page = await newNonrandomE2EPage({ html });
        const element = await page.find('gux-toggle');
        await a11yCheck(page);

        expect(element.outerHTML).toMatchSnapshot();
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
          const html = '<gux-toggle lang="en" disabled label="On"</gux-toggle>';
          const page = await newNonrandomE2EPage({ html });
          const element = await page.find('gux-toggle');
          const checkSpy = await element.spyOnEvent('check');
          const toggleSlider = await element.find('pierce/gux-toggle-slider');

          await userInteraction(toggleSlider);
          await page.waitForChanges();

          expect(checkSpy).toHaveLength(0);
        });

        it(`should fire a check event when an enabled toggle is ${name}`, async () => {
          const html = '<gux-toggle lang="en" label="On"></gux-toggle>';
          const page = await newNonrandomE2EPage({ html });
          const element = await page.find('gux-toggle');
          const checkSpy = await element.spyOnEvent('check');
          const toggleSlider = await element.find('pierce/gux-toggle-slider');

          await userInteraction(toggleSlider);
          await page.waitForChanges();

          expect(checkSpy).toHaveLength(1);
        });

        it(`should check an unchecked toggle when ${name}`, async () => {
          const html = '<gux-toggle lang="en" label="On"></gux-toggle>';
          const page = await newSparkE2EPage({ html });
          const element = await page.find('gux-toggle');
          const toggleSlider = await element.find('pierce/gux-toggle-slider');

          expect(await element.getProperty('checked')).toBe(false);

          await userInteraction(toggleSlider);
          await page.waitForChanges();

          expect(await element.getProperty('checked')).toBe(true);
        });

        it(`should uncheck a checked toggle when ${name}`, async () => {
          const html = '<gux-toggle lang="en" checked label="On"></gux-toggle>';
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
            '<gux-toggle lang="en" disabled label="On"></gux-toggle>';
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
            '<gux-toggle lang="en" checked disabled label="On"></gux-toggle>';
          const page = await newNonrandomE2EPage({ html });
          const element = await page.find('gux-toggle');
          const toggleSlider = await element.find('pierce/gux-toggle-slider');

          expect(await element.getProperty('checked')).toBe(true);

          await userInteraction(toggleSlider);
          await page.waitForChanges();

          expect(await element.getProperty('checked')).toBe(true);
        });

        it(`should not check the toggle if preventDefault is called on the event`, async () => {
          const html = '<gux-toggle lang="en" label="On"></gux-toggle>';
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

  describe('User Interactions (deprecated checked-label and unchecked-label)', () => {
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
