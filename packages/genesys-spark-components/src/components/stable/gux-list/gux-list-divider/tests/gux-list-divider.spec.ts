import { newSpecPage } from '@test/specTestUtils';
import { GuxListDivider } from '../gux-list-divider';

const components = [GuxListDivider];
const language = 'en';

describe('gux-list-divider', () => {
  it('should build', async () => {
    const page = await newSpecPage({
      components,
      html: `<gux-list-divider></gux-list-divider>`,
      language
    });

    expect(page.rootInstance).toBeInstanceOf(GuxListDivider);
  });

  describe('#render', () => {
    ['<gux-list-divider></gux-list-divider>'].forEach((html, index) => {
      it(`should render component as expected (${index + 1})`, async () => {
        const page = await newSpecPage({ components, html, language });

        expect(page.root).toMatchSnapshot();
      });
    });
  });
});
