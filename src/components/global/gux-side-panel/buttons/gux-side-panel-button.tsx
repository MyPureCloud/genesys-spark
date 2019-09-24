import { Component, h, Prop } from '@stencil/core';

@Component({
  styleUrl: 'gux-side-panel-button.less',
  tag: 'gux-side-panel-button'
})
export class GuxSidePanelButton {
  @Prop()
  icon: string;

  @Prop()
  altText: string;

  @Prop()
  isSelected = false;

  get buttonClass(): string {
    return this.isSelected ? 'selected' : '';
  }

  render() {
    return (
      <button aria-label={this.altText} class={this.buttonClass}>
        <i aria-hidden="true" class={this.icon} />
      </button>
    );
  }
}
