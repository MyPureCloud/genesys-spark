import { newSpecPage } from '@stencil/core/testing';
import { GuxAdvancedDropdown } from '../gux-advanced-dropdown';
import MutationObserver from 'mutation-observer';

describe('gux-advanced-dropdown', () => {
  beforeEach(async () => {
    (
      global as NodeJS.Global & {
        MutationObserver: any;
      }
    ).MutationObserver = MutationObserver;
  });

  it('should render', async () => {
    const page = await newSpecPage({
      components: [GuxAdvancedDropdown],
      html: `
        <gux-advanced-dropdown>
          <gux-dropdown-option value="en" text="English"></gux-dropdown-option>
          <gux-dropdown-option value="nl" text="Dutch"></gux-dropdown-option>
        </gux-advanced-dropdown>
      `,
      language: 'en'
    });

    expect(page.root).toMatchSnapshot();
  });
});
