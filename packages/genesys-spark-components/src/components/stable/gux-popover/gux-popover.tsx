import { createPopper, Instance } from '@popperjs/core';
import {
  Component,
  Element,
  Event,
  EventEmitter,
  h,
  JSX,
  Prop,
  State,
  Watch
} from '@stencil/core';

import { OnClickOutside } from '../../../utils/decorator/on-click-outside';
import { onHiddenChange } from '../../../utils/dom/on-attribute-change';
import { trackComponent } from '@utils/tracking/usage';

import { PopperPosition } from './gux-popover.types';
import { getSlot } from '@utils/dom/get-slot';
import { findElementById } from '@utils/dom/find-element-by-id';

/**
 * @slot - popover content
 * @slot title - Slot for popover title
 */

@Component({
  styleUrl: 'gux-popover.less',
  tag: 'gux-popover',
  shadow: true
})
export class GuxPopover {
  private popperInstance: Instance;
  private hiddenObserver: MutationObserver;
  private popupElement: HTMLDivElement;

  @Element()
  private root: HTMLElement;

  /**
   * Indicates the id of the element the popover should anchor to
   */
  @Prop()
  for: string;

  /**
   * Indicate position of popover element arrow (follow popper js position attribute api)
   */
  @Prop()
  position: PopperPosition = 'bottom';

  /**
   * Indicate if the dismiss button is displayed
   */
  @Prop()
  displayDismissButton: boolean;

  /**
   * Close popover when the user clicks outside of its bounds
   */
  @Prop()
  closeOnClickOutside: boolean = false;

  /**
   * Fired when a user dismisses the popover
   */
  @Event()
  guxdismiss: EventEmitter<void>;

  @State()
  hidden: boolean = true;

  @Watch('hidden')
  hiddenHandler(hidden: boolean) {
    if (!hidden && !this.popperInstance) {
      this.runPopper();
    } else if (!hidden && this.popperInstance) {
      this.popperInstance.forceUpdate();
    }
  }

  @OnClickOutside({ triggerEvents: 'mousedown' })
  checkForClickOutside(event: MouseEvent) {
    const clickPath = event.composedPath();
    const forElement = findElementById(this.root, this.for);
    const clickedForElement = clickPath.includes(forElement);

    if (
      (this.closeOnClickOutside || !this.displayDismissButton) &&
      !this.hidden &&
      !clickedForElement
    ) {
      this.dismiss();
    }
  }

  get titleSlot(): HTMLSlotElement | null {
    return getSlot(this.root, 'title');
  }

  private runPopper(): void {
    const forElement = findElementById(this.root, this.for);

    if (!forElement) {
      console.error(
        `gux-popover: invalid "for" attribute. No element in page with the id "${this.for}"`
      );
    } else if (this.popupElement) {
      this.popperInstance = createPopper(forElement, this.popupElement, {
        modifiers: [
          {
            name: 'computeStyles',
            options: {
              gpuAcceleration: false
            }
          },
          {
            name: 'offset',
            options: {
              offset: [0, 7]
            }
          },
          {
            name: 'arrow',
            options: {
              padding: 16
            }
          }
        ],
        placement: this.position
      });
    }
  }

  private destroyPopper(): void {
    if (this.popperInstance) {
      this.popperInstance.destroy();
      this.popperInstance = null;
    }
  }

  private dismiss(): void {
    const dismissEvent = this.guxdismiss.emit();
    if (!dismissEvent.defaultPrevented) {
      this.root.setAttribute('hidden', '');
    }
  }

  connectedCallback(): void {
    trackComponent(this.root, { variant: this.position });

    this.hiddenObserver = onHiddenChange(this.root, (hidden: boolean) => {
      this.hidden = hidden;
    });

    this.hidden = this.root.hidden;
  }

  componentDidLoad(): void {
    this.runPopper();
  }

  disconnectedCallback(): void {
    this.destroyPopper();
    if (this.hiddenObserver) {
      this.hiddenObserver.disconnect();
    }
  }

  private renderDismissButton(): JSX.Element {
    if (this.displayDismissButton) {
      return (
        <gux-dismiss-button
          onClick={this.dismiss.bind(this)}
          position="inherit"
        ></gux-dismiss-button>
      ) as JSX.Element;
    }
  }

  render(): JSX.Element {
    return (
      <div
        ref={(el: HTMLDivElement) => (this.popupElement = el)}
        class="gux-popover-wrapper"
      >
        <div class="gux-arrow" data-popper-arrow />
        <div class={{ 'gux-popover-header': Boolean(this.titleSlot) }}>
          <slot name="title"></slot>
          {this.renderDismissButton()}
        </div>
        <div class="gux-popover-content">
          <slot />
        </div>
      </div>
    ) as JSX.Element;
  }
}
