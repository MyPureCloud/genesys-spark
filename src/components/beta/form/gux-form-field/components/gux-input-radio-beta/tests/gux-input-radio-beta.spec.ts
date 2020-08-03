import { newSpecPage } from '@stencil/core/testing';
import { GuxInputRadioBeta } from '../gux-input-radio-beta';

describe('gux-input-radio-beta', () => {
  let component: GuxInputRadioBeta;

  beforeEach(async () => {
    const page = await newSpecPage({
      components: [GuxInputRadioBeta],
      html: `
      <gux-input-radio-beta>
        <input slot="input" type="radio" id="dinner-sandwich" name="dinner" value="sandwich" disabled>
      </gux-input-radio-beta>
      `,
      language: 'en'
    });

    component = page.rootInstance;
  });

  it('should build', async () => {
    expect(component).toBeInstanceOf(GuxInputRadioBeta);
  });
});
