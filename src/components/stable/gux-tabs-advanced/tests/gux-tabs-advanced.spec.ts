import { newSpecPage } from '@stencil/core/testing';
import MutationObserver from 'mutation-observer';

import { GuxTabsAdvanced } from '../gux-tabs-advanced';
import { GuxTabAdvanced } from '../gux-tab-advanced/gux-tab-advanced';
import { GuxTabAdvancedList } from '../gux-tab-advanced-list/gux-tab-advanced-list';
import { GuxTabAdvancedPanel } from '../gux-tab-advanced-panel/gux-tab-advanced-panel';

const components = [
  GuxTabsAdvanced,
  GuxTabAdvanced,
  GuxTabAdvancedList,
  GuxTabAdvancedPanel
];
const html = `
  <gux-tabs-advanced lang="en" id="interactive">
    <gux-tab-advanced-list slot="tab-list" show-new-tab-button="true">
      <gux-tab-advanced tab-id="1-1" tab-icon-name="lock">
        <span>Hello World</span>
        <span slot="dropdown-options">
          <gux-tab-advanced-option
            option-id="1"
            icon-name="edit"
            onclick="notify(event)"
          >
            Edit
          </gux-tab-advanced-option>
          <gux-tab-advanced-option
            option-id="2"
            icon-name="clone"
            onclick="notify(event)"
          >
            Clone
          </gux-tab-advanced-option>
          <gux-tab-advanced-option
            option-id="3"
            icon-name="share"
            onclick="notify(event)"
          >
            Share
          </gux-tab-advanced-option>
          <gux-tab-advanced-option
            option-id="4"
            icon-name="download"
            onclick="notify(event)"
          >
            Download
          </gux-tab-advanced-option>
        </span>
      </gux-tab-advanced>
      <gux-tab-advanced tab-id="1-2">
        <gux-icon icon-name="user-directory" decorative="true"></gux-icon>
        <span>Hello World 2 long long long long long</span>
      </gux-tab-advanced>
      <gux-tab-advanced gux-disabled tab-id="1-3">
      <span>Hello World 3</span>
    </gux-tab-advanced>
    </gux-tab-advanced-list>
    <gux-tab-advanced-panel tab-id="1-1">
      <span>Tab content 1</span>
    </gux-tab-advanced-panel>
    <gux-tab-advanced-panel tab-id="1-2">
      <span>Tab content 2</span>
    </gux-tab-advanced-panel>
    <gux-tab-advanced-panel tab-id="1-3">
    <span>Tab content 3</span>
    </gux-tab-advanced-panel>
  </gux-tabs-advanced>
`;

const language = 'en';

describe('gux-tabs-advanced', () => {
  beforeEach(async () => {
    (
      global as NodeJS.Global & {
        MutationObserver: any;
      }
    ).MutationObserver = MutationObserver;
  });
  describe('#render', () => {
    it(`should render as expected`, async () => {
      const page = await newSpecPage({
        components,
        html,
        language
      });
      expect(page.rootInstance).toBeInstanceOf(GuxTabsAdvanced);
      expect(page.root).toMatchSnapshot();
    });
  });
});
