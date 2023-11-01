import {
  Component,
  Element,
  h,
  Host,
  Listen,
  JSX,
  Method,
  Prop,
  State
} from '@stencil/core';
import {
  autoUpdate,
  computePosition,
  flip,
  hide,
  offset,
  shift,
  Placement,
  arrow
} from '@floating-ui/dom';

import { randomHTMLId } from '@utils/dom/random-html-id';
import { trackComponent } from '@utils/tracking/usage';
import { findElementById } from '@utils/dom/find-element-by-id';
import { afterNextRender } from '@utils/dom/after-next-render';
import { GuxTooltipAccent } from './gux-tooltip-types';

/**
 * @slot - Content of the tooltip
 */
@Component({
  styleUrl: 'gux-tooltip.scss',
  tag: 'gux-tooltip',
  shadow: true
})
export class GuxTooltip {
  private forElement: HTMLElement;
  private arrowElement: HTMLDivElement;

  private pointerenterHandler: () => void = () => this.show();
  private pointerleaveHandler: () => void = () => this.hide();
  private focusinHandler: () => void = () => this.show();
  private focusoutHandler: () => void = () => this.hide();
  private id: string = randomHTMLId('gux-tooltip');
  private cleanupUpdatePosition: () => void;

  @Element()
  private root: HTMLElement;

  /**
   * Indicates the id of the element the popover should anchor to. (If not supplied the parent element is used)
   */
  @Prop()
  for: string;

  /**
   * Placement of the tooltip. Default is bottom-start
   */
  @Prop({ mutable: true })
  placement: Placement = 'bottom-start';

  @Prop()
  accent: GuxTooltipAccent = 'light';

  @Prop()
  anchor: boolean = false;

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

    if (this.anchor) {
      middleware.push(arrow({ element: this.arrowElement }));
    }

    void computePosition(this.forElement, this.root, {
      placement: this.placement,
      strategy: 'fixed',
      middleware: middleware
    }).then(({ x, y, middlewareData, placement }) => {
      Object.assign(this.root.style, {
        left: `${x}px`,
        top: `${y}px`,
        visibility: middlewareData.hide?.referenceHidden ? 'hidden' : 'visible'
      });
      //data-placement needed on the for e2e tests.
      this.root.setAttribute('data-placement', this.placement);

      const side = placement.split('-')[0];

      const staticSide = {
        top: 'bottom',
        right: 'left',
        bottom: 'top',
        left: 'right'
      }[side];

      if (middlewareData.arrow) {
        //This is 13 because this makes the arrow look aligned.
        const arrowLen = 13;
        const { x, y } = middlewareData.arrow;

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

  private getForElement(): void {
    if (this.for) {
      this.forElement = findElementById(this.root, this.for);
    } else {
      this.forElement = this.root.parentElement;
    }
  }

  private logForAttributeError(): void {
    if (this.root.isConnected) {
      console.error(
        `gux-tooltip: invalid element supplied to 'for': "${this.for}"`
      );
    }
  }

  private renderAnchor(): JSX.Element {
    if (this.anchor) {
      return (
        <div
          ref={(el: HTMLDivElement) => (this.arrowElement = el)}
          class="gux-arrow"
        ></div>
      ) as JSX.Element;
    }
  }

  connectedCallback(): void {
    this.getForElement();

    if (this.forElement) {
      this.forElement.setAttribute('aria-describedby', this.id);

      this.forElement.addEventListener(
        'pointerenter',
        this.pointerenterHandler
      );
      this.forElement.addEventListener(
        'pointerleave',
        this.pointerleaveHandler
      );
      this.forElement.addEventListener('focusin', this.focusinHandler);
      this.forElement.addEventListener('focusout', this.focusoutHandler);
    } else {
      this.logForAttributeError();
    }
  }

  componentWillLoad(): void {
    trackComponent(this.root, { variant: this.placement });
  }

  disconnectedCallback(): void {
    if (this.cleanupUpdatePosition) {
      this.cleanupUpdatePosition();
    }
    this.forElement?.removeAttribute('aria-describedby');
    this.forElement?.removeEventListener(
      'pointerenter',
      this.pointerenterHandler
    );
    this.forElement?.removeEventListener(
      'pointerleave',
      this.pointerleaveHandler
    );
    this.forElement?.removeEventListener('focusin', this.focusinHandler);
    this.forElement?.removeEventListener('focusout', this.focusoutHandler);
  }

  render(): JSX.Element {
    return (
      <Host id={this.id} class={{ 'gux-show': this.isShown }} role="tooltip">
        <div
          class={{
            'gux-container': true,
            [`gux-${this.accent}`]: true
          }}
          data-placement={this.placement}
        >
          <slot />
          {this.renderAnchor()}
        </div>
      </Host>
    ) as JSX.Element;
  }
}
