import { newSpecPage } from '@stencil/core/testing';
import { GuxInputCheckboxBeta } from '../gux-input-checkbox-beta';

describe('gux-input-checkbox-beta', () => {
  let component: GuxInputCheckboxBeta;

  beforeEach(async () => {
    const page = await newSpecPage({
      components: [GuxInputCheckboxBeta],
      html: `
        <gux-input-checkbox-beta>
          <input slot="input" type="checkbox" id="pizza" name="food" value="pizza">
          <label slot="label" for="pizza">Pizza</label>
        </gux-input-checkbox-beta>
      `,
      language: 'en'
    });

    component = page.rootInstance;
  });

  it('should build', async () => {
    expect(component).toBeInstanceOf(GuxInputCheckboxBeta);
  });
});
