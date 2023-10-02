import { newSpecPage } from '@test/specTestUtils';
import * as floatingUi from '@floating-ui/dom';
import { GuxPopup } from '../gux-popup';
import MutationObserver from 'mutation-observer';

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
  beforeEach(async () => {
    global.MutationObserver = MutationObserver;
  });

  afterEach(async () => {
    jest.spyOn(floatingUi, 'autoUpdate').mockRestore();
  });
  describe('#render', () => {
    [
      { expanded: false, disabled: false },
      { expanded: true, disabled: false },
      { expanded: false, disabled: true },
      { expanded: true, disabled: true }
    ].forEach(({ expanded, disabled }, index) => {
      it(`should render component as expected (${index + 1})`, async () => {
        jest.spyOn(floatingUi, 'autoUpdate').mockReturnValue(jest.fn());

        const html = getGuxPopupHtml(expanded, disabled);
        const page = await newSpecPage({ components, html, language });

        expect(page.root).toMatchSnapshot();
      });
    });
  });
});
