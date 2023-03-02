import {
  Component,
  h,
  JSX,
  Prop,
  Watch,
  Event,
  EventEmitter
} from '@stencil/core';

import { createPopper, Instance } from '@popperjs/core';

/**
 * @slot target - Required slot for target
 * @slot popup - Required slot for popup
 */
@Component({
  styleUrl: 'gux-popup.less',
  tag: 'gux-popup',
  shadow: true
})
export class GuxPopup {
  private popperInstance: Instance;
  private targetElementContainer: HTMLElement;
  private popupElementContainer: HTMLElement;

  @Prop()
  expanded: boolean = false;

  @Prop()
  disabled: boolean = false;

  /**
   * This event will run when the popup transitions to an expanded state.
   */
  @Event()
  internalexpanded: EventEmitter<void>;

  /**
   * This event will run when the popup transitions to a collapsed state.
   */
  @Event()
  internalcollapsed: EventEmitter<void>;

  @Watch('expanded')
  onExpandedChange(expanded: boolean) {
    if (expanded) {
      this.popperInstance.forceUpdate();
      this.internalexpanded.emit();
    } else {
      this.internalcollapsed.emit();
    }
  }

  connectedCallback(): void {
    if (this.targetElementContainer && this.popupElementContainer) {
      this.setPopperInstance();
    }
  }

  componentDidLoad(): void {
    this.setPopperInstance();
  }

  disconnectedCallback(): void {
    this.popperInstance?.destroy();
  }

  private setPopperInstance(): void {
    this.popperInstance = createPopper(
      this.targetElementContainer,
      this.popupElementContainer,
      {
        strategy: 'fixed',
        modifiers: [
          {
            name: 'flip',
            options: {
              boundary: []
            }
          },
          {
            name: 'offset',
            options: {
              offset: [0, 2]
            }
          },
          {
            name: 'sameWidth',
            enabled: true,
            phase: 'beforeWrite',
            requires: ['computeStyles'],
            // eslint-disable-next-line @typescript-eslint/typedef
            fn({ state }) {
              state.styles.popper.width = `${state.rects.reference.width}px`;
            },
            // eslint-disable-next-line @typescript-eslint/typedef
            effect({ state }) {
              state.elements.popper.style.width = `${
                state.elements.reference.getBoundingClientRect().width
              }px`;
            }
          }
        ],
        placement: 'bottom-start'
      }
    );
  }

  render(): JSX.Element {
    return (
      <div
        class={{
          'gux-target-container': true,
          'gux-disabled': this.disabled
        }}
        ref={(el: HTMLElement) => (this.targetElementContainer = el)}
      >
        <slot name="target"></slot>
        <div
          class={{
            'gux-popup-container': true,
            'gux-expanded': this.expanded && !this.disabled
          }}
          ref={(el: HTMLElement) => (this.popupElementContainer = el)}
        >
          <slot name="popup"></slot>
        </div>
      </div>
    ) as JSX.Element;
  }
}
