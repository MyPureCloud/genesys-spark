import { Component, h, Prop, JSX } from '@stencil/core';

@Component({
  styleUrl: 'gux-tab-advanced-option.less',
  tag: 'gux-tab-advanced-option'
})
export class GuxTabAdvancedOption {
  /**
   * unique id for the option
   */
  @Prop()
  optionId: string;

  /**
   * name of the gux-icon to display for the option
   */
  @Prop()
  iconName: string;

  render(): JSX.Element {
    return (
      <button tabindex="-1" class="tab-dropdown-option">
        <gux-icon icon-name={this.iconName} decorative={true}></gux-icon>
        <span>
          <slot />
        </span>
      </button>
    ) as JSX.Element;
  }
}
