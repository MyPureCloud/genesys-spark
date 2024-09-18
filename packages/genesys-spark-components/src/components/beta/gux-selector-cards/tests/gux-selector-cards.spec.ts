import { newSpecPage } from '@test/specTestUtils';

import { GuxSelectorCards } from '../gux-selector-cards';

const components = [GuxSelectorCards];
const language = 'en';

describe('gux-selector-cards', () => {
  it('should build', async () => {
    const html = `<gux-selector-cards-beta>
        <gux-selector-card-beta variant="simple">
          <label slot="label" for="first">First</label>
          <input slot="input" id="first" type="radio" name="example1" />
          <gux-icon slot="icon" icon-name="fa/diamond-regular" decorative />
        </gux-selector-card-beta>

        <gux-selector-card-beta variant="simple">
          <label slot="label" for="second">Second</label>
          <input slot="input" id="second" type="radio" name="example1" />
          <gux-icon slot="icon" icon-name="fa/bell-regular" decorative />
        </gux-selector-card-beta>

        <gux-selector-card-beta variant="simple">
          <label slot="label" for="third">Third</label>
          <input slot="input" id="third" type="radio" name="example1" />
          <gux-icon slot="icon" icon-name="fa/play-regular" decorative />
        </gux-selector-card-beta>

        <gux-selector-card-beta variant="simple">
          <label slot="label" for="fourth">Fourth</label>
          <input slot="input" id="fourth" type="radio" name="example1" disabled />
          <gux-icon slot="icon" icon-name="fa/bell-regular" decorative />
        </gux-selector-card-beta>

        <gux-selector-card-beta variant="simple">
          <label slot="label" for="fifth">Fifth</label>
          <input slot="input" id="fifth" type="radio" name="example1" />
          <gux-icon slot="icon" icon-name="fa/play-regular" decorative />
        </gux-selector-card-beta>
      </gux-selector-cards-beta>
      `;
    const page = await newSpecPage({ components, html, language });

    expect(page.rootInstance).toBeInstanceOf(GuxSelectorCards);
  });

  describe('#render', () => {
    [
      `<gux-selector-cards-beta></gux-selector-cards-beta>`,
      `
      <gux-selector-cards-beta>
        <gux-selector-card-beta variant="simple">
          <label slot="label" for="first">First</label>
          <input slot="input" id="first" type="radio" name="example1" />
          <gux-icon slot="icon" icon-name="fa/diamond-regular" decorative />
        </gux-selector-card-beta>

        <gux-selector-card-beta variant="simple">
          <label slot="label" for="second">Second</label>
          <input slot="input" id="second" type="radio" name="example1" />
          <gux-icon slot="icon" icon-name="fa/bell-regular" decorative />
        </gux-selector-card-beta>

        <gux-selector-card-beta variant="simple">
          <label slot="label" for="third">Third</label>
          <input slot="input" id="third" type="radio" name="example1" />
          <gux-icon slot="icon" icon-name="fa/play-regular" decorative />
        </gux-selector-card-beta>

        <gux-selector-card-beta variant="simple">
          <label slot="label" for="fourth">Fourth</label>
          <input slot="input" id="fourth" type="radio" name="example1" disabled />
          <gux-icon slot="icon" icon-name="fa/bell-regular" decorative />
        </gux-selector-card-beta>

        <gux-selector-card-beta variant="simple">
          <label slot="label" for="fifth">Fifth</label>
          <input slot="input" id="fifth" type="radio" name="example1" />
          <gux-icon slot="icon" icon-name="fa/play-regular" decorative />
        </gux-selector-card-beta>
      </gux-selector-cards-beta>
      `,
      `<gux-selector-cards-beta class="example2">
        <gux-selector-card-beta variant="descriptive">
          <label slot="label" for="first">First</label>
          <input slot="input" id="first" type="radio" name="example2" />
          <span slot="content">A label for a sample selector card. Used in Spark WCL.</span>
          <gux-badge slot="badge" bold>Badge</gux-badge>
          <gux-icon slot="icon" icon-name="fa/diamond-regular" decorative />
        </gux-selector-card-beta>

        <gux-selector-card-beta variant="descriptive">
          <label slot="label" for="second">Second</label>
          <input slot="input" id="second" type="radio" name="example2" />
          <span slot="content">A label for a sample selector card. Used in Spark WCL.</span>
          <gux-badge slot="badge" bold>Badge</gux-badge>
          <gux-icon slot="icon" icon-name="fa/bell-regular" decorative />
        </gux-selector-card-beta>

        <gux-selector-card-beta variant="descriptive">
          <label slot="label" for="third">Third</label>
          <input slot="input" id="third" type="radio" name="example2" />
          <span slot="content">A label for a sample selector card. Used in Spark WCL.</span>
          <gux-badge slot="badge" bold>Badge</gux-badge>
          <gux-icon slot="icon" icon-name="fa/play-regular" decorative />
        </gux-selector-card-beta>

        <gux-selector-card-beta variant="descriptive">
          <label slot="label" for="fourth">Fourth</label>
          <input slot="input" id="fourth" type="radio" name="example2" disabled />
          <span slot="content">A label for a sample selector card. Used in Spark WCL.</span>
          <gux-badge slot="badge" bold>Badge</gux-badge>
          <gux-icon slot="icon" icon-name="fa/bell-regular" decorative />
        </gux-selector-card-beta>

        <gux-selector-card-beta variant="descriptive">
          <label slot="label" for="fifth">Fifth</label>
          <input slot="input" id="fifth" type="radio" name="example2" />
          <span slot="content">A label for a sample selector card. Used in Spark WCL.</span>
          <gux-badge slot="badge" bold>Badge</gux-badge>
          <gux-icon slot="icon" icon-name="fa/play-regular" decorative />
        </gux-selector-card-beta>
      </gux-selector-cards-beta>`,
      `<gux-selector-cards-beta class="example1">
        <gux-selector-card-beta variant="simple">
          <label slot="label" for="1-C">First</label>
          <input slot="input" id="1-C" type="checkbox" name="example3" />
          <gux-icon slot="icon" icon-name="fa/diamond-regular" decorative />
        </gux-selector-card-beta>

        <gux-selector-card-beta variant="simple">
          <label slot="label" for="2-C">Second</label>
          <input slot="input" id="2-C" type="checkbox" name="example3" />
          <gux-icon slot="icon" icon-name="fa/bell-regular" decorative />
        </gux-selector-card-beta>

        <gux-selector-card-beta variant="simple">
          <label slot="label" for="3-C">Third</label>
          <input slot="input" id="3-C" type="checkbox" name="example3" />
          <gux-icon slot="icon" icon-name="fa/play-regular" decorative />
        </gux-selector-card-beta>

        <gux-selector-card-beta variant="simple">
          <label slot="label" for="4-C">Fourth</label>
          <input slot="input" id="4-C" type="checkbox" name="example3" disabled />
          <gux-icon slot="icon" icon-name="fa/bell-regular" decorative />
        </gux-selector-card-beta>

        <gux-selector-card-beta variant="simple">
          <label slot="label" for="5-C">Fifth</label>
          <input slot="input" id="5-C" type="checkbox" name="example3" />
          <gux-icon slot="icon" icon-name="fa/play-regular" decorative />
        </gux-selector-card-beta>
      </gux-selector-cards-beta>`
    ].forEach((html, index) => {
      it(`should render component as expected (${index + 1})`, async () => {
        const page = await newSpecPage({ components, html, language });

        expect(page.root).toMatchSnapshot();
      });
    });
  });
});
