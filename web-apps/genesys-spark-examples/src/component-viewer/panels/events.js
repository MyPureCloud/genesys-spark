import { getComponentSpec } from '../../component-specs.js';
import { emptyElement } from '../../utils/empty-element';
import { toHTML } from '../../utils/to-html.js';

const MAX_NOTIFICATION = 5;

export default class EventsPanel {
  constructor(panel, targetElement, notificationPanel) {
    this.panel = panel;
    this.targetElement = targetElement;
    this.notificationPanel = notificationPanel;
    this.descriptions = toHTML(`<dl class="event-descriptions"></dl>`);

    window.notify = this.notifyEvent.bind(this);

    panel.appendChild(this.descriptions);
  }

  updateFromTree(ast) {
    const descriptionsEl = (this.descriptions = emptyElement(
      this.descriptions
    ));
    this.notificationPanel = emptyElement(this.notificationPanel);
    const components = this.traverseTree(ast);

    components.forEach(component => {
      const elements = this.targetElement.getElementsByTagName(component);
      const componentSpec = getComponentSpec(component);
      const events = componentSpec.events || [];

      Object.entries(events).forEach(([name, description]) => {
        descriptionsEl.appendChild(toHTML(`<dt>${component} [${name}]</dt>`));
        descriptionsEl.appendChild(toHTML(`<dd>${description}</dd>`));

        if (!name.startsWith('internal')) {
          for (const element of elements) {
            element.addEventListener(name, this.notifyEvent.bind(this));
          }
        }
      });
    });
  }

  notifyEvent(e, text) {
    const notificationPanelEl = this.notificationPanel;
    const detail = e ? e.detail : e;
    const target = e ? e.currentTarget : '';

    let currentNotifications = notificationPanelEl.children;

    while (currentNotifications.length >= MAX_NOTIFICATION) {
      currentNotifications[0].remove();
      currentNotifications = notificationPanelEl.children;
    }

    notificationPanelEl.appendChild(
      EventsPanel.getNotificationToast(
        e.type,
        text || detail,
        `${target.tagName.toLowerCase()}${target.id ? '#' + target.id : ''}`
      )
    );
  }

  traverseTree(root) {
    let current;
    const components = new Set();
    let queue = [root];

    while (queue.length > 0) {
      [current, ...queue] = queue;

      if (current.childNodes && current.childNodes.length > 0) {
        queue = [...queue, ...current.childNodes];
      }

      if (getComponentSpec(current.nodeName)) {
        components.add(current.nodeName);
      }
    }

    return components;
  }

  static getNotificationToast(title, detail, targetId) {
    let data;

    if (detail !== null && detail !== undefined) {
      if (typeof detail === 'object') {
        data = JSON.stringify(detail);
      } else {
        data = detail;
      }
    }

    const notification = toHTML(`
      <gux-toast toast-type="info" aria-live="polite">
        <div slot="title">${title}</div>
        <dl slot="message">
          <span class="gux-body-sm-bold">target: </span>
          <span>${targetId}</span>
          <span class="gux-body-sm-bold" ${data ? '' : 'hidden'}>, detail:</span>
          <span ${data ? '' : 'hidden'}>${data}</span>
        </dl>
      </gux-toast>
    `);

    setTimeout(function () {
      notification.classList.add('hide');
    }, 5000);

    setTimeout(function () {
      notification.remove();
    }, 5500);

    return notification;
  }
}
