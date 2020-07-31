import { newSpecPage } from '@stencil/core/testing';
import MutationObserver from 'mutation-observer';

import { GuxInputRangeBeta } from '../gux-input-range-beta';

const components = [GuxInputRangeBeta];
const language = 'en';

describe('gux-input-range-beta', () => {
  beforeEach(async () => {
    global.MutationObserver = MutationObserver;
  });

  it('should build', async () => {
    const html = `
      <gux-input-range-beta>
        <input type="range" slot="input"/>
      </gux-input-range-beta>
    `;
    const page = await newSpecPage({ components, html, language });

    expect(page.rootInstance).toBeInstanceOf(GuxInputRangeBeta);
  });
});
