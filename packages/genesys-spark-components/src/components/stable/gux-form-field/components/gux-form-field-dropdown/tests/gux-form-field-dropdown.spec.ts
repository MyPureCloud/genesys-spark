import { newSpecPage } from '@stencil/core/testing';
import MutationObserver from 'mutation-observer';

import { GuxFormFieldDropdown } from '../gux-form-field-dropdown';
import { GuxDropdown } from '../../../../gux-dropdown/gux-dropdown';
import { GuxDropdownMulti } from '../../../../gux-dropdown-multi/gux-dropdown-multi';
import { GuxListbox } from '../../../../gux-listbox/gux-listbox';
import { GuxListboxMulti } from '../../../../gux-listbox-multi/gux-listbox-multi';
import { GuxOption } from '../../../../gux-listbox/options/gux-option/gux-option';
import { GuxOptionMulti } from '../../../../gux-listbox-multi/gux-option-multi/gux-option-multi';

const components = [
  GuxFormFieldDropdown,
  GuxDropdown,
  GuxDropdownMulti,
  GuxListbox,
  GuxListboxMulti,
  GuxOption,
  GuxOptionMulti
];
const language = 'en';

describe('gux-form-field-select', () => {
  beforeEach(async () => {
    (
      global as NodeJS.Global & {
        MutationObserver: any;
      }
    ).MutationObserver = MutationObserver;
  });

  describe('single select dropdown', () => {
    it('should build', async () => {
      const html = `
      <gux-form-field-dropdown>
        <gux-dropdown>
          <gux-listbox>
            <gux-option value="a" disabled>Ant</gux-option>
            <gux-option value="b">Bat</gux-option>
            <gux-option value="c">Cat</gux-option>
          </gux-listbox>
        </gux-dropdown>
        <label slot="label">Default</label>
      </gux-form-field-dropdown>
      `;
      const page = await newSpecPage({ components, html, language });

      expect(page.rootInstance).toBeInstanceOf(GuxFormFieldDropdown);
    });

    describe('#render', () => {
      describe('label-position', () => {
        [
          '',
          'label-position="above"',
          'label-position="beside"',
          'label-position="screenreader"'
        ].forEach((componentAttribute, index) => {
          it(`should render component as expected (${index + 1})`, async () => {
            const html = `
            <gux-form-field-dropdown ${componentAttribute}>
              <gux-dropdown>
                <gux-listbox>
                  <gux-option value="a" disabled>Ant</gux-option>
                  <gux-option value="b">Bat</gux-option>
                  <gux-option value="c">Cat</gux-option>
                </gux-listbox>
              </gux-dropdown>
              <label slot="label">Default</label>
            </gux-form-field-dropdown>
            `;
            const page = await newSpecPage({ components, html, language });

            expect(page.root).toMatchSnapshot();
          });
        });
      });

      describe('input attributes', () => {
        ['', 'disabled', 'required'].forEach((inputAttribute, index) => {
          it(`should render component as expected (${index + 1})`, async () => {
            const html = `
            <gux-form-field-dropdown>
              <gux-dropdown ${inputAttribute}>
                <gux-listbox>
                  <gux-option value="a" disabled>Ant</gux-option>
                  <gux-option value="b">Bat</gux-option>
                  <gux-option value="c">Cat</gux-option>
                </gux-listbox>
              </gux-dropdown>
              <label slot="label">Default</label>
            </gux-form-field-dropdown>
            `;
            const page = await newSpecPage({ components, html, language });

            expect(page.root).toMatchSnapshot();
          });
        });
      });
    });
  });

  describe('multi select dropdown', () => {
    it('should build', async () => {
      const html = `
      <gux-form-field-dropdown>
        <gux-dropdown-multi>
          <gux-listbox-multi>
            <gux-option-multi value="a" disabled>Ant</gux-option-multi>
            <gux-option-multi value="b">Bat</gux-option-multi>
            <gux-option-multi value="c">Cat</gux-option-multi>
          </gux-listbox-multi>
        </gux-dropdown-multi>
        <label slot="label">Default</label>
      </gux-form-field-dropdown>
      `;
      const page = await newSpecPage({ components, html, language });

      expect(page.rootInstance).toBeInstanceOf(GuxFormFieldDropdown);
    });

    describe('#render', () => {
      describe('label-position', () => {
        [
          '',
          'label-position="above"',
          'label-position="beside"',
          'label-position="screenreader"'
        ].forEach((componentAttribute, index) => {
          it(`should render component as expected (${index + 1})`, async () => {
            const html = `
              <gux-form-field-dropdown ${componentAttribute}>
                <gux-dropdown-multi>
                  <gux-listbox-multi>
                    <gux-option-multi value="a" disabled>Ant</gux-option-multi>
                    <gux-option-multi value="b">Bat</gux-option-multi>
                    <gux-option-multi value="c">Cat</gux-option-multi>
                  </gux-listbox-multi>
                </gux-dropdown-multi>
                <label slot="label">Default</label>
              </gux-form-field-dropdown>
            `;
            const page = await newSpecPage({ components, html, language });

            expect(page.root).toMatchSnapshot();
          });
        });
      });

      describe('input attributes', () => {
        ['', 'disabled', 'required'].forEach((inputAttribute, index) => {
          it(`should render component as expected (${index + 1})`, async () => {
            const html = `
            <gux-form-field-dropdown>
              <gux-dropdown-multi ${inputAttribute}>
                <gux-listbox-multi>
                  <gux-option-multi value="a" disabled>Ant</gux-option-multi>
                  <gux-option-multi value="b">Bat</gux-option-multi>
                  <gux-option-multi value="c">Cat</gux-option-multi>
                </gux-listbox-multi>
              </gux-dropdown-multi>
              <label slot="label">Default</label>
            </gux-form-field-dropdown>
            `;
            const page = await newSpecPage({ components, html, language });

            expect(page.root).toMatchSnapshot();
          });
        });
      });

      describe('help', () => {
        it('should render component as expected', async () => {
          const html = `
          <gux-form-field-dropdown>
          <gux-dropdown>
            <gux-listbox>
              <gux-option value="a" disabled>Ant</gux-option>
              <gux-option value="b">Bat</gux-option>
              <gux-option value="c">Cat</gux-option>
            </gux-listbox>
          </gux-dropdown>
          <label slot="label">Default</label>
          <span slot="help">This is a help message</span>
        </gux-form-field-dropdown>
          `;
          const page = await newSpecPage({ components, html, language });

          expect(page.root).toMatchSnapshot();
        });
      });

      describe('help multi select', () => {
        it('should render component as expected', async () => {
          const html = `
          <gux-form-field-dropdown>
          <gux-dropdown-multi>
            <gux-listbox-multi>
              <gux-option-multi value="a" disabled>Ant</gux-option-multi>
              <gux-option-multi value="b">Bat</gux-option-multi>
              <gux-option-multi value="c">Cat</gux-option-multi>
            </gux-listbox-multi>
          </gux-dropdown-multi>
          <label slot="label">Default</label>
          <span slot="help">This is a help message</span>
        </gux-form-field-dropdown>
          `;
          const page = await newSpecPage({ components, html, language });

          expect(page.root).toMatchSnapshot();
        });
      });
    });
  });
});
