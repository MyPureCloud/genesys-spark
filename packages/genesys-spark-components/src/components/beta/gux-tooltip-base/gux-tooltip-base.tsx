import {
  Component,
  Element,
  h,
  Host,
  Listen,
  JSX,
  Method,
  Prop,
  State,
  Watch
} from '@stencil/core';
import {
  autoUpdate,
  computePosition,
  flip,
  hide,
  offset,
  shift,
  Placement,
  ReferenceElement
} from '@floating-ui/dom';

import { randomHTMLId } from '@utils/dom/random-html-id';
import { trackComponent } from '@utils/tracking/usage';
import { afterNextRender } from '@utils/dom/after-next-render';
import { GuxTooltipAccent } from '../gux-tooltip-beta/gux-tooltip-types';
import { overflowDetection } from '@utils/dom/overflow-detection';

/**
 * @slot content - Slot for content
 */
@Component({
  styleUrl: 'gux-tooltip-base.scss',
  tag: 'gux-tooltip-base-beta',
  shadow: true
})
export class GuxTooltipBase {
  private pointerenterHandler: EventListener = () => this.show();
  private pointerleaveHandler: EventListener = () => this.hide();
  private focusinHandler: EventListener = () => this.show();
  private focusoutHandler: EventListener = () => this.hide();

  private forElementListeners: Map<string, EventListenerOrEventListenerObject> =
    new Map([
      ['pointerenter', this.pointerenterHandler],
      ['pointerleave', this.pointerleaveHandler],
      ['focusin', this.focusinHandler],
      ['focusout', this.focusoutHandler],
      ['mousemove', this.handlePointerMove.bind(this)]
    ]);

  private cleanupUpdatePosition: () => void;
  private id: string = randomHTMLId('gux-tooltip-base');
  private hideDelayTimeout: ReturnType<typeof setTimeout>;

  @Element()
  private root: HTMLElement;

  @Prop()
  tooltipId: string;

  /**
   * Indicates the element the popover should anchor to.
   */
  @Prop()
  forElement: HTMLElement;

  /**
   * Placement of the tooltip. Default is bottom-start
   */
  @Prop({ mutable: true })
  placement: Placement = 'bottom-start';

  @Prop({ mutable: true })
  offsetX: number = 0;

  @Prop({ mutable: true })
  offsetY: number = 0;

  @Prop()
  accent: GuxTooltipAccent = 'light';

  /**
   * Determines whether the text in the tooltip is read by screenreaders.
   * Use for cases where the forElement component handles the accessibility.
   */
  @Prop()
  visualOnly: boolean = false;

  @Prop()
  followMouse: boolean = false;

  /**
   * If tooltip is shown or not
   */
  @State()
  isShown: boolean = false;

  @State()
  refElement: ReferenceElement;

  @Listen('keydown', { target: 'window', passive: true })
  handleKeyDown(event: KeyboardEvent) {
    if (event.key === 'Escape' && this.isShown) {
      this.hide();
    }
  }

  @Listen('pointerenter')
  handlePointerenter() {
    this.show();
  }

  @Listen('pointerleave')
  handlePointerleave() {
    this.hide();
  }

  @Listen('mousemove')
  handlePointerMove(event: MouseEvent) {
    if (this.followMouse) {
      event.preventDefault();
      this.refElement = this.getRefElement(event.clientX, event.clientY);
      this.runUpdatePosition();
    }
  }

  /*
   * Show tooltip
   */
  @Method()
  // eslint-disable-next-line @typescript-eslint/require-await
  async showTooltip(): Promise<void> {
    this.show();
  }

  /*
   * Hide tooltip
   */
  @Method()
  // eslint-disable-next-line @typescript-eslint/require-await
  async hideTooltip(): Promise<void> {
    this.hide();
  }

  @Watch('offsetX')
  @Watch('offsetY')
  private runUpdatePosition(): void {
    const ref =
      this.followMouse && this.refElement ? this.refElement : this.forElement;
    this.cleanupUpdatePosition = autoUpdate(
      ref,
      this.root,
      () => this.updatePosition(ref),
      {
        ancestorScroll: true,
        elementResize: true,
        animationFrame: this.followMouse,
        ancestorResize: true
      }
    );
  }

  private updatePosition(ref: ReferenceElement): void {
    const middleware = [
      offset(16),
      flip(),
      shift(),
      hide(),
      overflowDetection()
    ];

    void computePosition(ref, this.root, {
      placement: this.placement,
      strategy: 'fixed',
      middleware: middleware
    }).then(({ x, y, middlewareData }) => {
      Object.assign(this.root.style, {
        left: `${x + this.offsetX}px`,
        top: `${y + this.offsetY}px`,
        visibility: middlewareData.hide?.referenceHidden ? 'hidden' : 'visible'
      });
      //data-placement needed on the for e2e tests.
      this.root.setAttribute('data-placement', this.placement);
    });
  }
  private show(): void {
    clearTimeout(this.hideDelayTimeout);
    this.isShown = true;
    afterNextRender(() => {
      this.runUpdatePosition();
    });
  }

  private hide(): void {
    this.hideDelayTimeout = setTimeout(() => {
      this.isShown = false;
      this.refElement = undefined;

      if (this.cleanupUpdatePosition) {
        this.cleanupUpdatePosition();
      }
    }, 350);
  }

  private setForElement(): void {
    if (this.forElement) {
      if (!this.visualOnly) {
        const tooltipId = this.tooltipId ? this.tooltipId : this.id;
        this.forElement.setAttribute('aria-describedby', tooltipId);
      }

      this.forElementListeners.forEach((handler, type) =>
        this.forElement.addEventListener(type, handler)
      );
    }
  }

  private disconnectForElement(): void {
    if (this.forElement) {
      this.forElement.removeAttribute('aria-describedby');

      this.forElementListeners.forEach((handler, type) =>
        this.forElement.removeEventListener(type, handler)
      );
    }
  }

  @Watch('forElement') //@ts-expect-error: unused warning because is only used by decorator
  private updateForElement(): void {
    this.disconnectForElement();
    this.setForElement();
  }

  private getRefElement(cursorX: number, cursorY: number): ReferenceElement {
    return {
      getBoundingClientRect() {
        return {
          x: cursorX,
          y: cursorY,
          top: cursorY,
          left: cursorX,
          bottom: cursorY,
          right: cursorX,
          width: 20,
          height: 20
        };
      }
    };
  }

  connectedCallback(): void {
    this.setForElement();
  }

  componentWillLoad(): void {
    trackComponent(this.root, { variant: this.placement });
  }

  disconnectedCallback(): void {
    if (this.cleanupUpdatePosition) {
      this.cleanupUpdatePosition();
    }

    this.disconnectForElement();
  }

  render(): JSX.Element {
    return (
      <Host
        id={this.tooltipId ? undefined : this.id}
        role={this.tooltipId && !this.isShown ? undefined : 'tooltip'}
        class={{ 'gux-show': this.isShown }}
        aria-hidden={this.visualOnly}
      >
        <div
          class={{
            'gux-container': true,
            [`gux-${this.accent}`]: true
          }}
          data-placement={this.placement}
        >
          <slot name="content" />
        </div>
      </Host>
    ) as JSX.Element;
  }
}
