import { newSpecPage } from '@stencil/core/testing';
import { GuxRadialLoading } from '../gux-radial-loading';

describe('gux-radial-loading', () => {
  let component: GuxRadialLoading;

  beforeEach(async () => {
    const page = await newSpecPage({
      components: [GuxRadialLoading],
      html: `<gux-radial-loading-beta></gux-radial-loading-beta>`,
      language: 'en'
    });

    component = page.rootInstance;
  });

  it('should build', async () => {
    expect(component).toBeInstanceOf(GuxRadialLoading);
  });

  describe('#render', () => {
    [
      '<gux-radial-loading-beta></gux-radial-loading-beta>',
      '<gux-radial-loading-beta context="modal"></gux-radial-loading-beta>',
      '<gux-radial-loading-beta context="full-page"></gux-radial-loading-beta>',
      '<gux-radial-loading-beta context="input"></gux-radial-loading-beta>'
    ].forEach((input, index) => {
      it(`should render component as expected (${index + 1})`, async () => {
        const page = await newSpecPage({
          components: [GuxRadialLoading],
          html: input,
          language: 'en'
        });

        expect(page.root).toMatchSnapshot();
      });
    });
  });
});
