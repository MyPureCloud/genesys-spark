import { Component, Element, Host, h, JSX, Prop } from '@stencil/core';
import { trackComponent } from '../../../usage-tracking';
import { buildI18nForComponent, GetI18nValue } from '../../../i18n';
import translationResources from './i18n/en.json';

@Component({
  styleUrl: 'gux-anchor.less',
  tag: 'gux-anchor-beta',
  shadow: true
})
export class GuxAnchor {
  @Element()
  private root: HTMLElement;

  private i18n: GetI18nValue;

  /**
   * True when anchor component is used within a table cell
   */
  @Prop()
  table: boolean = false;

  async componentWillLoad() {
    trackComponent(this.root);
    this.i18n = await buildI18nForComponent(this.root, translationResources);
  }

  isExternalLink(url: string) {
    const tempAnchor = document.createElement('a');
    tempAnchor.href = url;
    return tempAnchor.host !== window.location.host;
  }

  renderExternalLinkIcon() {
    const isExternalLink = this.isExternalLink(
      this.root.querySelector('a').href
    );
    if (isExternalLink) {
      return (
        <gux-icon
          icon-name="external-link"
          screenreader-text={this.i18n('externalLinkIcon')}
        ></gux-icon>
      ) as JSX.Element;
    }
  }

  render(): JSX.Element {
    return (
      <Host table={this.table}>
        {this.renderExternalLinkIcon()}
        <slot />
      </Host>
    ) as JSX.Element;
  }
}
