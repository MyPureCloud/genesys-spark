import { newSpecPage } from '@test/specTestUtils';
import { GuxLabelInfo } from '../gux-label-info';

const components = [GuxLabelInfo];
const language = 'en';

describe('gux-label-info-beta', () => {
  describe('#render', () => {
    [
      '<gux-label-info-beta></gux-label-info-beta>',
      '<gux-label-info-beta variant="question"><span slot="content">This is some tooltip text</span></gux-label-info-beta>',
      '<gux-label-info-beta variant="info"></gux-label-info-beta>',
      '<gux-label-info-beta><span slot="content">This is some tooltip text</span></gux-label-info-beta>',
      '<gux-label-info-beta variant="invalid-variant"><span slot="content">This is an information tooltip</span></gux-label-info-beta>'
    ].forEach((html, index) => {
      it(`should render component as expected (${index + 1})`, async () => {
        const page = await newSpecPage({ components, html, language });

        expect(page.root).toMatchSnapshot();
      });
    });
  });
});
