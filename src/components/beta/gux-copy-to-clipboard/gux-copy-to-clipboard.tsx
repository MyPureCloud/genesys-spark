import { Component, Element, h, JSX, State, Listen } from '@stencil/core';
import { trackComponent } from '../../../usage-tracking';
import { buildI18nForComponent, GetI18nValue } from '../../../i18n';
import translationResources from './i18n/en.json';

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
  tooltipContent: string = 'offerClick';

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
    this.tooltipContent = 'offerEnter';
  }

  private resetTooltip() {
    this.tooltipContent = 'offerClick';
  }

  private onCopyToClipboard() {
    const copyText = this.root.innerText;

    navigator.clipboard
      .writeText(copyText)
      .then(() => {
        this.tooltipContent = 'success';
      })
      .catch(() => {
        this.tooltipContent = 'error';
      });
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
        aria-label={this.i18n('copyToClipboard')}
      >
        <div class="gux-copy-content">
          <slot name="content" />
          <gux-icon icon-name="copy" decorative></gux-icon>
        </div>
        <gux-tooltip placement="bottom-end">
          {/* Icon */}
          {this.tooltipContent === 'success' ? (
            <gux-icon icon-name="badge-check" decorative></gux-icon>
          ) : (
            ''
          )}
          {this.tooltipContent === 'error' ? (
            <gux-icon icon-name="badge-x" decorative></gux-icon>
          ) : (
            ''
          )}

          {/* Tooltip Text */}
          {this.tooltipContent === 'offerClick' ? this.i18n('clickToCopy') : ''}
          {this.tooltipContent === 'offerEnter' ? this.i18n('enterToCopy') : ''}
          {this.tooltipContent === 'success' ? this.i18n('copySuccess') : ''}
          {this.tooltipContent === 'error' ? this.i18n('copyFailure') : ''}
        </gux-tooltip>
      </button>
    ) as JSX.Element;
  }
}
