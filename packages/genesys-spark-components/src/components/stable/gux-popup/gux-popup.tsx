import {
  Component,
  h,
  JSX,
  Prop,
  Watch,
  Event,
  EventEmitter
} from '@stencil/core';

import {
  autoUpdate,
  computePosition,
  flip,
  MiddlewareArguments,
  offset,
  size,
  shift,
  hide
} from '@floating-ui/dom';

/**
 * @slot target - Required slot for target
 * @slot popup - Required slot for popup
 */
@Component({
  styleUrl: 'gux-popup.scss',
  tag: 'gux-popup',
  shadow: true
})
export class GuxPopup {
  private targetElementContainer: HTMLElement;
  private popupElementContainer: HTMLElement;
  private cleanupUpdatePosition: ReturnType<typeof autoUpdate>;

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

  private runUpdatePosition(): void {
    this.cleanupUpdatePosition = autoUpdate(
      this.targetElementContainer,
      this.popupElementContainer,
      () => this.updatePosition(),
      {
        ancestorScroll: true,
        elementResize: true,
        animationFrame: true,
        ancestorResize: true
      }
    );
  }

  private updatePosition(): void {
    if (this.targetElementContainer && this.popupElementContainer) {
      const popupElementContainer = this.popupElementContainer;
      const targetElementContainer = this.targetElementContainer;
      void computePosition(
        this.targetElementContainer,
        this.popupElementContainer,
        {
          strategy: 'fixed',
          placement: 'bottom-start',
          middleware: [
            offset(2),
            flip(),
            size({
              apply({ rects }: MiddlewareArguments) {
                Object.assign(popupElementContainer.style, {
                  minWidth: `${rects.reference.width}px`
                });
                Object.assign(targetElementContainer.style, {
                  width: `${rects.reference.width}px`
                });
              }
            }),
            shift(),
            hide()
          ]
        }
      ).then(({ x, y, middlewareData }) => {
        const { referenceHidden } = middlewareData.hide;

        Object.assign(this.popupElementContainer.style, {
          left: `${x}px`,
          top: `${y}px`
        });
        referenceHidden
          ? this.popupElementContainer.classList.add('gux-sr-only-clip')
          : this.popupElementContainer.classList.remove('gux-sr-only-clip');
      });
    }
  }

  @Watch('expanded')
  onExpandedChange(expanded: boolean) {
    if (expanded) {
      this.internalexpanded.emit();
    } else {
      this.internalcollapsed.emit();
    }
  }

  componentDidLoad(): void {
    if (this.expanded) {
      this.runUpdatePosition();
    }
  }

  componentDidUpdate(): void {
    if (this.expanded) {
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
        class={{
          'gux-target-container': true,
          'gux-disabled': this.disabled
        }}
        ref={(el: HTMLElement) => (this.targetElementContainer = el)}
      >
        <slot name="target"></slot>
        <div
          part="gux-popup-container"
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
