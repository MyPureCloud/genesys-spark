import {
  Component,
  Element,
  h,
  JSX,
  Listen,
  Method,
  State
} from '@stencil/core';
import { logError } from '../../../utils/error/log-error';
import { OnMutation } from '../../../utils/decorator/on-mutation';

@Component({
  styleUrl: 'gux-tooltip-title.less',
  tag: 'gux-tooltip-title',
  shadow: false
})
export class GuxTooltipTitle {
  private tooltipElement: HTMLGuxTooltipElement;

  @Element()
  private root: HTMLElement;

  @State()
  private hasTooltip: boolean = false;

  @State()
  private showTooltip: boolean = false;

  @State()
  private iconOnly: boolean = false;

  @State()
  private titleName: string = '';

  @Listen('mouseenter')
  onmouseenter(event: MouseEvent) {
    if (!event.buttons) {
      this.showTooltip = true;
    }
  }

  @Listen('mouseleave')
  onmouseleave() {
    this.showTooltip = false;
  }

  @Listen('mousedown')
  onmousedown() {
    this.showTooltip = false;
  }

  @Method()
  async setShowTooltip() {
    if (this.tooltipElement) {
      this.showTooltip = true;
      await this.tooltipElement.showTooltip();
    }
  }

  @Method()
  async setHideTooltip() {
    if (this.tooltipElement) {
      this.showTooltip = false;
      await this.tooltipElement.hideTooltip();
    }
  }

  @OnMutation({ childList: true, subtree: true })
  onMutation(): void {
    this.titleName = this.setTooltipTitleText();
    this.checkForTooltipHideOrShow();
  }

  componentWillLoad() {
    this.titleName = this.setTooltipTitleText();
  }

  componentDidLoad() {
    this.logErrorNoIconSrText();
  }

  private logErrorNoIconSrText(): void {
    if (this.iconOnly && !this.titleName) {
      logError(
        'gux-tooltip-title',
        'No screenreader-text provided. Provide a localized screenreader-text property for the gux-icon. The screenreader-text property is used for the icon screenreader text and the tooltip.'
      );
    }
  }

  private addIconDecorative(element: HTMLElement): void {
    element.classList.add('gux-tooltip-icon-decorative');
  }

  private getTitleContent(): Array<Element> {
    const slot = this.root.querySelector('slot');
    const target = this.root.querySelector('.gux-title-container')?.children;
    if (slot) {
      return slot.assignedElements();
    } else if (target) {
      return Array.from(target);
    }
    return [];
  }

  private setTooltipTitleText(): string {
    let titleNameText = '';
    this.getTitleContent().map(element => {
      if (element.tagName !== 'GUX-ICON') {
        titleNameText += element.textContent;
      } else if (this.getTitleContent().length > 1) {
        this.addIconDecorative(element as HTMLElement);
      } else if (element.tagName === 'GUX-ICON') {
        this.iconOnly = true;
        titleNameText = element.getAttribute('screenreader-text');
      }
    });

    return titleNameText;
  }

  private checkForTooltipHideOrShow(): void {
    const titleContainer: HTMLSpanElement = this.root.querySelector(
      '.gux-title-container'
    );
    this.root.classList.remove('gux-overflow-hidden');
    if (this.iconOnly && this.titleName) {
      this.hasTooltip = true;
    } else if (titleContainer?.scrollWidth > titleContainer?.offsetWidth) {
      this.root.classList.add('gux-overflow-hidden');
      this.hasTooltip = true;
    } else {
      this.hasTooltip = false;
    }
  }

  render(): JSX.Element {
    return [
      <span class="gux-title-container">
        <slot />
      </span>,
      this.renderTooltip()
    ] as JSX.Element;
  }

  private renderTooltip(): JSX.Element {
    if (this.hasTooltip) {
      return (
        <gux-tooltip
          aria-hidden="true"
          ref={el => (this.tooltipElement = el)}
          hidden={!this.showTooltip}
        >
          {this.titleName}
        </gux-tooltip>
      ) as JSX.Element;
    }
  }
}
