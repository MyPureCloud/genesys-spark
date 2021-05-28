import { newSpecPage } from '@stencil/core/testing';
import { GuxPanelFrame } from '../gux-panel-frame';

describe('gux-panel-frame-beta', () => {
  const components = [GuxPanelFrame];
  const language = 'en';

  const headerSlot = '<div slot="header"><h1>Header</h1></div>';
  const bodySlot = '<div slot="body"><p>Boby</p></div>';
  const footerSlot = '<div slot="footer"><footer>footer</footer></div>';
  const invalidSlot =
    '<div slot="invalid" id="invalid"><span>Invalid</span></div>';

  it('should build', async () => {
    const html = `<gux-panel-frame-beta>${headerSlot}${bodySlot}${footerSlot}</gux-panel-frame-beta>`;
    const page = await newSpecPage({ components, html, language });

    expect(page.rootInstance).toBeInstanceOf(GuxPanelFrame);
  });

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
        const page = await newSpecPage({ components, html, language });

        expect(page.root).toMatchSnapshot();
      });
    });
  });
});
