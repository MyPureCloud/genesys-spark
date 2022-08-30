import { createPopper, Instance } from '@popperjs/core';
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

import { randomHTMLId } from '../../../utils/dom/random-html-id';
import { trackComponent } from '../../../usage-tracking';
import { GuxTooltipPlacements } from './gux-tooltip.types';

/**
 * @slot - Content of the tooltip
 */
@Component({
  styleUrl: 'gux-tooltip.less',
  tag: 'gux-tooltip',
  shadow: true
})
export class GuxTooltip {
  private forElement: HTMLElement;
  private pointerenterHandler: () => void = () => this.show();
  private pointerleaveHandler: () => void = () => this.hide();
  private focusinHandler: () => void = () => this.show();
  private focusoutHandler: () => void = () => this.hide();
  private popperInstance: Instance;
  private id: string = randomHTMLId('gux-tooltip');

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
  placement: GuxTooltipPlacements = 'bottom-start';

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

  private show(): void {
    this.popperInstance.forceUpdate();
    this.isShown = true;
  }

  private hide(): void {
    this.isShown = false;
  }

  private getForElement(): void {
    if (this.for) {
      this.forElement = document.getElementById(this.for);
    } else {
      this.forElement = this.root.parentElement;
    }
  }

  private logForAttributeError(): void {
    console.error(
      `gux-tooltip: invalid element supplied to 'for': "${this.for}"`
    );
  }

  connectedCallback(): void {
    this.getForElement();

    if (this.forElement) {
      this.forElement.setAttribute('aria-describedby', this.id);

      this.popperInstance = createPopper(this.forElement, this.root, {
        modifiers: [
          {
            name: 'offset',
            options: {
              offset: [0, 16]
            }
          }
        ],
        placement: this.placement,
        strategy: 'fixed'
      });

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
    trackComponent(this.root);
  }

  disconnectedCallback(): void {
    this.forElement.removeAttribute('aria-describedby');

    if (this.popperInstance) {
      this.popperInstance.destroy();
      this.popperInstance = null;
    }

    this.forElement.removeEventListener(
      'pointerenter',
      this.pointerenterHandler
    );
    this.forElement.removeEventListener(
      'pointerleave',
      this.pointerleaveHandler
    );
    this.forElement.removeEventListener('focusin', this.focusinHandler);
    this.forElement.removeEventListener('focusout', this.focusoutHandler);
  }

  render(): JSX.Element {
    return (
      <Host id={this.id} class={{ 'gux-show': this.isShown }} role="tooltip">
        <slot />
      </Host>
    ) as JSX.Element;
  }
}
