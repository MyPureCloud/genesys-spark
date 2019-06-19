import { Component, Element, Prop } from '@stencil/core';

@Component({
  styleUrl: 'gux-text-label.less',
  tag: 'gux-text-label'
})
export class GuxTextLabel {
  @Element()
  root: HTMLStencilElement;
  labeledComponent: HTMLDivElement;

  @Prop()
  label: string;

  @Prop()
  position: 'horizontal' | 'vertical' = 'vertical';

  componentDidLoad() {
    const labeledComponentSlot = this.labeledComponent.querySelector('*');
    labeledComponentSlot.setAttribute('sr-label', this.label);
  }

  render() {
    return (
      <div class={'gux-text-label-container ' + this.position}>
        <label class="gux-label">{this.label}</label>
        <div
          class="gux-labeled-component"
          ref={el => (this.labeledComponent = el)}
        >
          <slot />
        </div>
      </div>
    );
  }
}
