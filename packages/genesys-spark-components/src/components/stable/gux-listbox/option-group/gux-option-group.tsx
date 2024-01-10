import { Component, h, Host, JSX, Prop, Element } from '@stencil/core';

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
  label: string;

  @Prop()
  divider: boolean = true;

  @Prop()
  disabled: boolean = false;

  private renderLabel(): JSX.Element {
    if (this.label) {
      return (
        <div class="gux-option-group-label" role="presentation">
          {this.label}
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
      <Host class={{ 'gux-disabled': this.disabled }}>
        {this.renderLabel()}
        <div role="group">
          <slot />
        </div>
        {this.renderDivider()}
      </Host>
    ) as JSX.Element;
  }
}
