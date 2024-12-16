import { Component, Element, h, Host, JSX, Prop } from '@stencil/core';
import { trackComponent } from '@utils/tracking/usage';
import { getClosestElement } from '@utils/dom/get-closest-element';

@Component({
  styleUrl: 'gux-link.scss',
  tag: 'gux-link-beta',
  shadow: true
})
export class GuxLink {
  @Element()
  private root: HTMLElement;

  @Prop()
  size: 'medium' | 'small' = 'medium';

  @Prop()
  standalone: boolean = false;

  componentWillLoad(): void {
    trackComponent(this.root, {
      variant: this.size + (this.standalone ? '-standalone' : '')
    });
  }

  private checkBreadcrumbParent(): boolean {
    return !!getClosestElement('.gux-breadcrumb-generation', this.root);
  }

  render(): JSX.Element {
    return (
      <Host
        size={this.size}
        standalone={this.standalone}
        class={{ 'gux-breadcrumb-link': this.checkBreadcrumbParent() }}
      >
        <slot></slot>
      </Host>
    ) as JSX.Element;
  }
}
