import { newSpecPage } from '@stencil/core/testing';
import { GuxPopup } from '../gux-popup';

const components = [GuxPopup];
const language = 'en';

function getGuxPopupHtml(expanded: boolean, disabled: boolean): string {
  return `
  <gux-popup ${expanded ? 'expanded' : ''} ${disabled ? 'disabled' : ''}>
    <gux-button slot="target">Target</gux-button>
    <gux-list slot="popup">
      <gux-list-item>Item 1</gux-list-item>
      <gux-list-item>Item 2</gux-list-item>
      <gux-list-item>Item 3</gux-list-item>
    </gux-list>
  </gux-popup>
`;
}

describe('gux-popup', () => {
  describe('#render', () => {
    [
      { expanded: false, disabled: false },
      { expanded: true, disabled: false },
      { expanded: false, disabled: true },
      { expanded: true, disabled: true }
    ].forEach(({ expanded, disabled }, index) => {
      it(`should render component as expected (${index + 1})`, async () => {
        const html = getGuxPopupHtml(expanded, disabled);
        const page = await newSpecPage({ components, html, language });

        expect(page.root).toMatchSnapshot();
      });
    });
  });
});
