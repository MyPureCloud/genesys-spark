import { newSpecPage, SpecPage } from '@stencil/core/testing';

import { GuxTabsLegacy } from '../gux-tabs-legacy';
import { GuxTabLegacy } from '../gux-tab-legacy/gux-tab-legacy';
import { GuxTabDropdownOptionLegacy } from '../gux-tab-dropdown-option-legacy/gux-tab-dropdown-option-legacy';

const components = [GuxTabsLegacy, GuxTabLegacy, GuxTabDropdownOptionLegacy];
const language = 'en';

describe('gux-tabs-legacy', () => {
  let page: SpecPage;

  beforeEach(async () => {
    page = await newSpecPage({
      components,
      html: `
        <gux-tabs-legacy id="interactive">
          <gux-tab-legacy tab-id="1" tab-icon-name="lock">
            <span slot="title"> Hello World </span>
            <span slot="dropdown-options">
              <gux-tab-dropdown-option-legacy
                option-id="1"
                icon-name="edit"
                onclick="notify(event)"
              >
                Edit
              </gux-tab-dropdown-option-legacy>
              <gux-tab-dropdown-option-legacy
                option-id="2"
                icon-name="clone"
                onclick="notify(event)"
              >
                Clone
              </gux-tab-dropdown-option-legacy>
              <gux-tab-dropdown-option-legacy
                option-id="3"
                icon-name="share"
                onclick="notify(event)"
              >
                Share
              </gux-tab-dropdown-option-legacy>
              <gux-tab-dropdown-option-legacy
                option-id="4"
                icon-name="download"
                onclick="notify(event)"
              >
                Download
              </gux-tab-dropdown-option-legacy>
            </span>
          </gux-tab-legacy>

          <gux-tab-legacy tab-id="2" tab-icon-name="lock">
            <span slot="title"> Hello World 2 </span>
          </gux-tab-legacy>
        </gux-tabs-legacy>
      `,
      language
    });
  });

  it('should build', async () => {
    expect(page.rootInstance).toBeInstanceOf(GuxTabsLegacy);
  });

  it('should render', async () => {
    expect(page.root).toMatchSnapshot();
  });
});
