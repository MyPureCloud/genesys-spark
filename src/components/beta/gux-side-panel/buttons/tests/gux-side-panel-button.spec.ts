import { newSpecPage } from '@stencil/core/testing';
import { GuxSidePanelButton } from '../gux-side-panel-button';

const components = [GuxSidePanelButton];
const language = 'en';

describe('gux-side-panel-button', () => {
  it('should build', async () => {
    const html = `<gux-side-panel-button></gux-side-panel-button>`;
    const page = await newSpecPage({ components, html, language });

    expect(page.rootInstance).toBeInstanceOf(GuxSidePanelButton);
  });

  describe('#render', () => {
    [{ isSelected: false }, { isSelected: true }].forEach(
      ({ isSelected }, index) => {
        it(`should render component as expected (${index + 1})`, async () => {
          const html = `<gux-side-panel-button is-selected="${isSelected}"></gux-side-panel-button>`;
          const page = await newSpecPage({ components, html, language });

          expect(page.root).toMatchSnapshot();
        });
      }
    );
  });
});
