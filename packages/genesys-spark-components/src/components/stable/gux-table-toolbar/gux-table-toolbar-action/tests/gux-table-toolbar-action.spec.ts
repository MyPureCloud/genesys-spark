import { newSpecPage } from '@test/specTestUtils';
import { GuxTableToolbarAction } from '../gux-table-toolbar-action';

const components = [GuxTableToolbarAction];
const language = 'en';

describe('click', () => {
  it('should fire a click event when the toolbar action is clicked', async () => {
    const html =
      '<gux-table-toolbar-action action="export"></gux-table-toolbar-action>';
    const page = await newSpecPage({ components, html, language });
    const element = page.root as HTMLElement;
    const clickSpy = jest.fn();

    element.addEventListener('click', clickSpy);

    element.click();
    await page.waitForChanges();

    expect(clickSpy).toHaveBeenCalled();
  });
});

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
      const page = await newSpecPage({ components, html, language });

      expect(page.rootInstance).toBeInstanceOf(GuxTableToolbarAction);
      expect(page.root).toMatchSnapshot();
    });
  });
});
