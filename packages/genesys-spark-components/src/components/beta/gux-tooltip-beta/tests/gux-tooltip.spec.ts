import { newSpecPage } from '@test/specTestUtils';
import { GuxTooltip } from '../gux-tooltip';

const components = [GuxTooltip];
const language = 'en';

describe('gux-tooltip-beta', () => {
  it('should build', async () => {
    const html = '<gux-tooltip-beta></gux-tooltip-beta>';
    const page = await newSpecPage({ components, html, language });

    expect(page.rootInstance).toBeInstanceOf(GuxTooltip);
  });

  describe('#render', () => {
    [
      `
        <div>
          <div>Element</div>
          <gux-tooltip-beta>
            <span slot="content">Tooltip</span>
          </gux-tooltip-beta>
        </div>
      `,
      `
        <div>
          <div id="element">Element</div>
          <gux-tooltip-beta for="element">
            <div slot="content">Tooltip</div>
          </gux-tooltip-beta>
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
          <gux-tooltip-beta>
            <span slot="content">Tooltip</span>
          </gux-tooltip-beta>
        </div>
      `,
      `
        <div>
          <div id="element">Element</div>
          <gux-tooltip-beta for="element">
            <div slot="content">Tooltip</div>
          </gux-tooltip-beta>
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
