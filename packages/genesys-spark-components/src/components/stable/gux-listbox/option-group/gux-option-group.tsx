import { Component, h, Host, JSX, Prop, State, Element } from '@stencil/core';
import { hasSlot } from '@utils/dom/has-slot';

/**
 * The listbox component provides keyboard bindings and a11y patterns for selecting
 * from a list of options.
 *
 * @slot - collection of elements conforming to the ListboxOptionElement interface
 */
@Component({
  styleUrl: 'gux-option-group.scss',
  tag: 'gux-option-group',
  shadow: true
})
export class GuxOptionGroup {
  @Element()
  root: HTMLElement;

  @Prop()
  divider: boolean = true;

  @State()
  private showTitle: boolean = false;

  componentWillLoad(): void {
    this.showTitle = hasSlot(this.root, 'title');
  }

  private renderTitle(): JSX.Element {
    if (this.showTitle) {
      return (
        <div class="gux-option-group-title">
          <slot name="title"></slot>
        </div>
      ) as JSX.Element;
    }
  }

  private renderDivider(): JSX.Element {
    if (this.divider) {
      return (<gux-list-divider></gux-list-divider>) as JSX.Element;
    }
  }

  render(): JSX.Element {
    return (
      <Host role="group" class="gux-option-group">
        {this.renderTitle()}
        <slot />
        {this.renderDivider()}
      </Host>
    ) as JSX.Element;
  }
}
