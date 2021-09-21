import { newSpecPage } from '@stencil/core/testing';
import MutationObserver from 'mutation-observer';

import { GuxTabsBeta } from '../gux-tabs-beta';
import { GuxTabBeta } from '../gux-tab-beta/gux-tab-beta';
import { GuxTabListBeta } from '../gux-tab-list-beta/gux-tab-list-beta';
import { GuxTabPanelBeta } from '../gux-tab-panel-beta/gux-tab-panel-beta';

const components = [GuxTabsBeta, GuxTabBeta, GuxTabListBeta, GuxTabPanelBeta];
const tablistHtml = `
    <gux-tab-list-beta slot="tab-list">
      <gux-tab-beta tab-id="2-1"><span>Tab Header 1</span></gux-tab-beta>
      <gux-tab-beta tab-id="2-2"><span>Tab Header 2</span></gux-tab-beta>
      <gux-tab-beta tab-id="2-3"><span>Tab Header 3</span></gux-tab-beta>
      <gux-tab-beta gux-disabled tab-id="2-4"
        ><span>Tab Header 4</span></gux-tab-beta
      >
      <gux-tab-beta gux-disabled tab-id="2-5"
        ><span>Tab Header 5</span></gux-tab-beta
      >
    </gux-tab-list-beta>
    <gux-tab-panel-beta tab-id="2-1">Tab content 1</gux-tab-panel-beta>
    <gux-tab-panel-beta tab-id="2-2">Tab content 2</gux-tab-panel-beta>
    <gux-tab-panel-beta tab-id="2-3">Tab content 3</gux-tab-panel-beta>
    <gux-tab-panel-beta tab-id="2-4">Tab content 4</gux-tab-panel-beta>
    <gux-tab-panel-beta tab-id="2-5">Tab content 5</gux-tab-panel-beta>
`;
const tabsBetaHtml = `
  <gux-tabs-beta class="example">
    ${tablistHtml}
  </gux-tabs-beta> 
`;
const language = 'en';

describe('gux-tabs-beta', () => {
  beforeEach(async () => {
    (
      global as NodeJS.Global & {
        MutationObserver: any;
      }
    ).MutationObserver = MutationObserver;
  });
  describe('#render', () => {
    it(`should render as expected`, async () => {
      const html = tabsBetaHtml;
      const page = await newSpecPage({
        components,
        html,
        language
      });
      expect(page.rootInstance).toBeInstanceOf(GuxTabsBeta);
      expect(page.root).toMatchSnapshot();
    });
    it(`should render vertical tabs as expected`, async () => {
      const html = `
        <gux-tabs-beta orientation='vertical'>
          ${tablistHtml}
        </gux-tabs-beta>
      `;
      const page = await newSpecPage({
        components,
        html,
        language
      });
      expect(page.root).toMatchSnapshot();
    });
  });
});
