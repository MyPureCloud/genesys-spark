import { newSpecPage } from '@stencil/core/testing';
import MutationObserver from 'mutation-observer';

import { GuxInputColorOptionBeta } from '../../gux-input-color/components/gux-input-color-option-beta/gux-input-color-option-beta';
import { GuxInputColorSelectBeta } from '../../gux-input-color/components/gux-color-select-beta/gux-input-color-select-beta';
import { GuxInputColorBeta } from '../gux-input-color-beta';

const components = [
  GuxInputColorBeta,
  GuxInputColorSelectBeta,
  GuxInputColorOptionBeta
];
const language = 'en';

describe('gux-input-color-beta', () => {
  beforeEach(() => {
    global.MutationObserver = MutationObserver;
  });

  it('should build', async () => {
    const html = `<gux-input-color-beta><input slot="input" type="color" value="#75A8FF"></gux-input-color-beta>`;
    const page = await newSpecPage({ components, html, language });
    const component = page.rootInstance;

    expect(component).toBeInstanceOf(GuxInputColorBeta);
  });
});
