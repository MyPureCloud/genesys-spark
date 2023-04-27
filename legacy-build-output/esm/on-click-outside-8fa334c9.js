import { g as getElement } from './index-816e34d8.js';

/* eslint-disable @typescript-eslint/no-unsafe-return */
const OnClickOutsideOptionsDefaults = {
  triggerEvents: 'click',
  exclude: ''
};
function OnClickOutside(opt = OnClickOutsideOptionsDefaults) {
  return (proto, methodName) => {
    // eslint-disable-next-line
    const { connectedCallback, disconnectedCallback } = proto;
    proto.connectedCallback = function () {
      const host = getElement(this);
      const method = this[methodName];
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      registerOnClickOutside(this, host, method, opt);
      return connectedCallback && connectedCallback.call(this);
    };
    proto.disconnectedCallback = function () {
      const host = getElement(this);
      const method = this[methodName];
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      removeOnClickOutside(this, host, method, opt);
      return disconnectedCallback && disconnectedCallback.call(this);
    };
  };
}
function registerOnClickOutside(component, element, callback, opt = OnClickOutsideOptionsDefaults) {
  const excludedNodes = getExcludedNodes(opt);
  getTriggerEvents(opt).forEach(triggerEvent => {
    window.addEventListener(triggerEvent, (e) => {
      initOnClickOutside(e, component, element, callback, excludedNodes);
    }, false);
  });
}
function removeOnClickOutside(component, element, callback, opt = OnClickOutsideOptionsDefaults) {
  getTriggerEvents(opt).forEach(triggerEvent => {
    window.removeEventListener(triggerEvent, (e) => {
      initOnClickOutside(e, component, element, callback);
    }, false);
  });
}
function initOnClickOutside(event, component, element, callback, excludedNodes) {
  const composedPath = event.composedPath();
  if (!composedPath.includes(element) &&
    !isExcluded(composedPath, excludedNodes) &&
    element.isConnected) {
    callback.call(component, event);
  }
}
function getTriggerEvents(opt) {
  if (opt.triggerEvents) {
    return opt.triggerEvents.split(',').map(e => e.trim());
  }
  return ['click'];
}
function getExcludedNodes(opt) {
  if (opt.exclude) {
    try {
      return Array.from(document.querySelectorAll(opt.exclude));
    }
    catch (err) {
      console.warn(`@OnClickOutside: Exclude: '${opt.exclude}' will not be evaluated. Check your exclude selector syntax.`, err);
    }
  }
  return;
}
function isExcluded(composedPath, excudedNodes) {
  if (composedPath && excudedNodes) {
    return excudedNodes.some(excudedNode => composedPath.includes(excudedNode));
  }
  return false;
}

export { OnClickOutside as O };
