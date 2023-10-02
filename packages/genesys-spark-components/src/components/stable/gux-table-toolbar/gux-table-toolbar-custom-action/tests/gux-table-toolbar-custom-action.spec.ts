import { newSpecPage } from '@test/specTestUtils';
import { GuxTableToolbarCustomAction } from '../gux-table-toolbar-custom-action';

const components = [GuxTableToolbarCustomAction];
const language = 'en';

describe('click', () => {
  it('should fire a click event when the toolbar action is clicked', async () => {
    const html =
      '<gux-table-toolbar-custom-action></gux-table-toolbar-custom-action>';
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
      description: 'should render a toolbar-custom-action',
      html: '<gux-table-toolbar-custom-action><span slot="text">Filter</span><gux-icon slot="icon" icon-name="filter" decorative></gux-icon></gux-table-toolbar-custom-action>'
    },
    {
      description: 'should render disabled toolbar-custom-action',
      html: '<gux-table-toolbar-custom-action disabled ><span slot="text">Filter</span><gux-icon slot="icon" icon-name="filter" decorative></gux-icon></gux-table-toolbar-custom-action>'
    }
  ].forEach(({ description, html }) => {
    it(description, async () => {
      const page = await newSpecPage({ components, html, language });

      expect(page.rootInstance).toBeInstanceOf(GuxTableToolbarCustomAction);
      expect(page.root).toMatchSnapshot();
    });
  });
});
