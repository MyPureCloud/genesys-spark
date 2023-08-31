import { a11yCheck, newSparkE2EPage } from '../../../../../test/e2eTestUtils';

describe('click', () => {
  it('should fire a click event when the toolbar action is clicked', async () => {
    const html =
      '<gux-table-toolbar-custom-action><span slot="text">Filter</span><gux-icon slot="icon" icon-name="filter" decorative></gux-icon></gux-table-toolbar-custom-action>';
    const page = await newSparkE2EPage({ html });
    const element = await page.find('gux-table-toolbar-custom-action');
    const onClickSpy = await element.spyOnEvent('click');

    await element.click();
    await page.waitForChanges();

    expect(onClickSpy).toHaveReceivedEventTimes(1);
  });
});

describe('gux-table-toolbar-custom-action', () => {
  describe('#render', () => {
    [
      {
        description: 'should render a toolbar-custom-action',
        html: '<gux-table-toolbar-custom-action><span slot="text">Filter</span><gux-icon slot="icon" icon-name="filter" decorative></gux-icon></gux-table-toolbar-custom-action>'
      },
      {
        description: 'should render disabled toolbar-custom-action',
        html: '<gux-table-toolbar-custom-action disabled ><span slot="text">Filter</span><gux-icon slot="icon" icon-name="filter" decorative></gux-icon></gux-table-toolbar-custom-action>'
      }
    ].forEach(({ description, html }) => {
      it(description, async () => {
        const page = await newSparkE2EPage({ html });
        const element = await page.find('gux-table-toolbar-custom-action');

        await a11yCheck(page);
        expect(element.outerHTML).toMatchSnapshot();
      });
    });
  });
});
