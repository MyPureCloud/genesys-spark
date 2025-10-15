import { newSpecPage } from '@test/specTestUtils';
import { GuxTooltipPointer } from '../gux-tooltip-pointer';
import { GuxTooltipBase } from '@components/beta/gux-tooltip-base/gux-tooltip-base';

const components = [GuxTooltipPointer, GuxTooltipBase];
const language = 'en';

describe('gux-tooltip-pointer-beta', () => {
  it('should build', async () => {
    const html = '<gux-tooltip-pointer-beta></gux-tooltip-pointer-beta>';
    const page = await newSpecPage({ components, html, language });

    expect(page.rootInstance).toBeInstanceOf(GuxTooltipPointer);
  });

  describe('#render', () => {
    [
      `
        <div>
          <div>Element</div>
          <gux-tooltip-pointer-beta>
            <span slot="content">Tooltip</span>
          </gux-tooltip-pointer-beta>
        </div>
      `,
      `
        <div>
          <div id="element">Element</div>
          <gux-tooltip-pointer-beta for="element">
            <div slot="content">Tooltip</div>
          </gux-tooltip-pointer-beta>
        </div>
      `
    ].forEach((html, index) => {
      it(`should render component as expected (${index + 1})`, async () => {
        const page = await newSpecPage({ components, html, language });

        expect(page.body).toMatchSnapshot();
      });
    });
  });

  describe('#remove', () => {
    [
      `
        <div>
          <div>Element</div>
          <gux-tooltip-pointer-beta>
            <span slot="content">Tooltip</span>
          </gux-tooltip-pointer-beta>
        </div>
      `,
      `
        <div>
          <div id="element">Element</div>
          <gux-tooltip-pointer-beta for="element">
            <div slot="content">Tooltip</div>
          </gux-tooltip-pointer-beta>
        </div>
      `
    ].forEach((html, index) => {
      it(`should remove component as expected (${index + 1})`, async () => {
        const page = await newSpecPage({ components, html, language });

        page.root.remove();

        await page.waitForChanges();

        expect(page.body).toMatchSnapshot();
      });
    });
  });
});
