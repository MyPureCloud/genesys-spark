import parse5 from 'parse5';
import '../styles/fonts/fonts.css';

import AttributesPanel from './panels/attributes';
import { createPreview } from './panels/preview';
import { createEditor } from './panels/editor';
import EventsPanel from './panels/events';
import { toHTML } from '../utils/to-html';

function createLayout() {
  let template = toHTML(`
    <div class="component-viewer content">
        <div class="left-column">
            <div class="preview"></div>
            <div class="editor"></div>
        </div>
        <div class="right-column">
            <div class="attributes"></div>
            <div class="events"></div>
        </div>
    </div>`);
  document.body.appendChild(template);

  const preview = template.getElementsByClassName('preview')[0];
  const attribute = template.getElementsByClassName('attributes')[0];
  const events = template.getElementsByClassName('events')[0];
  const editor = template.getElementsByClassName('editor')[0];

  return { preview, attribute, events, editor };
}

export const bootstrap = (exampleCode, callback) => {
  const el = createLayout();

  const attributesPanel = new AttributesPanel(el.attribute);
  const eventsPanel = new EventsPanel(el.events, el.preview);
  const updatePreview = createPreview(el.preview);

  const updateCode = createEditor(el.editor, newCode => {
    let ast = parse5.parseFragment(newCode);
    let html = parse5.serialize(ast);

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
    updateCode(parse5.serialize(ast));
  });

  updateCode(exampleCode);
};
