import { newSpecPage } from '@test/specTestUtils';
import { GuxIconTooltip } from '../gux-icon-tooltip';

const components = [GuxIconTooltip];
const language = 'en';

describe('gux-icon-tooltip-beta', () => {
  describe('#render', () => {
    [
      '<gux-icon-tooltip-beta></gux-icon-tooltip-beta>',
      '<gux-icon-tooltip-beta><span slot="content">This is some tooltip text</span></gux-icon-tooltip-beta>',
      '<gux-icon-tooltip-beta icon-name="fa/bell-regular"></gux-icon-tooltip-beta>',
      '<gux-icon-tooltip-beta icon-name="fa/bell-regular"><span slot="content">This is some tooltip text</span></gux-icon-tooltip-beta>'
    ].forEach((html, index) => {
      it(`should render component as expected (${index + 1})`, async () => {
        const page = await newSpecPage({ components, html, language });

        expect(page.root).toMatchSnapshot();
      });
    });
  });
});
