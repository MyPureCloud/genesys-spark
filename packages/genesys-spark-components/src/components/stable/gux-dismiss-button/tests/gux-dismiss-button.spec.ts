import { newSpecPage } from '@test/specTestUtils';
import { GuxDismissButton } from '../gux-dismiss-button';

const components = [GuxDismissButton];
const language = 'en';

describe('gux-dismiss-button', () => {
  it('should build', async () => {
    const page = await newSpecPage({
      components,
      html: '<gux-dismiss-button></gux-dismiss-button>',
      language
    });

    expect(page.rootInstance).toBeInstanceOf(GuxDismissButton);
  });

  describe('#render', () => {
    ['<gux-dismiss-button></gux-dismiss-button>'].forEach((html, index) => {
      it(`should render component as expected (${index + 1})`, async () => {
        const page = await newSpecPage({ components, html, language });

        expect(page.root).toMatchSnapshot();
      });
    });
  });
});
