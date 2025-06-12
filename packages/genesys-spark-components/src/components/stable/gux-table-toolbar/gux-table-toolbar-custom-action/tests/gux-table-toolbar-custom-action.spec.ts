import { newSpecPage } from '@test/specTestUtils';
import { GuxTableToolbarCustomAction } from '../gux-table-toolbar-custom-action';
import { renderConfigs } from './gux-table-toolbar-custom-action.common';

const components = [GuxTableToolbarCustomAction];
const language = 'en';

describe('gux-table-toolbar-custom-action', () => {
  describe('#render', () => {
    renderConfigs.forEach(({ description, html }) => {
      it(description, async () => {
        const page = await newSpecPage({ components, html, language });

        expect(page.rootInstance).toBeInstanceOf(GuxTableToolbarCustomAction);
        expect(page.root).toMatchSnapshot();
      });
    });
  });
});
