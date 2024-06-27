import {
  Component,
  Element,
  Event,
  EventEmitter,
  h,
  JSX,
  Listen,
  Prop
} from '@stencil/core';
import {
  autoUpdate,
  computePosition,
  arrow,
  flip,
  offset,
  Placement,
  shift
} from '@floating-ui/dom';

import { OnClickOutside } from '@utils/decorator/on-click-outside';
import { trackComponent } from '@utils/tracking/usage';
import { getSlot } from '@utils/dom/get-slot';
import { findElementById } from '@utils/dom/find-element-by-id';

/**
 * @slot - popover content
 * @slot title - Slot for popover title
 */

@Component({
  styleUrl: 'gux-popover.scss',
  tag: 'gux-popover',
  shadow: true
})
export class GuxPopover {
  private popupElement: HTMLDivElement;
  private arrowElement: HTMLDivElement;
  private cleanupUpdatePosition: ReturnType<typeof autoUpdate>;

  @Element()
  private root: HTMLElement;

  /**
   * Indicates the id of the element the popover should anchor to
   */
  @Prop()
  for: string;

  /**
   * Indicate position of popover element arrow (follow floating ui placement attribute api)
   */
  @Prop()
  position: Placement = 'bottom';

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
   * Controls hiding and showing the popover
   */
  @Prop({ mutable: true })
  isOpen: boolean = false;

  /**
   * Fired when a user dismisses the popover
   */
  @Event()
  guxdismiss: EventEmitter<void>;

  @Listen('keydown')
  onKeyDown(event: KeyboardEvent): void {
    switch (event.key) {
      case 'Escape':
        this.dismiss();
        break;
    }
  }

  @Listen('focusout')
  onFocusout(event: FocusEvent): void {
    if (!this.closeOnClickOutside && this.displayDismissButton) {
      return;
    }

    const focusIsOutsidePopover = !this.root.contains(
      event.relatedTarget as Node
    );
    if (focusIsOutsidePopover) {
      this.dismiss();
    }
  }

  @OnClickOutside({ triggerEvents: 'mousedown' })
  checkForClickOutside(event: MouseEvent) {
    const clickPath = event.composedPath();
    const forElement = findElementById(this.root, this.for);
    const clickedForElement = clickPath.includes(forElement);

    if (
      (this.closeOnClickOutside || !this.displayDismissButton) &&
      this.isOpen &&
      !clickedForElement
    ) {
      this.dismiss();
    }
  }

  get titleSlot(): HTMLSlotElement | null {
    return getSlot(this.root, 'title');
  }

  private runUpdatePosition(): void {
    if (this.root.isConnected) {
      this.cleanupUpdatePosition = autoUpdate(
        findElementById(this.root, this.for),
        this.popupElement,
        () => this.updatePosition(),
        {
          ancestorScroll: true,
          elementResize: true,
          animationFrame: true,
          ancestorResize: true
        }
      );
    } else {
      this.disconnectedCallback();
    }
  }

  private updatePosition(): void {
    const forElement = findElementById(this.root, this.for);

    if (this.popupElement && forElement) {
      void computePosition(forElement, this.popupElement, {
        placement: this.position,
        middleware: [
          offset(7),
          flip(),
          shift(),
          arrow({
            element: this.arrowElement,
            padding: 16
          })
        ]
      }).then(({ x, y, middlewareData, placement }) => {
        Object.assign(this.popupElement.style, {
          left: `${x}px`,
          top: `${y}px`
        });

        const side = placement.split('-')[0];

        const staticSide = {
          top: 'bottom',
          right: 'left',
          bottom: 'top',
          left: 'right'
        }[side];

        const arrowRotation = {
          top: 0,
          right: 90,
          bottom: 180,
          left: -90
        }[side];

        // This is 13 because this makes the arrow look aligned when horizontal
        // or 15 if vertical due to extra padding needed to show the shadow.
        const arrowLen = side === 'left' || side === 'right' ? 15 : 13;

        if (middlewareData.arrow) {
          let x = middlewareData.arrow.x;
          const y = middlewareData.arrow.y;

          if (side === 'left' || side === 'right') {
            x = x + 4;
          }

          this.popupElement.setAttribute('data-placement', placement);

          Object.assign(this.arrowElement.style, {
            left: x != null ? `${x}px` : '',
            top: y != null ? `${y}px` : '',
            right: '',
            bottom: '',
            [staticSide]: `${-arrowLen}px`,
            transform: `rotate(${arrowRotation}deg)`
          });
        }
      });
    }
  }

  private dismiss(): void {
    const dismissEvent = this.guxdismiss.emit();
    if (!dismissEvent.defaultPrevented) {
      this.isOpen = false;
    }
  }

  connectedCallback(): void {
    trackComponent(this.root, { variant: this.position });
  }

  componentDidLoad(): void {
    if (this.isOpen) {
      this.runUpdatePosition();
    }
  }

  componentDidUpdate(): void {
    if (this.isOpen) {
      this.runUpdatePosition();
    } else if (this.cleanupUpdatePosition) {
      this.cleanupUpdatePosition();
    }
  }

  disconnectedCallback(): void {
    if (this.cleanupUpdatePosition) {
      this.cleanupUpdatePosition();
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
        class={{
          'gux-hidden': !this.isOpen,
          'gux-popover-wrapper': true
        }}
        role="dialog"
        aria-describedby="gux-popover-content"
        data-placement
      >
        <div
          ref={(el: HTMLDivElement) => (this.arrowElement = el)}
          class="gux-arrow"
        >
          <div class="gux-arrow-caret"></div>
        </div>
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
