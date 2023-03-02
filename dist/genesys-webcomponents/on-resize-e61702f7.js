import { f as Build, g as getElement } from './index-f583fcde.js';

/* eslint-disable @typescript-eslint/no-unsafe-argument */
function OnResize() {
  return (proto, methodName) => {
    // this is to resolve the 'compiler optimization issue':
    // lifecycle events not being called when not explicitly declared in at least one of components from bundle
    Build.connectedCallback = true;
    Build.disconnectedCallback = true;
    const { connectedCallback, disconnectedCallback } = proto;
    let onMutationObserver;
    proto.connectedCallback = function () {
      const host = getElement(this);
      const method = this[methodName];
      onMutationObserver = new ResizeObserver(method.bind(this));
      onMutationObserver.observe(host);
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

export { OnResize as O };
