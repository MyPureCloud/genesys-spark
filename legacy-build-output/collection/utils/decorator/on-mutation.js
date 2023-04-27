/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/unbound-method */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import { Build as BUILD, getElement } from '@stencil/core';
export function OnMutation(opt) {
  return (proto, methodName) => {
    // this is to resolve the 'compiler optimization issue':
    // lifecycle events not being called when not explicitly declared in at least one of components from bundle
    BUILD.connectedCallback = true;
    BUILD.disconnectedCallback = true;
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
