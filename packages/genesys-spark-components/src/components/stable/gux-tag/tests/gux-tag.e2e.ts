import { newSparkE2EPage, a11yCheck } from '../../../../test/e2eTestUtils';

describe('gux-tag', () => {
  describe('#render', () => {
    [
      '<gux-tag lang="en">default</gux-tag>',
      '<gux-tag lang="en" accent="default">default (explicit)</gux-tag>',
      '<gux-tag lang="en" accent="1">navy</gux-tag>',
      '<gux-tag lang="en" accent="1"><gux-icon icon-name="bolt" decorative="true"></gux-icon>navy</gux-tag>',
      '<gux-tag lang="en" accent="1" value="3" removable><gux-icon icon-name="bolt" decorative="true"></gux-icon>navy</gux-tag>',
      '<gux-tag lang="en" accent="1" value="3" removable disabled><gux-icon icon-name="bolt" decorative="true"></gux-icon>navy</gux-tag>'
    ].forEach((html, index) => {
      it(`should render component as expected (${index + 1})`, async () => {
        const page = await newSparkE2EPage({ html });
        const element = await page.find('gux-tag');

        await a11yCheck(page);

        expect(element.outerHTML).toMatchSnapshot();
      });
    });
  });

  describe('delete', () => {
    describe('click', () => {
      it('should not have a delete button if tag is not removable', async () => {
        const html = `<gux-tag lang="en" accent="1" value="3"><gux-icon icon-name="bolt" decorative="true"></gux-icon>navy</gux-tag>`;
        const page = await newSparkE2EPage({ html });
        const element = await page.find('gux-tag');
        const deleteButton = await element.find(
          'pierce/.gux-tag-remove-button'
        );

        expect(deleteButton).toBeNull();
      });

      it('should emit guxdelete if tag is removable and not disabled', async () => {
        const html = `<gux-tag lang="en" accent="1" value="3" removable><gux-icon icon-name="bolt" decorative="true"></gux-icon>navy</gux-tag>`;
        const page = await newSparkE2EPage({ html });
        const element = await page.find('gux-tag');
        const deleteButton = await element.find(
          'pierce/.gux-tag-remove-button'
        );
        const guxdeleteSpy = await page.spyOnEvent('guxdelete');

        await deleteButton.click();
        await page.waitForChanges();

        expect(guxdeleteSpy).toHaveReceivedEvent();
      });

      it('should not emit guxdelete if tag is removable and disabled', async () => {
        const html = `<gux-tag lang="en" accent="1" value="3" removable disabled><gux-icon icon-name="bolt" decorative="true"></gux-icon>navy</gux-tag>`;
        const page = await newSparkE2EPage({ html });
        const element = await page.find('gux-tag');
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
        const html = `<gux-tag lang="en" accent="1" value="3" removable><gux-icon icon-name="bolt" decorative="true"></gux-icon>navy</gux-tag>`;
        const page = await newSparkE2EPage({ html });
        const element = await page.find('gux-tag');
        const deleteButton = await element.find(
          'pierce/.gux-tag-remove-button'
        );
        const guxdeleteSpy = await page.spyOnEvent('guxdelete');

        await deleteButton.press('Delete');
        await page.waitForChanges();

        expect(guxdeleteSpy).toHaveReceivedEvent();
      });

      it('should emit guxdelete if tag is focused and removable and "Backspace" is pressed', async () => {
        const html = `<gux-tag lang="en" accent="1" value="3" removable><gux-icon icon-name="bolt" decorative="true"></gux-icon>navy</gux-tag>`;
        const page = await newSparkE2EPage({ html });
        const element = await page.find('gux-tag');
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
        const html = `<gux-tag style="width:100px" lang="en" accent="1" value="3" removable><gux-icon icon-name="bolt" decorative="true"></gux-icon>Long long long long long long long</gux-tag>`;
        const page = await newSparkE2EPage({ html });
        const element = await page.find('gux-tag');
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
        const html = `<gux-tag lang="en" accent="1" value="3" removable><gux-icon icon-name="bolt" screenreader-text="test tag"></gux-icon></gux-tag>`;
        const page = await newSparkE2EPage({ html });
        const element = await page.find('gux-tag');
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
    ['default', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10'].forEach(
      accent => {
        it(`should be accessible when acent is "${accent}"`, async () => {
          const html = `<gux-tag lang="en" accent="${accent}" value="3" removable><gux-icon icon-name="bolt" decorative="true"></gux-icon>tag</gux-tag>`;
          const page = await newSparkE2EPage({ html });

          await a11yCheck(page);
        });

        it(`should be accessible when disabled and accent is "${accent}"`, async () => {
          const html = `<gux-tag lang="en" accent="${accent}" value="3" removable disabled><gux-icon icon-name="bolt" decorative="true"></gux-icon>tag</gux-tag>`;
          const page = await newSparkE2EPage({ html });

          await a11yCheck(page);
        });
      }
    );
    it('should be accessible when the text overflows the tag', async () => {
      const html = `<gux-tag style="width:100px" lang="en" accent="1" value="3" removable><gux-icon icon-name="bolt" decorative="true"></gux-icon>Long long long long long long long</gux-tag>`;
      const page = await newSparkE2EPage({ html });

      await a11yCheck(page);
    });
    it('should be accessible when there is an icon only tag', async () => {
      const html = `<gux-tag lang="en" accent="1" value="3" removable><gux-icon icon-name="bolt" screenreader-text="test tag"></gux-icon></gux-tag>`;
      const page = await newSparkE2EPage({ html });

      await a11yCheck(page);
    });
  });
});
