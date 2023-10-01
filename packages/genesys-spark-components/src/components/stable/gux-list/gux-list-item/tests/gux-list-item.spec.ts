import { newSpecPage } from '@test/specTestUtils';
import { GuxListItem } from '../gux-list-item';

const components = [GuxListItem];
const language = 'en';

describe('gux-list-item', () => {
  it('should build', async () => {
    const page = await newSpecPage({
      components,
      html: `<gux-list-item>Item</gux-list-item>`,
      language
    });

    expect(page.rootInstance).toBeInstanceOf(GuxListItem);
  });

  describe('#render', () => {
    ['<gux-list-item>Item</gux-list-item>'].forEach((html, index) => {
      it(`should render component as expected (${index + 1})`, async () => {
        const page = await newSpecPage({ components, html, language });

        expect(page.root).toMatchSnapshot();
      });
    });
  });
});
