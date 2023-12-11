import { newSparkE2EPage, a11yCheck } from '../../../../test/e2eTestUtils';

const axeExclusions = [
  {
    issueId: 'aria-required-children',
    target: 'gux-list',
    exclusionReason:
      'To be addressed in COMUI-2391. New violation picked up after upgrading from axe-core v4.4.2 to v4.8.2'
  },
  {
    issueId: 'color-contrast',
    target: 'gux-button,.gux-secondary',
    exclusionReason:
      'To be addressed in COMUI-2391. New violation picked up after upgrading from axe-core v4.4.2 to v4.8.2'
  }
];

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
      await a11yCheck(page, axeExclusions);

      expect(element.outerHTML).toMatchSnapshot();
    });
  });
});
