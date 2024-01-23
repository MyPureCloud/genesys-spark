jest.mock('../../../../utils/error/log-error', () => ({
  __esModule: true,
  logWarn: jest.fn()
}));

import { newSpecPage } from '@test/specTestUtils';
import { GuxCTAGroup } from '../gux-cta-group';
import { logWarn } from '../../../../utils/error/log-error';

const components = [GuxCTAGroup];
const language = 'en';

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
        const page = await newSpecPage({ components, html, language });

        expect(page.root).toMatchSnapshot();
      });
    });
  });

  describe('#accents', () => {
    it(`should force the correct accents on group buttons`, async () => {
      const html = `<gux-cta-group>
      <gux-button slot="primary" accent="dismiss">Primary</gux-button>
      <gux-button slot="secondary" accent="primary">Secondary</gux-button>
      <gux-button slot="dismiss" accent="secondary">Dismiss</gux-button>
    </gux-cta-group>`;
      const page = await newSpecPage({ components, html, language });
      const guxButtonPrimary: HTMLGuxButtonElement =
        page.root.querySelector('[slot="primary"]');
      const guxButtonSecondary: HTMLGuxButtonElement =
        page.root.querySelector('[slot="secondary"]');
      const guxButtonDismiss: HTMLGuxButtonElement =
        page.root.querySelector('[slot="dismiss"]');
      expect(guxButtonPrimary.accent).toBe('primary');
      expect(guxButtonSecondary.accent).toBe('secondary');
      expect(guxButtonDismiss.accent).toBe('ghost');
    });
  });

  describe('warnings', () => {
    it(`should log warning if no primary slot`, async () => {
      const html = `<gux-cta-group></gux-cta-group>`;
      await newSpecPage({ components: [GuxCTAGroup], html });
      expect(logWarn).toHaveBeenCalled();
    });

    it(`should log warning if no button in primary slot`, async () => {
      const html = `<gux-cta-group><div slot="primary">Primary</div></gux-cta-group>`;
      await newSpecPage({ components: [GuxCTAGroup], html });
      expect(logWarn).toHaveBeenCalled();
    });

    it(`should log warning if no button in secondary slot`, async () => {
      const html = `<gux-cta-group>
        <gux-button slot="primary">Primary</gux-button>
        <div slot="secondary">Secondary</div>
      </gux-cta-group>`;
      await newSpecPage({ components: [GuxCTAGroup], html });
      expect(logWarn).toHaveBeenCalled();
    });

    it(`should log warning if no button in dismiss slot`, async () => {
      const html = `<gux-cta-group>
        <gux-button slot="primary">Primary</gux-button>
        <div slot="dismiss">Dismiss</div>
      </gux-cta-group>`;
      await newSpecPage({ components: [GuxCTAGroup], html });
      expect(logWarn).toHaveBeenCalled();
    });
  });
});
