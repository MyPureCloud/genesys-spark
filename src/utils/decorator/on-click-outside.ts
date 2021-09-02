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

    proto.componentDidLoad = function () {
      const host = getElement(this);
      const method = this[methodName];
      registerOnClickOutside(this, host, method, opt);
      return connectedCallback && connectedCallback.call(this);
    };

    proto.componentDidUnload = function () {
      const host = getElement(this);
      const method = this[methodName];
      removeOnClickOutside(this, host, method, opt);
      return disconnectedCallback && disconnectedCallback.call(this);
    };
  };
}

export function registerOnClickOutside(
  component: ComponentInterface,
  element: HTMLElement,
  callback: OnClickOutsideCallback,
  opt: OnClickOutsideOptions = OnClickOutsideOptionsDefaults
): void {
  const excludedNodes = getExcludedNodes(opt);
  getTriggerEvents(opt).forEach(triggerEvent => {
    window.addEventListener(
      triggerEvent,
      (e: Event) => {
        initOnClickOutside(e, component, element, callback, excludedNodes);
      },
      false
    );
  });
}

export function removeOnClickOutside(
  component: ComponentInterface,
  element: HTMLElement,
  callback: OnClickOutsideCallback,
  opt: OnClickOutsideOptions = OnClickOutsideOptionsDefaults
): void {
  getTriggerEvents(opt).forEach(triggerEvent => {
    window.removeEventListener(
      triggerEvent,
      (e: Event) => {
        initOnClickOutside(e, component, element, callback);
      },
      false
    );
  });
}

function initOnClickOutside(
  event: Event,
  component: ComponentInterface,
  element: HTMLElement,
  callback: OnClickOutsideCallback,
  excludedNodes?: HTMLElement[]
) {
  const target = event.target as HTMLElement;
  if (!element.contains(target) && !isExcluded(target, excludedNodes)) {
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
  target: HTMLElement,
  excudedNodes?: HTMLElement[]
): boolean {
  if (target && excudedNodes) {
    for (const excludedNode of excudedNodes) {
      if (excludedNode.contains(target)) {
        return true;
      }
    }
  }

  return false;
}
