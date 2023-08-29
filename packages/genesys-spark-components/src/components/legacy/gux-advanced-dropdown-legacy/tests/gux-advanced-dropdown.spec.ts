import { newSpecPage } from '@stencil/core/testing';
import { GuxAdvancedDropdownLegacy } from '../gux-advanced-dropdown';
import MutationObserver from 'mutation-observer';

describe('gux-advanced-dropdown-legacy', () => {
  beforeEach(async () => {
    (
      global as NodeJS.Global & {
        MutationObserver: any;
      }
    ).MutationObserver = MutationObserver;
  });

  it('should render', async () => {
    const page = await newSpecPage({
      components: [GuxAdvancedDropdownLegacy],
      html: `
        <gux-advanced-dropdown-legacy>
          <gux-dropdown-option value="en" text="English"></gux-dropdown-option>
          <gux-dropdown-option value="nl" text="Dutch"></gux-dropdown-option>
        </gux-advanced-dropdown-legacy>
      `,
      language: 'en'
    });

    expect(page.root).toMatchSnapshot();
  });
});
