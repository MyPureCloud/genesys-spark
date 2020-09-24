import COMPONENT_SPEC from '../../components-spec.json';
import { emptyElement } from '../../utils/empty-element';
import { toHTML } from '../../utils/to-html.js';

const MAX_NOTIFICATION = 5;

export default class EventsPanel {
  constructor(panel, targetElement, notificationPanel) {
    this.panel = panel;
    this.targetElement = targetElement;
    this.notificationPanel = notificationPanel;
    this.descriptions = toHTML(`<dl class="event-descriptions"></dl>`);

    panel.appendChild(this.descriptions);
  }

  updateFromTree(ast) {
    let descriptionsEl = (this.descriptions = emptyElement(this.descriptions));
    let notificationPanelEl = (this.notificationPanel = emptyElement(
      this.notificationPanel
    ));
    let components = this.traverseTree(ast);

    components.forEach(component => {
      let elements = this.targetElement.getElementsByTagName(component);
      let events = COMPONENT_SPEC[component].events || [];

      Object.entries(events).forEach(([name, description]) => {
        descriptionsEl.appendChild(toHTML(`<dt>${component} [${name}]</dt>`));
        descriptionsEl.appendChild(toHTML(`<dd>${description}</dd>`));

        for (let element of elements) {
          element.addEventListener(name, function (e) {
            const detail = e ? e.detail : e;
            const target = e ? e.target : '';

            let currentNotifications = notificationPanelEl.children;

            while (currentNotifications.length >= MAX_NOTIFICATION) {
              currentNotifications[0].remove();
              currentNotifications = notificationPanelEl.children;
            }
            notificationPanelEl.appendChild(
              EventsPanel.getNotificationToast(
                `${component} [${name}${
                  target.id ? ' (' + target.id + ')' : ''
                }]`,
                detail,
                target.id
              )
            );
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

  static getNotificationToast(title, detail) {
    let message;

    if (detail !== null && detail !== undefined) {
      if (typeof detail === 'object') {
        message = JSON.stringify(detail);
      } else {
        message = detail;
      }
    } else {
      message = 'No additional details';
    }

    const notification = toHTML(`
      <gux-notification-toast accent="neutral">
        <gux-icon slot="icon" icon-name="ic-alert-info" decorative></gux-icon>
        <div slot="title">${title}</div>
        <div slot="message">${message}</div>
      </gux-notification-toast>
    `);

    setTimeout(function () {
      notification.classList.add('show');
    }, 10);

    setTimeout(function () {
      notification.remove();
    }, 5000);

    return notification;
  }
}
