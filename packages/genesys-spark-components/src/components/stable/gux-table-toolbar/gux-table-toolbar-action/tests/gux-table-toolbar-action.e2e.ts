import { a11yCheck, newSparkE2EPage } from '../../../../../test/e2eTestUtils';
import { renderConfigs } from './gux-table-toolbar-action.common';

describe('click', () => {
  it('should fire a click event when the toolbar action is clicked', async () => {
    const html =
      '<gux-table-toolbar-action action="export"></gux-table-toolbar-action>';
    const page = await newSparkE2EPage({ html });
    const element = await page.find('gux-table-toolbar-action');
    const onClickSpy = await element.spyOnEvent('click');

    await element.click();
    await page.waitForChanges();

    expect(onClickSpy).toHaveReceivedEventTimes(1);
  });
});

describe('gux-table-toolbar-action', () => {
  describe('#render', () => {
    renderConfigs.forEach(({ description, html }) => {
      it(description, async () => {
        const page = await newSparkE2EPage({ html });
        const element = await page.find('gux-table-toolbar-action');

        await a11yCheck(page);
        expect(element.outerHTML).toMatchSnapshot();
      });
    });
  });
});
