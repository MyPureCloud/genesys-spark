import { Component, Element, h, JSX, Prop, Listen } from '@stencil/core';
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

  @Prop({ mutable: true })
  tooltipText: string;

  @Prop({ mutable: true })
  icon: string;

  @Listen('keydown')
  onKeydown(event: KeyboardEvent): void {
    switch (event.key) {
      case 'Enter':
        event.preventDefault();
        this.onCopyToClipboard();
        return;
    }
  }

  @Listen('mouseleave')
  onMouseleave() {
    this.resetTooltip();
  }

  @Listen('focusout')
  onFocusout() {
    this.resetTooltip();
  }

  private resetTooltip() {
    this.tooltipText = this.i18n('clickToCopy');
    this.icon = '';
  }

  private onCopyToClipboard() {
    const copyText = this.root.innerText;

    navigator.clipboard
      .writeText(copyText)
      .then(() => {
        this.tooltipText = this.i18n('copySuccess');
        this.icon = 'badge-check';
      })
      .catch(() => {
        this.tooltipText = this.i18n('copyFailure');
        this.icon = 'badge-x';
      });
  }

  async componentWillLoad(): Promise<void> {
    trackComponent(this.root);
    this.i18n = await buildI18nForComponent(this.root, translationResources);

    this.tooltipText = this.i18n('clickToCopy');
  }

  render(): JSX.Element {
    return (
      <div
        tabIndex={0}
        onClick={this.onCopyToClipboard.bind(this)}
        class="gux-copy-to-clipboard-wrapper"
      >
        <div class="gux-copy-content">
          <slot />
          <div class="gux-icon-container">
            <gux-icon icon-name="copy" decorative></gux-icon>
          </div>
        </div>
        <gux-tooltip placement="bottom-end">
          {this.icon ? (
            <gux-icon icon-name={this.icon} decorative></gux-icon>
          ) : (
            ''
          )}
          {this.tooltipText}
        </gux-tooltip>
      </div>
    ) as JSX.Element;
  }
}
