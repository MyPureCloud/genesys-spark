import { newE2EPage, E2EElement } from '@stencil/core/testing';

describe('gux-toggle', () => {
  it('should build', async () => {
    const page = await newE2EPage({ html: `<gux-toggle></gux-toggle>` });

    const element = await page.find('gux-toggle');

    expect(element).toHaveClass('hydrated');
  });

  describe('#render', () => {
    [
      '<gux-toggle></gux-toggle>',
      '<gux-toggle checked></gux-toggle>',
      '<gux-toggle checked disabled></gux-toggle>',
      '<gux-toggle checked-label="On" unchecked-label="Off"></gux-toggle>',
      '<gux-toggle checked checked-label="on" unchecked-label="off"></gux-toggle>',
      `<gux-toggle
        checked-label="On"
        unchecked-label="Off"
        label-position="left"
      ></gux-toggle>`,
      `<gux-toggle
        checked
        checked-label="on"
        unchecked-label="off"
        label-position="right"
      ></gux-toggle>`,
      `<gux-toggle
        checked-label="This is a long label for the toggle to test how it works"
        unchecked-label="This is another long label for the toggle to test how it works"
        label-position="left"
      ></gux-toggle>`,
      `<gux-toggle
        checked
        checked-label="This is a long label for the toggle to test how it works"
        unchecked-label="This is another long label for the toggle to test how it works"
        label-position="right"
      ></gux-toggle>`
    ].forEach((html, index) => {
      it(`should render component as expected (${index + 1})`, async () => {
        const page = await newE2EPage({ html });
        const element = await page.find('gux-toggle');

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
            '<gux-toggle disabled checked-label="On" unchecked-label="Off"></gux-toggle>';
          const page = await newE2EPage({ html });
          const element = await page.find('gux-toggle');
          const checkSpy = await element.spyOnEvent('check');

          await userInteraction(element);
          await page.waitForChanges();

          expect(checkSpy).toHaveLength(0);
        });

        it(`should fire a check event when an enabled toggle is ${name}`, async () => {
          const html =
            '<gux-toggle checked-label="On" unchecked-label="Off"></gux-toggle>';
          const page = await newE2EPage({ html });
          const element = await page.find('gux-toggle');
          const checkSpy = await element.spyOnEvent('check');

          await userInteraction(element);
          await page.waitForChanges();

          expect(checkSpy).toHaveLength(1);
        });

        it(`should check an unchecked toggle when ${name}`, async () => {
          const html =
            '<gux-toggle checked-label="On" unchecked-label="Off"></gux-toggle>';
          const page = await newE2EPage({ html });
          const element = await page.find('gux-toggle');

          expect(await element.getProperty('checked')).toBe(false);

          await userInteraction(element);
          await page.waitForChanges();

          expect(await element.getProperty('checked')).toBe(true);
        });

        it(`should uncheck a checked toggle when ${name}`, async () => {
          const html =
            '<gux-toggle checked checked-label="On" unchecked-label="Off"></gux-toggle>';
          const page = await newE2EPage({ html });
          const element = (await page.find(
            'gux-toggle'
          )) as HTMLGuxToggleElement;

          expect(await element.getProperty('checked')).toBe(true);

          await userInteraction(element);
          await page.waitForChanges();

          expect(await element.getProperty('checked')).toBe(false);
        });

        it(`should not check an unchecked toggle when disabled and ${name}`, async () => {
          const html =
            '<gux-toggle disabled checked-label="On" unchecked-label="Off"></gux-toggle>';
          const page = await newE2EPage({ html });
          const element = (await page.find(
            'gux-toggle'
          )) as HTMLGuxToggleElement;

          expect(await element.getProperty('checked')).toBe(false);

          await userInteraction(element);
          await page.waitForChanges();

          expect(await element.getProperty('checked')).toBe(false);
        });

        it(`should not uncheck a checked toggle when disabled and ${name}`, async () => {
          const html =
            '<gux-toggle checked disabled checked-label="On" unchecked-label="Off"></gux-toggle>';
          const page = await newE2EPage({ html });
          const element = (await page.find(
            'gux-toggle'
          )) as HTMLGuxToggleElement;

          expect(await element.getProperty('checked')).toBe(true);

          await userInteraction(element);
          await page.waitForChanges();

          expect(await element.getProperty('checked')).toBe(true);
        });
      });
    });
  });
});
