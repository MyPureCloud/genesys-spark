import { newSpecPage } from '@test/specTestUtils';
import { GuxTableToolbarAction } from '../gux-table-toolbar-action';
import { renderConfigs } from './gux-table-toolbar-action.common';
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
  renderConfigs.forEach(({ description, html }) => {
    it(description, async () => {
      const page = await newSpecPage({ components, html, language });

      expect(page.rootInstance).toBeInstanceOf(GuxTableToolbarAction);
      expect(page.root).toMatchSnapshot();
    });
  });
});
