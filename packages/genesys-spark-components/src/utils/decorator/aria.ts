/* eslint-disable @typescript-eslint/no-explicit-any */

import { Build as BUILD, ComponentInterface } from '@stencil/core';

declare type AriaDecorator = (
  target: ComponentInterface,
  propertyKey: string
) => void;

declare type AriaOption = {
  ariaAtomic?: string;
  ariaAutoComplete?: string;
  ariaBusy?: string;
  ariaChecked?: string;
  ariaColCount?: string;
  ariaColIndex?: string;
  ariaColIndexText?: string;
  ariaColSpan?: string;
  ariaCurrent?: string;
  ariaDescription?: string;
  ariaDisabled?: string;
  ariaExpanded?: string;
  ariaHasPopup?: string;
  ariaHidden?: string;
  ariaKeyShortcuts?: string;
  ariaLabel?: string;
  ariaLevel?: string;
  ariaLive?: string;
  ariaModal?: string;
  ariaMultiLine?: string;
  ariaMultiSelectable?: string;
  ariaOrientation?: string;
  ariaPlaceholder?: string;
  ariaPosInSet?: string;
  ariaPressed?: string;
  ariaReadOnly?: string;
  ariaRelevant?: string;
  ariaRequired?: string;
  ariaRoleDescription?: string;
  ariaRowCount?: string;
  ariaRowIndex?: string;
  ariaRowIndexText?: string;
  ariaRowSpan?: string;
  ariaSelected?: string;
  ariaSetSize?: string;
  ariaSort?: string;
  ariaValueMax?: string;
  ariaValueMin?: string;
  ariaValueNow?: string;
  ariaValueText?: string;
  role: string;
};

export function Aria(options: AriaOption): AriaDecorator {
  return (proto: ComponentInterface, prop: string) => {
    // this is to resolve the 'compiler optimization issue':
    // lifecycle events not being called when not explicitly declared in at least one of components from bundle
    (BUILD as any).connectedCallback = true;

    const { connectedCallback } = proto;

    proto.connectedCallback = function () {
      const internals = this[prop].attachInternals();
      Object.assign(internals, options);

      if (connectedCallback) {
        return connectedCallback.apply(this);
      }
    };
  };
}
