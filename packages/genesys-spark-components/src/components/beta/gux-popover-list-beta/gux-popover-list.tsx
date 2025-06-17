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
  shift,
  hide
} from '@floating-ui/dom';
import { afterNextRenderTimeout } from '@utils/dom/after-next-render';

import { OnClickOutside } from '@utils/decorator/on-click-outside';
import { trackComponent } from '@utils/tracking/usage';
import { findElementById } from '@utils/dom/find-element-by-id';

/**
 * @slot - popover content
 */

@Component({
  styleUrl: 'gux-popover-list.scss',
  tag: 'gux-popover-list-beta',
  shadow: true
})
export class GuxPopoverList {
  private popupElement: HTMLDivElement;
  private arrowElement: HTMLDivElement;
  private cleanupUpdatePosition: ReturnType<typeof autoUpdate>;

  @Element()
  private root: HTMLElement;
  private forElement: HTMLElement;

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

  private listElement: HTMLGuxListElement;

  @Listen('keydown')
  onKeyDown(event: KeyboardEvent): void {
    switch (event.key) {
      case 'Tab':
        this.dismiss();
        break;
      case 'Escape':
        this.dismiss();
        this.forElement.focus();
        break;
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

  private runUpdatePosition(): void {
    if (this.cleanupUpdatePosition) {
      this.cleanupUpdatePosition();
    }

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
    // This is 13 because this makes the arrow look aligned
    const arrowLen = 13;

    if (this.popupElement) {
      void computePosition(forElement, this.popupElement, {
        strategy: 'fixed',
        placement: this.position,
        middleware: [
          offset(2),
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

        // TODO: COMUI-3210 - Arrow currently does not show
        if (middlewareData.arrow) {
          const { x, y } = middlewareData.arrow;
          this.popupElement.setAttribute('data-placement', placement);
          Object.assign(this.arrowElement.style, {
            left: x != null ? `${x}px` : '',
            top: y != null ? `${y}px` : '',
            right: '',
            bottom: '',
            [staticSide]: `${-arrowLen / 2}px`,
            transform: 'rotate(45deg)'
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

  private focusFirstItemInPopupList(): void {
    afterNextRenderTimeout(() => {
      void this.listElement.guxFocusFirstItem();
    });
  }

  disconnect: () => void = undefined;

  onKeydown(event: KeyboardEvent): void {
    switch (event.key) {
      case 'Enter':
      case ' ':
        this.popupElement.togglePopover();
        this.isOpen = !this.isOpen;
        this.runUpdatePosition();
        this.focusFirstItemInPopupList();
        break;
    }
  }

  onMouseup(): void {
    this.popupElement.togglePopover();
    this.isOpen = !this.isOpen;
    this.runUpdatePosition();
  }
  connectedCallback(): void {
    trackComponent(this.root, { variant: this.position });
    this.listElement = this.root.querySelector('gux-list');
    this.forElement = findElementById(this.root, this.for);
    this.forElement.setAttribute('aria-haspopup', 'true');

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

  render(): JSX.Element {
    return (
      <div
        ref={(el: HTMLDivElement) => (this.popupElement = el)}
        class={{
          'gux-hidden': !this.isOpen,
          'gux-popover-wrapper': true
        }}
        data-placement
        popover="manual"
      >
        <div
          ref={(el: HTMLDivElement) => (this.arrowElement = el)}
          class="gux-arrow"
        ></div>
        {this.displayDismissButton && (
          <gux-dismiss-button
            onClick={this.dismiss.bind(this)}
          ></gux-dismiss-button>
        )}
        <div class="gux-popover-content">
          <slot />
        </div>
      </div>
    ) as JSX.Element;
  }
}
