import { newSparkE2EPage, a11yCheck } from '../../../../test/e2eTestUtils';

describe('gux-cta-group', () => {
  describe('#render', () => {
    [
      `<gux-cta-group>
          <gux-button slot="primary">Primary</gux-button>
          <gux-button slot="secondary">Secondary</gux-button>
          <gux-button slot="dismiss">Dismiss</gux-button>
        </gux-cta-group>`,
      `<gux-cta-group align="end">
        <gux-button slot="primary">Primary</gux-button>
        <gux-button-multi slot="secondary">
          <span slot="title">Secondary</span>
          <gux-list-item>Test 1</gux-list-item>
          <gux-list-item>Test 2</gux-list-item>
        </gux-button-multi>
        <gux-button slot="dismiss">Dismiss</gux-button>
      </gux-cta-group>`,
      `<gux-cta-group dangerous>
        <gux-button slot="primary">Delete key</gux-button>
        <gux-button slot="dismiss">Cancel</gux-button>
      </gux-cta-group>`
    ].forEach((html, index) => {
      it(`should render component as expected (${index + 1})`, async () => {
        const page = await newSparkE2EPage({ html });
        const element = await page.find('gux-cta-group');

        await a11yCheck(page);

        expect(element.outerHTML).toMatchSnapshot();
      });
    });
  });
});
