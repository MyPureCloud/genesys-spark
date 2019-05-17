import {
  Component,
  Element,
  Event,
  EventEmitter,
  Method,
  Prop
} from '@stencil/core';

function escapeRegex(input) {
  return input.replace(/[-/\\^$*+?.()|[\]{}]/g, '\\$&');
}

@Component({
  tag: 'gux-dropdown-option'
})
export class GuxDropdownOption {
  @Element()
  root: HTMLGuxDropdownOptionElement;
  slot: HTMLElement;

  /**
   * The content of this attribute represents the value to be submitted on 'input' changes,
   * should this option be selected. If this attribute is omitted, the value is taken from
   * the text content of the option element.
   */
  @Prop()
  value: string;

  /**
   * If this Boolean attribute is set, this option is not checkable. It won't receive any
   * browsing events, like mouse clicks or focus-related ones.
   */
  @Prop()
  disabled: boolean;

  /**
   * If this Boolean attribute is set, the option is not visible to the select control.
   * This does not mean that it clears the selection if it was previously selected.
   */
  @Prop({ mutable: true, reflectToAttr: true })
  filtered: boolean;

  /**
   * If present, this Boolean attribute indicates that the option is currently selected.
   */
  @Prop({ mutable: true, reflectToAttr: true })
  selected: boolean;

  /**
   * Occurs when the item has been selected.
   */
  @Event()
  selectedChanged: EventEmitter;

  /**
   * Gets the value rendered by the drop down item.
   */
  @Method()
  getDisplayedValue(): string {
    return this.slot.innerText;
  }

  /**
   * Determines if the search input matches this option.
   *
   * @param searchInput The input string being searched for.
   */
  @Method()
  filter(searchInput: string): boolean {
    if (!searchInput) {
      return false;
    }

    const regex = new RegExp(escapeRegex(searchInput), 'gi');
    return !regex.test(this.getDisplayedValue());
  }

  componentDidLoad() {
    this.root.onclick = () => {
      this._onItemClicked();
    };
  }

  hostData() {
    return {
      tabindex: '0'
    };
  }

  render() {
    return (
      <div ref={elm => (this.slot = elm)}>
        <slot />
      </div>
    );
  }

  private _onItemClicked() {
    this.selected = true;
    this.selectedChanged.emit(this.value);
  }
}
