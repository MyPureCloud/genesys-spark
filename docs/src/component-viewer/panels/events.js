import COMPONENT_SPEC from '../../gux-components-spec.json';
import { emptyElement } from '../../utils/empty-element';
import { toHTML } from '../../utils/to-html.js';

export default class EventsPanel {
  constructor(panel, targetElement) {
    this.panel = panel;
    this.targetElement = targetElement;

    panel.appendChild(toHTML(`<div class="title">Event Descriptions</div>`));
    this.descriptions = toHTML(`<div class="event-descriptions"></div>`);
    panel.appendChild(this.descriptions);

    panel.appendChild(toHTML(`<div class="title">Triggered Events</div>`));
    this.triggered = toHTML(`<div class="triggered-events"></div>`);
    panel.appendChild(this.triggered);
  }

  updateFromTree(ast) {
    let descriptionsEl = (this.descriptions = emptyElement(this.descriptions));
    let triggeredEl = (this.triggered = emptyElement(this.triggered));
    let components = this.traverseTree(ast);

    components.forEach(component => {
      let elements = this.targetElement.getElementsByTagName(component);
      let events = COMPONENT_SPEC[component].events || [];

      Object.entries(events).forEach(([name, description]) => {
        descriptionsEl.appendChild(
          toHTML(`
                <div>
                    <span>${component}</span>
                    <span>[${name}]</span>
                    - <span>${description}</span>
                </div>`)
        );

        for (let element of elements) {
          element.addEventListener(name, function(e) {
            let detail = e ? e.detail : e;
            let target = e ? e.target : '';
            if (detail !== null && detail !== undefined) {
              triggeredEl.appendChild(
                toHTML(`
                        <div>
                            <span>${component}</span>
                            <span>[${name}]</span>
                            - <span>${detail}</span>
                        </div>`)
              );
            } else {
              triggeredEl.appendChild(
                toHTML(`
                        <div>
                            <span>${component}</span>
                            <span>[${name}]</span>
                        </div>`)
              );
            }
          });
        }
      });
    });
  }

  traverseTree(root) {
    let current;
    let components = new Set();
    let queue = [root];

    while (queue.length > 0) {
      [current, ...queue] = queue;

      if (current.childNodes && current.childNodes.length > 0) {
        queue = [...queue, ...current.childNodes];
      }

      if (COMPONENT_SPEC[current.nodeName]) {
        components.add(current.nodeName);
      }
    }

    return components;
  }
}
