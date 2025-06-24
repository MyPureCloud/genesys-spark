import { Component, Element, h, JSX, State, Listen } from '@stencil/core';
import { trackComponent } from '@utils/tracking/usage';
import { buildI18nForComponent, GetI18nValue } from '../../../i18n';
import translationResources from './i18n/en.json';
import { GuxCopyToClipboardContent } from './gux-copy-to-clipboard.types';

/**
 * @slot content - Slot for content
 */
@Component({
  styleUrl: 'gux-copy-to-clipboard.scss',
  tag: 'gux-copy-to-clipboard',
  shadow: { delegatesFocus: true }
})
export class GuxCopyToClipboard {
  private i18n: GetI18nValue;

  @Element()
  private root: HTMLElement;

  @State()
  tooltipContent: GuxCopyToClipboardContent = 'clickToCopy';

  @Listen('mouseleave')
  onMouseleave() {
    this.resetTooltip();
  }

  @Listen('focusout')
  onFocusout() {
    this.resetTooltip();
  }

  private handleKeyDown(event: KeyboardEvent): void {
    switch (event.key) {
      case 'Enter':
      case ' ':
        event.preventDefault();
        this.onCopyToClipboard();
        break;
    }
  }

  private resetTooltip() {
    this.tooltipContent = 'clickToCopy';
  }

  private async onCopyToClipboard(): Promise<void> {
    const copyText = this.root.innerText;

    return navigator.clipboard
      .writeText(copyText)
      .then(() => {
        this.tooltipContent = 'copySuccess';
      })
      .catch(() => {
        this.tooltipContent = 'copyFailure';
      });
  }

  getIconName(tooltipContent: GuxCopyToClipboardContent): string {
    switch (tooltipContent) {
      case 'copyFailure':
        return 'fa/circle-xmark-solid';
      case 'copySuccess':
        return 'fa/circle-check-solid';
    }
  }

  private renderTooltipIcon(): JSX.Element {
    const iconName = this.getIconName(this.tooltipContent);
    if (iconName) {
      return (
        <gux-icon icon-name={iconName} size="small" decorative></gux-icon>
      ) as JSX.Element;
    }
  }

  private renderTooltip(): JSX.Element {
    return (
      <gux-tooltip placement="bottom-end">
        <div slot="content" class="gux-tooltip-content">
          {this.renderTooltipIcon()}
          <span>{this.i18n(this.tooltipContent)}</span>
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
        type="button"
        class="gux-copy-to-clipboard-wrapper"
        onClick={this.onCopyToClipboard.bind(this)}
        onKeyDown={e => this.handleKeyDown(e)}
      >
        <div class="gux-copy-content">
          {/* This is a named slot because we don't want it to be possible to slot a text node.
          Slotted text nodes are not targeted by `::slotted(*)` so they are not styled as expected. */}
          <slot name="content" />
          <gux-icon
            icon-name="fa/copy-regular"
            size="small"
            decorative
          ></gux-icon>
        </div>
        {this.renderTooltip()}
      </button>
    ) as JSX.Element;
  }
}
