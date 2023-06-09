/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/unbound-method */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */

import { Build as BUILD, ComponentInterface, getElement } from '@stencil/core';

declare type OnMutationDecorator = (
  target: ComponentInterface,
  propertyKey: string
) => void;

export function OnMutation(options: MutationObserverInit): OnMutationDecorator {
  return (proto: ComponentInterface, methodName: string) => {
    // this is to resolve the 'compiler optimization issue':
    // lifecycle events not being called when not explicitly declared in at least one of components from bundle
    (BUILD as any).connectedCallback = true;
    (BUILD as any).disconnectedCallback = true;

    const { connectedCallback, disconnectedCallback } = proto;

    const store = new Map<unknown, MutationObserver>();

    proto.connectedCallback = function () {
      const method = this[methodName];
      const observer = new MutationObserver(method.bind(this));

      registerObserver(store, this, observer, options);

      return connectedCallback && connectedCallback.call(this);
    };

    proto.disconnectedCallback = function () {
      deregisterObserver(store, this);

      return disconnectedCallback && disconnectedCallback.call(this);
    };
  };
}

function registerObserver(
  store: Map<unknown, MutationObserver>,
  key: unknown,
  observer: MutationObserver,
  options: MutationObserverInit
) {
  if (store.has(key)) {
    store.get(key).disconnect();
  }

  store.set(key, observer);

  observer.observe(getElement(key), options);
}

function deregisterObserver(
  store: Map<unknown, MutationObserver>,
  key: unknown
) {
  if (store.has(key)) {
    store.get(key).disconnect();
  }

  store.delete(key);
}
