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
    this.titleName = this.setTooltipText();
    this.checkForTooltipHideOrShow();
  }

  componentWillLoad() {
    this.titleName = this.setTooltipText();
  }

  componentDidLoad() {
    this.logErrorNoIconSrText();
  }

  private isIconOnlyTitle(): boolean {
    return !!(
      this.root.querySelector('gux-icon') &&
      this.root.querySelector('.gux-title-container')?.children.length === 1
    );
  }

  private hasIconSrText(): boolean {
    return !!(
      this.isIconOnlyTitle() &&
      this.root.querySelector('gux-icon')?.hasAttribute('screenreader-text')
    );
  }

  private getIconOnlyTooltipText(): string {
    if (this.isIconOnlyTitle()) {
      return this.root
        .querySelector('gux-icon')
        .getAttribute('screenreader-text');
    }
  }

  private logErrorNoIconSrText(): void {
    if (this.isIconOnlyTitle() && !this.hasIconSrText()) {
      logError(
        'gux-tooltip-title',
        'No screenreader-text provided. Provide a localized screenreader-text property for the gux-icon. The screenreader-text property is used for the icon screenreader text and the tooltip.'
      );
    }
  }

  private addIconDecorative(element: HTMLElement): void {
    element.classList.add('gux-tooltip-icon-decorative');
  }

  private setTooltipText(): string {
    if (this.isIconOnlyTitle()) {
      return this.getIconOnlyTooltipText();
    } else {
      return this.setTooltipTitleText();
    }
  }

  private setTooltipTitleText(): string {
    const children = Array.from(this.root.children);
    let titleNameText = '';
    children.map(element => {
      if (element.tagName !== 'GUX-ICON' && element.tagName !== 'GUX-TOOLTIP') {
        titleNameText += element.textContent;
      } else if (children.length > 1) {
        this.addIconDecorative(element as HTMLElement);
      }
    });

    return titleNameText;
  }

  private checkForTooltipHideOrShow(): void {
    const titleContainer: HTMLSpanElement = this.root.querySelector(
      '.gux-title-container'
    );
    this.root.classList.remove('gux-overflow-hidden');
    if (this.hasIconSrText()) {
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
