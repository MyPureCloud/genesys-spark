import { newSpecPage } from '@test/specTestUtils';
import { GuxTooltip } from '../gux-tooltip';

const components = [GuxTooltip];
const language = 'en';

describe('gux-tooltip', () => {
  it('should build', async () => {
    const html = '<gux-tooltip></gux-tooltip>';
    const page = await newSpecPage({ components, html, language });

    expect(page.rootInstance).toBeInstanceOf(GuxTooltip);
  });

  describe('#render', () => {
    [
      `
        <div>
          <div>Element</div>
          <gux-tooltip>
            <div slot="content">Tooltip</div>
          </gux-tooltip>
        </div>
      `,
      `
        <div>
          <div id="element">Element</div>
          <gux-tooltip for="element">
            <div slot="content">Tooltip</div>
          </gux-tooltip>
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
          <gux-tooltip>
            <div slot="content">Tooltip</div>
          </gux-tooltip>
        </div>
      `,
      `
        <div>
          <div id="element">Element</div>
          <gux-tooltip for="element">
            <div slot="content">Tooltip</div>
          </gux-tooltip>
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
