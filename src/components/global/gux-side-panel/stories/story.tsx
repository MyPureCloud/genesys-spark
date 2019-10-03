import { select } from '@storybook/addon-knobs/polymer';
import { storiesOf } from '@storybook/polymer';
import { html, render } from 'lit-html';
import { withReadme } from 'storybook-readme';

import README from '../readme.md';

storiesOf('Basic Components', module).add(
  'Side Panel',
  withReadme(README, () => {
    const el = document.createElement('div');
    el.style.height = 'calc(100vh - 16px)';
    render(
      html`
        <gux-side-panel position="left">
          <div slot="side-panel-icons">
            <gux-side-panel-button
              id="settings-button"
              icon="genesys-icon-settings-gear"
              alt-text="settings gear"
            >
            </gux-side-panel-button>
            <gux-side-panel-button
              id="filter-button"
              icon="genesys-icon-filter"
              alt-text="filter"
            >
            </gux-side-panel-button>
            <gux-side-panel-button
              id="graph-button"
              icon="genesys-icon-24-graph-bar"
              alt-text="graph bar"
            >
            </gux-side-panel-button>
          </div>

          <div slot="side-panel-content"></div>
        </gux-side-panel>
      `,
      el
    );

    setTimeout(() => {
      const sidePanel = document.querySelector('gux-side-panel');
      document
        .getElementById('settings-button')
        .addEventListener('click', () => {
          const buttonId = 'settings-button';
          toggleSidePanelContentForButton(buttonId);
          selectButtonIfOpen(buttonId);
          document.querySelector(
            'div[slot="side-panel-content"]'
          ).innerHTML = getPanelContentForSelectedButton(buttonId);
        });
      document.getElementById('filter-button').addEventListener('click', () => {
        const buttonId = 'filter-button';
        toggleSidePanelContentForButton(buttonId);
        selectButtonIfOpen(buttonId);
        document.querySelector(
          'div[slot="side-panel-content"]'
        ).innerHTML = getPanelContentForSelectedButton(buttonId);
      });
      document.getElementById('graph-button').addEventListener('click', () => {
        const buttonId = 'graph-button';
        toggleSidePanelContentForButton(buttonId);
        selectButtonIfOpen(buttonId);
        document.querySelector(
          'div[slot="side-panel-content"]'
        ).innerHTML = getPanelContentForSelectedButton(buttonId);
      });

      function selectButtonIfOpen(id) {
        document.querySelectorAll('gux-side-panel-button').forEach(buttonEl => {
          const shouldBeSelected = buttonEl.id === id && sidePanel.isOpen;
          buttonEl.isSelected = shouldBeSelected;
        });
      }

      function getSelectedbuttonId() {
        let selectedButtonEl = null;
        document.querySelectorAll('gux-side-panel-button').forEach(buttonEl => {
          if (buttonEl.isSelected) {
            selectedButtonEl = buttonEl.id;
          }
        });
        return selectedButtonEl;
      }

      function toggleSidePanelContentForButton(buttonId) {
        const previouslySelectedButtonId = getSelectedbuttonId();

        if (previouslySelectedButtonId !== buttonId) {
          sidePanel.isOpen = true;
        } else {
          sidePanel.isOpen = false;
        }
      }

      function getPanelContentForSelectedButton(buttonId) {
        return `<gux-panel-frame style="height:100%;">
              <div slot="header">
                <div style="display: flex; justify-content: flex-end; align-items: center">
                  <h2 id="content-title" style="margin-right: auto">Content header</h2>
                </div>
              </div>
              <div slot="body">
                <div style="display: flex; flex-direction: column">
                  <span>This is the content for ${buttonId}</span>
                </div>
              </div>
              <div slot="footer">
                <div style="display: flex; justify-content: space-between">
                  <gux-button>Close</gux-button>
                  <gux-button accent="primary">Accept</gux-button>
                </div>
              </div>
            </gux-panel-frame>`;
      }
    }, 100);

    document.getElementsByTagName('html')[0].className =
      'gux-' + select('theme', ['dark', 'default'], 'default') + '-theme';
    return el;
  })
);
