import { newSpecPage } from '@stencil/core/testing';
import MutationObserver from 'mutation-observer';

import { GuxTabsAdvancedLegacy } from '../gux-tabs-advanced';
import { GuxTabAdvancedLegacy } from '../gux-tab-advanced/gux-tab-advanced';
import { GuxTabAdvancedListLegacy } from '../gux-tab-advanced-list/gux-tab-advanced-list';
import { GuxTabAdvancedPanelLegacy } from '../gux-tab-advanced-panel/gux-tab-advanced-panel';

const components = [
  GuxTabsAdvancedLegacy,
  GuxTabAdvancedLegacy,
  GuxTabAdvancedListLegacy,
  GuxTabAdvancedPanelLegacy
];
const html = `
  <gux-tabs-advanced-legacy lang="en" id="interactive">
    <gux-tab-advanced-list-legacy slot="tab-list" show-new-tab-button="true">
      <gux-tab-advanced-legacy tab-id="1-1">
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
      </gux-tab-advanced-legacy>
      <gux-tab-advanced-legacy tab-id="1-2">
        <gux-icon icon-name="user-directory" decorative="true"></gux-icon>
        Hello World 2 long long long long long
      </gux-tab-advanced-legacy>
      <gux-tab-advanced-legacy gux-disabled tab-id="1-3">
      Hello World 3
    </gux-tab-advanced-legacy>
    <div slot="add-tab">
      <gux-icon icon-name="file-preview" decorative></gux-icon>
      Add View
    </div>
    </gux-tab-advanced-list-legacy>
    <gux-tab-advanced-panel-legacy tab-id="1-1">
      <span>Tab content 1</span>
    </gux-tab-advanced-panel-legacy>
    <gux-tab-advanced-panel-legacy tab-id="1-2">
      <span>Tab content 2</span>
    </gux-tab-advanced-panel-legacy>
    <gux-tab-advanced-panel-legacy tab-id="1-3">
    <span>Tab content 3</span>
    </gux-tab-advanced-panel-legacy>
  </gux-tabs-advanced-legacy>
`;

const language = 'en';

describe('gux-tabs-advanced-legacy', () => {
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
      expect(page.rootInstance).toBeInstanceOf(GuxTabsAdvancedLegacy);
      expect(page.root).toMatchSnapshot();
    });
  });
});
