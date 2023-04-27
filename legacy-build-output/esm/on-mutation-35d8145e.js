import { g as getElement } from './index-816e34d8.js';

/* eslint-disable @typescript-eslint/no-unsafe-argument */
function OnMutation(opt) {
  return (proto, methodName) => {
    const { connectedCallback, disconnectedCallback } = proto;
    let onMutationObserver;
    proto.connectedCallback = function () {
      const host = getElement(this);
      const method = this[methodName];
      onMutationObserver = new MutationObserver(method.bind(this));
      onMutationObserver.observe(host, opt);
      return connectedCallback && connectedCallback.call(this);
    };
    proto.disconnectedCallback = function () {
      if (onMutationObserver) {
        onMutationObserver.disconnect();
      }
      return disconnectedCallback && disconnectedCallback.call(this);
    };
  };
}

export { OnMutation as O };
