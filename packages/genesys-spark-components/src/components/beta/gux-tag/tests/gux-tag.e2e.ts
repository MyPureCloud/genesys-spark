import { newSparkE2EPage, a11yCheck } from '../../../../test/e2eTestUtils';

describe('gux-tag-beta', () => {
  describe('#render', () => {
    [
      '<gux-tag-beta lang="en">default</gux-tag-beta>',
      '<gux-tag-beta lang="en" color="default">default (explicit)</gux-tag-beta>',
      '<gux-tag-beta lang="en" color="navy">navy</gux-tag-beta>',
      '<gux-tag-beta lang="en" color="navy"><gux-icon icon-name="bolt" decorative="true"></gux-icon>navy</gux-tag-beta>',
      '<gux-tag-beta lang="en" color="navy" value="3" removable><gux-icon icon-name="bolt" decorative="true"></gux-icon>navy</gux-tag-beta>',
      '<gux-tag-beta lang="en" color="navy" value="3" removable disabled><gux-icon icon-name="bolt" decorative="true"></gux-icon>navy</gux-tag-beta>'
    ].forEach((html, index) => {
      it(`should render component as expected (${index + 1})`, async () => {
        const page = await newSparkE2EPage({ html });
        const element = await page.find('gux-tag-beta');

        await a11yCheck(page);

        expect(element.outerHTML).toMatchSnapshot();
      });
    });
  });

  describe('delete', () => {
    describe('click', () => {
      it('should not have a delete button if tag is not removable', async () => {
        const html = `<gux-tag-beta lang="en" color="navy" value="3"><gux-icon icon-name="bolt" decorative="true"></gux-icon>navy</gux-tag-beta>`;
        const page = await newSparkE2EPage({ html });
        const element = await page.find('gux-tag-beta');
        const deleteButton = await element.find(
          'pierce/.gux-tag-remove-button'
        );

        expect(deleteButton).toBeNull();
      });

      it('should emit guxdelete if tag is removable and not disabled', async () => {
        const html = `<gux-tag-beta lang="en" color="navy" value="3" removable><gux-icon icon-name="bolt" decorative="true"></gux-icon>navy</gux-tag-beta>`;
        const page = await newSparkE2EPage({ html });
        const element = await page.find('gux-tag-beta');
        const deleteButton = await element.find(
          'pierce/.gux-tag-remove-button'
        );
        const guxdeleteSpy = await page.spyOnEvent('guxdelete');

        await deleteButton.click();
        await page.waitForChanges();

        expect(guxdeleteSpy).toHaveReceivedEvent();
      });

      it('should not emit guxdelete if tag is removable and disabled', async () => {
        const html = `<gux-tag-beta lang="en" color="navy" value="3" removable disabled><gux-icon icon-name="bolt" decorative="true"></gux-icon>navy</gux-tag-beta>`;
        const page = await newSparkE2EPage({ html });
        const element = await page.find('gux-tag-beta');
        const deleteButton = await element.find(
          'pierce/.gux-tag-remove-button'
        );
        const guxdeleteSpy = await page.spyOnEvent('guxdelete');

        await deleteButton.click();
        await page.waitForChanges();

        expect(guxdeleteSpy).not.toHaveReceivedEvent();
      });
    });

    describe('keypress', () => {
      it('should emit guxdelete if tag is focused and removable and "Delete" is pressed', async () => {
        const html = `<gux-tag-beta lang="en" color="navy" value="3" removable><gux-icon icon-name="bolt" decorative="true"></gux-icon>navy</gux-tag-beta>`;
        const page = await newSparkE2EPage({ html });
        const element = await page.find('gux-tag-beta');
        const deleteButton = await element.find(
          'pierce/.gux-tag-remove-button'
        );
        const guxdeleteSpy = await page.spyOnEvent('guxdelete');

        await deleteButton.press('Delete');
        await page.waitForChanges();

        expect(guxdeleteSpy).toHaveReceivedEvent();
      });

      it('should emit guxdelete if tag is focused and removable and "Backspace" is pressed', async () => {
        const html = `<gux-tag-beta lang="en" color="navy" value="3" removable><gux-icon icon-name="bolt" decorative="true"></gux-icon>navy</gux-tag-beta>`;
        const page = await newSparkE2EPage({ html });
        const element = await page.find('gux-tag-beta');
        const deleteButton = await element.find(
          'pierce/.gux-tag-remove-button'
        );
        const guxdeleteSpy = await page.spyOnEvent('guxdelete');

        await deleteButton.press('Backspace');
        await page.waitForChanges();

        expect(guxdeleteSpy).toHaveReceivedEvent();
      });
    });
  });

  describe('tooltip', () => {
    describe('hover', () => {
      it('should show the tooltip on hover for tags with overflow text', async () => {
        const html = `<gux-tag-beta style="width:100px" lang="en" color="navy" value="3" removable><gux-icon icon-name="bolt" decorative="true"></gux-icon>Long long long long long long long</gux-tag-beta>`;
        const page = await newSparkE2EPage({ html });
        const element = await page.find('gux-tag-beta');
        const deleteButton = await element.find(
          'pierce/.gux-tag-remove-button'
        );
        const titleElement = await element.find('pierce/gux-tooltip-title');
        const tooltipElement = await titleElement.find('gux-tooltip');
        expect(tooltipElement).not.toBeNull();
        expect(tooltipElement).toHaveAttribute('hidden');
        expect(tooltipElement.textContent).toEqual(
          'Long long long long long long long'
        );
        await titleElement.hover();
        await page.waitForChanges();
        expect(tooltipElement).not.toHaveAttribute('hidden');
        await deleteButton.hover();
        await page.waitForChanges();
        expect(tooltipElement).toHaveAttribute('hidden');
      });

      it('should show the tooltip on hover for tags with icon only', async () => {
        const html = `<gux-tag-beta lang="en" color="navy" value="3" removable><gux-icon icon-name="bolt" screenreader-text="test tag"></gux-icon></gux-tag-beta>`;
        const page = await newSparkE2EPage({ html });
        const element = await page.find('gux-tag-beta');
        const deleteButton = await element.find(
          'pierce/.gux-tag-remove-button'
        );
        const titleElement = await element.find('pierce/gux-tooltip-title');
        const tooltipElement = await titleElement.find('gux-tooltip');
        expect(tooltipElement).not.toBeNull();
        expect(tooltipElement).toHaveAttribute('hidden');
        expect(tooltipElement.textContent).toEqual('test tag');
        await titleElement.hover();
        await page.waitForChanges();
        expect(tooltipElement).not.toHaveAttribute('hidden');
        await deleteButton.hover();
        await page.waitForChanges();
        expect(tooltipElement).toHaveAttribute('hidden');
      });
    });
  });

  describe('a11y', () => {
    [
      'default',
      'default-subtle',
      'navy',
      'blue',
      'electric-purple',
      'aqua-green',
      'fuchsia',
      'dark-purple',
      'bubblegum-pink',
      'olive-green',
      'lilac',
      'alert-yellow-green',
      'blue-10',
      'blue-20',
      'blue-30',
      'blue-40',
      'blue-50',
      'blue-60',
      'blue-70',
      'blue-80',
      'blue-90',
      'blue-100',
      'alert-red-10',
      'alert-red-20',
      'alert-red-30',
      'alert-red-40',
      'alert-red-50',
      'alert-red-60',
      'alert-red-70',
      'alert-red-80',
      'alert-red-90',
      'alert-red-100',
      'alert-green-10',
      'alert-green-20',
      'alert-green-30',
      'alert-green-40',
      'alert-green-50',
      'alert-green-60',
      'alert-green-70',
      'alert-green-80',
      'alert-green-90',
      'alert-green-100',
      'alert-yellow-10',
      'alert-yellow-20',
      'alert-yellow-30',
      'alert-yellow-40',
      'alert-yellow-50',
      'alert-yellow-60',
      'alert-yellow-70',
      'alert-yellow-80',
      'alert-yellow-90',
      'alert-yellow-100',
      'brand-orange',
      'brand-teal',
      'brand-navy',
      'brand-light-blue',
      'brand-yellow'
    ].forEach(color => {
      it(`should be accessible when color is "${color}"`, async () => {
        const html = `<gux-tag-beta lang="en" color="${color}" value="3" removable><gux-icon icon-name="bolt" decorative="true"></gux-icon>tag</gux-tag-beta>`;
        const page = await newSparkE2EPage({ html });

        await a11yCheck(page);
      });

      it(`should be accessible when disabled and color is "${color}"`, async () => {
        const html = `<gux-tag-beta lang="en" color="${color}" value="3" removable disabled><gux-icon icon-name="bolt" decorative="true"></gux-icon>tag</gux-tag-beta>`;
        const page = await newSparkE2EPage({ html });

        await a11yCheck(page);
      });
    });
    it('should be accessible when the text overflows the tag', async () => {
      const html = `<gux-tag-beta style="width:100px" lang="en" color="navy" value="3" removable><gux-icon icon-name="bolt" decorative="true"></gux-icon>Long long long long long long long</gux-tag-beta>`;
      const page = await newSparkE2EPage({ html });

      await a11yCheck(page);
    });
    it('should be accessible when there is an icon only tag', async () => {
      const html = `<gux-tag-beta lang="en" color="navy" value="3" removable><gux-icon icon-name="bolt" screenreader-text="test tag"></gux-icon></gux-tag-beta>`;
      const page = await newSparkE2EPage({ html });

      await a11yCheck(page);
    });
  });
});
