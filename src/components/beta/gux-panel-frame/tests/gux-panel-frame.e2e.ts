import { newSparkE2EPage, a11yCheck } from '../../../../../tests/e2eTestUtils';

const axeExclusions = [];

describe('gux-panel-frame', () => {
  const headerSlot = '<div slot="header"><h1>Header</h1></div>';
  const bodySlot = '<div slot="body"><p>Boby</p></div>';
  const footerSlot = '<div slot="footer"><footer>footer</footer></div>';
  const invalidSlot =
    '<div slot="invalid" id="invalid"><span>Invalid</span></div>';

  describe('#render', () => {
    [
      `<gux-panel-frame-beta>${headerSlot}${bodySlot}${footerSlot}</gux-panel-frame-beta>`,
      `<gux-panel-frame-beta>${bodySlot}${footerSlot}</gux-panel-frame-beta>`,
      `<gux-panel-frame-beta>${headerSlot}${bodySlot}</gux-panel-frame-beta>`,
      `<gux-panel-frame-beta>${headerSlot}${footerSlot}</gux-panel-frame-beta>`,
      `<gux-panel-frame-beta>${headerSlot}</gux-panel-frame-beta>`,
      `<gux-panel-frame-beta>${headerSlot}${bodySlot}${invalidSlot}${footerSlot}</gux-panel-frame-beta>`
    ].forEach((html, index) => {
      it(`should render component as expected (${index + 1})`, async () => {
        const page = await newSparkE2EPage({ html });
        const element = await page.find('gux-panel-frame-beta');
        await a11yCheck(page, axeExclusions);

        expect(element.innerHTML).toMatchSnapshot();
      });
    });
  });
});
