import { Component, Host, JSX, Prop, h, State, Element } from '@stencil/core';

/**
 * @slot - Group options
 */

@Component({
  styleUrl: 'gux-menu-group.scss',
  tag: 'gux-menu-group',
  shadow: true
})
export class GuxMenuGroup {
  @Element()
  root: HTMLElement;

  @Prop()
  groupTitle: string;

  @Prop()
  divider: boolean = true;

  @State()
  hasTitle: boolean = false;

  private renderDivider(): JSX.Element {
    if (this.divider) {
      return (<gux-list-divider></gux-list-divider>) as JSX.Element;
    }
  }

  private renderTitle(): JSX.Element {
    if (this.groupTitle) {
      return (
        <span class="gux-menu-option-group-title">{this.groupTitle}</span>
      ) as JSX.Element;
    }
  }

  render(): JSX.Element {
    return (
      <Host class="gux-menu-option-group" role="group">
        {this.renderTitle()}
        <slot />
        {this.renderDivider()}
      </Host>
    ) as JSX.Element;
  }
}
