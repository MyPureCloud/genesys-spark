import { Component, Prop } from '@stencil/core';

@Component({
  styleUrl: 'gux-text-label.less',
  tag: 'gux-text-label'
})
export class GuxTextLabel {
  @Prop()
  label: string;

  @Prop()
  position: 'horizontal' | 'vertical' = 'vertical';

  render() {
    return (
      <div class={'gux-text-label-container ' + this.position}>
        <label class="gux-label">{this.label}</label>
        <div class="gux-labeled-component">
          <slot />
        </div>
      </div>
    );
  }
}
