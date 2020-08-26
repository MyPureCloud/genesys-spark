import { Component, h, Prop } from '@stencil/core';

@Component({
  tag: 'gux-breadcrumb-item'
})
export class GuxBreadcrumbItem {
  @Prop()
  lastBreadcrumb: boolean;

  @Prop()
  accent: string;

  @Prop()
  href: string;

  render() {
    const separatorIcon =
      this.accent === 'secondary' ? (
        <gux-icon
          class="separator"
          icon-name="ic-chevron-right"
          decorative
        ></gux-icon>
      ) : (
        <span class="separator" aria-hidden="true">
          /
        </span>
      );
    const separator = this.lastBreadcrumb ? '' : separatorIcon;
    if (this.href && !this.lastBreadcrumb) {
      return (
        <span>
          <a class="breadcrumb" href={this.href}>
            <slot />
          </a>
          {separator}
        </span>
      );
    } else {
      return (
        <span>
          <span class="breadcrumb">
            <slot />
          </span>
          {separator}
        </span>
      );
    }
  }
}
