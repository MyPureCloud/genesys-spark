import { Component, Element, h, JSX, State, Listen } from '@stencil/core';
import { trackComponent } from '@utils/tracking/usage';
import { buildI18nForComponent, GetI18nValue } from '../../../i18n';
import translationResources from './i18n/en.json';
import { CopyToClipboardContentType } from './copy-to-clipboard-content-type';

/**
 * @slot content - Slot for content
 */

@Component({
  styleUrl: 'gux-copy-to-clipboard.less',
  tag: 'gux-copy-to-clipboard-beta',
  shadow: true
})
export class GuxCopyToClipboard {
  private i18n: GetI18nValue;

  @Element()
  private root: HTMLElement;

  @State()
  tooltipContent: CopyToClipboardContentType = 'clickToCopy';

  @Listen('mouseleave')
  onMouseleave() {
    this.resetTooltip();
  }

  @Listen('focusout')
  onFocusout() {
    this.resetTooltip();
  }

  @Listen('focus')
  onFocus() {
    // when element is focused by keyboard
    this.tooltipContent = 'enterToCopy';
  }

  private resetTooltip() {
    this.tooltipContent = 'clickToCopy';
  }

  private onCopyToClipboard() {
    const copyText = this.root.innerText;

    navigator.clipboard
      .writeText(copyText)
      .then(() => {
        this.tooltipContent = 'copySuccess';
      })
      .catch(() => {
        this.tooltipContent = 'copyFailure';
      });
  }

  private getIconName(): string {
    switch (this.tooltipContent) {
      case 'copyFailure':
        return 'badge-x';
      case 'copySuccess':
        return 'badge-check';
    }
  }

  private renderTooltipIcon(): JSX.Element {
    const iconName = this.getIconName();
    if (iconName)
      return (
        <gux-icon icon-name={iconName} decorative></gux-icon>
      ) as JSX.Element;
  }

  private renderTooltip(): JSX.Element {
    return (
      <gux-tooltip placement="bottom-end">
        <div class="gux-tooltip-markup">
          {this.renderTooltipIcon()}
          <span class="tooltip-text">{this.i18n(this.tooltipContent)}</span>
        </div>
      </gux-tooltip>
    ) as JSX.Element;
  }

  async componentWillLoad(): Promise<void> {
    trackComponent(this.root);
    this.i18n = await buildI18nForComponent(this.root, translationResources);
  }

  render(): JSX.Element {
    return (
      <button
        onClick={this.onCopyToClipboard.bind(this)}
        class="gux-copy-to-clipboard-wrapper"
        title={this.i18n('copyToClipboard')}
      >
        <div class="gux-copy-content">
          <slot name="content" />
          <gux-icon icon-name="copy" decorative></gux-icon>
        </div>
        {this.renderTooltip()}
      </button>
    ) as JSX.Element;
  }
}
