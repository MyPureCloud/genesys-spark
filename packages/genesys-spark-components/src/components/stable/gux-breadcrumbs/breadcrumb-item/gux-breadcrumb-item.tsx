import { Component, Element, h, JSX, Prop } from '@stencil/core';

import { logError } from '../../../../utils/error/log-error';

import { GuxBreadcrumbAccent } from '../gux-breadcrumbs.types';

/**
 * @slot - content
 */

@Component({
  styleUrl: 'gux-breadcrumb-item.less',
  tag: 'gux-breadcrumb-item',
  shadow: true
})
export class GuxBreadcrumbItem {
  @Element()
  private root: HTMLElement;

  @Prop()
  href: string;

  private getAccent(): GuxBreadcrumbAccent {
    const container = this.root.closest('gux-breadcrumbs');

    if (container) {
      return container.accent;
    } else {
      logError(
        this.root,
        'This component must be a child of a gux-breadcrumbs component.'
      );
    }
  }

  private isLastBreadcrumb(): boolean {
    const parentNode = this.root.parentNode;
    const children = parentNode.children;

    return children[children.length - 1] === this.root;
  }

  private getBreadcrumb(): JSX.Element {
    if (!this.href || this.isLastBreadcrumb()) {
      return (
        <span class="gux-breadcrumb-content">
          <slot />
        </span>
      ) as JSX.Element;
    }

    return (
      <a class="gux-breadcrumb-content gux-link" href={this.href}>
        <slot />
      </a>
    ) as JSX.Element;
  }

  private getSeparatorIcon(accent: GuxBreadcrumbAccent): JSX.Element {
    if (this.isLastBreadcrumb()) {
      return null;
    }

    switch (accent) {
      case 'primary':
        return (
          <span class="gux-breadcrumb-separator" aria-hidden="true">
            /
          </span>
        ) as JSX.Element;
      case 'secondary':
        return (
          <gux-icon
            class="gux-breadcrumb-separator"
            icon-name="chevron-small-right"
            decorative
          ></gux-icon>
        ) as JSX.Element;
      default:
        return (
          <span class="gux-breadcrumb-separator" aria-hidden="true">
            /
          </span>
        ) as JSX.Element;
    }
  }

  render(): JSX.Element {
    const accent: GuxBreadcrumbAccent = this.getAccent();

    return (
      <span class={`gux-breadcrumb-generation gux-${accent}`}>
        {this.getBreadcrumb()}
        {this.getSeparatorIcon(accent)}
      </span>
    ) as JSX.Element;
  }
}
