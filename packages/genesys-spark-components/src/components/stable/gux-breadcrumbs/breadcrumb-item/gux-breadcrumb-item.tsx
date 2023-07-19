import { Component, Element, h, Host, JSX, Prop } from '@stencil/core';

import { logError } from '../../../../utils/error/log-error';

import { GuxBreadcrumbAccent } from '../gux-breadcrumbs.types';

/**
 * @slot - content
 */

@Component({
  styleUrl: 'gux-breadcrumb-item.scss',
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

  private isActiveBreadcrumb(): boolean {
    const parentNode = this.root.parentNode;
    const children = parentNode.children;

    return children[children.length - 1] === this.root;
  }

  private getBreadcrumb(): JSX.Element {
    if (this.isActiveBreadcrumb()) {
      return (
        <span class="gux-breadcrumb-content gux-active" aria-current="page">
          <slot />
        </span>
      ) as JSX.Element;
    }

    if (this.href) {
      return (
        <a class="gux-breadcrumb-content gux-link" href={this.href}>
          <slot />
        </a>
      ) as JSX.Element;
    }

    return (
      <span class="gux-breadcrumb-content">
        <slot />
      </span>
    ) as JSX.Element;
  }

  private getSeparatorIcon(): JSX.Element {
    if (this.isActiveBreadcrumb()) {
      return null;
    }

    return (
      <span class="gux-breadcrumb-separator" aria-hidden="true">
        /
      </span>
    ) as JSX.Element;
  }

  render(): JSX.Element {
    const accent: GuxBreadcrumbAccent = this.getAccent();

    return (
      <Host role="listitem">
        <span class={`gux-breadcrumb-generation gux-${accent}`}>
          {this.getBreadcrumb()}
          {this.getSeparatorIcon()}
        </span>
      </Host>
    ) as JSX.Element;
  }
}
