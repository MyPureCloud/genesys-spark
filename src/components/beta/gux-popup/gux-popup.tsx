import { Component, h, JSX, Prop, Watch } from '@stencil/core';

import { createPopper, Instance } from '@popperjs/core';

/**
 * @slot target - Required slot for target
 * @slot popup - Required slot for popup
 */
@Component({
  styleUrl: 'gux-popup.less',
  tag: 'gux-popup-beta'
})
export class GuxPopup {
  private popperInstance: Instance;
  private targetElementContainer: HTMLElement;
  private popupElementContainer: HTMLElement;

  @Prop()
  expanded: boolean = false;

  @Prop()
  disabled: boolean = false;

  @Watch('expanded')
  onExpandedChange(expanded: boolean) {
    if (expanded) {
      this.popperInstance.forceUpdate();
    }
  }

  componentDidLoad(): void {
    this.popperInstance = createPopper(
      this.targetElementContainer,
      this.popupElementContainer,
      {
        modifiers: [
          {
            name: 'offset',
            options: {
              offset: [-1, 2]
            }
          },
          {
            name: 'sameWidth',
            enabled: true,
            phase: 'beforeWrite',
            requires: ['computeStyles'],
            fn({ state }) {
              state.styles.popper.width = `${state.rects.reference.width}px`;
            },
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

  disconnectedCallback(): void {
    this.popperInstance.destroy();
  }

  render(): JSX.Element {
    return [
      <div
        class={{
          'gux-target-container': true,
          'gux-disabled': this.disabled
        }}
        ref={(el: HTMLElement) => (this.targetElementContainer = el)}
      >
        <slot name="target"></slot>
      </div>,
      <div
        class={{
          'gux-popup-container': true,
          'gux-expanded': this.expanded && !this.disabled
        }}
        ref={(el: HTMLElement) => (this.popupElementContainer = el)}
      >
        <slot name="popup"></slot>
      </div>
    ];
  }
}
