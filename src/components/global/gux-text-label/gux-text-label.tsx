import { Component, Element, Prop } from '@stencil/core';

let nextLabelId = 1;
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

  id: string;

  constructor() {
    this.id = this.generateId();
  }

  componentDidLoad() {
    const labeledComponentSlot = this.labeledComponent.querySelector(
      '*'
    ) as any;
    if (
      typeof labeledComponentSlot.componentOnReady !== 'function' ||
      typeof labeledComponentSlot.setLabeledBy !== 'function'
    ) {
      // Only set labeled by if its supported by the contained element.
      return;
    }

    labeledComponentSlot.componentOnReady().then(() => {
      labeledComponentSlot.setLabeledBy(this.id);
    });
  }

  render() {
    return (
      <div class={'gux-text-label-container ' + this.position}>
        <label class="gux-label" id={this.id}>
          <slot name="label">{this.label}</slot>
        </label>
        <div
          class="gux-labeled-component"
          ref={el => (this.labeledComponent = el)}
        >
          <slot />
        </div>
      </div>
    );
  }

  private generateId(): string {
    return 'gux-text-label-' + nextLabelId++;
  }
}
