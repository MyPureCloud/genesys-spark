import { newSpecPage } from '@stencil/core/testing';
import { GuxTextLabelLegacy } from '../gux-text-label';

describe('gux-text-label-legacy', () => {
  let component: GuxTextLabelLegacy;

  beforeEach(async () => {
    const page = await newSpecPage({
      components: [GuxTextLabelLegacy],
      html: `
        <gux-text-label-legacy label="test">
          <input type="text">
        </gux-text-label-legacy>
      `,
      language: 'en'
    });

    component = page.rootInstance;
  });

  it('should build', async () => {
    expect(component).toBeInstanceOf(GuxTextLabelLegacy);
  });
});
