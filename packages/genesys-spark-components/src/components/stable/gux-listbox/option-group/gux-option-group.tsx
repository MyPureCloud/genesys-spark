import { Component, h, Host, JSX, Prop } from '@stencil/core';

@Component({
  tag: 'gux-option-group',
  shadow: true
})
export class GuxOptionGroup {
  /**
   * Group title
   */
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
      <Host role="group">
        <div class="group-header">{this.title}</div>
        <slot />
        {this.renderDivider()}
      </Host>
    ) as JSX.Element;
  }
}
