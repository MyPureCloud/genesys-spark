import { newSparkE2EPage } from '../../../../../../tests/e2eTestUtils';

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
