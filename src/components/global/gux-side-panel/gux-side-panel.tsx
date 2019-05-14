import { Component, Element, Prop } from '@stencil/core';

@Component({
  styleUrl: 'gux-side-panel.less',
  tag: 'gux-side-panel'
})
export class GuxSidePanel {
  @Element()
  root: HTMLStencilElement;

  @Prop()
  isOpen = false;

  @Prop()
  position: 'left' | 'right' = 'left';

  get containerClass(): string {
    return `panel-icons ${this.position} ${this.isOpen ? 'open' : 'closed'}`;
  }

  get contentClass(): string {
    return `panel-content ${this.isOpen ? 'open' : 'closed'}`;
  }

  render() {
    return (
      <aside class={this.containerClass}>
        <div class="panel-icons">
          <slot name="side-panel-icons" />
        </div>
        <div class={this.contentClass}>
          <slot name="side-panel-content" />
        </div>
      </aside>
    );
  }
}
