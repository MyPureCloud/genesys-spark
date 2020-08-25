import { Component, Element, h, Prop } from '@stencil/core';

@Component({
  tag: 'gux-breadcrumbs-item'
})
export class GuxBreadcrumbsItem {
  @Element()
  root: HTMLGuxBreadcrumbsItemElement;

  @Prop()
  text: string;

  @Prop()
  lastBreadcrumb: boolean;

  @Prop()
  accent: string;

  @Prop()
  link: string;

  render() {
    const separatorIcon =
      this.accent === 'secondary' ? (
        <gux-icon
          class="separator"
          icon-name="ic-chevron-right"
          decorative
        ></gux-icon>
      ) : (
        <span class="separator">/</span>
      );
    const separator = this.lastBreadcrumb ? '' : separatorIcon;
    if (this.link && !this.lastBreadcrumb) {
      return (
        <span>
          <a class="breadcrumb" href={this.link}>
            {this.text}
          </a>
          {separator}
        </span>
      );
    } else {
      return (
        <span>
          <span class="breadcrumb">{this.text}</span>
          {separator}
        </span>
      );
    }
  }
}
