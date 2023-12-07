import {
  Component,
  Element,
  Event,
  EventEmitter,
  h,
  JSX,
  Listen,
  Prop,
  Watch
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
import { afterNextRender } from '@utils/dom/after-next-render';
import { findElementById } from '@utils/dom/find-element-by-id';

/**
 * @slot - popover content
 */

@Component({
  styleUrl: 'gux-popover-list.scss',
  tag: 'gux-popover-list',
  shadow: {
    delegatesFocus: true
  }
})
export class GuxPopoverList {
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

  /**
   * Fired when the popover is open
   */
  @Event()
  guxopen: EventEmitter<void>;

  /**
   * Fired when the popover is close
   */
  @Event()
  guxclose: EventEmitter<void>;

  @Watch('isOpen')
  onIsOpenChange(isOpen: boolean): void {
    if (isOpen) {
      this.guxopen.emit();

      afterNextRender(() => {
        this.root.focus();
      });
    } else {
      this.guxclose.emit();
    }
  }

  @Listen('keydown')
  onKeyDown(event: KeyboardEvent): void {
    switch (event.key) {
      case 'Escape':
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
    // This is 13 because this makes the arrow look aligned
    const arrowLen = 13;

    if (this.popupElement) {
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

  render(): JSX.Element {
    return (
      <div
        ref={(el: HTMLDivElement) => (this.popupElement = el)}
        class={{
          'gux-hidden': !this.isOpen,
          'gux-popover-wrapper': true
        }}
        data-placement
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
