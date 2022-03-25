import { Component, Element, h, JSX, Prop, State, Watch } from '@stencil/core';
import { logError } from '../../../utils/error/log-error';
import { OnMutation } from '../../../utils/decorator/on-mutation';

@Component({
  styleUrl: 'gux-tooltip-title.less',
  tag: 'gux-tooltip-title',
  shadow: false
})
export class GuxTooltipTitle {
  @Element()
  private root: HTMLElement;

  @Prop()
  tabWidth: number;

  @State()
  private showTooltip: boolean = true;

  @State()
  private titleName: string = '';

  @Watch('titleName')
  updateTooltipHideOrShow() {
    this.checkForTooltipHideOrShow();
  }

  @OnMutation({ childList: true, subtree: true })
  onMutation(): void {
    this.titleName = this.setTooltipText();
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
      } else {
        this.addIconDecorative(element as HTMLElement);
      }
    });

    return titleNameText;
  }

  private checkForTooltipHideOrShow(): void {
    const clientWidth = this.root.clientWidth;
    if (this.hasIconSrText()) {
      this.showTooltip = true;
    } else if (this.tabWidth && clientWidth < this.tabWidth) {
      this.showTooltip = false;
    } else {
      this.showTooltip = true;
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
    if (this.showTooltip) {
      return (<gux-tooltip>{this.titleName}</gux-tooltip>) as JSX.Element;
    }
  }
}
