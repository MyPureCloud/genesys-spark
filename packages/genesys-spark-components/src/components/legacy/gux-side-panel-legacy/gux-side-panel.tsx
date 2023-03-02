import { Component, Element, h, JSX, Prop } from '@stencil/core';

import { trackComponent } from '@utils/tracking/usage';

@Component({
  styleUrl: 'gux-side-panel.less',
  tag: 'gux-side-panel-legacy',
  shadow: false
})
export class GuxSidePanel {
  @Element()
  private root: HTMLElement;

  /**
   * Open or close the content
   */
  @Prop()
  isOpen: boolean = false;

  /**
   * The position of the side panel
   */
  @Prop()
  position: 'left' | 'right' = 'left';

  get containerClass(): string {
    return `gux-${this.position} gux-${this.isOpen ? 'open' : 'closed'}`;
  }

  get contentClass(): string {
    return `gux-panel-content gux-${this.isOpen ? 'open' : 'closed'}`;
  }

  componentWillLoad(): void {
    trackComponent(this.root, { variant: this.position });
  }

  render(): JSX.Element {
    return (
      <aside class={this.containerClass}>
        <div class="gux-panel-icons">
          <slot name="side-panel-icons" />
        </div>
        <div class={this.contentClass}>
          <slot name="side-panel-content" />
        </div>
      </aside>
    ) as JSX.Element;
  }
}
