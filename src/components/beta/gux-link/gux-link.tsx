import { Component, Element, h, JSX, Prop } from '@stencil/core';
import { trackComponent } from '../../../usage-tracking';
import { buildI18nForComponent, GetI18nValue } from '../../../i18n';
import translationResources from './i18n/en.json';
import { GuxLinkTargetTypes } from './gux-link.types';

@Component({
  styleUrl: 'gux-link.less',
  tag: 'gux-link-beta',
  shadow: true
})
export class GuxLink {
  @Element()
  private root: HTMLElement;

  private i18n: GetI18nValue;

  /**
   * The href
   */
  @Prop()
  href: string;

  /**
   * Where to open the link
   */
  @Prop()
  target: GuxLinkTargetTypes = '_self';

  /**
   * The text for the link
   */
  @Prop()
  linkText: string;

  /**
   * Show external icon if external link
   */
  @Prop()
  isExternalLink: boolean = false;

  /**
   * True when link component is used within a table cell
   */
  @Prop()
  tableCellLink: boolean = false;

  async componentWillLoad() {
    trackComponent(this.root);
    this.i18n = await buildI18nForComponent(this.root, translationResources);
  }

  renderExternalLinkIcon() {
    if (this.isExternalLink) {
      return (
        <span>
          <gux-icon
            icon-name="external-link"
            screenreader-text={this.i18n('externalLinkIcon')}
          ></gux-icon>
        </span>
      ) as JSX.Element;
    }
  }

  render(): JSX.Element {
    return (
      <div class="gux-link-container">
        {this.renderExternalLinkIcon()}
        <a
          class={{
            'gux-link': true,
            'gux-link-table-cell': this.tableCellLink
          }}
          href={this.href}
          target={this.target}
        >
          {this.linkText}
        </a>
      </div>
    ) as JSX.Element;
  }
}
