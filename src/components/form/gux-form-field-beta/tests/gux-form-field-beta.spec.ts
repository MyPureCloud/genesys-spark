import { newSpecPage } from '@stencil/core/testing';

import { GuxInputCheckboxBeta } from '../../gux-form-field/components/gux-input-checkbox-beta/gux-input-checkbox-beta';
import { GuxInputColorBeta } from '../../gux-form-field/components/gux-input-color-beta/gux-input-color-beta';
import { GuxInputRadioBeta } from '../../gux-form-field/components/gux-input-radio-beta/gux-input-radio-beta';
import { GuxInputRangeBeta } from '../../gux-form-field/components/gux-input-range-beta/gux-input-range-beta';
import { GuxInputTextLikeBeta } from '../../gux-form-field/components/gux-input-text-like-beta/gux-input-text-like-beta';

import { GuxFormFieldBeta } from '../gux-form-field-beta';

const components = [
  GuxFormFieldBeta,
  GuxInputCheckboxBeta,
  GuxInputColorBeta,
  GuxInputRadioBeta,
  GuxInputRangeBeta,
  GuxInputTextLikeBeta
];
const language = 'en';

describe('gux-form-field-beta', () => {
  it('should build', async () => {
    const html = `
      <gux-form-field-beta>
        <input slot="input" type="text">
        <label slot="label">Text</label>
      </gux-form-field-beta>
    `;
    const page = await newSpecPage({ components, html, language });
    expect(page.rootInstance).toBeInstanceOf(GuxFormFieldBeta);
  });
});
