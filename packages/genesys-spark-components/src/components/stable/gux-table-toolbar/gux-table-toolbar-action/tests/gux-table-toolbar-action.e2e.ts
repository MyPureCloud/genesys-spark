import { a11yCheck, newSparkE2EPage } from '../../../../../test/e2eTestUtils';

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
    [
      {
        description: 'should render delete toolbar-action',
        html: '<gux-table-toolbar-action action="delete"></gux-table-toolbar-action>'
      },
      {
        description: 'should render export toolbar-action',
        html: '<gux-table-toolbar-action action="export"></gux-table-toolbar-action>'
      },
      {
        description: 'should render refresh toolbar-action',
        html: '<gux-table-toolbar-action action="refresh"></gux-table-toolbar-action>'
      },
      {
        description: 'should render revert toolbar-action',
        html: '<gux-table-toolbar-action action="revert"></gux-table-toolbar-action>'
      },
      {
        description: 'should render import toolbar-action',
        html: '<gux-table-toolbar-action action="import"></gux-table-toolbar-action>'
      },
      {
        description: 'should render a primary toolbar-action',
        html: '<gux-table-toolbar-action slot="primary-action" accent="primary" action="export"></gux-table-toolbar-action>'
      },
      {
        description: 'should render a disabled toolbar-action',
        html: '<gux-table-toolbar-action disabled action="export"></gux-table-toolbar-action>'
      }
    ].forEach(({ description, html }) => {
      it(description, async () => {
        const page = await newSparkE2EPage({ html });
        const element = await page.find('gux-table-toolbar-action');

        await a11yCheck(page);
        expect(element.outerHTML).toMatchSnapshot();
      });
    });
  });
});
