import {
  Component,
  Element,
  Event,
  EventEmitter,
  h,
  JSX,
  Listen,
  Prop,
  Watch,
  State
} from '@stencil/core';
import {
  autoUpdate,
  computePosition,
  arrow,
  flip,
  offset,
  Placement,
  shift,
  hide
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
  tag: 'gux-popover-beta',
  shadow: true
})
export class GuxPopover {
  private popupElement: HTMLElement;
  private arrowElement: HTMLDivElement;
  private cleanupUpdatePosition: ReturnType<typeof autoUpdate>;

  @Element()
  private root: HTMLElement;

  /**
   * Indicates the id of the element the popover should anchor to
   */
  @Prop()
  for!: string;

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

  @State()
  private forElement: HTMLInputElement;

  @Watch('for')
  private updateForElement(): void {
    this.forElement = this.getForElement();
    this.forElement.setAttribute('aria-haspopup', 'true');
  }

  @Listen('keydown')
  onKeyDown(event: KeyboardEvent): void {
    switch (event.key) {
      case 'Escape':
        this.forElement.focus();
        break;
    }
  }

  @Listen('focusout')
  onFocusout(event: FocusEvent): void {
    if (!this.closeOnClickOutside && this.displayDismissButton) {
      return;
    }

    const focusIsOutsidePopover =
      event.relatedTarget && !this.root.contains(event.relatedTarget as Node);

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

  get titleSlot(): Element | null {
    return getSlot(this.root, 'title');
  }

  private getForElement(): HTMLInputElement {
    if (this.for) {
      const forElement = findElementById(
        this.root,
        this.for
      ) as HTMLInputElement;
      if (!forElement) {
        this.logForAttributeError();
      }

      return forElement;
    } else {
      this.logForAttributeError();
    }
  }

  private focusPopup(): void {
    const autofocusElement: HTMLElement =
      this.root.querySelector('[autoFocus]');
    if (autofocusElement) {
      autofocusElement?.focus();
    } else {
      this.popupElement.focus();
    }
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
          hide(),
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

          // TODO: COMUI-3210 - Arrow currently does not show
          Object.assign(this.arrowElement.style, {
            left: x != null ? `${x}px` : '',
            top: y != null ? `${y}px` : '',
            right: '',
            bottom: '',
            [staticSide]: `${-arrowLen}px`,
            transform: `rotate(${arrowRotation}deg)`
          });
        }

        if (middlewareData.hide) {
          Object.assign(this.popupElement.style, {
            visibility: middlewareData.hide.referenceHidden
              ? 'hidden'
              : 'visible'
          });
        }
      });
    }
  }

  private dismiss(): void {
    const dismissEvent = this.guxdismiss.emit();
    if (!dismissEvent.defaultPrevented) {
      this.isOpen = false;
      this.popupElement.togglePopover();
    }
  }

  private logForAttributeError(): void {
    if (this.root.isConnected) {
      console.error(
        `gux-popover: invalid element supplied to 'for': "${this.for}"`
      );
    }
  }

  disconnect: () => void = undefined;

  onKeydown(event: KeyboardEvent): void {
    switch (event.key) {
      case 'Enter':
      case ' ':
        event.preventDefault();
        this.popupElement.togglePopover();
        this.isOpen = !this.isOpen;
        this.runUpdatePosition();
        this.focusPopup();
        break;
    }
  }

  onMouseup(): void {
    this.popupElement.togglePopover();
    this.isOpen = !this.isOpen;
    this.runUpdatePosition();
  }

  connectedCallback(): void {
    this.updateForElement();
    trackComponent(this.root, { variant: this.position });
    const keydownHandler = this.onKeydown.bind(this);
    this.forElement.addEventListener('keydown', keydownHandler);
    const mouseupHandler = this.onMouseup.bind(this);
    this.forElement.addEventListener('mouseup', mouseupHandler);

    this.disconnect = () => {
      this.forElement.removeEventListener('keydown', keydownHandler);
      this.forElement.removeEventListener('mouseup', mouseupHandler);
    };
  }

  componentDidLoad(): void {
    if (!this.forElement) {
      return;
    }

    this.forElement.popoverTargetElement = this.popupElement;

    if (this.isOpen) {
      this.popupElement.togglePopover();
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
    this.disconnect();
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
          'gux-popover-wrapper': true,
          'gux-hidden': !this.isOpen
        }}
        data-placement
        popover="manual"
        tabindex="-1"
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
