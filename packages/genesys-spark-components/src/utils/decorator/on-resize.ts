/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/unbound-method */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */

import { Build as BUILD, ComponentInterface, getElement } from '@stencil/core';

declare type OnResizeDecorator = (
  target: ComponentInterface,
  propertyKey: string
) => void;

export function OnResize(): OnResizeDecorator {
  return (proto: ComponentInterface, methodName: string) => {
    // this is to resolve the 'compiler optimization issue':
    // lifecycle events not being called when not explicitly declared in at least one of components from bundle
    (BUILD as any).connectedCallback = true;
    (BUILD as any).disconnectedCallback = true;

    const { connectedCallback, disconnectedCallback } = proto;

    const store = new Map<ComponentInterface, ResizeObserver>();

    proto.connectedCallback = function () {
      const method = this[methodName];
      const observer = new ResizeObserver(method.bind(this));

      registerObserver(store, this, observer);

      return connectedCallback && connectedCallback.call(this);
    };

    proto.disconnectedCallback = function () {
      deregisterObserver(store, this);

      return disconnectedCallback && disconnectedCallback.call(this);
    };
  };
}

function registerObserver(
  store: Map<ComponentInterface, ResizeObserver>,
  key: ComponentInterface,
  observer: ResizeObserver
) {
  if (store.has(key)) {
    store.get(key).disconnect();
  }

  store.set(key, observer);

  const element = getElement(key);

  if (element instanceof Element) {
    observer.observe(element);
  }
}

function deregisterObserver(
  store: Map<ComponentInterface, ResizeObserver>,
  key: ComponentInterface
) {
  if (store.has(key)) {
    store.get(key).disconnect();
  }

  store.delete(key);
}
