import { newSpecPage } from '@test/specTestUtils';

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
      <gux-tab-advanced tab-id="1-1">
        <gux-icon icon-name="lock" decorative="true"></gux-icon>
        Hello World
        <gux-list slot="dropdown-options">
          <gux-list-item>
            <gux-icon icon-name="edit" decorative="true"></gux-icon>
            Edit
          </gux-list-item>
          <gux-list-item>
            <gux-icon icon-name="clone" decorative="true"></gux-icon>
            Clone
          </gux-list-item>
          <gux-list-item>
            <gux-icon icon-name="share" decorative="true"></gux-icon>
            Share
          </gux-list-item>
          <gux-list-item>
            <gux-icon icon-name="download" decorative="true"></gux-icon>
            Download
          </gux-list-item>
        </gux-list>
      </gux-tab-advanced>
      <gux-tab-advanced tab-id="1-2">
        <gux-icon icon-name="user-directory" decorative="true"></gux-icon>
        Hello World 2 long long long long long
      </gux-tab-advanced>
      <gux-tab-advanced gux-disabled tab-id="1-3">
      Hello World 3
    </gux-tab-advanced>
    <div slot="add-tab">
      <gux-icon icon-name="file-preview" decorative></gux-icon>
      Add View
    </div>
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
