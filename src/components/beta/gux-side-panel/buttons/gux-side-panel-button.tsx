import { Component, h, JSX, Prop } from '@stencil/core';

@Component({
  styleUrl: 'gux-side-panel-button.less',
  tag: 'gux-side-panel-button',
  shadow: false
})
export class GuxSidePanelButton {
  @Prop()
  icon: string;

  @Prop()
  altText: string;

  @Prop()
  isSelected: boolean = false;

  get buttonClass(): string {
    return this.isSelected ? 'selected' : '';
  }

  render(): JSX.Element {
    return (
      <button aria-label={this.altText} class={this.buttonClass}>
        <gux-icon decorative icon-name={this.icon}></gux-icon>
      </button>
    ) as JSX.Element;
  }
}
