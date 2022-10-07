import { newSpecPage } from '@stencil/core/testing';
import MutationObserver from 'mutation-observer';

import { GuxInputCheckbox } from 'components/legacy/gux-form-field-legacy/components/gux-input-checkbox/gux-input-checkbox';
import { GuxInputColor } from 'components/legacy/gux-form-field-legacy/components/gux-input-color/gux-input-color';
import { GuxInputRadio } from 'components/legacy/gux-form-field-legacy/components/gux-input-radio/gux-input-radio';
import { GuxInputRange } from 'components/legacy/gux-form-field-legacy/components/gux-input-range/gux-input-range';
import { GuxInputTextLike } from 'components/legacy/gux-form-field-legacy/components/gux-input-text-like/gux-input-text-like';

import { GuxFormFieldLegacy } from '../gux-form-field';

const components = [
  GuxFormFieldLegacy,
  GuxInputCheckbox,
  GuxInputColor,
  GuxInputRadio,
  GuxInputRange,
  GuxInputTextLike
];
const language = 'en';

describe('gux-form-field-legacy', () => {
  beforeEach(async () => {
    global.MutationObserver = MutationObserver;
    jest.spyOn(global.Math, 'random').mockReturnValue(0.5);
  });

  it('should build', async () => {
    const html = `
      <gux-form-field-legacy>
        <input slot="input" type="unknown">
        <label slot="label">Text</label>
      </gux-form-field-legacy>
    `;
    const page = await newSpecPage({ components, html, language });

    expect(page.rootInstance).toBeInstanceOf(GuxFormFieldLegacy);
  });

  describe('#render', () => {
    describe('input tag', () => {
      [
        'checkbox',
        'color',
        'email',
        'number',
        'password',
        'radio',
        'range',
        'search',
        'text',
        'unknown'
      ].forEach(type => {
        it(`should render component type "${type}"`, async () => {
          const html = `
            <gux-form-field-legacy>
              <input
                slot="input"
                type="${type}"
                value="test"
              />
              <label slot="label">Test</label>
            </gux-form-field-legacy>
          `;
          const page = await newSpecPage({ components, html, language });

          expect(page.root).toMatchSnapshot();
        });
        it(`should render component type "${type}" with an error slot`, async () => {
          const html = `
            <gux-form-field-legacy>
              <input
                slot="input"
                type="${type}"
                value="test"
              />
              <label slot="label">Test</label>
              <span slot="error">Error Message</span>
            </gux-form-field-legacy>
          `;
          const page = await newSpecPage({ components, html, language });

          expect(page.root).toMatchSnapshot();
        });
      });
    });

    describe('select tag', () => {
      it(`should render component type "select"`, async () => {
        const html = `
          <gux-form-field-legacy>
            <select slot="input" name="select">
              <option value="option1">Option 1</option>
              <option value="option1">Option 2</option>
              <option value="option1">Option 3</option>
            </select>
            <label slot="label">Select</label>
          </gux-form-field-legacy>
        `;
        const page = await newSpecPage({ components, html, language });

        expect(page.root).toMatchSnapshot();
      });

      it(`should render component type "select" with an error slot`, async () => {
        const html = `
          <gux-form-field-legacy>
            <select slot="input" name="select">
              <option value="option1">Option 1</option>
              <option value="option1">Option 2</option>
              <option value="option1">Option 3</option>
            </select>
            <label slot="label">Select</label>
            <span slot="error">Error Message</span>
          </gux-form-field-legacy>
        `;
        const page = await newSpecPage({ components, html, language });

        expect(page.root).toMatchSnapshot();
      });

      it(`should render component type "select" and keep user provided id and for attributes`, async () => {
        const html = `
          <gux-form-field-legacy>
            <select slot="input" id="test" name="select">
              <option value="option1">Option 1</option>
              <option value="option1">Option 2</option>
              <option value="option1">Option 3</option>
            </select>
            <label for="test" slot="label">Select</label>
            <span slot="error">Error Message</span>
          </gux-form-field-legacy>
        `;
        const page = await newSpecPage({ components, html, language });
        expect(page.root).toMatchSnapshot();
      });
    });
  });
});
