import { Component, Event, EventEmitter, h, Prop } from '@stencil/core';

@Component({
  styleUrl: 'gux-tab-dropdown-option.less',
  tag: 'gux-tab-dropdown-option'
})
export class GuxTabDropdownOption {
  /**
   * unique id for the option
   */
  @Prop() optionId: string;

  /**
   * name of the gux-icon to display for the option
   */
  @Prop() iconName: string;

  /**
   * Triggers when the option is selected.
   * @return the value of the newly selected option
   */
  @Event() optionSelected: EventEmitter<string>;

  selectDropdownOption() {
    this.optionSelected.emit(this.optionId);
  }

  render() {
    return (
      <button
        class="tab-dropdown-option"
        onClick={() => this.selectDropdownOption()}
      >
        <gux-icon iconName={this.iconName} decorative={true}></gux-icon>
        <span>
          <slot />
        </span>
      </button>
    );
  }
}
