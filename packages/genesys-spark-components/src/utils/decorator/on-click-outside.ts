/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/unbound-method */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */

import { Build as BUILD, ComponentInterface, getElement } from '@stencil/core';

declare type OnClickOutsideDecorator = (
  target: ComponentInterface,
  propertyKey: string
) => void;

declare type OnClickOutsideCallback = (event: MouseEvent) => void;

declare interface OnClickOutsideOptions {
  triggerEvents?: string;
  exclude?: string;
}

const OnClickOutsideOptionsDefaults: OnClickOutsideOptions = {
  triggerEvents: 'click',
  exclude: ''
};

export function OnClickOutside(
  opt: OnClickOutsideOptions = OnClickOutsideOptionsDefaults
): OnClickOutsideDecorator {
  return (proto: ComponentInterface, methodName: string) => {
    // this is to resolve the 'compiler optimization issue':
    // lifecycle events not being called when not explicitly declared in at least one of components from bundle
    (BUILD as any).connectedCallback = true;
    (BUILD as any).disconnectedCallback = true;

    const { connectedCallback, disconnectedCallback } = proto;

    const store = new Map<ComponentInterface, EventListener>();

    proto.connectedCallback = function () {
      const host = getElement(this);
      const method = this[methodName];

      registerOnClickOutside(store, this, host, method, opt);

      return connectedCallback && connectedCallback.call(this);
    };

    proto.disconnectedCallback = function () {
      removeOnClickOutside(store, this, opt);

      return disconnectedCallback && disconnectedCallback.call(this);
    };
  };
}

export function registerOnClickOutside(
  store: Map<ComponentInterface, EventListener>,
  component: ComponentInterface,
  element: HTMLElement,
  callback: OnClickOutsideCallback,
  opt: OnClickOutsideOptions = OnClickOutsideOptionsDefaults
): void {
  const excludedNodes = getExcludedNodes(opt);
  const listener = (e: Event) => {
    initOnClickOutside(e, component, element, callback, excludedNodes);
  };

  store.set(component, listener);

  getTriggerEvents(opt).forEach(triggerEvent => {
    window.addEventListener(triggerEvent, listener, false);
  });
}

export function removeOnClickOutside(
  store: Map<ComponentInterface, EventListener>,
  component: ComponentInterface,
  opt: OnClickOutsideOptions = OnClickOutsideOptionsDefaults
): void {
  const listener = store.get(component);

  store.delete(component);

  getTriggerEvents(opt).forEach(triggerEvent => {
    window.removeEventListener(triggerEvent, listener, false);
  });
}

function initOnClickOutside(
  event: Event,
  component: ComponentInterface,
  element: HTMLElement,
  callback: OnClickOutsideCallback,
  excludedNodes?: HTMLElement[]
) {
  const composedPath = event.composedPath();

  if (
    !composedPath.includes(element) &&
    !isExcluded(composedPath, excludedNodes) &&
    element.isConnected
  ) {
    callback.call(component, event);
  }
}

function getTriggerEvents(opt: OnClickOutsideOptions): string[] {
  if (opt.triggerEvents) {
    return opt.triggerEvents.split(',').map(e => e.trim());
  }
  return ['click'];
}

function getExcludedNodes(opt: OnClickOutsideOptions): HTMLElement[] {
  if (opt.exclude) {
    try {
      return Array.from(document.querySelectorAll(opt.exclude));
    } catch (err) {
      console.warn(
        `@OnClickOutside: Exclude: '${opt.exclude}' will not be evaluated. Check your exclude selector syntax.`,
        err
      );
    }
  }
  return;
}

function isExcluded(
  composedPath: EventTarget[],
  excudedNodes?: HTMLElement[]
): boolean {
  if (composedPath && excudedNodes) {
    return excudedNodes.some(excudedNode => composedPath.includes(excudedNode));
  }

  return false;
}
