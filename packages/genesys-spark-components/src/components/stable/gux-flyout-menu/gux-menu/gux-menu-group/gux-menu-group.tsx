import { Component, Host, JSX, Prop, h } from '@stencil/core';

/**
 * @slot - text
 */

@Component({
  styleUrl: 'gux-menu-group.scss',
  tag: 'gux-menu-group',
  shadow: true
})
export class GuxMenuOption {
  @Prop()
  title: string;

  @Prop()
  showDivider: boolean = true;

  private renderDivider(): JSX.Element {
    if (this.showDivider) {
      return (<gux-list-divider></gux-list-divider>) as JSX.Element;
    }
  }

  render(): JSX.Element {
    return (
      <Host class="gux-menu-option-group" role="group">
        <span class="gux-menu-option-group-title">{this.title}</span>
        <slot />
        {this.renderDivider()}
      </Host>
    ) as JSX.Element;
  }
}
