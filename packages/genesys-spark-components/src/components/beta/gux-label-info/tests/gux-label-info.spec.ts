import { newSpecPage } from '@test/specTestUtils';
import { GuxLabelInfo } from '../gux-label-info';
import { renderConfigs } from './gux-label-info.common';

const components = [GuxLabelInfo];
const language = 'en';

describe('gux-label-info-beta', () => {
  describe('#render', () => {
    renderConfigs.forEach(({ html, description }) => {
      it(description, async () => {
        const page = await newSpecPage({ components, html, language });

        expect(page.root).toMatchSnapshot();
      });
    });
  });
});
