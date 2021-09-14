import { newSpecPage } from '@stencil/core/testing';
import { GuxSidePanel } from '../gux-side-panel';

const components = [GuxSidePanel];
const language = 'en';

describe('gux-side-panel', () => {
  it('should build', async () => {
    const html = `<gux-side-panel-beta></gux-side-panel-beta>`;
    const page = await newSpecPage({ components, html, language });

    expect(page.rootInstance).toBeInstanceOf(GuxSidePanel);
  });

  describe('#render', () => {
    [
      { position: 'left', isOpen: false },
      { position: 'left', isOpen: true },
      { position: 'right', isOpen: false },
      { position: 'right', isOpen: true }
    ].forEach(({ position, isOpen }, index) => {
      it(`should render component as expected (${index + 1})`, async () => {
        const html = `<gux-side-panel-beta position="${position}" is-open="${isOpen}"></gux-side-panel-beta>`;
        const page = await newSpecPage({ components, html, language });

        expect(page.root).toMatchSnapshot();
      });
    });
  });
});
