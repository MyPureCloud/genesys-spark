import { parseFragment, serialize } from 'parse5';

import {
  registerSparkComponents,
  registerSparkChartComponents
} from 'genesys-spark';
import AttributesPanel from './panels/attributes';
import { createPreview } from './panels/preview';
import { createEditor } from './panels/editor';
import EventsPanel from './panels/events';
import { toHTML } from '../utils/to-html';
import '../styles/component-viewer.scss';
import * as SparkLinks from './components/links.json';

window.toHTML = toHTML;
window.webcomponentsDocsMain = (example = '', renderCallback = () => {}) =>
  bootstrap(example.trim(), renderCallback);

function createLayout() {
  const template = toHTML(`
    <div class="component-viewer content" role="main">
      <div class="left-column">
        <div class="preview"></div>
          <gux-toggle class="editor-toggle" checked checked-label="Code Editor Visible" unchecked-label="Code Editor Hidden"></gux-toggle>
        <div class="editor"></div>
      </div>
      <gux-disclosure-button-legacy position="right">
        <div slot="panel-content" class="controls-column">
          <gux-accordion id="accordion" heading-level="4">
            <gux-accordion-section>
              <h2 slot="header">Event Descriptions</h2>
              <div slot="content" class="events"></div>
            </gux-accordion-section>
            <gux-accordion-section>
              <h2 slot="header">Attributes</h2>
              <div slot="content" class="attributes"></div>
            </gux-accordion-section>
          </gux-accordion>
          <div id="spark-link-container" class="spark-link"></div>
        </div>
      </gux-disclosure-button-legacy>
      <div class="notification" aria-live="polite"></div>
    </div>
  `);

  document.body.appendChild(template);

  const preview = template.querySelector('.preview');
  const attribute = template.querySelector('.attributes');
  const events = template.querySelector('.events');
  const notification = template.querySelector('.notification');
  const editor = template.querySelector('.editor');
  const editorToggle = template.querySelector('.editor-toggle');

  const setupAccessibilityTool = async () => {
    const axeLive = await import('axe-live');
    const accessibilityNode = toHTML(`
      <gux-accordion-section>
        <h2 slot="header">Accessibility</h2>
        <div slot="content">
          <gux-button accent="primary" id="axe-trigger">Run accessibility tests</gux-button>
        </div>
      </gux-accordion-section>
    `);

    const controlsColumn = document.querySelector('#accordion');
    if (controlsColumn) {
      controlsColumn.appendChild(accessibilityNode);
    }
    const axeTriggerButton = template.querySelector('#axe-trigger');

    axeTriggerButton.addEventListener('click', () => {
      setTimeout(async () => {
        axeLive.run({ target: preview });
      }, 100);
    });
    console.log('axe-live setup completed');
  };

  if (
    process.env.NODE_ENV === 'development' ||
    window.location.href.indexOf('feature') > -1
  ) {
    console.log('Setting up axe-live tool');
    setupAccessibilityTool();
  }

  return {
    preview,
    attribute,
    events,
    notification,
    editor,
    editorToggle
  };
}

export async function bootstrap(exampleCode, callback) {
  await Promise.all([
    registerSparkComponents(),
    registerSparkChartComponents()
  ]);

  const { preview, attribute, events, notification, editor, editorToggle } =
    createLayout();

  editorToggle.addEventListener('check', active => {
    if (active.detail) {
      editor.classList.remove('editor-hidden');
    } else {
      editor.classList.add('editor-hidden');
    }
  });

  // Code Setter
  const attributesPanel = new AttributesPanel(attribute);
  const eventsPanel = new EventsPanel(events, preview, notification);
  const updatePreview = createPreview(preview);

  // Spark documentation link
  const sparkLinkElement = document.getElementById('spark-link-container');
  const url = window.location.href.split('/');
  const component = url[url.length - 1].replace('.html', '');
  const sparkLink = SparkLinks[component];
  //Using url params to set the mode so it can also change in supernova
  const urlParams = new URLSearchParams(window.location.search);
  const modeParam = urlParams.get('flare-mode') ?? 'light';
  document.documentElement.setAttribute('flare-mode', modeParam);

  let sparkLinkAnchor;
  if (sparkLink && sparkLink !== '') {
    sparkLinkAnchor = toHTML(
      `<a href="${sparkLink}" target="_blank" aria-disabled="false">Link to the Spark design system documentation</a>`
    );
  } else {
    sparkLinkAnchor = toHTML(`
        <span class="spark-link-disabled">No Spark Documentation available at this time</span>
      `);
  }
  sparkLinkElement.appendChild(sparkLinkAnchor);

  const updateCode = createEditor(editor, newCode => {
    const ast = parseFragment(newCode);
    const html = serialize(ast);
    updatePreview(html);
    attributesPanel.updateFromTree(ast);
    eventsPanel.updateFromTree(ast);

    try {
      callback();
    } catch (e) {
      console.error('error in render callback: ', e);
    }
  });

  attributesPanel.onChange(ast => {
    updateCode(serialize(ast));
  });

  updateCode(exampleCode);
}
