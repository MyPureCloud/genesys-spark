import { newSpecPage, SpecPage } from '@stencil/core/testing';
import MutationObserver from 'mutation-observer';

import { GuxTabsBeta } from '../gux-tabs-beta';
import { GuxTabBeta } from '../gux-tab-beta/gux-tab-beta';
import { GuxTabListBeta } from '../gux-tab-list-beta/gux-tab-list-beta';
import { GuxTabPanelBeta } from '../gux-tab-panel-beta/gux-tab-panel-beta';

const components = [GuxTabsBeta, GuxTabBeta, GuxTabListBeta, GuxTabPanelBeta];
const language = 'en';

describe('gux-tabs-beta', () => {
  let page: SpecPage;

  beforeEach(async () => {
    (
      global as NodeJS.Global & {
        MutationObserver: any;
      }
    ).MutationObserver = MutationObserver;
    page = await newSpecPage({
      components,
      html: `
      <gux-tabs-beta class="example">
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
    </gux-tabs-beta>
      `,
      language
    });
  });

  it('should build', async () => {
    expect(page.rootInstance).toBeInstanceOf(GuxTabsBeta);
  });

  it('should render', async () => {
    expect(page.root).toMatchSnapshot();
  });
});
