import { newSpecPage } from '@stencil/core/testing';
import { GuxAdvancedDropdown } from '../gux-advanced-dropdown';

describe('gux-advanced-dropdown', () => {
  it('should render', async () => {
    const page = await newSpecPage({
      components: [GuxAdvancedDropdown],
      html: `
        <gux-advanced-dropdown lang="en">
          <gux-dropdown-option value="en" text="English"></gux-dropdown-option>
          <gux-dropdown-option value="nl" text="Dutch"></gux-dropdown-option>
        </gux-advanced-dropdown>
      `,
      language: 'en'
    });

    expect(page.root).toMatchSnapshot();
  });
});
