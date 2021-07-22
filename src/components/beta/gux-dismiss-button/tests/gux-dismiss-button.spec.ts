import { newSpecPage } from '@stencil/core/testing';
import { GuxDismissButton } from '../gux-dismiss-button';

const components = [GuxDismissButton];
const language = 'en';

describe('gux-dismiss-button-beta', () => {
  it('should build', async () => {
    const page = await newSpecPage({
      components,
      html: '<gux-dismiss-button-beta></gux-dismiss-button-beta>',
      language
    });

    expect(page.rootInstance).toBeInstanceOf(GuxDismissButton);
  });

  describe('#render', () => {
    ['<gux-dismiss-button-beta></gux-dismiss-button-beta>'].forEach(
      (html, index) => {
        it(`should render component as expected (${index + 1})`, async () => {
          const page = await newSpecPage({ components, html, language });

          expect(page.root).toMatchSnapshot();
        });
      }
    );
  });
});
