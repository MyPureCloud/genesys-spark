import { newSpecPage } from '@test/specTestUtils';

import { GuxSelectorCards } from '../gux-selector-cards';
import { renderConfigs } from './gux-selector-cards.common';

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
    renderConfigs.forEach(({ description, html }) => {
      it(description, async () => {
        const page = await newSpecPage({ components, html, language });

        expect(page.root).toMatchSnapshot();
      });
    });
  });
});
