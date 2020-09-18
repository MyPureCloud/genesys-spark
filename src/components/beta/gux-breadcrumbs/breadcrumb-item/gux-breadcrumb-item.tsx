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

  private isAccentSecondary() {
    return this.accent === 'secondary';
  }

  render() {
    const separatorIcon = this.isAccentSecondary() ? (
      <gux-icon
        class="separator"
        icon-name="ic-chevron-small-right"
        decorative
      ></gux-icon>
    ) : (
      <span class="separator" aria-hidden="true">
        /
      </span>
    );
    const separator = this.lastBreadcrumb ? '' : separatorIcon;
    if (this.href && !this.lastBreadcrumb && this.isAccentSecondary()) {
      return (
        <span class="link-row">
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
