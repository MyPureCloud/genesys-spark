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
  Placement
} from '@floating-ui/dom';

import { randomHTMLId } from '@utils/dom/random-html-id';
import { trackComponent } from '@utils/tracking/usage';
import { afterNextRender } from '@utils/dom/after-next-render';
import { GuxTooltipAccent } from '../gux-tooltip-beta/gux-tooltip-types';

/**
 * @slot - Content of the tooltip
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
      ['focusout', this.focusoutHandler]
    ]);

  private cleanupUpdatePosition: () => void;
  private id: string = randomHTMLId('gux-tooltip-base');

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

  @Prop()
  accent: GuxTooltipAccent = 'light';

  /**
   * If tooltip is shown or not
   */
  @State()
  isShown: boolean = false;

  @Listen('keydown', { target: 'window', passive: true })
  handleKeyDown(event: KeyboardEvent) {
    if (event.key === 'Escape' && this.isShown) {
      this.hide();
    }
  }

  /*
   * Show tooltip
   */
  // eslint-disable-next-line @typescript-eslint/require-await
  @Method()
  async showTooltip(): Promise<void> {
    this.show();
  }

  /*
   * Hide tooltip
   */
  // eslint-disable-next-line @typescript-eslint/require-await
  @Method()
  async hideTooltip(): Promise<void> {
    this.hide();
  }

  private runUpdatePosition(): void {
    this.cleanupUpdatePosition = autoUpdate(
      this.forElement,
      this.root,
      () => this.updatePosition(),
      {
        ancestorScroll: true,
        elementResize: true,
        animationFrame: false,
        ancestorResize: true
      }
    );
  }

  private updatePosition(): void {
    const middleware = [offset(16), flip(), shift(), hide()];

    void computePosition(this.forElement, this.root, {
      placement: this.placement,
      strategy: 'fixed',
      middleware: middleware
    }).then(({ x, y, middlewareData }) => {
      Object.assign(this.root.style, {
        left: `${x}px`,
        top: `${y}px`,
        visibility: middlewareData.hide?.referenceHidden ? 'hidden' : 'visible'
      });
      //data-placement needed on the for e2e tests.
      this.root.setAttribute('data-placement', this.placement);
    });
  }
  private show(): void {
    this.isShown = true;
    afterNextRender(() => {
      this.runUpdatePosition();
    });
  }

  private hide(): void {
    if (this.cleanupUpdatePosition) {
      this.cleanupUpdatePosition();
    }
    this.isShown = false;
  }

  private setForElement(): void {
    if (this.forElement) {
      const tooltipId = this.tooltipId ? this.tooltipId : this.id;
      this.forElement.setAttribute('aria-describedby', tooltipId);

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

  @Watch('forElement') //@ts-expect-error: unused warning because is is only used by decorator
  private updateForElement(): void {
    this.disconnectForElement();
    this.setForElement();
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
        role={this.tooltipId ? undefined : 'tooltip'}
        class={{ 'gux-show': this.isShown }}
      >
        <div
          class={{
            'gux-container': true,
            [`gux-${this.accent}`]: true
          }}
          data-placement={this.placement}
        >
          <slot />
        </div>
      </Host>
    ) as JSX.Element;
  }
}
