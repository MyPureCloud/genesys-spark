import { newSpecPage } from '@stencil/core/testing';
import { GuxInputColorOptionBeta } from '../../gux-input-color-option-beta/gux-input-color-option-beta';
import { GuxInputColorSelectBeta } from '../gux-input-color-select-beta';

const components = [GuxInputColorSelectBeta, GuxInputColorOptionBeta];
const language = 'en';

describe('gux-input-color-select-beta', () => {
  it('should build', async () => {
    const html = `<gux-input-color-select-beta><input slot="input" type="color" value="#75A8FF"></gux-input-color-select-beta>`;
    const page = await newSpecPage({ components, html, language });
    const component = page.rootInstance;

    expect(component).toBeInstanceOf(GuxInputColorSelectBeta);
  });
});
