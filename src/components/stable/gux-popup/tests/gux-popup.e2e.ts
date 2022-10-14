import { newSparkE2EPage, a11yCheck } from '../../../../../tests/e2eTestUtils';

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
  [
    { expanded: false, disabled: false },
    { expanded: true, disabled: false },
    { expanded: false, disabled: true },
    { expanded: true, disabled: true }
  ].forEach(({ expanded, disabled }, index) => {
    it(`should display component as expected (${index + 1})`, async () => {
      const html = getGuxPopupHtml(expanded, disabled);
      const page = await newSparkE2EPage({ html });
      const element = await page.find('gux-popup');
      await a11yCheck(page);

      expect(element.outerHTML).toMatchSnapshot();
    });
  });
});
